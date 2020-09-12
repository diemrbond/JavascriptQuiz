// Query Selections / Elements
// Time Area
var timeRemainingElement = document.getElementById("timeRemaining");

// Start Screen
var startScreen = document.getElementById("startScreen");
var startButton = document.getElementById("startQuiz");

// Countdown to Start
var countdownStartElement = document.getElementById("countdownStart");

// Variable Declaration
var countDownToStart = 5;
var countDownTimer = 60;
var startQuizIn;

// Initial State
function init(){

    // Hide the time remaining element on the instruction screen
    timeRemainingElement.setAttribute("style", "display: none;");
}

// Start Quiz
function startQuiz(){

    // Hide the start screen
    startScreen.setAttribute("style", "display: none;");

    // Start Countdown Timer
    startQuizIn = setInterval(countdownStart, 1000);
}

// Countdown Timers
function countdownStart(){
    
}

// Start Program
init();

// Event Listeners
startButton.addEventListener("click", startQuiz);