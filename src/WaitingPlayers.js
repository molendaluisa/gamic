import React, { useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/WaitingPlayers.css';
import { getGame } from "./backend/GameSetup";


export default function WaitingPlayers(props) {
  const [gamePin, setGamePin] = useState(props.gamePin)
  const [players, setPlayers] = useState(null)

  function refreshGamePlayers() {
    var game = getGame(gamePin)
    game.players = [
      {
        nickname: "Luisita",
        isModerator: false
      },
      {
        nickname: "Ale",
        isModerator: false
      },
      {
        nickname: "Toti",
        isModerator: true
      }
    ]
    setPlayers(game.players)
  }
  setInterval(refreshGamePlayers, 5000);

  var playersItems = null
  if (players) {
    playersItems = players.map((player) =>
      <li>{player.nickname}</li>
    );
  }

  return (
    <div className="WaitingPlayers d-flex-center">

      {/* NAV */}
      <nav className="bar">
        <h2 className="join-banner">Join at </h2><span className="link">www.gamic.com</span>
        <h1 className="join-banner">Game PIN:</h1><span className="link">ABC01</span>
      </nav>


      {/* MIDDLE SECTION */}

      {players ?
        <ul className="players-list">{playersItems}</ul> :
        <div className="waiting-center d-flex-center">
          <p>Waiting for players...</p>
        </div>}




      {/* FOOTER */}
      <footer className="bar wbutton">
        <ul className="bar down">
          <li>0 <FaUserAlt /></li>
          <li><button className="btn btn-primary btn-start">Start</button></li>
        </ul>
      </footer>
    </div>
  );
}