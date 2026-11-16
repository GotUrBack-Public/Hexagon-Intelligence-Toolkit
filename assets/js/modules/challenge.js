const tasks = [
  [3, 8, "+"], [7, 4, "+"], [9, 6, "+"], [12, 5, "+"],
  [18, 7, "-"], [16, 8, "-"], [14, 6, "-"], [19, 5, "-"],
  [2, 4, "×"], [3, 5, "×"], [4, 4, "×"], [6, 3, "×"]
];

export function createChallenge() {
  const [a, b, operator] = tasks[Math.floor(Math.random() * tasks.length)];
  const answer = operator === "+" ? a + b : operator === "-" ? a - b : a * b;
  return { question: a + " " + operator + " " + b + " = ?", answer };
}
