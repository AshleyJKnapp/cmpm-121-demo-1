import "./style.css";

// --- Variables ---
let bogosCount: number = 0;
const clickBogosAmount: number = 1;
let autoBogosAmount: number = 0;
const autoClickInterval: number = 1000;
let lastUpdate: number = performance.now();
// Some const vars may change later on but for now they are const

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
counter.innerHTML = `0 bogos binted 👽`;
app.append(counter);

// -- Buttons --
const clickerBtn = document.createElement("button");
clickerBtn.innerHTML = "👽";
clickerBtn.style.fontSize = "100px";
app.append(clickerBtn);

const upgradeBtn1 = document.createElement("button");
upgradeBtn1.innerHTML = "Auto Binting x0.1<br>(Cost 10 Bogos)";
upgradeBtn1.style.fontSize = "20px";
upgradeBtn1.style.placeContent = "top right";

const upgradeBtn2 = document.createElement("button");
upgradeBtn2.innerHTML = "Auto Binting x2<br>(Cost 100 Bogos)";
upgradeBtn2.style.fontSize = "20px";
upgradeBtn2.style.placeContent = "top right";

const upgradeBtn3 = document.createElement("button");
upgradeBtn3.innerHTML = "Auto Binting x50<br>(Cost 1000 Bogos)";
upgradeBtn3.style.fontSize = "20px";
upgradeBtn3.style.placeContent = "top right";

// upgrade btn app appends/prepends
app.prepend(upgradeBtn3);
app.prepend(upgradeBtn2);
app.prepend(upgradeBtn1);

// --- Event Listening ---
clickerBtn.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});

upgradeBtn1.addEventListener("click", function () {
  if (bogosCount >= 10) {
    autoBogosAmount += 0.1;
    bogosDecrease(10);
  }
});

upgradeBtn2.addEventListener("click", function () {
  if (bogosCount >= 100) {
    autoBogosAmount += 2;
    bogosDecrease(100);
  }
});

upgradeBtn3.addEventListener("click", function () {
  if (bogosCount >= 1000) {
    autoBogosAmount += 50;
    bogosDecrease(1000);
  }
});

// -- Auto Clicking --
// Old method that was affected by framerate
// setInterval(function () {
//   bogosIncrease(autoBogosAmount);
// }, autoClickInterval);

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
  counter.innerHTML = `${bogosCount.toFixed(0)} bogos binted 👽`;
  // Check disabled buttons
  checkDisabled();
}

function bogosDecrease(amount: number) {
  // Increase bogos by amount
  bogosCount -= amount;
  // Update Text
  counter.innerHTML = `${bogosCount.toFixed(0)} bogos binted 👽`;
  // Check disabled buttons
  checkDisabled();
}

function checkDisabled() {
  upgradeBtn1.disabled = bogosCount < 10;
  upgradeBtn2.disabled = bogosCount < 100;
  upgradeBtn3.disabled = bogosCount < 1000;
}
