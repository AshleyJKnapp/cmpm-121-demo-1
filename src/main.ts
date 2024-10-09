import "./style.css";

// --- Variables ---
let bogosCount: number = 0;
const autoClickInterval: number = 1000;
const autoBogosAmount: number = 1;

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

// Auto Clicking
setInterval(function(){
    bogosIncrease(autoBogosAmount);
}, autoClickInterval)

// --- Event Listening ---
button.addEventListener("click", function () {
  bogosIncrease(1);
});

// --- Helper Functions ---
function bogosIncrease(amount: number){
    // Increase bogos by amount
    bogosCount += amount;
  // Update Text
  counter.innerHTML = `${bogosCount} bogos binted 👽`;
}