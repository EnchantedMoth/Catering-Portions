
//pulling in page components
const typeSelect = document.querySelector("#typeSelect")
const optionsDiv = document.querySelector("#options")
const resultsDiv = document.querySelector("#results")

var totalPeople = 0
var selectedMeat = ""

//functions of choosing type and options

function chooseType() {
  const barType = typeSelect.value; // 'tacoBar' or 'fajitaBar'
  if (barType === "fajitaBar") {
    buildFajitaUI(); 
    buildExtrasSection(optionsDiv);  // 👈 this calls the fajita UI
  } else {
    buildTacoUI();  
    buildExtrasSection(optionsDiv);   // your existing taco UI builder
  }
}

typeSelect.addEventListener("change", chooseType);

chooseType();


