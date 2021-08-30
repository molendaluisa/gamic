import React, { useState, useEffect } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function CombateM(props) {
  let defaultTimer = 30;
  const [game, setGame] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [optionAWon, setOptionAWon] = useState(null)
  const [optionBWon, setOptionBWon] = useState(null)
  const [key, setKey] = useState(0)

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return null;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  useEffect(() => {
    // Get game
    fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin)
      .then(response => response.json())
      .then(data => {
        console.log(data.players)
        setGame(data)
      })
  }, [])

  function onTimeEnds() {

    // Get round winner from the server
    fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/roundWinner")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        var roundWinner = data.roundWinner

        if (roundWinner === null) {
          setOptionAWon(true)
          console.log("its a tie!")
          console.log(roundWinner)
        } else {
          if (game.optionA.description === roundWinner.description) {
            setOptionAWon(true)
            setOptionBWon(false)
          } else if (game.optionB.description === roundWinner.description) {
            setOptionAWon(false)
            setOptionBWon(true)
          } else {
            setOptionAWon(true)
            setOptionBWon(false)
            console.log("its a tie! ?")
            console.log(roundWinner)
          }
        }

      })
  }

  function submitChoice(option) {
    console.log("Submiting vote")
    fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/user/" + props.nickname + "/vote/" + option.description)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  function handleSelectionLeft() {
    if (optionAWon == null) {
      setOptionAWon(true)
      setOptionBWon(false)
      submitChoice(game.optionA)
    }
  }

  function handleSelectionRight() {
    if (optionBWon == null) {
      setOptionAWon(false)
      setOptionBWon(true)
      submitChoice(game.optionB)
    }
  }

  function handleNext(event) {
    event.preventDefault();
    console.log("Go to next round")
    fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/finishRound")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        var isGameOver = data.status === "game_over"
        if (isGameOver) {
          setGameOver(true)
        } else {
          setGame(data)
          setKey(prevKey => prevKey + 1)
        }
        setOptionAWon(null)
        setOptionBWon(null)
      })
  }

  if (game === null) {
    return (<div></div>)
  } else {


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
              <Contender optionInfo={game.optionA} handleSelection={handleSelectionLeft} winner={optionAWon} />
              <div className="versus"> VS </div>
              <Contender optionInfo={game.optionB} handleSelection={handleSelectionRight} winner={optionBWon} />
            </div>
          }
        </div>

        {/* FOOTER */}
        <footer className="bar">
          <ul className="fot-ul">
            <li className="fot-li">{game.currentRound}/{game.totalRounds}</li>
            <div className="timer-wrapper">
              <CountdownCircleTimer
                key={key}
                isPlaying
                duration={defaultTimer}
                colors={[["#000000"]]}
                //onComplete={onTimeEnds}
                size={60}
                strokeWidth={5}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            <li className="fot-li"><FaUserAlt /> - PIN: {props.gamePin}</li>
          </ul>
        </footer>
      </div >
    );
  }
}
