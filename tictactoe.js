// ==========================================
// 1. GAME STATE & VARIABLES
// ==========================================
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "PvP"; // Can be changed to "AI" by the buttons

// Variables needed for tracking user clicks during question loops
let selectedCellIndex = null;
let selectedCellElement = null;

// ==========================================
// 2. QUESTION DATABASE
// ==========================================
const questionDatabase = [
    { 
        q: "How much E-Waste is discarded annually?", 
        choices: ["25 Million Tons", "50 Million Tons", "75 Million Tons", "100 Million Tons"],
        a: "50 Million Tons" 
    },
    { 
        q: "What is NOT an example of responsible ownership?", 
        choices: ["Buying 2nd-hand", "Donating Old Devices", "Using Embedded Batteries", "Keeping Devices for longer"],
        a: "Using Embedded Batteries" 
    },
    {
        q: "What type of file is a 'cookie'?",
        choices: ["mp4", "mp3", "jpg", "txt"],
        a: "txt"
    },
    {
        q: "What type of AI learns by looking for patterns and rules in data?",
        choices: ["Chatbot", "Machine Learning", "Computer Vision", "Deep Learning"],
        a: "Machine Learning"
    },
    {
        q: "Who is NOT responsible when an AI system goes wrong?",
        choices: ["Creator", "Data Supplier", "Researcher", "User"],
        a: "Researcher"
    },
    {
        q: "What is 'Narrow AI'?",
        choices: ["Designed for single task", "Takes little storage", "Fast problem-solving"],
        a: "txt"
    }
];

// ==========================================
// 3. CACHE DOM ELEMENTS
// ==========================================
const statusDisplay = document.getElementById("status") || document.querySelector(".status") || { innerText: "" };
const modal = document.getElementById("questionModal");
const modalQText = document.getElementById("modalQuestionText");
const modalChoices = document.getElementById("modalChoices");
const modalFeedback = document.getElementById("modalFeedback");

// ==========================================
// 4. INTERCEPT PLAYER CLICK WITH QUESTION OVERLAY
// ==========================================
function handleCellClick(event) {
    const clickedCell = event.target;
    
    // Fallback if data-index is missing or unparsed
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index") || clickedCell.id.replace(/\D/g, ""));

    // Guard rails: stop if cell filled, game over, or AI is currently calculating
    if (board[clickedCellIndex] !== "" || !gameActive || (gameMode === "AI" && currentPlayer === "O")) {
        return;
    }

    // Cache targets to process once answer is validated
    selectedCellIndex = clickedCellIndex;
    selectedCellElement = clickedCell;

    // Launch question panel
    launchQuestionGate();
}

function launchQuestionGate() {
    if (!modal || !modalChoices || !modalQText) {
        console.error("Missing pop-up HTML nodes inside document tree!");
        // Fallback: make the move immediately if elements are structurally missing
        executeMove(selectedCellIndex, selectedCellElement);
        return;
    }

    modalChoices.innerHTML = "";
    modalFeedback.innerText = "";

    const randomQuestion = questionDatabase[Math.floor(Math.random() * questionDatabase.length)];
    modalQText.innerText = randomQuestion.q;

    randomQuestion.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerText = `> ${choice}`;
        btn.onclick = () => verifyAnswer(index, randomQuestion.a);
        modalChoices.appendChild(btn);
    });

    modal.style.display = "flex";
}

// ==========================================
// 5. VALIDATE THE SELECTION
// ==========================================
function verifyAnswer(selectedIndex, correctIndex) {
    const buttons = modalChoices.querySelectorAll(".choice-btn");
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === correctIndex) {
        launchQuestionGate()
        modalFeedback.innerText = "ACCESS GRANTED. WRITING CELL...";
        modalFeedback.style.color = "#00ff00";

        setTimeout(() => {
            modal.style.display = "none";
            executeMove(selectedCellIndex, selectedCellElement);
        }, 1000);

    } else {
        modalFeedback.innerText = "ACCESS DENIED! TURN OVERRIDE SKIPPED.";
        modalFeedback.style.color = "#ff3333";

        setTimeout(() => {
            modal.style.display = "none";
            switchPlayerTurn();
        }, 1200);
    }
}

