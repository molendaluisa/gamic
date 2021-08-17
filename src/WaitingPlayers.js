import React, { useState } from "react";
import './scss/WaitingPlayers.css';
import { getGame } from "./backend/GameSetup";

export default function WaitingPlayers(props) {
  const [gamePin, getGamePin] = useState(props.gamePin)
  const [players, setPlayers] = useState(null)

  function refeeshGamePlayers() {
    var game = getGame(gamePin)
    setPlayers(game.players)
  }
  setInterval(refeeshGamePlayers, 10000);
 
  return (
    <div className="WaitingPlayers d-flex-center">

      {/* NAV */}
      <nav className="bar">
        <h1 className="join-banner">Join at <span className="link">www.gamic.com</span></h1>
        <h1>Game PIN: ABC01</h1>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="waiting-center d-flex-center">
        <p>Waiting for players...</p>
      </div>



      {/* FOOTER */}
      <footer className="bar">
        <ul>
          <li></li>
          <li>PIN: {props.gamePin}</li>
        </ul>
      </footer>
    </div>
  );
}