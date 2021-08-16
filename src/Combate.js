import React, { useState } from "react";
import './scss/Combate.css';
import Contender from "./Contender";
import { test, getGame, submitVote, finishRound } from './backend/GameSetup.js';


export default function Combate(props) {

  const [counter, setCounter] = useState(5)
  const [overlay, setOverlay] = useState(false)
  const [game, setGame] = useState(getGame(props.gamePin))

  React.useEffect(() => {
    if (counter === 0) {
      console.log("hello work")
      goToNextRound()
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  function applyOverlay() {
    setOverlay(true)
  }

  function handleSelectionLeft() {
    // Once a selection is done is should not be possible to select another one
    var user = {
      nickname: props.nickname,
    }
    submitVote(game.pin, user, game.optionA)
    setGame(getGame(game.pin))
  }

  function handleSelectionRight() {
    // Once a selection is done is should not be possible to select another one
    var user = {
      nickname: props.nickname,
    }
    submitVote(game.pin, user, game.optionB)
    setGame(getGame(game.pin))
  }

  function goToNextRound() {
    // This need to be specific per user, this version is only to test.
    finishRound(game.pin)
    setGame(getGame(game.pin))
    setCounter(5)
  }

  return (
    <div className="Combate d-flex-center flex-column">

      {/* NAV */}
      <nav className="bar">
        <h1>Round #{game.currentRound} - What would you save?</h1>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="middle-section d-flex-center">
        <div className={overlay ? "contender-0 overlay no-events" : "contender-0"} onClick={applyOverlay}>
          <Contender optionInfo={game.optionA} handleSelection={handleSelectionLeft} />
        </div>

        <div className="versus">
          VS
        </div>

        <div className="contender-1">
          <Contender optionInfo={game.optionB} handleSelection={handleSelectionRight} />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bar">
        <ul>
          <li>{game.currentRound}/{game.totalRounds}</li>
          <li className="counter"><div id="countdown">
            <div id="countdown-number">{counter}</div>
            <svg>
              <circle r="18" cx="20" cy="20"></circle>
            </svg>
          </div></li>
          <li>Gamic - PIN: {props.gamePin}</li>
        </ul>
      </footer>

    </div >
  );
}
