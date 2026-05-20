// 1. Look in the notebook drawer
let notebookEntry = localStorage.getItem("savedPoints");

// 2. Decide what the starting score is
let score;

if (notebookEntry !== null) {
    // If we found a note, turn that text into a real number
    score = parseInt(notebookEntry); 
} else {
    // If the drawer was empty (first time playing), start at 0
    score = 0;
}
document.getElementById('score-count').textContent = score;
const scoreDisplay = document.getElementById('score-count');
const quizData = [
    { 
        question: "How much E-Waste is discarded annually?", 
        options: ["25 Million Tons", "50 Million Tons", "75 Million Tons", "100 Million Tons"],
        answer: "50 Million Tons" 
    },
    { 
        question: "What is NOT an example of responsible ownership?", 
        options: ["Buying 2nd-hand", "Donating Old Devices", "Using Embedded Batteries", "Keeping Devices for longer"],
        answer: "Using Embedded Batteries" 
    },
    {
        question: "What type of file is a 'cookie'?",
        options: ["mp4", "mp3", "jpg", "txt"],
        answer: "txt"
    },
    {
        question: "What type of AI learns by looking for patterns and rules in data?",
        options: ["Chatbot", "Machine Learning", "Computer Vision", "Deep Learning"],
        answer: "Machine Learning"
    },
    {
        question: "Who is NOT responsible when an AI system goes wrong?",
        options: ["Creator", "Data Supplier", "Researcher", "User"],
        answer: "Researcher"
    },
    {
        question: "What is 'Narrow AI'?",
        options: ["Designed for single task", "Takes little storage", "Fast problem-solving"],
        answer: "txt"
    }
];
const questionArea = document.getElementById('question-area');
const answerOptions = document.getElementById('answer-options');
const feedbackText = document.getElementById('feedback-text');

let currentIndex = 0; // Tracks which question we are on
function loadQuestion() {
    // 1. Clear previous choices and feedback
    answerOptions.innerHTML = ""; 
    feedbackText.textContent = "";

    // 2. Get the current question object
    const currentData = quizData[currentIndex];

    // 3. Set the question text
    questionArea.textContent = currentData.question;

    // 4. Create a button for EACH option
    currentData.options.forEach(choice => {
        const button = document.createElement('button'); // Create <button>
        button.textContent = choice;                      // Set text to the option
        button.classList.add('quiz-btn');                // Add a CSS class for styling
        
        // 5. Add "Logic" to the button
        button.addEventListener('click', () => checkAnswer(choice, currentData.answer));
        
        // 6. Add the button to the screen
        answerOptions.appendChild(button);
    });
}
function checkAnswer(selected, correct) {
    if (selected === correct) {
        feedbackText.textContent = "Correct! Plus One Point. ✅";
        feedbackText.style.color = "green";
        score += 10; // 1. Update the variable
        
        // 2. Save it to LocalStorage immediately
        localStorage.setItem('savedPoints', score); 
        
        // 3. Update the display
        document.getElementById('score-count').textContent = score;
        
        alert("Correct! Progress saved.");
                currentIndex++;
        if (currentIndex < quizData.length) {
            loadQuestion();
        } else {
            questionArea.textContent = "Quiz Finished!";
            answerOptions.innerHTML = "";
            feedbackText.textContent = ""
            // Let's say your score variable is called 'points'

// Save it to localStorage under the key "userScore"
localStorage.setItem("userScore", score);

window.location.href = "shop.html";
        }}
    else {
        feedbackText.textContent = "Wrong! Minus One Point. ❌";
        feedbackText.style.color = "red";
        if (score > 0) {
        score -= 5;
        }
        scoreDisplay.textContent = score;
                // 2. Save it to LocalStorage immediately
        localStorage.setItem('savedPoints', score); 
        
        // 3. Update the display
        document.getElementById('score-count').textContent = score;
        alert("incorrect!")
                currentIndex++;
        if (currentIndex < quizData.length) {
            loadQuestion();
        } else {
            questionArea.textContent = "Quiz Finished!";
            answerOptions.innerHTML = "";
            feedbackText.textContent = ""
    }}}
loadQuestion();

if (returnt) {
    returnt.addEventListener('click', () => {
        localStorage.setItem('userScore', score);
        window.location.href = "index.html";
    });
}
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    // 1. Delete the entry from the "Notebook" (LocalStorage)
    localStorage.removeItem("mySavedScore"); 
    
    // 2. Set the "Whiteboard" variable back to zero
    score = 0;
    
    // 3. Update the screen so the user sees it change to 0
    document.getElementById('score-count').textContent = score;
    
    // Optional: Give the user feedback
    alert("Score has been reset!");
});