// ==========================================
// 6. BOARD UPDATES & TURN HANDOVER
// ==========================================
function executeMove(index, element) {
    board[index] = currentPlayer;
    if (element) element.innerText = currentPlayer;
    
    if (checkWinConditions()) {
        statusDisplay.innerText = `PLAYER ${currentPlayer} WINS!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.innerText = "GAME OVER: DRAW MATRIX";
        gameActive = false;
        return;
    }

    switchPlayerTurn();
}

function switchPlayerTurn() {
    if (!gameActive) return;
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `PLAYER ${currentPlayer} TURN`;

    // Trigger AI move if Mode is enabled and turn belongs to O
    if (gameMode === "AI" && currentPlayer === "O") {
        statusDisplay.innerText = "AI THINKING...";
        setTimeout(executeAIMove, 600);
    }
}

// ==========================================
// 7. ROBOT ENGINE LOOPS (AI OPPONENT)
// ==========================================
function executeAIMove() {
    if (!gameActive) return;

    // Collate all open slots
    let emptyIndices = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") emptyIndices.push(i);
    }

    if (emptyIndices.length === 0) return;

    // Pick a random spot
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    
    // Find target HTML cell using custom index formatting paths
    const targetCell = document.querySelector(`[data-index="${randomIndex}"]`) || 
                       document.getElementById(`block_${randomIndex}`) ||
                       document.getElementById(`cell-${randomIndex}`);

    // AI does not have to answer questions; it processes its turn directly
    executeMove(randomIndex, targetCell);
}

// ==========================================
// 8. WIN LOGIC COMPUTATIONS
// ==========================================
function checkWinConditions() {
    const conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let variant of conditions) {
        let a = board[variant[0]];
        let b = board[variant[1]];
        let c = board[variant[2]];
        
        if (a !== "" && a === b && b === c) return true;
    }
    return false;
}

// ==========================================
// 9. RE-LINKING INTERACTION CONTROLS
// ==========================================
function setGameMode(mode) {
    gameMode = mode;
    resetEntireBoard();
    
    // Visually flag button changes inside terminal UI interfaces
    const pvpBtn = document.getElementById("pvpBtn") || document.getElementById("playPvP");
    const aiBtn = document.getElementById("aiBtn") || document.getElementById("playAI");
    
    if (pvpBtn && aiBtn) {
        if (mode === "AI") {
            aiBtn.style.background = "rgba(0, 255, 0, 0.2)";
            pvpBtn.style.background = "transparent";
        } else {
            pvpBtn.style.background = "rgba(0, 255, 0, 0.2)";
            aiBtn.style.background = "transparent";
        }
    }
}

function resetEntireBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.innerText = "PLAYER X TURN";
    
    // Clean text representations clear off grid interfaces
    const cellNodes = document.querySelectorAll("[data-index], .block, .cell");
    cellNodes.forEach(cell => cell.innerText = "");
}

// Attach listeners to DOM when script lands or matches engine dependencies
document.querySelectorAll("[data-index], .block, .cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Auto-wire buttons if your tags have standard IDs
document.addEventListener("DOMContentLoaded", () => {
    const pvpBtn = document.getElementById("pvpBtn") || document.getElementById("playPvP");
    const aiBtn = document.getElementById("aiBtn") || document.getElementById("playAI");
    const resetBtn = document.getElementById("resetBtn") || document.getElementById("restart");

    if (pvpBtn) pvpBtn.onclick = () => setGameMode("PvP");
    if (aiBtn) aiBtn.onclick = () => setGameMode("AI");
    if (resetBtn) resetBtn.onclick = () => resetEntireBoard();
});
launchQuestionGate()