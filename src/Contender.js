import React from "react";
import './scss/Contender.css';

export default function Contender(props) {
  var cardClasses = "polaroid"


  if (props.winner === null) {
    cardClasses = "polaroid"
  } else if (props.winner) {
    cardClasses = cardClasses + " round-winner  "
  } else {
    cardClasses = cardClasses + " round-loser"
  }

  return (
    <div className="contender">
      <div className="Contender" onClick={props.handleSelection}>
        <div className={cardClasses}>
          <img src={props.optionInfo.imageUrl} alt="contender"></img>
          <div className="caption">{props.optionInfo.description}</div>
        </div>
      </div >
    </div>
  );
}
