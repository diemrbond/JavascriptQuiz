// Query Selections / Elements
// Time Area
var timeRemainingElement = document.getElementById("timeRemaining");

// Start Screen
var startScreenContainer = document.getElementById("startScreen");
var startButton = document.getElementById("startQuiz");

// Countdown to Start
var countdownContainer = document.getElementById("countdown");
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

    // Hide the Start Screen
    startScreenContainer.setAttribute("style", "display: none;");
    
    // Show the Countdown Timer
    countdownContainer.setAttribute("style", "display: block;");

    // Start Countdown Timer
    countdownStartElement.textContent = countDownToStart + "...";
    startQuizIn = setInterval(countdownStart, 1000);
}

// Load Questions
function loadQuestions(){
    
}

// Countdown Timers
function countdownStart(){
    countDownToStart--;
    if (countDownToStart <= 0){
        // Stop the Countdown Timer
        clearInterval(startQuizIn);
        // Hide the Countdown Timer
        countdownContainer.setAttribute("style", "display: none;");
        // Load the Questions
        loadQuestions();
    }
    else {
        // Set the Countdown Timer to the current time
        countdownStartElement.textContent = countDownToStart + "...";
    }
}

// Start Program
init();

// Event Listeners
startButton.addEventListener("click", startQuiz);