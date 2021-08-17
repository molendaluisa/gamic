import React from "react";
import './scss/Welcome.css';

export default function Welcome(props) {
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
        <ul>
          <li></li>
          <li>PIN: {props.gamePin}</li>
        </ul>
      </footer>
    </div>
  );
}