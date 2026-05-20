const returnt = document.getElementById('returnt');
if (returnt) {
    returnt.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "shop.html";
    });
}
const DIO = document.getElementById('DIO');
if (DIO) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "DIO"); 
    });
}
const GE = document.getElementById('GE');
if (GE) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "GE"); 
    });
}
const TSK = document.getElementById('TSK');
if (TSK) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "TSK"); 
    });
}
const finalScore = localStorage.getItem("userScore");

// Display it on the page
if (finalScore !== null) {
    document.getElementById("displayScore").innerText = "Point Total: " + finalScore + " Points";
} else {
    document.getElementById("displayScore").innerText = "No score found!";
}