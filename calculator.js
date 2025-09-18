// Simple JavaScript Calculator (prompts + document.write)
(function () {
  const rows = [];   // all results
  const valid = [];  // valid numeric results only

  while (true) {
    // Prompt user for inputs
    let xRaw = prompt("Enter the first number (x):");
    if (xRaw === null) break;

    let op = prompt("Enter an operator: +  -  *  /  %");
    if (op === null) break;

    let yRaw = prompt("Enter the second number (y):");
    if (yRaw === null) break;

    let x = Number(xRaw);
    let y = Number(yRaw);

    let result;
    let isError = false;

    // Validate numbers
    if (isNaN(x) || isNaN(y)) {
      result = "Error: x and y must be numbers.";
      isError = true;
    } else {
      // Compute result
      switch (op) {
        case "+": result = x + y; break;
        case "-": result = x - y; break;
        case "*": result = x * y; break;
        case "/": 
          if (y === 0) { result = "Error: Division by zero."; isError = true; }
          else result = x / y;
          break;
        case "%": 
          if (y === 0) { result = "Error: Modulus by zero."; isError = true; }
          else result = x % y;
          break;
        default:
          result = `Error: Invalid operator "${op}".`;
          isError = true;
      }

      // Save valid results for summary
      if (!isError && isFinite(result)) valid.push(result);
    }

    // Build row HTML
    rows.push(
      `<tr class="${isError ? "error" : ""}">
         <td>${isNaN(x) ? xRaw : x}</td>
         <td>${op}</td>
         <td>${isNaN(y) ? yRaw : y}</td>
         <td>${result}</td>
       </tr>`
    );
  }

  // Write main results table
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

  // Write summary table
  let min = "-", max = "-", avg = "-", total = "-";
  if (valid.length > 0) {
    total = valid.reduce((a, b) => a + b, 0);
    min = Math.min(...valid);
    max = Math.max(...valid);
    avg = total / valid.length;
  }

  document.write('<table>');
  document.write('<caption>Summary <span class="pill">valid results only</span></caption>');
  document.write('<thead><tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr></thead>');
  document.write(`<tbody><tr><td>${min}</td><td>${max}</td><td>${avg}</td><td>${total}</td></tr></tbody>`);
  document.write('</table>');
  document.write('</div>');
})();
