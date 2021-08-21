import React, { } from "react";
import './scss/Winner.css';
export default function Winner(props) {
  return (
    <div className="Winner no-events">
      <div className="polaroid">
        <img src={props.optionInfo.imageUrl} alt="contender"></img>
        <div className="caption">{props.optionInfo.description}</div>
      </div>
    </div>
  );
}