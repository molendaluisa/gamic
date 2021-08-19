import React, { useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { getGame, submitVote, finishRound, getRoundWinner } from './backend/GameSetup.js';


export default function CombateM(props) {
  let defaultTimer = 5;
  const [counter, setCounter] = useState(defaultTimer)
  const [overlayLeft, setOverlayLeft] = useState(null)
  const [overlayRight, setOverlayRight] = useState(null)
  const [noEvents, setNoEvents] = useState(null)
  const [game, setGame] = useState(getGame(props.gamePin))
  const [gameOver, setGameOver] = useState(false)
  const [optionAWon, setOptionAWon] = useState(null)
  const [optionBWon, setOptionBWon] = useState(null)
  const [roundResult, setRoundResult] = useState(false)

  React.useEffect(() => {
    if (counter === 0) {
      setRoundResult(true)
      setOverlayLeft(null)
      setOverlayRight(null)
      var roundWinner = getRoundWinner(props.gamePin)

      if (game.optionA.description === roundWinner.description) {
        console.log('optionA is the winner')
        setOptionAWon(true)
        setOptionBWon(false)
      } else if (game.optionB.description === roundWinner.description) {
        console.log("option b is the winner")
        setOptionAWon(false)
        setOptionBWon(true)
      } else {
        setOptionAWon(true)
        console.log(roundWinner)
      }
    }
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  function handleSelectionLeft() {
    // Once a selection is done is should not be possible to select another one
    var user = {
      nickname: props.nickname,
    }

    if (overlayLeft == null) {
      setOverlayLeft(true)
      setOverlayRight(false)
      setNoEvents(true)
      submitVote(game.pin, user, game.optionA)
      setGame(getGame(game.pin))
    }
  }

  function handleSelectionRight() {
    // Once a selection is done is should not be possible to select another one
    var user = {
      nickname: props.nickname,
    }

    if (overlayRight == null) {
      setOverlayLeft(false)
      setOverlayRight(true)
      setNoEvents(true)
      submitVote(game.pin, user, game.optionB)
      setGame(getGame(game.pin))
    }
  }

  function goToNextRound() {
    // This need to be specific per user, this version is only to test.
    var isGameOver = finishRound(game.pin)
    if (isGameOver) {
      setGameOver(true)
    } else {
      setGame(getGame(game.pin))
      setCounter(defaultTimer)
    }
    setOverlayLeft(null)
    setOverlayRight(null)
    setOptionAWon(null)
    setOptionBWon(null)
    setNoEvents(null)
    setRoundResult(false)
    setCounter(defaultTimer)
  }

  function handleNext(event) {
    event.preventDefault();
    goToNextRound();
  }

  return (
    <div className="Combate d-flex-center flex-column">

      {/* NAV */}
      <nav className="bar">
        <h1>{gameOver ? "Winner!!!" : `Round #${game.currentRound} - What would you save?`} </h1>
        <button className="btn btn-primary btn-start btn-next" onClick={handleNext}>Next</button>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="middle-section">
        {gameOver ?
          <div className="winner-wrapper">
            <Winner optionInfo={game.roundWinner} gameOver={gameOver} />
          </div>
          :
          <div className="battle-wrapper d-flex-center">
            <Contender optionInfo={game.optionA} handleSelection={handleSelectionLeft} status={overlayLeft} noEvents={noEvents} winner={optionAWon} />
            <div className="versus"> VS </div>
            <Contender optionInfo={game.optionB} handleSelection={handleSelectionRight} status={overlayRight} noEvents={noEvents} winner={optionBWon} />
          </div>
        }
      </div>

      {/* FOOTER */}
      <footer className="bar">
        <ul className="fot-ul">
          <li className="fot-li">{game.currentRound}/{game.totalRounds}</li>
          {roundResult ? null :
            <li className="counter fot-li">
              <div id="countdown">
                <div id="countdown-number">{counter}</div>
                <svg className="circle-counter">
                  <circle r="18" cx="20" cy="20"></circle>
                </svg>
              </div>
            </li>
          }
          <li className="fot-li">1 <FaUserAlt /> - PIN: {props.gamePin}</li>
        </ul>
      </footer>

    </div >
  );
}