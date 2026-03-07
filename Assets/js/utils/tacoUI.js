function unitFor(key, unit) { return unit && unit.length ? unit : (key === "tortillas" ? "pieces" : ""); }
function fmt(n) { const x = Number(n); return Number.isInteger(x) ? String(x) : x.toFixed(2); }
function pluralize(unit, qty) {
  if (!unit) return "";
  const n = Number(qty);
  if (Number.isNaN(n)) return unit;
  if (unit === "pieces") return n === 1 ? "piece" : "pieces";
  if (unit === "bags")   return n === 1 ? "bag"   : "bags";
  if (unit.includes("container")) return n === 1 ? unit : unit + "s";
  return unit;
}

// Pretty labels for selects
const labelMap = {
  meat: { chicken: "Chicken", beef: "Ground Beef", combo: "Combo" },
  beans: { refried: "Refried Beans", black: "Black Beans", combo: "Combo" },
  rice: { mexican: "Mexican Rice", white: "White Rice", combo: "Combo" }
};

function buildTacoUI() {
  optionsDiv.innerHTML = "";
  resultsDiv.innerHTML = "";

  // Meat select
  const meatLabel = document.createElement("label");
  meatLabel.textContent = "Choose your protein:";
  const meatSelect = document.createElement("select");
  Object.keys(TacoIngredients.Meat).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'chicken' | 'beef' | 'combo'
    opt.textContent = labelMap.meat[k] || k;
    meatSelect.appendChild(opt);
  });

  // Bean select
  const beanLabel = document.createElement("label");
  beanLabel.textContent = "Choose your beans:";
  const beanSelect = document.createElement("select");
  Object.keys(TacoIngredients.beans).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'refried' | 'black' | 'combo'
    opt.textContent = labelMap.beans[k] || k;
    beanSelect.appendChild(opt);
  });

  // Rice select
  const riceLabel = document.createElement("label");
  riceLabel.textContent = "Choose your rice:";
  const riceSelect = document.createElement("select");
  Object.keys(TacoIngredients.rice).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'mexican' | 'white' | 'combo'
    opt.textContent = labelMap.rice[k] || k;
    riceSelect.appendChild(opt);
  });

  // People input
  const headLabel = document.createElement("label");
  headLabel.textContent = "How many people?";
  const headCount = document.createElement("input");
  headCount.type = "number";
  headCount.min = "1";
  headCount.placeholder = "e.g. 25";

  
  
  // Calculate button
  const calcBtn = document.createElement("button");
  calcBtn.textContent = "Get Portions";

  // Append controls (nice order)
  [
    meatLabel, meatSelect,
    beanLabel, beanSelect,
    riceLabel, riceSelect,
    headLabel, headCount,
    calcBtn
  ].forEach(el => optionsDiv.appendChild(el));


  // Click => compute & display
  calcBtn.addEventListener("click", () => {
    const people = Number(headCount.value);
    if (!people || people <= 0) {
      displayPortions(["Please enter a valid number of people."]);
      return;
    }
    totalPeople = people; // keep in sync with your global (used in your calc fn)

    calculateTacoPortions({
      meatKey: meatSelect.value,
      beanKey: beanSelect.value,
      riceKey: riceSelect.value,
      people
    });
  });
}


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
        black: { amount: .1395, unit: "lbs"},
        combo: [
            {name: "refried", amount: .05625, unit: "lbs"},
            {name: "black", amount: .06975, unit: "lbs"}
        ]
    },
    rice: {
        mexican: { amount: .1395, unit: "lbs" },
        white: { amount: .1395, unit: "lbs" },
        combo: [
            {name: "mexican", amount: .06975, unit: "lbs"},
            {name: "white", amount: .06975, unit: "lbs"}
        ] 
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
  if (Array.isArray(b)) {
    b.forEach(m => {
      const qty = m.amount * a;
      out.push(`${m.name} beans: ${fmt(qty)} ${pluralize(m.unit, qty)}`);
    });
  } else {
    const qty = b.amount * a;
    out.push(`${beanKey} beans: ${fmt(qty)} ${pluralize(b.unit, qty)}`);
  }

  // --- Rice (nested choice)
  const r = TacoIngredients.rice[riceKey];
  if (Array.isArray(r)) {
    r.forEach(m => {
      const qty = m.amount * a;
      out.push(`${m.name} rice: ${fmt(qty)} ${pluralize(m.unit, qty)}`);
    });
  } else {
    const qty = r.amount * a;
    out.push(`${riceKey} rice: ${fmt(qty)} ${pluralize(r.unit, qty)}`);
  }
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
