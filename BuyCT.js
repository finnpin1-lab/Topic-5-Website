const returnt = document.getElementById('returnt');
if (returnt) {
    returnt.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "shop.html";
    });
}
const Gojo = document.getElementById('Gojo');
if (Gojo) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "Infinity"); 
    });
}
const Megumi = document.getElementById('Megumi');
if (Gojo) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "10S"); 
    });
}
const Hakari = document.getElementById('Hakari');
if (Hakari) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "Gamble"); 
    });
}

const finalScore = localStorage.getItem("userScore");

// Display it on the page
if (finalScore !== null) {
    document.getElementById("displayScore").innerText = "Point Total: " + finalScore + " Points";
} else {
    document.getElementById("displayScore").innerText = "No score found!";
}