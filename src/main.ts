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
clickerBtn.style.shapeRendering = "circle";
app.append(clickerBtn);

const autoClickUpgradeBtn = document.createElement("button");
autoClickUpgradeBtn.innerHTML = "Auto Binting<br>(Cost 10 Bogos)";
autoClickUpgradeBtn.style.fontSize = "20px";
autoClickUpgradeBtn.style.placeContent = "top right";
// autoClickUpgradeBtn.style.color = "gray";
app.prepend(autoClickUpgradeBtn);


// --- Event Listening ---
clickerBtn.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});

autoClickUpgradeBtn.addEventListener("click", function () {
    if (bogosCount >= 10){
        autoBogosAmount++;
        bogosDecrease(10);
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
  counter.innerHTML = `${bogosCount} bogos binted 👽`;
  // Check disabled buttons
    checkDisabled();
}

function bogosDecrease(amount: number) {
    // Increase bogos by amount
    bogosCount -= amount;
    // Update Text
    counter.innerHTML = `${bogosCount} bogos binted 👽`;
    // Check disabled buttons
    checkDisabled();
  }

function checkDisabled(){
    autoClickUpgradeBtn.disabled = bogosCount < 10;
}
