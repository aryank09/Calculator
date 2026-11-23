const display = document.getElementById("display");

let current = "0";      // number being typed
let previous = null;    // stored left-hand number
let operator = null;    // pending operator
let justEvaluated = false;

function compute(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? NaN : a / b;
  }
  return b;
}

function format(value) {
  if (!Number.isFinite(value)) return "Error";
  // Trim floating point noise like 0.1 + 0.2
  return String(parseFloat(value.toPrecision(12)));
}

function render() {
  display.textContent = current;
}

function inputDigit(d) {
  if (justEvaluated || current === "Error") {
    current = "0";
    justEvaluated = false;
  }
  current = current === "0" ? d : current + d;
}

function inputDecimal() {
  if (justEvaluated || current === "Error") {
    current = "0";
    justEvaluated = false;
  }
  if (!current.includes(".")) current += ".";
}

function chooseOperator(op) {
  if (current === "Error") return;
  if (operator && !justEvaluated) {
    current = format(compute(parseFloat(previous), parseFloat(current), operator));
  }
  previous = current;
  operator = op;
  justEvaluated = true; // next digit starts a new number
}

function equals() {
  if (!operator || current === "Error") return;
  current = format(compute(parseFloat(previous), parseFloat(current), operator));
  previous = null;
  operator = null;
  justEvaluated = true;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  justEvaluated = false;
}

function toggleSign() {
  if (current === "Error" || current === "0") return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
}

function percent() {
  if (current === "Error") return;
  current = format(parseFloat(current) / 100);
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit) inputDigit(btn.dataset.digit);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "decimal") inputDecimal();
  else if (btn.dataset.action === "equals") equals();
  else if (btn.dataset.action === "clear") clearAll();
  else if (btn.dataset.action === "sign") toggleSign();
  else if (btn.dataset.action === "percent") percent();

  render();
});

document.addEventListener("keydown", (e) => {
  if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
  else if ("+-*/".includes(e.key)) chooseOperator(e.key);
  else if (e.key === "." ) inputDecimal();
  else if (e.key === "Enter" || e.key === "=") equals();
  else if (e.key === "Backspace" || e.key === "Escape") clearAll();
  else return;
  render();
});
