import React, { useState } from "react";
import './scss/Combate.css';
import Contender from "./Contender";

export default function Combate() {

  const [counter, setCounter] = useState(30)
  const [overlay, setOverlay] = useState(false)

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  function applyOverlay() {
    setOverlay(true)
  }

  return (
    <div className="Combate d-flex-center flex-column">

      {/* NAV */}
      <nav className="bar">
        <h1>Round #1 - Who's going to rule the world?</h1>
      </nav>


      {/* MIDDLE SECTION */}
      <div className="middle-section d-flex-center">
        <div className={overlay ? "contender-0 overlay no-events" : "contender-0"} onClick={applyOverlay}>
          <Contender />
        </div>

        <div className="versus">
          VS
        </div>

        <div className="contender-1">
          <Contender />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bar">
        <ul>
          <li>1/15</li>
          <li className="counter"><div id="countdown">
            <div id="countdown-number">{counter}</div>
            <svg>
              <circle r="18" cx="20" cy="20"></circle>
            </svg>
          </div></li>
          <li>Gamic - PIN: 12345</li>
        </ul>
      </footer>

    </div >
  );
}
