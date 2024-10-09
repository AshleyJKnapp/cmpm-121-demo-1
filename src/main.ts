import "./style.css";

// --- Variables ---
let bogosCount: number = 0;

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
counter.innerHTML = `No bogos binted 👽`;
app.append(counter);

// --- Event Listening ---
button.addEventListener("click", function(){
    bogosCount++;
    // Update Text
    counter.innerHTML = `${bogosCount} bogos binted 👽`;
});