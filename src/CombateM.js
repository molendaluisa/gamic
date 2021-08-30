import React, { useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/Combate.css';
import Contender from "./Contender";
import Winner from "./Winner";
import { getGame, handleOptionSelection } from './backend/GameSetup.js';

export default function CombateM(props) {
  const [game, setGame] = useState(getGame(props.gamePin))
  const [gameOver, setGameOver] = useState(false)
  const [optionAWon, setOptionAWon] = useState(null)
  const [optionBWon, setOptionBWon] = useState(null)
  const [restartTimer, setRestartTimer] = useState(0)

  function handleSelectionLeft() {
    if (optionAWon == null) {
      setOptionAWon(true)
      setOptionBWon(false)
    }
  }

  function handleSelectionRight() {
    if (optionBWon == null) {
      setOptionAWon(false)
      setOptionBWon(true)
    }
  }

  function handleNext(event) {
    event.preventDefault();
    console.log("Go to next round")

    handleOptionSelection(props.gamePin, optionAWon, optionBWon)
    setGame(getGame(props.gamePin))
    setOptionAWon(null)
    setOptionBWon(null)
    setRestartTimer(restartTimer+1)
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
           
            {/* <div ref={countUpRef}/> */}
            {/* <CountUp start={0} end={100} duration={100} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
              </CountUp> */}
               <div>

    </div>
            </div>
            <li className="fot-li"><FaUserAlt /> - PIN: {props.gamePin}</li>
          </ul>
        </footer>
      </div >
    );
  }
}
