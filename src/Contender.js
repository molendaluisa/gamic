import React from "react";
import './scss/Contender.css';

export default function Contender(props) {

  return (
    <div className={"Contender"} onClick={props.handleSelection} >
      <div className="polaroid">
        {/* <img src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80" alt="contender-0"></img> */}
        <img src={props.optionInfo.imageUrl} alt="contender photo"></img>
        <div className="caption">{props.optionInfo.description}</div>
      </div>
    </div >
  );
}
