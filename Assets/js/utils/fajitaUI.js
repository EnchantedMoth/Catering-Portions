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

const fajitaLabelMap = {
  meat:   { chicken: "Chicken", steak: "Steak", combo: "Combo" },
  beans:  { refried: "Refried Beans", black: "Black Beans" },
  rice:   { mexican: "Mexican Rice",  white: "White Rice" }
};

function buildFajitaUI() {
  optionsDiv.innerHTML = "";
  resultsDiv.innerHTML = "";

  // Meat select
  const meatLabel = document.createElement("label");
  meatLabel.textContent = "Choose your protein:";
  const meatSelect = document.createElement("select");
  Object.keys(FajitaIngredients.Meat).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'chicken' | 'steak' | 'combo'
    opt.textContent = fajitaLabelMap.meat[k] || k;
    meatSelect.appendChild(opt);
  });

  // Bean select
  const beanLabel = document.createElement("label");
  beanLabel.textContent = "Choose your beans:";
  const beanSelect = document.createElement("select");
  Object.keys(FajitaIngredients.beans).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'refried' | 'black'
    opt.textContent = fajitaLabelMap.beans[k] || k;
    beanSelect.appendChild(opt);
  });

  // Rice select
  const riceLabel = document.createElement("label");
  riceLabel.textContent = "Choose your rice:";
  const riceSelect = document.createElement("select");
  Object.keys(FajitaIngredients.rice).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; // 'mexican' | 'white'
    opt.textContent = fajitaLabelMap.rice[k] || k;
    riceSelect.appendChild(opt);
  });

  // People
  const headLabel = document.createElement("label");
  headLabel.textContent = "How many people?";
  const headCount = document.createElement("input");
  headCount.type = "number";
  headCount.min = "1";
  headCount.placeholder = "e.g. 25";
  
  // Calculate
  const calcBtn = document.createElement("button");
  calcBtn.textContent = "Get Portions";

  // Append controls
  [
    meatLabel, meatSelect,
    beanLabel, beanSelect,
    riceLabel, riceSelect,
    headLabel, headCount,
    calcBtn
  ].forEach(el => optionsDiv.appendChild(el));

  // Click => compute
  calcBtn.addEventListener("click", () => {
    const people = Number(headCount.value);
    if (!people || people <= 0) {
      displayPortions(["Please enter a valid number of people."]);
      return;
    }
    calculateFajitaPortions({
      meatKey:  meatSelect.value,
      beanKey:  beanSelect.value,
      riceKey:  riceSelect.value,
      people
    });
  });
}