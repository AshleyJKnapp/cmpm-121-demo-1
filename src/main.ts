import "./style.css";

// --- Variables ---
let bogosCount: number = 0;
const clickBogosAmount: number = 1;
const autoBogosAmount: number = 1;
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

const button = document.createElement("button");
button.innerHTML = "👽";
button.style.fontSize = "100px";
app.append(button);

const counter = document.createElement("div");
counter.style.fontSize = "25px";
counter.style.paddingTop = "15px";
counter.innerHTML = `No bogos binted 👽`;
app.append(counter);

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

// --- Event Listening ---
button.addEventListener("click", function () {
  bogosIncrease(clickBogosAmount);
});

// --- Helper Functions ---
function bogosIncrease(amount: number) {
  // Increase bogos by amount
  bogosCount += amount;
  // Update Text
  counter.innerHTML = `${bogosCount} bogos binted 👽`;
}
