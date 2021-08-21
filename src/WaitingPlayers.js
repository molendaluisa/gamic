import React, { useState, useEffect } from "react";
import { FaUserAlt } from 'react-icons/fa';
import './scss/WaitingPlayers.css';
import CombateM from "./CombateM";


export default function WaitingPlayers(props) {
  const [listening, setListening] = useState(false);
  const [players, setPlayers] = useState(null)
  const [gameStatus, setGameStatus] = useState(null)

  let eventSource = undefined;

  useEffect(() => {
    if (players === null) {
      // Get game
        fetch('http://localhost:5000/game/' + props.gamePin)
          .then(response => response.json())
          .then(data => {
            console.log(data.players)
            if (data.players.length !== 0) {
              setPlayers(data.players)
            }
          })
    }
  
    // Listen for notification on users joining and update list of users
    if (!listening) {
        eventSource = new EventSource('http://localhost:5000/game/' + props.gamePin + "/listerToServer")
        eventSource.onmessage = (event) => {
            const players = JSON.parse(event.data);
            setPlayers(players)
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

  function handleStart(event) {
    event.preventDefault()
    // Send info to server to start game
    fetch('http://localhost:5000/game/' + props.gamePin + "/user/" + props.nickname + "/start")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setGameStatus("game on");
    }) 
  }

  var playersItems = null
  if (players) {
    playersItems = players.map((player) =>
      <li key={player.nickname}>{player.nickname}</li>
    );
  }
  if (gameStatus) {
    return (
      <CombateM gamePin={props.gamePin} nickname={props.nickname} />
    );
  } else {
    return (
      <div className="WaitingPlayers d-flex-center">

        {/* NAV */}
        <nav className="bar">
          <h2 className="join-banner">Join at </h2><span className="link">www.gamic.com</span>
          <h1 className="join-banner">Game PIN:</h1><span className="link">{props.gamePin}</span>
        </nav>


        {/* MIDDLE SECTION */}

        {players ?
          <ul className="players-list">{playersItems}</ul> :
          <div className="waiting-center d-flex-center">
            <p>Waiting for players...</p>
          </div>}




        {/* FOOTER */}
        <footer className="bar wbutton">
          <ul className="bar down fot-ul">
            <li className="fot-li">0 <FaUserAlt /></li>
            <li className="fot-li"><button className="btn btn-primary btn-start" onClick={handleStart}>Start</button></li>
          </ul>
        </footer>
      </div>
    );
  }
}