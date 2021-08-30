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
      fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin)
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
      eventSource = new EventSource('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/listerToServer")
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
    fetch('https://boiling-wave-10637.herokuapp.com/game/' + props.gamePin + "/user/" + props.nickname + "/start")
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
          {/* <h2 className="join-banner">Join at </h2><span className="link">www.gamic.com</span>
          <h1 className="join-banner">Game PIN:</h1><span className="link">{props.gamePin}</span> */}
          <h1>Pancakes vs Waffles</h1>
        </nav>


        {/* MIDDLE SECTION */}

        {/* {players ?
          <ul className="players-list">{playersItems}</ul> : */}
        <div className="waiting-center">
          {/* <p>Waiting for players...</p> */}
          <h2>Welcome!</h2>
          <h3>Either <b>pancakes</b> or <b>waffles</b> are going to disappear from existence and your group needs to make a choice of which one to save:</h3>
          <h3>- The votes will be via webcam, so please <b>turn your camera on</b> when you are asked to vote for your chosen option.</h3>
          <h3>- When the Team decides, another option will be given to compete with the previous winner.</h3>
        </div>
        {/* } */}




        {/* FOOTER */}
        <footer className="bar wbutton">
          <ul className="bar down fot-ul">
            <li className="fot-li"><FaUserAlt /></li>
            <li className="fot-li"><button className="btn btn-primary btn-start" onClick={handleStart}>Start</button></li>
          </ul>
        </footer>
      </div >
    );
  }
}