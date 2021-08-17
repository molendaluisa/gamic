import React, { useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { test, getGame, submitVote, finishRound } from './backend/GameSetup.js';


export default function Combate(props) {
  let timer = 50;
  const [counter, setCounter] = useState(10)
  const [overlayLeft, setOverlayLeft] = useState(null)
  const [overlayRight, setOverlayRight] = useState(null)
  const [noEvents, setNoEvents] = useState(null)
  const [game, setGame] = useState(getGame(props.gamePin))
  const [gameOver, setGameOver] = useState(false)


  React.useEffect(() => {
    if (counter === 0) {
      goToNextRound()
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
      setCounter(10)
    }
    setOverlayLeft(null)
    setOverlayRight(null)
    setNoEvents(null)
    setCounter(timer)
  }

  return (
    <div className="Combate d-flex-center flex-column">

      {/* NAV */}
      <nav className="bar">
        <h1>{gameOver ? "Winner!!!" : `Round #${game.currentRound} - What would you save?`} </h1>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="middle-section">
        {gameOver ?
          <div className="winner-wrapper">
            <Winner optionInfo={game.roundWinner} gameOver={gameOver} />
          </div>
          :
          <div className="battle-wrapper d-flex-center">
            <Contender optionInfo={game.optionA} handleSelection={handleSelectionLeft} status={overlayLeft} noEvents={noEvents} />
            <div className="versus"> VS </div>
            <Contender optionInfo={game.optionB} handleSelection={handleSelectionRight} status={overlayRight} noEvents={noEvents} />
          </div>
        }
      </div>

      {/* FOOTER */}
      <footer className="bar">
        <ul>
          <li>{game.currentRound}/{game.totalRounds}</li>
          {gameOver ? null :
            <li className="counter">
              <div id="countdown">
                <div id="countdown-number">{counter}</div>
                <svg className="circle-counter">
                  <circle r="18" cx="20" cy="20"></circle>
                </svg>
              </div>
            </li>
          }
          <li>1 <FaUserAlt /> - PIN: {props.gamePin}</li>
        </ul>
      </footer>

    </div >
  );
}
