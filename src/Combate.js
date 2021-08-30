import React, { useState, useEffect } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function CombateM(props) {
  let defaultTimer = 10;
  const [listening, setListening] = useState(false);
  const [overlayLeft, setOverlayLeft] = useState(null)
  const [overlayRight, setOverlayRight] = useState(null)
  const [noEvents, setNoEvents] = useState(null)
  const [game, setGame] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [optionAWon, setOptionAWon] = useState(null)
  const [optionBWon, setOptionBWon] = useState(null)
  const [key, setKey] = useState(0)


  let eventSource = undefined;

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
    if (game === null) {
      // Get game
      fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin)
        .then(response => response.json())
        .then(data => {
          console.log(data.players)
          setGame(data)
        })
    }
    // Listen for notification on next round
    if (!listening) {
      eventSource = new EventSource('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/usersNotifications")
      eventSource.onmessage = (event) => {
        console.log("NExt round!")
        // setGameStatus("open")
        fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin)
          .then(response => response.json())
          .then(data => {
            console.log(data.players)
            setGame(data)
          })
      }
      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        eventSource.close();
      }
      setListening(true)
    }
    return () => {
      eventSource.close();
      console.log("event closed")
    }
  }, [])

  function onTimeEnds() {
    console.log("time is up")
    setOverlayLeft(true)
    setOverlayRight(true)
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
    if (overlayLeft == null) {
      setOverlayLeft(true)
      setOverlayRight(false)
      setNoEvents(true)
      submitChoice(game.optionA)
    }
  }

  function handleSelectionRight() {
    if (overlayRight == null) {
      setOverlayLeft(false)
      setOverlayRight(true)
      setNoEvents(true)
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
        setOverlayLeft(null)
        setOverlayRight(null)
        setOptionAWon(null)
        setOptionBWon(null)
        setNoEvents(null)
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
            <div className="timer-wrapper">
              <CountdownCircleTimer
                key={key}
                isPlaying
                duration={defaultTimer}
                colors={[["#000000"]]}
                onComplete={onTimeEnds}
                size={60}
                strokeWidth={5}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            <li className="fot-li">1 <FaUserAlt /> - PIN: {props.gamePin}</li>
          </ul>
        </footer>
      </div >
    );
  }
}
