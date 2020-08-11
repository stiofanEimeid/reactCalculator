import React from "react";
import "../styles/Screen.css";

const Screen = (props) => {
  if (!props.page) {
    return (
      <div className="display">
        <div className="expression">{props.exp}</div>
        {displayAnswer(props.dis, props.ans)}
      </div>
    );
  } else {
    return (
      <div className="history">
        <div className="historyTitle">History</div>
        {mapHistory(props.arr)}
      </div>
    );
  }
};

const displayAnswer = (dis, ans) => {
  if (dis) {
    return <div>{ans}</div>;
  }
};

// map entries in history list to history tab on screen
const mapHistory = (arr) => {
  return arr.map((entry, i) => (
    <div className="historyEntry" key={i++}>
      {i}. {entry}
    </div>
  ));
};

export default Screen;