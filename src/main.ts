import "./style.css";

interface Item {
  name: string,
  cost: number,
  rate: number
};

const availableItems : Item[] = [
  {name: "Small Binter", cost: 10, rate: 0.1},
  {name: "Average Binter", cost: 100, rate: 2},
  {name: "Epic Binter", cost: 1000, rate: 50},
];

// --- Variables ---
let bogosCount: number = 0;
const clickBogosAmount: number = 1;
const autoClickInterval: number = 1000;
let autoBogosAmount: number = 0;
let lastUpdate: number = performance.now();
let upgradeAmt1: number = 0;
let upgradeAmt2: number = 0;
let upgradeAmt3: number = 0;
let upgradeCost1:number = availableItems[0]["cost"]*Math.pow(1.15, upgradeAmt1);
let upgradeCost2:number = availableItems[1]["cost"]*Math.pow(1.15, upgradeAmt2);
let upgradeCost3:number = availableItems[2]["cost"]*Math.pow(1.15, upgradeAmt3);
// let upgradeCost1: number = 10;
// let upgradeCost2: number = 100;
// let upgradeCost3: number = 1000;


console.log(availableItems[0]["name"]);

// --- Page Setup ---
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My very epic and totally cool game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counter = document.createElement("div");
counter.style.fontSize = "25px";
counter.style.paddingTop = "15px";
counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
app.append(counter);

// -- Buttons --
const clickerBtn = document.createElement("button");
clickerBtn.innerHTML = "👽";
clickerBtn.style.fontSize = "100px";
app.append(clickerBtn);

const upgradeBtn1 = document.createElement("button");
upgradeBtn1.innerHTML = `${availableItems[0]["name"]} x${availableItems[0]["rate"]}<br>(Cost ${upgradeCost1} Bogos)<br>${upgradeAmt1}`;
upgradeBtn1.style.fontSize = "20px";

const upgradeBtn2 = document.createElement("button");
upgradeBtn2.innerHTML = `${availableItems[1]["name"]} x${availableItems[1]["rate"]}<br>(Cost ${upgradeCost2} Bogos)<br>${upgradeAmt2}`;
upgradeBtn2.style.fontSize = "20px";

const upgradeBtn3 = document.createElement("button");
upgradeBtn3.innerHTML = `${availableItems[2]["name"]} x${availableItems[2]["rate"]}<br>(Cost ${upgradeCost3} Bogos)<br>${upgradeAmt3}`;
upgradeBtn3.style.fontSize = "20px";

// upgrade btn app appends/prepends
app.prepend(upgradeBtn3);
app.prepend(upgradeBtn2);
app.prepend(upgradeBtn1);
upgradeBtn1.disabled = true;
upgradeBtn2.disabled = true;
upgradeBtn3.disabled = true;

const growthLabel = document.createElement("p");
growthLabel.innerHTML = `Current Auto Bint Rate: ${autoBogosAmount.toFixed(1)}`;
growthLabel.style.fontSize = "20px";
app.prepend(growthLabel);

// --- Event Listening ---
clickerBtn.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});

upgradeBtn1.addEventListener("click", function () {
  if (bogosCount >= 10) {
    // Deduct cost from total
    upgradeCost1 = availableItems[0]["cost"]*Math.pow(1.15, upgradeAmt1);
    bogosDecrease(upgradeCost1);
    autoBogosAmount += 0.1;
    // Calc new cost to show on label
    upgradeAmt1++;
    upgradeCost1 = availableItems[0]["cost"]*Math.pow(1.15, upgradeAmt1);
  checkDisabled();
  growthLabel.innerHTML = `Current ${availableItems[0]["name"]} Rate: ${autoBogosAmount.toFixed(1)}`;
    upgradeBtn1.innerHTML = `${availableItems[0]["name"]} x${availableItems[0]["rate"]}<br>(Cost ${upgradeCost1.toFixed(2)} Bogos)<br>${upgradeAmt1}`;
  }
});

upgradeBtn2.addEventListener("click", function () {
  if (bogosCount >= 100) {
    // Deduct cost from total
    upgradeCost2 = availableItems[1]["cost"]*Math.pow(1.15, upgradeAmt2);
    bogosDecrease(upgradeCost2);
    autoBogosAmount += 2;
    // Calc new cost to show on label
    upgradeAmt2++;
    upgradeCost2 = availableItems[1]["cost"]*Math.pow(1.15, upgradeAmt2);
  checkDisabled();
  growthLabel.innerHTML = `Current ${availableItems[1]["name"]} Rate: ${autoBogosAmount.toFixed(1)}`;
    upgradeBtn2.innerHTML = `${availableItems[1]["name"]} x${availableItems[1]["rate"]}<br>(Cost ${upgradeCost2.toFixed(2)} Bogos)<br>${upgradeAmt2}`;
  }
});

upgradeBtn3.addEventListener("click", function () {
  if (bogosCount >= 1000) {
    // Deduct cost from total
    upgradeCost3 = availableItems[2]["cost"]*Math.pow(1.15, upgradeAmt3);
    bogosDecrease(upgradeCost3);
    autoBogosAmount += 50;
    // Calc new cost to show on label
    upgradeAmt3++;
    upgradeCost3 = availableItems[2]["cost"]*Math.pow(1.15, upgradeAmt2);
  checkDisabled();
  growthLabel.innerHTML = `Current ${availableItems[2]["name"]} Rate: ${autoBogosAmount.toFixed(1)}`;
    upgradeBtn3.innerHTML = `${availableItems[2]["name"]} x${availableItems[2]["rate"]}<br>(Cost ${upgradeCost3.toFixed(2)} Bogos)<br>${upgradeAmt3}`;
  }
});

// -- Auto Clicking --
// Automatically increment the counter by autoBogosAmount every 1000ms (autoCLickInterval)
requestAnimationFrame(interval); // Initial call to start autoclicking process
function interval(timestamp: number) {
  if (timestamp - lastUpdate >= autoClickInterval) {
    lastUpdate = timestamp;
    bogosIncrease(autoBogosAmount);
  }
  requestAnimationFrame(interval);
}

// --- Helper Functions ---
function bogosIncrease(amount: number) {
  // Increase bogos by amount
  bogosCount += amount;
  // Update Text
  counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
  // Check disabled buttons
  checkDisabled();
}

function bogosDecrease(amount: number) {
  // Increase bogos by amount
  bogosCount -= amount;
  // Update Text
  counter.innerHTML = `${bogosCount.toFixed(2)} bogos binted 👽`;
  // Check disabled buttons
  checkDisabled();
}

function checkDisabled() {
  upgradeBtn1.disabled = bogosCount < upgradeCost1;
  upgradeBtn2.disabled = bogosCount < upgradeCost2;
  upgradeBtn3.disabled = bogosCount < upgradeCost3;
}
