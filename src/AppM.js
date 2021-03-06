import React, { useState } from "react";
import './scss/App.css';
import WaitingPlayers from './WaitingPlayers';
import { getGame } from './backend/GameSetup.js';


export default function AppM(props) {
  const [ready, setReady] = useState(false);
  const [pinGame, setPinGame] = useState(props.gamePin);
  const [nickname, setNickname] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);

  function checkEnter(event) {
    event.preventDefault();
    var game = getGame(pinGame)
    if (game == null || nickname == null) {
      setErrorMsg(true)
    } else {
      setReady(true);
    }
  };

  function handlePinChange(event) {
    setPinGame(event.target.value);
  };

  function handleNicknameChange(event) {
    setNickname(event.target.value);
  };

  return (
    <div className="App">
      {ready ? null :
        <div className="d-flex-center app-container">
          <h1 className="logo-white">Gamic</h1>
          <form className="form-container d-flex-center" onSubmit={checkEnter}>
            <input type="text" placeholder="Game PIN" className="input" onChange={handlePinChange} />
            <input type="text" placeholder="Nickname" className="input" onChange={handleNicknameChange} />
            <button className="btn btn-primary" onClick={checkEnter}>Enter</button>
          </form>
          {errorMsg ? <div><p className="error-msg-wrapper">Game not found OR Nickname invalid</p></div> : null}
        </div>
      }
      {ready ?
        <WaitingPlayers gamePin={pinGame} nickname={nickname} /> : null}
    </div >
  );
}


