import React, { useState } from 'react';
import "../styles/Calculator.css";
import { parseWithAddition } from "./Maths";
import Screen from "./Screen";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");
  // Initialise list containing history of user input
  // list includes further information on errors
  // users may encounter in calculations e.g. if result was NaN.
  const [history, setHistory] = useState([]);
  // Display answer on Screen component.
  const [display, setDisplay] = useState(false);
  // Display history tab.
  const [tab, setTab] = useState(false);

  // Helper functions
  const myOperandSetter = (opd) => {
    // Clear screen if answer is being displayed
    // before setting operand.
    if (display) {
      setExpression(opd);
      setDisplay(false);
    } else {
      setExpression(`${expression}${opd}`);
    }
  };

  const myOperatorSetter = (opr) => {
    // Add operator to answer if it displayed.
    if (display) {
      setExpression(`${answer}${opr}`);
      setDisplay(false);
    } else {
      setExpression(`${expression}${opr}`);
    }
  };

  const equals = () => {
    const myExpression = expression;
    const result = parseWithAddition(myExpression);
    setAnswer(
      isNaN(result) || result === Infinity
        ? "Error"
        : result.toLocaleString().replace(/,/g, "")
    );
    setHistory([...history, `${myExpression} = ${result}`]);
    setDisplay(true);
  };

  const removeLast = () => {
    const result = expression.slice(0, -1);
    setExpression(result);
    setDisplay(false);
  };

  const setButtonName = () => (tab ? "CAL" : "HIS");

  return (
    <div className="wrapper">
      <div className="calculator">
        <Screen
          page={tab}
          exp={expression}
          ans={answer}
          dis={display}
          arr={history}
        />
        <div className="keypad">
          <button
            className="admin"
            onClick={() => {
              setExpression("");
              setDisplay(false);
            }}
          >
            AC
          </button>
          <button className="admin" onClick={() => removeLast()}>
            DEL
          </button>

          <button className="admin" onClick={() => myOperandSetter(answer)}>
            ANS
          </button>

          <button className="admin" onClick={() => setTab(!tab)}>
            {setButtonName()}
          </button>

          <button className="operand" onClick={() => myOperandSetter("7")}>
            7
          </button>
          <button className="operand" onClick={() => myOperandSetter("8")}>
            8
          </button>
          <button className="operand" onClick={() => myOperandSetter("9")}>
            9
          </button>
          <button className="operator" onClick={() => myOperatorSetter("÷")}>
          ÷
          </button>

          <button className="operand" onClick={() => myOperandSetter("4")}>
            4
          </button>
          <button className="operand" onClick={() => myOperandSetter("5")}>
            5
          </button>
          <button className="operand" onClick={() => myOperandSetter("6")}>
            6
          </button>
          <button className="operator" onClick={() => myOperatorSetter("x")}>
            x
          </button>

          <button className="operand" onClick={() => myOperandSetter("1")}>
            1
          </button>
          <button className="operand" onClick={() => myOperandSetter("2")}>
            2
          </button>
          <button className="operand" onClick={() => myOperandSetter("3")}>
            3
          </button>
          <button className="operator" onClick={() => myOperatorSetter("-")}>
            -
          </button>
          <button className="operand" onClick={() => myOperandSetter("0")}>
            0
          </button>
          <button className="operand" onClick={() => myOperatorSetter(".")}>
            .
          </button>

          <button className="equals" onClick={() => equals()}>
            =
          </button>
          <button className="operator" onClick={() => myOperatorSetter("+")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};


export default Calculator;