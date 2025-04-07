//pulling in page components
var typeSelect = document.querySelector("#typeSelect")
var typeSelectBtn = document.querySelector("#typeSelectBtn")
var optionsDiv = document.querySelector("#options")



//functions of choosing type and options
function chooseType () {
    if (typeSelect.value === "tacoBar"){
        //make select with options for taco meat
        var meat = document.createElement('select')
        var tacoMeatOptions = ["Chicken", "Ground Beef", "Combo"];
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
            calculateTacoPortions();
        })
        //test
        console.log("TacosTacosTacos")
    } else if (typeSelect.value === "fajitaBar"){

        //make select with options for fajita meat
        var meat = document.createElement('select')
        var fajitaMeatOptions = ["Chicken", "Steak", "Combo"];
        fajitaMeatOptions.forEach(function (fajitaOptionText) {
            var option = document.createElement("option");
            option.value = fajitaOptionText;
            option.textContent = fajitaOptionText
            meat.appendChild(option);
        })
        meat.classList = "options"

        //input for headcount
        var headCount = document.createElement("input")
        optionsDiv.appendChild(headCount)

        //button to fire the calculation function
        var calculateBtn = document.createElement("button")
        calculateBtn.textContent = "get you some portions"
        optionsDiv.appendChild(calculateBtn)
        optionsDiv.appendChild(meat)

        //event listener to fire calculatePortions
        calculateBtn.addEventListener("click", function(event){
            calculateFajitaPortions();
        })


        //test
        console.log("10,000 chicken fajitas")
    }
 console.log("you rang?")
}

function calculateTacoPortions () {
    console.log("taco success")
}

function calculateFajitaPortions () {
    console.log("fajita success")
}


typeSelectBtn.addEventListener("click", function(event){
    optionsDiv.innerHTML = ""
    chooseType();
})