import React from "react";
import "../styles/Calculator.css";
import { parseWithAddition } from "./Maths";

class Calculator extends React.Component {
  state = {
    expression: "",
    answer: true,
    history: [],
    operator: false
  };

  // Helper functions

  equals = () => {
    const myExpression = this.state.expression;
    const result = parseWithAddition(myExpression);
    this.setState({
      expression: result + "",
      answer: true,
      history: [...this.state.history, `${myExpression} = ${result}`],
      operator: false
    });
  };

  myOperatorSetter = (x) => {
    this.setState({
      expression: this.state.expression + x,
      answer: this.state.operator ? true : false
    });
  };

  myOperandSetter = (x) => {
    if (this.state.answer) {
      this.setState({
        expression: x,
        answer: false
      });
    } else {
      this.setState({
        expression: this.state.expression + x
      });
    }
  };

  delete = () => {
    const result = this.state.expression
      .split("")
      .slice(0, this.state.expression.length - 1)
      .join("");
    this.setState({
      expression: result
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <div>{this.state.expression}</div>
        </div>
        <div className="keypad">
          <button
            className="admin"
            onClick={() => this.setState({ expression: "", answer: false })}
          >
            AC
          </button>
          <button className="admin" onClick={() => this.delete()}>
            DEL
          </button>

          <button
            className="admin"
            onClick={() => console.log(this.state.history)}
          >
            ?
          </button>

          <button
            className="operator"
            onClick={() => this.myOperatorSetter("÷")}
          >
            ÷
          </button>

          <button className="operand" onClick={() => this.myOperandSetter("7")}>
            7
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("8")}>
            8
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("9")}>
            9
          </button>
          <button
            className="operator"
            onClick={() => this.myOperatorSetter("x")}
          >
            x
          </button>

          <button className="operand" onClick={() => this.myOperandSetter("4")}>
            4
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("5")}>
            5
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("6")}>
            6
          </button>
          <button
            className="operator"
            onClick={() => this.myOperatorSetter("-")}
          >
            -
          </button>

          <button className="operand" onClick={() => this.myOperandSetter("1")}>
            1
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("2")}>
            2
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("3")}>
            3
          </button>
          <button
            className="operator"
            onClick={() => this.myOperatorSetter("+")}
          >
            +
          </button>

          <button
            className="operand"
            onClick={() => this.myOperatorSetter(".")}
          >
            .
          </button>
          <button className="operand" onClick={() => this.myOperandSetter("0")}>
            0
          </button>

          <button
            className="operand"
            onClick={() => console.log(this.state.history)}
          >
            HIS
          </button>
          <button className="equals" onClick={() => this.equals()}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
