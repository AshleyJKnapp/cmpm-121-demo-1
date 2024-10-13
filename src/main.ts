import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  descriptionVar: HTMLParagraphElement;
  btnVar: HTMLButtonElement;
  numUpgrade: number,
}

// --- Variables ---
let bogosCount: number = 0;
const clickBogosAmount: number = 1;
const autoClickInterval: number = 1000;
let autoBogosAmount: number = 0;
let lastUpdate: number = performance.now();

// --- Page Setup ---
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Did you get your photos printed?";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counter = document.createElement("div");
counter.setAttribute("style", "font-size: 25px; padding-top: 15px");
counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
app.append(counter);

// -- Buttons --
const clickerBtn = document.createElement("button");
clickerBtn.innerHTML = "👽";
clickerBtn.style.fontSize = "100px";
app.append(clickerBtn);

const upgradeContainer = document.createElement("div");
upgradeContainer.style.marginTop = "20px";
app.append(upgradeContainer);

const buttonUpContain = document.createElement("div");
upgradeContainer.append(buttonUpContain);

const buttonDescContain = document.createElement("div");
upgradeContainer.append(buttonDescContain);


// -- Button Description --
const upgradeDesc1 = document.createElement("p");
const upgradeDesc2 = document.createElement("p");
const upgradeDesc3 = document.createElement("p");
const upgradeBtn1 = document.createElement("button");
const upgradeBtn2 = document.createElement("button");
const upgradeBtn3 = document.createElement("button");


const availableItems: Item[] = [
  {
    name: "Small Binter",
    cost: 10,
    rate: 0.1,
    description: "A small binter to increase<br>your automatic binting<br>rate a little bit",
    descriptionVar: upgradeDesc1,
    btnVar: upgradeBtn1,
    numUpgrade: 0,
  },
  {
    name: "Average Binter",
    cost: 100,
    rate: 2,
    description: "A binter of decent<br>size to double your<br>binting rate",
    descriptionVar: upgradeDesc2,
    btnVar: upgradeBtn2,
    numUpgrade: 0,
  },
  {
    name: "Epic Binter",
    cost: 1000,
    rate: 50,
    description:
    "A rather epic and<br>awesome sauce<br>industrial binter that<br>increases your rate a ton",
    descriptionVar: upgradeDesc3,
    btnVar: upgradeBtn3,
    numUpgrade: 0,
  },
];


for (let i = 0; i < availableItems.length; i++){
  // Description
  availableItems[i].descriptionVar.innerHTML = `${availableItems[i].description}`;
  availableItems[i].descriptionVar.setAttribute("style", "width: 150px; display: inline-block; vertical-align: top; margin: 10px");
  buttonDescContain.append(availableItems[i].descriptionVar);
  // Buttons
  availableItems[i].btnVar.innerHTML = `${availableItems[i].name} x${availableItems[i].rate}<br>(Cost ${availableItems[i].cost} Bogos)<br>${availableItems[i].numUpgrade}`;
  availableItems[i].btnVar.setAttribute("style", "width: 150px; display: inline-block; verticalAlign: top; margin: 10px");
  buttonUpContain.append(availableItems[i].btnVar);
  availableItems[i].btnVar.disabled = true;


  availableItems[i].btnVar.addEventListener("click", function () {
    let upgradeCost = availableItems[i].cost * Math.pow(1.15, availableItems[i].numUpgrade);
    if (bogosCount >= upgradeCost) {
      // Deduct cost from total
      bogosDecrease(upgradeCost);
      console.log(upgradeCost);
      autoBogosAmount += availableItems[i].rate;
      // Calc new cost to show on label
      availableItems[i].numUpgrade += 1;
      upgradeCost = availableItems[i].cost * Math.pow(1.15, availableItems[i].numUpgrade);
      growthLabel.innerHTML = `Current ${availableItems[i].name} Rate: ${autoBogosAmount.toFixed(1)}`;
      availableItems[i].btnVar.innerHTML = `${availableItems[i].name} x${availableItems[i].rate}<br>(Cost ${upgradeCost.toFixed(2)} Bogos)<br>${availableItems[i].numUpgrade}`;
    }
  });
}


const growthLabel = document.createElement("p");
growthLabel.innerHTML = `Current Auto Bint Rate: ${autoBogosAmount.toFixed(1)}`;
growthLabel.style.fontSize = "20px";
app.prepend(growthLabel);

// --- Event Listening ---
clickerBtn.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});


// -- Auto Clicking --
// Automatically increment the counter by autoBogosAmount every 1000ms (autoCLickInterval)
requestAnimationFrame(interval); // Initial call to start autoclicking process
function interval(timestamp: number) {
  if (timestamp - lastUpdate >= autoClickInterval) {
    lastUpdate = timestamp;
    bogosIncrease(autoBogosAmount);
  }
  checkDisabled();
  requestAnimationFrame(interval);
}

// --- Helper Functions ---
function bogosIncrease(amount: number) {
  // Increase bogos by amount
  bogosCount += amount;
  // Update Text
  counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
}

function bogosDecrease(amount: number) {
  // Increase bogos by amount
  bogosCount -= amount;
  // Update Text
  counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
}

function checkDisabled() {
  for (let i = 0; i < availableItems.length; i++){
    availableItems[i].btnVar.disabled = bogosCount < availableItems[i].cost * Math.pow(1.15, availableItems[i].numUpgrade);
  }
}
