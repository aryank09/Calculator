# Calculator

A basic calculator web app. Plain HTML, CSS and JavaScript, no build step, no dependencies.

## Run
Open `index.html` in a browser.

## Files
- `index.html` — page layout and the buttons.
- `style.css` — dark, phone-style look.
- `calculator.js` — logic: digits, + - × ÷, =, AC, ±, %, decimal, keyboard support.
- `README.md` — short description.

## Notes
- Division by zero shows "Error"; the next digit or AC resets it.
- Results are rounded to 12 significant digits to hide floating point noise (0.1 + 0.2 = 0.3).
- Before commit/push, follow the privacy check in the user's global CLAUDE.md.
