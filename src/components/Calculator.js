import React from 'react';
import '../styles/Calculator.css';
// import { parseWithAddition, parseWithSubtraction, parseWithDivison, parseWithMultiplication } from './Maths';

class Calculator extends React.Component {
    // Initialise state
    state = {
        expression: "",
        answer: true,
        history: [],
        operator: false,
    }

    parseWithSubtraction = entry => {
        const expressionArr = entry.split("-");
        const convertedArr = expressionArr.map((x) => Number(x));
        return convertedArr.reduce((x, y) => x - y);  
    }

    parseWithMultiplication = entry => {
        const expressionArr = entry.split("x");
        const convertedArr = expressionArr.map((x) => Number(x));
        return convertedArr.reduce((x, y) => x * y, 1);  
    }

    parseWithDivision = entry => {
        const expressionArr = entry.split("÷");
        const convertedArr = expressionArr.map((x) => Number(x)); 
        return convertedArr.reduce((x, y) => x / y);  
    }

    // handles order of precedence

    recurser = exp => {
        // memoisation?
        // const multiplyRegex = (/^[.0123456789]+["x"][.0123456789]+/);
        // stop with first match
        const testRegex = (/[-]*[\d|.]+[x|÷][-]*[\d|.]+/);
        const multiplyRegex = (/[-]*[\d|.]+[x][-]*[\d|.]+/);
        const divideRegex = (/[-]*[\d|.]+[÷][-]*[\d|.]+/);
    
        if(!testRegex.test(exp)){
            return exp;

        // determine what sort of operation came first and apply correct procedure
        } else if(multiplyRegex.test(exp.match(testRegex))){
            const matchOne = exp.match(multiplyRegex).join("");
            const resOne = exp.replace(matchOne, this.parseWithMultiplication(matchOne))
            return this.recurser(resOne);
        } else {
            const matchTwo = exp.match(divideRegex).join("");
            const resTwo = exp.replace(matchTwo, this.parseWithDivision(matchTwo))
            return this.recurser(resTwo);
        }

    }

    parseWithAddition = exp => {
        // memoiser would go here
        // order of operations: resolve expressions that include x or ÷ in string
        const newExp = this.recurser(exp);
        const expressionArr = newExp.split("+");
        // subtraction parser converts string entries to numbers while applying subtraction operation if necessary
        const convertedArr = expressionArr.map((x) => this.parseWithSubtraction(x));
        // leaving remaining characters to be added together
        return convertedArr.reduce((x, y) => x + y); 
    }

    // parsing ends 

    equals = () => {
        const myExpression = this.state.expression;
        const result = this.parseWithAddition(myExpression);
        this.setState({
            expression: result + "",
            answer: true,
            history : [...this.state.history, `${myExpression} = ${result}`],
            operator: false
        })
    }

    myOperatorSetter = x => {
            this.setState({
                expression: this.state.expression + x,
                answer: this.state.operator ? true: false,
            })
    }

    myOperandSetter = x => {
        if(this.state.answer){
            this.setState({
                expression: x,
                answer: false,
            })

        } else {
            this.setState({
                expression: this.state.expression + x
            })
        }
    }

    delete = () => {
        const result = this.state.expression.split('').slice(0, this.state.expression.length - 1).join('');
        this.setState({
            expression: result
        })
    }

    render(){
        return(
            <div className="calculator">
                <div className="display">
                    <div>
                        {this.state.expression}  
                    </div>
                </div>
                <div className="keypad">
                    <button className="admin" onClick={() => this.setState({ expression: "", answer: ""})}>AC</button>
                    <button className="admin" onClick={() => this.delete()}>DEL</button>

                    <button className="admin" onClick={()=> console.log(this.state.history)}>ANS</button>

                    <button className="operator" onClick={()=> this.myOperatorSetter("÷")}>÷</button>

                    <button className="operand" onClick={()=> this.myOperandSetter("7")}>7</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("8")}>8</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("9")}>9</button>
                    <button className="operator" onClick={()=> this.myOperatorSetter("x")}>x</button>

                    <button className="operand" onClick={()=> this.myOperandSetter("4")}>4</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("5")}>5</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("6")}>6</button>
                    <button className="operator" onClick={()=> this.myOperatorSetter("-")}>-</button>

                    <button className="operand" onClick={()=> this.myOperandSetter("1")}>1</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("2")}>2</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("3")}>3</button>
                    <button className="operator" onClick={()=> this.myOperatorSetter("+")}>+</button>

                    <button className="operand" onClick={()=> this.myOperatorSetter(".")}>.</button>
                    <button className="operand" onClick={()=> this.myOperandSetter("0")}>0</button>

                    <button className="operand" onClick={() => console.log(this.state.history)}>()</button>    
                    <button className="equals" onClick={() => this.equals()}>=</button>
                </div>
            </div>
        )
    }
}

export default Calculator;

// deal with parentheses, history tab, comments, refactor, % button, css