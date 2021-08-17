import React, { useState } from "react";
import './scss/App.css';
import Welcome from './Welcome';

export default function App() {
  const [ready, setReady] = useState(false);

  function checkEnter(event) {
    event.preventDefault();
    setReady(true);
  };

  return (
    <div className="App">
      {ready ? null :
        <div className="d-flex-center app-container">
          <h1 className="logo-white">Gamic</h1>
          <div className="form-container d-flex-center">
            <input type="text" placeholder="Game PIN" className="input" />
            <input type="text" placeholder="Nickname" className="input" />
            <button className="btn btn-primary" onClick={checkEnter}>Enter</button>
          </div>
        </div>
      }
      {ready ? <Welcome gamePin="ABC01" nickname="luisita" /> : null}
    </div >
  );
}


