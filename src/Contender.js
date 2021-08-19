import React from "react";
import './scss/Contender.css';

export default function Contender(props) {
  var divClasses = "contender"
  var cardClasses = "polaroid"
  divClasses = props.status ? divClasses + " overlay" : divClasses
  divClasses = props.noEvents ? divClasses + " no-events" : divClasses


  if (props.winner === null) {
    cardClasses = "polaroid"
  } else if (props.winner) {
    cardClasses = cardClasses + " round-winner  "
  } else {
    cardClasses = cardClasses + " round-loser"
  }

  return (
    <div className={divClasses}>
      <div className="Contender" onClick={props.handleSelection} >
        <div className={cardClasses}>
          <img src={props.optionInfo.imageUrl} alt="contender photo"></img>
          <div className="caption">{props.optionInfo.description}</div>
        </div>
      </div >
    </div>
  );
}
