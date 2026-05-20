const returnt = document.getElementById('returnt');
if (returnt) {
    returnt.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "shop.html";
    });
}
const Warp = document.getElementById('Warp');
if (Warp) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "Warp"); 
    });
}
const Haki = document.getElementById('Haki');
if (Haki) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "Haki"); 
    });
}
const Mera = document.getElementById('Mera');
if (Mera) {
    returnt.addEventListener('click', () => {
    localStorage.setItem('ability', "Mera"); 
    });
}

const finalScore = localStorage.getItem("userScore");

// Display it on the page
if (finalScore !== null) {
    document.getElementById("displayScore").innerText = "Point Total: " + finalScore + " Points";
} else {
    document.getElementById("displayScore").innerText = "No score found!";
}