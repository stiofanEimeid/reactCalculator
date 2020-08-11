export const parseWithSubtraction = (entry) => {
  // Replace all instances of "-" if they are not preceded by an e
  // in order to accommdodate scientific notation.
  const regex = /(?<!e)-/g;
  const cleanedExp = entry.replace(regex, "!");
  // Split string and apply relevant operator to each element with reducer.
  const expressionArr = cleanedExp.split("!");
  const convertedArr = expressionArr.map((x) => Number(x));
  return convertedArr.reduce((x, y) => x - y);
};

export const parseWithMultiplication = (entry) => {
  const expressionArr = entry.split("x");
  const convertedArr = expressionArr.map((x) => Number(x));
  return convertedArr.reduce((x, y) => x * y, 1);
};

export const parseWithDivision = (entry) => {
  const expressionArr = entry.split("Ã·");
  const convertedArr = expressionArr.map((x) => Number(x));
  return convertedArr.reduce((x, y) => x / y);
};

// Handles order of precedence
export const orderOfPre = (exp) => {
  // Allows for a signed or unsigned operand of variable length,
  // in scientific notation or otherwise, followed by the division operator,
  // followed by a signed or unsigned oeprand of variable length,
  // again in scientific notation or otherwise.
  const testRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[xÃ·][-]*[\d|.]+(?:[e][+-]\d+)?/g;
  const multiplyRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x][-]*[\d|.]+(?:[e][+-]\d+)?/g;
  const divideRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[Ã·][-]*[\d|.]+(?:[e][+-]\d+)?/g;

  if (!testRegex.test(exp)) {
    return exp;
    // Determine what sort of operation came first and apply correct procedure.
  } else if (multiplyRegex.test(exp.match(testRegex))) {
    const matchOne = exp.match(multiplyRegex)[0];
    const resOne = exp.replace(matchOne, parseWithMultiplication(matchOne));
    return orderOfPre(resOne);
  } else {
    const matchTwo = exp.match(divideRegex)[0];
    const resTwo = exp.replace(matchTwo, parseWithDivision(matchTwo));
    return orderOfPre(resTwo);
  }
};

export const parseWithAddition = (exp) => {
  // Must handle multiple operands appearing in a row
  // before being passed to orderOfPre() to avoid errors.
  // Note: not exhaustive of possible combinations. See test file
  // for examples.
  const newExp = orderOfPre(
    exp
      .replace(/(?<=x)\+{1,}/g, "")
      .replace(/(?<=Ã·)\+{1,}/g, "")
      .replace(/(?<=x)-{2}/g, "")
      .replace(/(?<=Ã·)-{2}/g, "")
      .replace(/-{2}/g, "+")
      .replace(/"-+"|"+-"/g, "-")
  );
  const regex = /(?<!e)\+/g;
  // Replace any minuses that appear twice in a row with pluses
  // before replacing any pluses not involved in scientific notation.
  const cleanedExp = newExp.replace(regex, "!");
  const expressionArr = cleanedExp.split("!");
  const convertedArr = expressionArr.map((x) => parseWithSubtraction(x));
  return convertedArr.reduce((x, y) => x + y);
};
// export const parseWithSubtraction = (entry) => {
//     // const expressionArr = entry.split("-");
//     const regex = /(?<!e)-/g;
//     const cleanedExp = entry.replace(regex, "!")
//     const expressionArr = cleanedExp.split("!");
//     const convertedArr = expressionArr.map((x) => Number(x));
//     return convertedArr.reduce((x, y) => x - y);
//   };
  
//   export const parseWithMultiplication = (entry) => {
//     const expressionArr = entry.split("x");
//     const convertedArr = expressionArr.map((x) => Number(x));
//     return convertedArr.reduce((x, y) => x * y, 1);
//   };
  
//   export const parseWithDivision = (entry) => {
//     const expressionArr = entry.split("÷");
//     const convertedArr = expressionArr.map((x) => Number(x));
//     return convertedArr.reduce((x, y) => x / y);
//   };
  
//   // handles order of precedence
  
