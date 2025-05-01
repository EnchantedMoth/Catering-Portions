const chickenTacoIngredients = {
    chicken: { amount: 0.3, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

const beefTacoIngredients = {
    beef: { amount: 0.3, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

const comboTacoIngredients = {
    chicken: { amount: 0.15, unit: "lbs" },
    beef: { amount: 0.15, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

function calculateTacoPortions (ingredientSet) {
    
    let a = parseInt(totalPeople)
    const output = [];
    output.push(`Taco Bar for ${a}`)

        for (let ingredient in ingredientSet) {
            let { amount, unit } = ingredientSet[ingredient];
            let totalAmount = (amount * a).toFixed(2);
            output.push(`${ingredient}: ${totalAmount} ${unit}`)
        }
    
        

        displayPortions(output);

    console.log(totalPeople)
    console.log("taco success")
}

const chickenFajitaIngredients = {
    chicken: { amount: 0.33, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

const steakFajitaIngredients = {
    steak: { amount: 0.33, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

const comboFajitaIngredients = {
    steak: { amount: 0.165, unit: "lbs" },
    chicken: { amount: 0.165, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: .1469, unit: "lbs" },
    rice: { amount: .1125, unit: "lbs" },
    tortillas: { amount: 2, unit: "" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .1, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

function calculateFajitaPortions (ingredientSet) {
    let a = parseInt(totalPeople)
    const output = [];
    output.push(`Fajita Bar for ${a}`)

    for (let ingredient in ingredientSet) {
        let { amount, unit } = ingredientSet[ingredient];
        let totalAmount = (amount * a).toFixed(2);
        output.push(`${ingredient}: ${totalAmount} ${unit}`);
    }

    displayPortions(output);
}

//this is where I left off
function displayPortions (resultsArray){
    resultsDiv.innerHTML = ""

    resultsArray.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        resultsDiv.appendChild(p);
    });

    const printBtn = document.createElement("button");
    printBtn.textContent = "🖨️ Print Portions";
    printBtn.classList.add("btn", "btn-print"); // optional class for styling
    printBtn.addEventListener("click", function () {
        printResultsOnly("results");
    });

    resultsDiv.appendChild(printBtn);
}

function printResultsOnly(elementId) {
    const content = document.getElementById(elementId).innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write('<html><head><title>Print Portions</title>');
    printWindow.document.write('<style>body{font-family:sans-serif; padding:20px;} p{margin:0 0 10px;} button{display:none;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}