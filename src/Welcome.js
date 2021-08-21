import React, { useState, useEffect } from "react";
import './scss/Welcome.css';
import Combate from "./Combate";

export default function Welcome(props) {
  const [listening, setListening] = useState(false);
  const [gamePin, setGamePin] = useState(props.gamePin)
  const [gameStatus, setGameStatus] = useState(null)

  let eventSource = undefined;


  useEffect(() => {  
    // Listen for notification on game start
    if (!listening) {
      eventSource = new EventSource('http://localhost:5000/game/' + props.gamePin + "/usersNotifications")
        eventSource.onmessage = (event) => {
            console.log("Game om!")
            eventSource.close();
            setGameStatus("open")

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

  if (gameStatus === 'open') {
    return (
      <Combate gamePin={gamePin} nickname={props.nickname}/>
    );
  } else {

  return (
    <div className="Welcome d-flex-center">

      {/* NAV */}
      <nav className="bar">
        <h1>Pancakes vs Waffles</h1>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="welcome-center d-flex-center">
        <h2>Welcome, You're in!</h2>
        <h3>See your nickname on screen?</h3>
      </div>




      {/* FOOTER */}
      <footer className="bar">
        <ul className="fot-ul">
          <li className="fot-li"></li>
          <li className="fot-li">PIN: {props.gamePin}</li>
        </ul>
      </footer>
    </div>
  );
  }
}