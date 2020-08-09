import React, { useState } from 'react';
import '../styles/Calculator.css';
import { parseWithAddition } from "./Maths";

const HookCalculator = () => {
    const [expression, setExpression ] = useState("");
    const [answer, setAnswer ] = useState(true);
    const [history, setHistory ] = useState([]);
    const [operator, setOperator ] = useState(false);

    const equals = () => {
        const myExpression = expression;
        // const memoizedFunc = this.memoizer(this.parseWithAddition);
        // const result = memoizedFunc(myExpression);
        const result = parseWithAddition(myExpression);
        setExpression(result+"");
        setAnswer(true);
        setHistory([...history, `${myExpression} = ${result}`]);
        setOperator(false);
    }

    const myOperatorSetter = x => {
            setExpression(expression + x);
            setAnswer(operator ? true: false)
    }

    const myOperandSetter = x => {
        if(answer){
            setExpression(x);
            setAnswer(false);

        } else {
            setExpression(expression + x);
        }
    }

    const deleter = () => {
        const result = expression.split('').slice(0, expression.length - 1).join('');
        setExpression(result);
      
    }

    return(
            <div className="calculator">
                <div className="display">
                    <div>
                        {expression}  
                    </div>
                </div>
                <div className="keypad">
                    <button className="admin" onClick={() => { setExpression(""); setAnswer("") }}>AC</button>
                    <button className="admin" onClick={() => deleter()}>DEL</button>

                    <button className="admin" onClick={()=> console.log(history)}>?</button>

                    <button className="operator" onClick={()=> myOperatorSetter("÷")}>÷</button>

                    <button className="operand" onClick={()=> myOperandSetter("7")}>7</button>
                    <button className="operand" onClick={()=> myOperandSetter("8")}>8</button>
                    <button className="operand" onClick={()=> myOperandSetter("9")}>9</button>
                    <button className="operator" onClick={()=> myOperatorSetter("x")}>x</button>

                    <button className="operand" onClick={()=> myOperandSetter("4")}>4</button>
                    <button className="operand" onClick={()=> myOperandSetter("5")}>5</button>
                    <button className="operand" onClick={()=> myOperandSetter("6")}>6</button>
                    <button className="operator" onClick={()=> myOperatorSetter("-")}>-</button>

                    <button className="operand" onClick={()=> myOperandSetter("1")}>1</button>
                    <button className="operand" onClick={()=> myOperandSetter("2")}>2</button>
                    <button className="operand" onClick={()=> myOperandSetter("3")}>3</button>
                    <button className="operator" onClick={()=> myOperatorSetter("+")}>+</button>

                    <button className="operand" onClick={()=> myOperatorSetter(".")}>.</button>
                    <button className="operand" onClick={()=> myOperandSetter("0")}>0</button>

                    {/* <button className="operand" onClick={() => this.setParentheses()}>()</button>     */}
                    <button className="operand" onClick={() => console.log(history)}>HIS</button>  
                    <button className="equals" onClick={() => equals()}>=</button>
                </div>
            </div>
        )
    }

export default HookCalculator;