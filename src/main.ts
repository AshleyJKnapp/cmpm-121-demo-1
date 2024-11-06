import "./style.css";
// import bogosVert from "./Assets/BogosVert.jpg";
// import bogosHorz from "./Assets/BogosHorz.jpg";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  btnVar: HTMLButtonElement;
  numUpgrade: number;
}

// --- Variables ---
let bogosCount: number = 0;
const clickBogosAmount: number = 1;
const autoClickInterval: number = 1000;
let autoBogosAmount: number = 0;
const scaleBy = 1.15;
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

const leftDiv = document.createElement("div");
leftDiv.className = "leftBar";
app.append(leftDiv);

const imgLeft = document.createElement("img");
imgLeft.src = "src/Assets/BogosVert.jpg";
// imgLeft.style.scale = ".45";
leftDiv.append(imgLeft);

const rightDiv = document.createElement("div");
rightDiv.className = "rightBar";
app.append(rightDiv);

const imgHorz = document.createElement("img");
imgHorz.src = "src/Assets/BogosHorz.jpg";
// imgHorz.style.scale = "1";
rightDiv.append(imgHorz);

// -- Main Button --
const clickerBtn = document.createElement("button");
clickerBtn.classList.add("bogos-clicker");
clickerBtn.innerHTML = "👽";
app.append(clickerBtn);

// -- Containers --
const upgradeContainer = document.createElement("div");
upgradeContainer.style.marginTop = "20px";
app.append(upgradeContainer);

const buttonUpContain = document.createElement("div");
upgradeContainer.append(buttonUpContain);

const buttonDescContain = document.createElement("div");
upgradeContainer.append(buttonDescContain);

// -- Button Description Vars --
const upgradeBtn1 = document.createElement("button");
const upgradeBtn2 = document.createElement("button");
const upgradeBtn3 = document.createElement("button");
const upgradeBtn4 = document.createElement("button");
const upgradeBtn5 = document.createElement("button");

const availableItems: Item[] = [
  {
    name: "Small Binter",
    cost: 10,
    rate: 0.1,
    description:
      "A small binter to increase<br>your automatic binting<br>rate a little bit",
    btnVar: upgradeBtn1,
    numUpgrade: 0,
  },
  {
    name: "Average Binter",
    cost: 100,
    rate: 2,
    description: "A binter of decent<br>size to double your<br>binting rate",
    btnVar: upgradeBtn2,
    numUpgrade: 0,
  },
  {
    name: "Epic Binter",
    cost: 1000,
    rate: 50,
    description:
      "A rather epic and<br>awesome sauce<br>industrial binter that<br>increases your rate a ton",
    btnVar: upgradeBtn3,
    numUpgrade: 0,
  },
  {
    name: "Binting Factory",
    cost: 5000,
    rate: 100,
    description: "An entire factory dedicated to your cause of binting bogos",
    btnVar: upgradeBtn4,
    numUpgrade: 0,
  },
  {
    name: "Binting Nation",
    cost: 10000,
    rate: 500,
    description: "A whole nation dedicated to binting your bogos",
    btnVar: upgradeBtn5,
    numUpgrade: 0,
  },
];

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

for (let i = 0; i < availableItems.length; i++) {
  // Description
  const upgradeDesc = document.createElement("p");
  upgradeDesc.innerHTML = `${availableItems[i].description}`;
  upgradeDesc.setAttribute(
    "style",
    "width: 150px; display: inline-block; vertical-align: top; margin: 10px",
  );
  buttonDescContain.append(upgradeDesc);

  // Buttons
  availableItems[i].btnVar.innerHTML =
    `${availableItems[i].name} x${availableItems[i].rate}<br>(Cost ${availableItems[i].cost} Bogos)<br>${availableItems[i].numUpgrade}`;
  availableItems[i].btnVar.setAttribute(
    "style",
    "width: 150px; display: inline-block; verticalAlign: top; margin: 10px",
  );
  buttonUpContain.append(availableItems[i].btnVar);
  availableItems[i].btnVar.disabled = true;

  // Event Listeners

  availableItems[i].btnVar.addEventListener("click", function () {
    let upgradeCost =
      availableItems[i].cost * Math.pow(scaleBy, availableItems[i].numUpgrade);
    if (bogosCount >= upgradeCost) {
      // Deduct cost from total
      bogosDecrease(upgradeCost);
      console.log(upgradeCost);
      autoBogosAmount += availableItems[i].rate;

      // Calc new cost to show on label
      availableItems[i].numUpgrade += 1;
      upgradeCost =
        availableItems[i].cost *
        Math.pow(scaleBy, availableItems[i].numUpgrade);
      growthLabel.innerHTML = `Current Auto Bint Rate: ${autoBogosAmount.toFixed(1)}`;
      availableItems[i].btnVar.innerHTML =
        `${availableItems[i].name} x${availableItems[i].rate}<br>(Cost ${upgradeCost.toFixed(2)} Bogos)<br>${availableItems[i].numUpgrade}`;
    }
  });
}

const growthLabel = document.createElement("p");
growthLabel.innerHTML = `Current Auto Bint Rate: ${autoBogosAmount.toFixed(1)}`;
growthLabel.style.fontSize = "20px";
upgradeContainer.prepend(growthLabel);

// --- Event Listening ---
clickerBtn.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});

// -- Auto Clicking --
// Enables/Disables buttons depending on if the player can afford it
function checkDisabled() {
  for (let i = 0; i < availableItems.length; i++) {
    availableItems[i].btnVar.disabled =
      bogosCount <
      availableItems[i].cost * Math.pow(scaleBy, availableItems[i].numUpgrade);
  }
}

// Automatically increment the counter by autoBogosAmount every 1000ms (autoCLickInterval)
function interval(timestamp: number) {
  if (timestamp - lastUpdate >= autoClickInterval) {
    lastUpdate = timestamp;
    bogosIncrease(autoBogosAmount);
  }
  checkDisabled();
  requestAnimationFrame(interval);
}
requestAnimationFrame(interval); // Initial call to start autoclicking process