//   export const recurser = (exp) => {
//     // memoisation?
//     // stop with first match
//     // allows for a signed or unsigned operand of variable length, followed by the division operator, followed by a signed or unsigned oeprand of variable length
//     // const testRegex = /[-]*[\d|.]+[x|÷][-]*[\d|.]+/;
//     // const multiplyRegex = /[-]*[\d|.]+[x][-]*[\d|.]+/;
//     // const divideRegex = /[-]*[\d|.]+[÷][-]*[\d|.]+/;
//     // const testRegex = /[-]*[\d|.]+[e]*[+|-]*[\d|.]*[x|÷][-]*[\d|.]+[e]*[+|-]*[\d|.]*/;
//     // const multiplyRegex = /[-]*[\d|.]+[e]*[+|-]*[\d|.]*[x][-]*[\d|.]+[e]*[+|-]*[\d|.]*/;
//     // const divideRegex = /[-]*[\d|.]+[e]*[+|-]*[\d|.]*[÷][-]*[\d|.]+[e]*[+|-]*[\d|.]*/;
//      // const testRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x|÷][-]*[\d|.]+/g;
//     // const multiplyRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x][-]*[\d|.]+/g;
//     // const divideRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[÷][-]*[\d|.]+/g;
//     const testRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x|÷][-]*[\d|.]+(?:[e][+-]\d+)?/g;
//     const multiplyRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x][-]*[\d|.]+(?:[e][+-]\d+)?/g;
//     const divideRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[÷][-]*[\d|.]+(?:[e][+-]\d+)?/g;
  
//     if (!testRegex.test(exp)) {
//       return exp;
  
//       // determine what sort of operation came first and apply correct procedure
//     } else if (multiplyRegex.test(exp.match(testRegex))) {
//       const matchOne = exp.match(multiplyRegex).join("");
//       const resOne = exp.replace(matchOne, parseWithMultiplication(matchOne));
//       return recurser(resOne);
//     } else {
//       const matchTwo = exp.match(divideRegex).join("");
//       const resTwo = exp.replace(matchTwo, parseWithDivision(matchTwo));
//       return recurser(resTwo);
//     }
//   };
  
//   export const parseWithAddition = (exp) => {
//     // memoiser would go here
//     // order of operations: resolve expressions that include x or ÷ in string
//     const newExp = recurser(exp);
//     // const expressionArr = newExp.split("+"); d
//     const cleanedExp = newExp.replace(/(?<!e)\+/g, "!")
//     const expressionArr = cleanedExp.split("!");
//     // subtraction parser converts string entries to numbers while applying subtraction operation if necessary
//     const convertedArr = expressionArr.map((x) => parseWithSubtraction(x));
//     // leaving remaining characters to be added together
//     return convertedArr.reduce((x, y) => x + y);
//   };// export const calculate = (value) => {

// //     const add = (x, y) => x + y;
// //     const subtract = (x, y) => x - y;
// //     const divide = (x, y) => y !== 0? x/y: "Cannot divide by 0!";
// //     const multiply = (x, y) => x * y;

// //     if(value === 1){
// //         return add;
// //     } else if(value === 2){
// //         return subtract;
// //     } else if (value === 3){
// //         return divide;
// //     } else if (value === 4){
// //         return multiply;
// //     } else return;
// // }

// // export default parseWithMultiplication = (entry) => {
// //     const expressionArr = entry.split("*");
// //     const convertedArr = expressionArr.map((x) => (Number(x)));
// //     return convertedArr.reduce((x, y) => x * y, 1);  
// // }

// // export default parseWithDivison = (entry) => {
// //     const expressionArr = entry.split("/");
// //     const convertedArr = expressionArr.map((x) => this.parseWithMultiplication(x)); 
// //     console.log(convertedArr);
// //     return convertedArr.reduce((x, y) => x / y);  
// // }

// // export default parseWithSubtraction = (entry) => {
// //     const expressionArr = entry.split("-");
// //     const convertedArr = expressionArr.map((x) => this.parseWithDivison(x));
// //     return convertedArr.reduce((x, y) => x - y);  
// // }

// // export default parseWithAddition = () => {
// //     const expressionArr = this.state.expression.split("+");
// //     // const convertedArr = expressionArr.map((x) => Number(x));
// //     console.log(expressionArr);
// //     const convertedArr = expressionArr.map((x) => this.parseWithSubtraction(x));
    
// //     return convertedArr.reduce((x, y) => x + y, 0);  
// // }

// // calculateTotal(){
//     //     let total = 0;
//     //     let j = 0;
//     //     for(let i = x.length - 1; i >= 0 ; i--){
//     //         let result = parseInt(x[i]) ? "number": "NaN";
//     //         if(result === "number"){
//     //             total += x[i] * (10 ** j);
//     //             j++;
//     //         } else {
//     //             result.push(total, x[i]);
//     //             total = 0;
//     //         }        
//     //     }
//     //     this.setState({answer: calculate(2)(5,6), textTotal: null});
//     // }