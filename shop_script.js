const returnt = document.getElementById('returnt');
if (returnt) {
    returnt.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "index.html";
    });
}
const CT = document.getElementById('CT');

if (CT) {
    CT.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "BuyCT.html";
    });
}
const DF = document.getElementById('DF');

if (DF) {
    DF.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "BuyDF.html";
    });
}
const SD = document.getElementById('SD');

if (SD) {
    SD.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "BuySD.html";
    });
}
// Get the data back using the same key name
const finalScore = localStorage.getItem("userScore");

// Display it on the page
if (finalScore !== null) {
    document.getElementById("displayScore").innerText = "Point Total: " + finalScore + " Points";
} else {
    document.getElementById("displayScore").innerText = "No score found!";
}