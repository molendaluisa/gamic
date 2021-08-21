import React, { useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


export default function Combate(props) {
  let defaultTimer = 30;
  const [listening, setListening] = useState(false);
  const [overlayLeft, setOverlayLeft] = useState(null)
  const [overlayRight, setOverlayRight] = useState(null)
  const [noEvents, setNoEvents] = useState(null)
  const [game, setGame] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [next, setNext] = useState(null)
  // const [optionAWon, setOptionAWon] = useState(null)
  // const [optionBWon, setOptionBWon] = useState(null)
  const [key, setKey] = useState(0)

  let eventSource = undefined;

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  React.useEffect(() => {
    if (game=== null) {
    // Get game
    fetch('http://localhost:5000/game/' + props.gamePin)
    .then(response => response.json())
    .then(data => {
      console.log(data.players)
      setGame(data)
    })
  }
    // Listen for notification on next round
    if (!listening) {
      eventSource = new EventSource('http://localhost:5000/game/' + props.gamePin + "/usersNotifications")
        eventSource.onmessage = (event) => {
            console.log("NExt round!")
            // setGameStatus("open")
            fetch('http://localhost:5000/game/' + props.gamePin)
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
  }, []);

  function onTimeEnds() {
    setOverlayLeft(null)
    setOverlayRight(null)

    // Get round winner from the server
    // Wait for next round
  }

  function submitChoice(option) {
    console.log("Submiting vote")
    fetch('http://localhost:5000/game/' +  props.gamePin + "/user/" + props.nickname + "/vote/" + option.description)
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
            <Contender optionInfo={game.optionA} handleSelection={handleSelectionLeft} status={overlayLeft} noEvents={noEvents} />
            <div className="versus"> VS </div>
            <Contender optionInfo={game.optionB} handleSelection={handleSelectionRight} status={overlayRight} noEvents={noEvents} />
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
              colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
              onComplete={onTimeEnds}
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
