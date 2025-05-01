
//pulling in page components
const typeSelect = document.querySelector("#typeSelect")
const typeSelectBtn = document.querySelector("#typeSelectBtn")
const optionsDiv = document.querySelector("#options")
const resultsDiv = document.querySelector("#results")

var totalPeople = 0
var selectedMeat = ""

//functions of choosing type and options
function chooseType () {
    if (typeSelect.value === "tacoBar"){
        //make select with options for taco meat
        var meat = document.createElement('select')
        var tacoMeatOptions = ["Combo", "Ground Beef", "Chicken"];
        tacoMeatOptions.forEach(function (tacoOptionText) {
            var option = document.createElement("option");
            option.value = tacoOptionText;
            option.textContent = tacoOptionText
            meat.appendChild(option);
        })
        meat.classList = "options"
        optionsDiv.appendChild(meat)

        //input for headcount
        var headCount = document.createElement("input")
        optionsDiv.appendChild(headCount)

        //button to fire the calculation function
        var calculateBtn = document.createElement("button")
        calculateBtn.textContent = "get you some portions"
        optionsDiv.appendChild(calculateBtn)

        //event listener to fire calculatePortions
        calculateBtn.addEventListener("click", function(event){
            totalPeople = headCount.value;
            let selectedMeat = meat.value;

            if (selectedMeat === "Chicken") {
                calculateTacoPortions(chickenTacoIngredients)
            } else if (selectedMeat === "Ground Beef"){
                calculateTacoPortions(beefTacoIngredients)
            } else if (selectedMeat === "Combo"){
                calculateTacoPortions (comboTacoIngredients)
            }
                
        })
        //test
        console.log("TacosTacosTacos")
    } else if (typeSelect.value === "fajitaBar"){

        //make select with options for fajita meat
        var meat = document.createElement('select')
        var fajitaMeatOptions = ["Combo", "Steak", "Chicken"];
        fajitaMeatOptions.forEach(function (fajitaOptionText) {
            var option = document.createElement("option");
            option.value = fajitaOptionText;
            option.textContent = fajitaOptionText
            meat.appendChild(option);
        })
        meat.classList = "options"
        optionsDiv.appendChild(meat)

        //input for headcount
        var headCount = document.createElement("input")
        optionsDiv.appendChild(headCount)

        //button to fire the calculation function
        var calculateBtn = document.createElement("button")
        calculateBtn.textContent = "get you some portions"
        optionsDiv.appendChild(calculateBtn)
        

        //event listener to fire calculatePortions
        calculateBtn.addEventListener("click", function(event){
            let selectedMeat = meat.value;
            totalPeople = headCount.value

            if (selectedMeat === "Chicken") {
                calculateFajitaPortions(chickenFajitaIngredients)
            } else if (selectedMeat === "Steak"){
                calculateFajitaPortions(steakFajitaIngredients)
            } else if (selectedMeat === "Combo"){
                calculateFajitaPortions (comboFajitaIngredients)
            }
           
        })


        //test
        console.log("10,000 chicken fajitas")
    }
 console.log("you rang?")
}





typeSelectBtn.addEventListener("click", function(event){
    optionsDiv.innerHTML = ""
    chooseType();
})