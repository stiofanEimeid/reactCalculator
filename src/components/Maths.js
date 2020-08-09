export const parseWithSubtraction = (entry) => {
    const expressionArr = entry.split("-");
    const convertedArr = expressionArr.map((x) => Number(x));
    return convertedArr.reduce((x, y) => x - y);
  };
  
  export const parseWithMultiplication = (entry) => {
    const expressionArr = entry.split("x");
    const convertedArr = expressionArr.map((x) => Number(x));
    return convertedArr.reduce((x, y) => x * y, 1);
  };
  
  export const parseWithDivision = (entry) => {
    const expressionArr = entry.split("÷");
    const convertedArr = expressionArr.map((x) => Number(x));
    return convertedArr.reduce((x, y) => x / y);
  };
  
  // handles order of precedence
  
  export const recurser = (exp) => {
    // memoisation?
    // stop with first match
    // allows for a signed or unsigned operand of variable length, followed by the division operator, followed by a signed or unsigned oeprand of variable length
    const testRegex = /[-]*[\d|.]+[x|÷][-]*[\d|.]+/;
    const multiplyRegex = /[-]*[\d|.]+[x][-]*[\d|.]+/;
    const divideRegex = /[-]*[\d|.]+[÷][-]*[\d|.]+/;
  
    if (!testRegex.test(exp)) {
      return exp;
  
      // determine what sort of operation came first and apply correct procedure
    } else if (multiplyRegex.test(exp.match(testRegex))) {
      const matchOne = exp.match(multiplyRegex).join("");
      const resOne = exp.replace(matchOne, parseWithMultiplication(matchOne));
      return recurser(resOne);
    } else {
      const matchTwo = exp.match(divideRegex).join("");
      const resTwo = exp.replace(matchTwo, parseWithDivision(matchTwo));
      return recurser(resTwo);
    }
  };
  
  export const parseWithAddition = (exp) => {
    // memoiser would go here
    // order of operations: resolve expressions that include x or ÷ in string
    const newExp = recurser(exp);
    const expressionArr = newExp.split("+");
    // subtraction parser converts string entries to numbers while applying subtraction operation if necessary
    const convertedArr = expressionArr.map((x) => parseWithSubtraction(x));
    // leaving remaining characters to be added together
    return convertedArr.reduce((x, y) => x + y);
  };// export const calculate = (value) => {

//     const add = (x, y) => x + y;
//     const subtract = (x, y) => x - y;
//     const divide = (x, y) => y !== 0? x/y: "Cannot divide by 0!";
//     const multiply = (x, y) => x * y;

//     if(value === 1){
//         return add;
//     } else if(value === 2){
//         return subtract;
//     } else if (value === 3){
//         return divide;
//     } else if (value === 4){
//         return multiply;
//     } else return;
// }

// export default parseWithMultiplication = (entry) => {
//     const expressionArr = entry.split("*");
//     const convertedArr = expressionArr.map((x) => (Number(x)));
//     return convertedArr.reduce((x, y) => x * y, 1);  
// }

// export default parseWithDivison = (entry) => {
//     const expressionArr = entry.split("/");
//     const convertedArr = expressionArr.map((x) => this.parseWithMultiplication(x)); 
//     console.log(convertedArr);
//     return convertedArr.reduce((x, y) => x / y);  
// }

// export default parseWithSubtraction = (entry) => {
//     const expressionArr = entry.split("-");
//     const convertedArr = expressionArr.map((x) => this.parseWithDivison(x));
//     return convertedArr.reduce((x, y) => x - y);  
// }

// export default parseWithAddition = () => {
//     const expressionArr = this.state.expression.split("+");
//     // const convertedArr = expressionArr.map((x) => Number(x));
//     console.log(expressionArr);
//     const convertedArr = expressionArr.map((x) => this.parseWithSubtraction(x));
    
//     return convertedArr.reduce((x, y) => x + y, 0);  
// }

// calculateTotal(){
    //     let total = 0;
    //     let j = 0;
    //     for(let i = x.length - 1; i >= 0 ; i--){
    //         let result = parseInt(x[i]) ? "number": "NaN";
    //         if(result === "number"){
    //             total += x[i] * (10 ** j);
    //             j++;
    //         } else {
    //             result.push(total, x[i]);
    //             total = 0;
    //         }        
    //     }
    //     this.setState({answer: calculate(2)(5,6), textTotal: null});
    // }