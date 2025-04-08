const chickenTacoIngredients = {
    chicken: { amount: 0.3, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

const beefTacoIngredients = {
    beef: { amount: 0.3, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

const comboTacoIngredients = {
    chicken: { amount: 0.15, unit: "lbs" },
    beef: { amount: 0.15, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" }
};

function calculateTacoPortions (ingredientSet) {
    
    let a = parseInt(totalPeople)
    
        for (let ingredient in ingredientSet) {
            let { amount, unit } = ingredientSet[ingredient];
            let totalAmount = (amount * a).toFixed(2);
            console.log(`${ingredient}: ${totalAmount} ${unit}`);
        }
    
    
    console.log(totalPeople)
    console.log("taco success")
}

const chickenFajitaIngredients = {
    chicken: { amount: 0.33, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

const steakFajitaIngredients = {
    steak: { amount: 0.33, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

const comboFajitaIngredients = {
    steak: { amount: 0.33, unit: "lbs" },
    chicken: { amount: 0.33, unit: "lbs" },
    veggies: { amount: 0.13, unit: "lbs" },
    beans: { amount: 1, unit: "scoops" },
    rice: { amount: 1, unit: "scoops" },
    tortillas: { amount: 2, unit: "pieces" },
    chips: { amount: 0.083, unit: "bags" },
    salsa: { amount: .16, unit: "12oz container" },
    lettuce: { amount: 0.06, unit: "lbs" },
    cheese: { amount: 0.06, unit: "lbs" },
    pico: { amount: 0.06, unit: "lbs" },
    sour: { amount: .083, unit: "/12oz container" },
    guac: { amount: 0.11, unit: "/12oz container" }
};

function calculateFajitaPortions (ingredientSet) {
    let a = parseInt(totalPeople)
    
    for (let ingredient in ingredientSet) {
        let { amount, unit } = ingredientSet[ingredient];
        let totalAmount = (amount * a).toFixed(2);
        console.log(`${ingredient}: ${totalAmount} ${unit}`);
    }


    console.log(totalPeople)
    console.log("fajita success")
}

//this is where I left off
function displayPortions (resultsArray){
    resultsDiv.innerHTML = ""
}