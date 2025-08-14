const TacoIngredients = {
    Meat: {
        chicken: { amount: 0.26, unit: "lbs" },
        beef: { amount: 0.26, unit: "lbs" },
        combo: [
            {name: "chicken", amount: 0.13, unit: "lbs"},
            {name: "beef", amount: 0.13, unit: "lbs"},
        ]
    },
    beans: {
        refried: { amount: .1125, unit: "lbs" },
        black: { amount: .1395, unit: "lbs"}
    },
    rice: {
        mexican: { amount: .1395, unit: "lbs" },
        white: { amount: .1395, unit: "lbs" }
    },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

function calculateTacoPortions({ meatKey, beanKey, riceKey, people }) {
  const a = Number(people || totalPeople || 0);
  const out = [];

  // Heading element (your displayPortions supports DOM nodes)
  const heading = document.createElement("h1");
  heading.textContent = `Taco Bar for ${a}`;
  out.push(heading);

  // --- Protein(s)
  const meatDef = TacoIngredients.Meat[meatKey];
  if (Array.isArray(meatDef)) {
    meatDef.forEach(m => {
      const qty = m.amount * a;
      out.push(`${m.name}: ${fmt(qty)} ${pluralize(m.unit, qty)}`);
    });
  } else {
    const qty = meatDef.amount * a;
    out.push(`${meatKey}: ${fmt(qty)} ${pluralize(meatDef.unit, qty)}`);
  }

  // --- Beans (nested choice)
  const b = TacoIngredients.beans[beanKey];
  {
    const qty = b.amount * a;
    out.push(`${beanKey} beans: ${fmt(qty)} ${pluralize(b.unit, qty)}`);
  }

  // --- Rice (nested choice)
  const r = TacoIngredients.rice[riceKey];
  {
    const qty = r.amount * a;
    out.push(`${riceKey} rice: ${fmt(qty)} ${pluralize(r.unit, qty)}`);
  }

  // --- Everything else (flat items)
  const skip = new Set(["Meat", "beans", "rice"]);
  for (const key in TacoIngredients) {
    if (skip.has(key)) continue;
    const { amount, unit } = TacoIngredients[key];
    const qty = amount * a;
    out.push(`${key}: ${fmt(qty)} ${pluralize(unitFor(key, unit), qty)}`);
  }

  // Hand off to your renderer/print
  displayPortions(out);
}

const FajitaIngredients = {
    Meat: {
        chicken: { amount: 0.28, unit: "lbs" },
        steak: { amount: 0.28, unit: "lbs" },
        combo: [
            {name: "chicken", amount: .14, unit: "lbs"},
            {name: "steak", amount: .14, unit: "lbs"}
        ]
    },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: {
        refried: { amount: .1125, unit: "lbs" },
        black: { amount: .1395, unit: "lbs"}
    },
    rice: {
        mexican: { amount: .1395, unit: "lbs" },
        white: { amount: .1395, unit: "lbs" }
    },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};


function calculateFajitaPortions({ meatKey, beanKey, riceKey, people }) {
  const a = Number(people || 0);
  const out = [];

  const heading = document.createElement("h1");
  heading.textContent = `Fajita Bar for ${a}`;
  out.push(heading);

  // Protein(s)
  const meatDef = FajitaIngredients.Meat[meatKey];
  if (Array.isArray(meatDef)) {
    meatDef.forEach(m => {
      const qty = m.amount * a;
      out.push(`${m.name}: ${fmt(qty)} ${pluralize(m.unit, qty)}`);
    });
  } else {
    const qty = meatDef.amount * a;
    out.push(`${meatKey}: ${fmt(qty)} ${pluralize(meatDef.unit, qty)}`);
  }

  // Beans
  const b = FajitaIngredients.beans[beanKey];
  {
    const qty = b.amount * a;
    out.push(`${beanKey} beans: ${fmt(qty)} ${pluralize(b.unit, qty)}`);
  }

  // Rice
  const r = FajitaIngredients.rice[riceKey];
  {
    const qty = r.amount * a;
    out.push(`${riceKey} rice: ${fmt(qty)} ${pluralize(r.unit, qty)}`);
  }

  // Everything else (skip nested keys)
  const skip = new Set(["Meat", "beans", "rice"]);
  for (const key in FajitaIngredients) {
    if (skip.has(key)) continue;
    const { amount, unit } = FajitaIngredients[key];
    const qty = amount * a;
    out.push(`${key}: ${fmt(qty)} ${pluralize(unitFor(key, unit), qty)}`);
  }

  displayPortions(out); // uses your existing renderer + print button
}

function buildExtrasSection(parentEl) {
  const extrasWrap = document.createElement("div");
  extrasWrap.className = "mt-3";

  const label = document.createElement("label");
  label.textContent = "Extra Items (one per line):";
  label.className = "form-label";

  const textarea = document.createElement("textarea");
  textarea.id = "extraItems";
  textarea.className = "form-control";
  textarea.rows = 3;
  textarea.placeholder = "Example:\nQueso - 2 pints w/chips\nServing Utensils";

  extrasWrap.appendChild(label);
  extrasWrap.appendChild(textarea);
  parentEl.appendChild(extrasWrap);
}

function ensurePrintStyles() {
  if (document.getElementById("print-shared-styles")) return;
  const style = document.createElement("style");
  style.id = "print-shared-styles";
  style.textContent = `
    /* card + grid (screen) */
    #results { display: block; }
    .card { border: 1px solid #ccc; border-radius: 8px; padding: 16px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .print-inner-grid { display: grid; grid-template-columns: 3fr auto; gap: 20px; align-items: start; }
    .ingredients-col h1, .ingredients-col h2, .ingredients-col h3 { margin: 0 0 12px; }
    .ingredients-col ul, .extras-col ul { margin: 0; padding-left: 18px; }
    .ingredients-col li, .extras-col li { margin: 4px 0; }
    .section-title { margin: 0 0 10px; font-size: 1rem; font-weight: 600; }
    .checklist { list-style: none; margin: 0; padding: 0;}
    .checklist li { display: flex; align-items: flex-start; gap: 8px; margin: 4px 0; }
    .checklist .box { width: 20px; height: 20px; border: 1px solid #000; flex-shrink: 0; }
    .checklist .item-text { flex: 1; }


    /* make the extras column not eat space */
    .extras-col { justify-self: start; }

    @media (max-width: 768px) {
      .print-inner-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}

// helper: build a UL from strings
function buildStaticChecklist(lines) {
  const ul = document.createElement("ul");
  ul.className = "checklist";

  lines.forEach(txt => {
    const li = document.createElement("li");

    // Empty square — purely decorative
    const box = document.createElement("span");
    box.className = "box";

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = txt;

    li.appendChild(box);
    li.appendChild(span);
    ul.appendChild(li);
  });

  return ul;
}

// 2) SCREEN: single card with two columns inside
function displayPortions(resultsArray) {
  ensurePrintStyles();

  if (!resultsArray || !resultsArray.length) {
    resultsDiv.style.display = "none";
    return;
  }
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = "";

  // Read extras (one per line) from your textarea, if present
  const extrasText = document.querySelector("#extraItems")?.value.trim() || "";
  const extrasLines = extrasText
    ? extrasText.split("\n").map(s => s.trim()).filter(Boolean)
    : [];

  // Build the card with inner grid
  const card = document.createElement("div");
  card.className = "card print-card";

  const grid = document.createElement("div");
  grid.className = "print-inner-grid";

  // LEFT column (ingredients)
  const left = document.createElement("div");
  left.className = "ingredients-col";

  // If your resultsArray includes a <h1> element first, keep it above the list
  const nonStrings = resultsArray.filter(el => typeof el !== "string");
  const stringsOnly = resultsArray.filter(el => typeof el === "string");

  if (nonStrings.length) {
    nonStrings.forEach(node => left.appendChild(node)); // e.g., your <h1> "Taco Bar for N"
  }

  const leftTitle = document.createElement("div");
  leftTitle.className = "section-title";
  leftTitle.textContent = "Ingredients";
  left.appendChild(leftTitle);

  left.appendChild(buildStaticChecklist(stringsOnly));

  // RIGHT column (extras)
  const right = document.createElement("div");
  right.className = "extras-col";

  const rightTitle = document.createElement("div");
  rightTitle.className = "section-title";
  rightTitle.textContent = "Extra Items";
  right.appendChild(rightTitle);

    if (extrasLines.length) {
      right.appendChild(buildStaticChecklist(extrasLines));
    } else {
      const p = document.createElement("p");
      p.className = "text-muted";
      p.textContent = "— none —";
      right.appendChild(p);
    }

  grid.appendChild(left);
  grid.appendChild(right);
  card.appendChild(grid);

  resultsDiv.appendChild(card);

  // Print button
  const printBtn = document.createElement("button");
  printBtn.textContent = "🖨️ Print Portions";
  printBtn.className = "btn btn-primary mt-3";
  printBtn.addEventListener("click", () => printResultsOnly("results"));
  resultsDiv.appendChild(printBtn);
}

// 3) PRINT: clone the single card and print two copies per Letter page
function printResultsOnly(elementId) {
  const node = document.getElementById(elementId).cloneNode(true);

  // Strip any buttons in the print copy
  node.querySelectorAll("button").forEach(btn => btn.remove());

  const content = node.innerHTML;
  const w = window.open("", "", "height=800,width=1000");

  w.document.write(`
    <html>
      <head>
        <title>Print Portions</title>
        <style>
          @page { size: Letter portrait; margin: 0.5in; }
          :root {
            --gap: 0.2in;
            --card-pad: 0.15in;
            --sheet-gap: 0.25in;
            --fs: 18px;
          }
          * { box-sizing: border-box; }
          body {
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            font-size: var(--fs);
            line-height: 1.25;
            margin: 0;
          }
          .sheet { margin: 0 0 var(--sheet-gap) 0; page-break-inside: avoid; break-inside: avoid; }
          .card { border: 1px solid #bbb; border-radius: 6px; padding: var(--card-pad); page-break-inside: avoid; break-inside: avoid; }
          .print-inner-grid { display: grid; grid-template-columns: 3fr auto; gap: var(--gap); align-items: start; }
          .ingredients-col h1, .ingredients-col h2, .ingredients-col h3 { margin: 0 0 10px; line-height: 1.2; }
          ul { margin: 0; padding-left: 0.18in; }
          li { margin: 2px 0; }
          .extras-col { justify-self: start; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
                .checklist { list-style: none; margin: 0; padding: 0;}
    .checklist li { display: flex; align-items: flex-start; gap: 8px; margin: 4px 0; }
    .checklist .box { width: 15px; height: 15px; border: 1px solid #000; flex-shrink: 0; }
    .checklist .item-text { flex: 1; }
        </style>
      </head>
      <body>
        <div class="sheet">
          ${content}
        </div>
        <div class="sheet">
          ${content}
        </div>
      </body>
    </html>
  `);

  w.document.close();
  w.focus();
  w.print();
  w.close();
}