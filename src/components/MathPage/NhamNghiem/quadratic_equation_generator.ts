export type QuadraticProblem = {
  eq: string;
  answer: QuadraticAnswerType;
};

export type QuadraticAnswerType =
  | TwoQuadraticAnswer
  | OneQuadraticAnswer
  | UNREAL;
export type TwoQuadraticAnswer = { answer1: number; answer2: number };
export type OneQuadraticAnswer = number;
export type UNREAL = "unreal";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function get_square_x(multiplier: number): string {
  return `${multiplier}x^{2}`;
}

function get_x(multiplier: number, sum: number): string {
  const coefficient = multiplier * sum * -1; // Quadratic equation is: x^2 - Sx +P
  let sign = "";

  if (coefficient == 0) {
    return "";
  }

  if (coefficient > 0) {
    sign = "+";
  }

  return `${sign}${coefficient}x`;
}

function get_constant(multiplier: number, product: number): string {
  const constant = multiplier * product;
  let sign = "";

  if (constant == 0) {
    return "";
  }
  if (constant > 0) {
    sign = "+";
  }
  return `${sign}${constant}`;
}

export function get_problem(): QuadraticProblem {
  const multiplier = getRandomInt(1, 3);
  const square_x = get_square_x(multiplier);

  const answer1 = getRandomInt(0, 10);
  const answer2 = getRandomInt(0, 10);
  const sum = answer1 + answer2;
  const product = answer1 * answer2;

  const x = get_x(multiplier, sum);
  const constant = get_constant(multiplier, product);

  const eq = `${square_x}${x}${constant}`;
  let answer: QuadraticAnswerType;

  if (answer1 == answer2) {
    answer = answer1;
  } else if (answer1 != answer2) {
    answer = { answer1, answer2 };
  } else {
    answer = "unreal";
  }

  return {
    eq,
    answer,
  };
}
