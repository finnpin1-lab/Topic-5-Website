// 1. Find the button in the HTML
const myButton = document.getElementById('myButton');
if (myButton) {
    myButton.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "quiz_page_1.html";
    });
}
const flashcards = document.getElementById('flashcards');

if (flashcards) {
    flashcards.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "flashcards.html";
    });
}
const shopping = document.getElementById('shopping');

if (shopping) {
    shopping.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "shop.html";
    });
}
const game = document.getElementById('game');

if (game) {
    game.addEventListener('click', () => {
        // This line tells the browser to go to the new page
        window.location.href = "tictactoe.html";
    });
}

