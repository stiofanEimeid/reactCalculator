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
  const expressionArr = entry.split("÷");
  const convertedArr = expressionArr.map((x) => Number(x));
  return convertedArr.reduce((x, y) => x / y);
};

// Handles order of precedence
export const orderOfPre = (exp) => {
  // Allows for a signed or unsigned operand of variable length,
  // in scientific notation or otherwise, followed by the division operator,
  // followed by a signed or unsigned oeprand of variable length,
  // again in scientific notation or otherwise.
  const testRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x÷][-]*[\d|.]+(?:[e][+-]\d+)?/g;
  const multiplyRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[x][-]*[\d|.]+(?:[e][+-]\d+)?/g;
  const divideRegex = /[-]*[\d|.]+(?:[e][+-]\d+)?[÷][-]*[\d|.]+(?:[e][+-]\d+)?/g;

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
      .replace(/(?<=÷)\+{1,}/g, "")
      .replace(/(?<=x)-{2}/g, "")
      .replace(/(?<=÷)-{2}/g, "")
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