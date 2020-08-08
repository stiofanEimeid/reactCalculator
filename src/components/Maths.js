export const calculate = (value) => {

    const add = (x, y) => x + y;
    const subtract = (x, y) => x - y;
    const divide = (x, y) => y !== 0? x/y: "Cannot divide by 0!";
    const multiply = (x, y) => x * y;

    if(value === 1){
        return add;
    } else if(value === 2){
        return subtract;
    } else if (value === 3){
        return divide;
    } else if (value === 4){
        return multiply;
    } else return;
}

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