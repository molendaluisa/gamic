import React, { useState } from "react";
import './scss/App.css';
import Welcome from './Welcome';
import WaitingPlayers from './WaitingPlayers';

export default function App() {
  const [ready, setReady] = useState(false);
  const [pinGame, setPinGame] = useState(null);
  const [nickname, setNickname] = useState(null);

  function checkEnter(event) {
    event.preventDefault();
    setReady(true);
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
          <div className="form-container d-flex-center">
            <input type="text" placeholder="Game PIN" className="input" onChange={handlePinChange} />
            <input type="text" placeholder="Nickname" className="input" onChange={handleNicknameChange} />
            <button className="btn btn-primary" onClick={checkEnter}>Enter</button>
          </div>
        </div>
      }
      {ready ?
        /*   <Welcome gamePin="ABC01" nickname="luisita" />    */
        <WaitingPlayers gamePin="ABC01" nickname="luisita" /> : null}
    </div >
  );
}


