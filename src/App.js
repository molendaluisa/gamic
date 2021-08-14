import React, { useState } from "react";
import './scss/App.css';
import Combate from './Combate';

export default function App() {
  const [ready, setReady] = useState(false);

  function checkEnter(event) {
    event.preventDefault();
    setReady(true);
  };

  return (
    <div className="App">
      <div className="app-container d-flex-center flex-column">
        {ready ? null :
          <div>
            <h1 className="logo-white">Gamic</h1>
            <div className="form-container d-flex-center flex-column">
              <input type="text" placeholder="Game PIN" className="input" />
              <input type="text" placeholder="Nickname" className="input" />
              <button className="btn btn-primary" onClick={checkEnter}>Enter</button>
            </div>
          </div>
        }
        {ready ? <Combate /> : null}
      </div>
    </div>
  );
}


