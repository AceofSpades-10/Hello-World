// Pretty calculator (prompt + document.write) — meets assignment spec
(function () {
  /* ---------- helpers ---------- */
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 });
  function show(v){ return (typeof v === "number" && Number.isFinite(v)) ? fmt.format(v) : String(v); }

  function parseNumber(input) {
    if (input === "" || input === null) return { ok: false, value: NaN };
    const n = Number(input);
    return { ok: !Number.isNaN(n), value: n };
  }

  function compute(x, op, y) {
    const allowed = ["+", "-", "*", "/", "%"];
    if (!allowed.includes(op)) return { error: `Invalid operator "${op}". Use +, -, *, /, %.` };
    if ((op === "/" || op === "%") && y === 0) return { error: "Division/Modulus by zero is not allowed." };

    switch (op) {
      case "+": return { value: x + y };
      case "-": return { value: x - y };
      case "*": return { value: x * y };
      case "/": return { value: x / y };
      case "%": return { value: x % y };
      default:  return { error: "Unexpected operator." };
    }
  }

  /* ---------- gather rows ---------- */
  const rows = [];
  const valid = [];

  while (true) {
    const xRaw = prompt("Enter the first number (x):");
    if (xRaw === null) break;

    const opRaw = prompt('Enter an operator: +  -  *  /  %');
    if (opRaw === null) break;
    const operator = (opRaw || "").trim();

    const yRaw = prompt("Enter the second number (y):");
    if (yRaw === null) break;

    const xP = parseNumber(xRaw);
    const yP = parseNumber(yRaw);

    let display = "";
    let isError = false;

    if (!xP.ok || !yP.ok) {
      display = "Error: x and y must be numbers.";
      isError = true;
    } else {
      const out = compute(xP.value, operator, yP.value);
      if ("error" in out) { display = "Error: " + out.error; isError = true; }
      else {
        display = show(out.value);
        if (Number.isFinite(out.value)) valid.push(out.value);
        else { display = "Error: Non-finite result."; isError = true; }
      }
    }

    rows.push(
      `<tr class="${isError ? "error" : ""}">
         <td>${xP.ok ? show(xP.value) : xRaw}</td>
         <td>${operator}</td>
         <td>${yP.ok ? show(yP.value) : yRaw}</td>
         <td>${display}</td>
       </tr>`
    );
  }

  /* ---------- write results table ---------- */
  document.write('<div class="wrap">');
  document.write('<table>');
  document.write('<caption>Calculation Results <span class="pill">session</span></caption>');
  document.write('<thead><tr><th>X</th><th>Operator</th><th>Y</th><th>Result</th></tr></thead>');
  document.write('<tbody>');
  if (rows.length === 0) {
    document.write('<tr><td colspan="4" class="muted">No calculations were entered.</td></tr>');
  } else {
    document.write(rows.join(""));
  }
  document.write('</tbody></table>');

  /* ---------- summary from valid results ---------- */
  let min = "-", max = "-", avg = "-", total = "-";
  if (valid.length > 0) {
    total = valid.reduce((a, b) => a + b, 0);
    min = Math.min(...valid);
    max = Math.max(...valid);
    avg = total / valid.length;

    min = show(min);
    max = show(max);
    avg = show(avg);
    total = show(total);
  }

  document.write('<table>');
  document.write('<caption>Summary <span class="pill">valid results only</span></caption>');
  document.write('<thead><tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr></thead>');
  document.write(`<tbody><tr><td>${min}</td><td>${max}</td><td>${avg}</td><td>${total}</td></tr></tbody>`);
  document.write('</table>');
  document.write('</div>');
})();
