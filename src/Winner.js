import React, { useState } from "react";
import './scss/Winner.css';
import { test, getGame, submitVote, finishRound } from './backend/GameSetup.js';

export default function Winner(props) {
  return (
    <div className="Winner no-events">
      <div className="polaroid">
        <img src={props.optionInfo.imageUrl} alt="contender photo"></img>
        <div className="caption">{props.optionInfo.description}</div>
      </div>
    </div>
  );
}