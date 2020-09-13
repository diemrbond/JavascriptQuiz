// Query Selections / Elements
// Time Area
var timeRemainingElement = document.getElementById("timeRemaining");
var timeRemainingCount = document.getElementById("timeCount");

// Start Screen
var startScreenContainer = document.getElementById("startScreen");
var startButton = document.getElementById("startQuiz");

// Countdown to Start
var countdownContainer = document.getElementById("countdown");
var countdownStartElement = document.getElementById("countdownStart");

// Questions
var questionsContainer = document.getElementById("questions");

// Variable Declaration
var countDownToStart = 5;
var countDownTimer = 60;
var currentQuestion = 0;

// Timer Declaration
var startQuizIn;
var quizEndsIn;

// Initial State
function init() {

    console.log("questions: "+quizQuestions)

    // Hide the time remaining element on the instruction screen
    timeRemainingElement.style.display = "none";

    // Show the Start Screen
    hideUnhide(startScreenContainer);
}

// Start Quiz
function startQuiz() {

    // Show the Countdown Timer
    hideUnhide(countdownContainer);

    // Reset Countdown Timers
    countDownToStart = 5;
    countDownTimer = 60;

    // Start Countdown Timer
    countdownStartElement.textContent = countDownToStart + "...";
    startQuizIn = setInterval(countdownStart, 1000);
}

// Load Questions
function loadQuestions() {
    
    // Show the Quiz Timer
    timeRemainingCount.textContent = countDownTimer;
    timeRemainingElement.style.display = "block";

    // Start Quiz Countdown Timer
    quizEndsIn = setInterval(countdownQuiz, 1000);

    // Show the Questions
    hideUnhide(questionsContainer);
    
}

// Countdown Timers
function countdownStart() {
    
    countDownToStart--;

    // Set the Countdown Timer to the current time
    countdownStartElement.textContent = countDownToStart + "...";
    
    if (countDownToStart <= 0) {
        // Stop the Countdown Timer
        clearInterval(startQuizIn);
        // Load the Questions
        loadQuestions();
    }
}

function countdownQuiz() {

    countDownTimer--;
    
    // Set the Quiz Countdown Timer to the current time
    timeRemainingCount.textContent = countDownTimer;
    
    if (countDownTimer <= 0) {
        // Stop the Quiz Countdown Timer
        clearInterval(quizEndsIn);
    }
}

// Hide / Unhide Elements
function hideUnhide(which) {

    // Hide the Start Screen
    startScreenContainer.style.display = "none";

    // Hide the Countdown Timer
    countdownContainer.style.display = "none";

    // Hide the Questions
    questionsContainer.style.display = "none";

    // Unhide the Required Container
    which.style.display = "block";

}

// Start Program
init();

// Event Listeners
startButton.addEventListener("click", startQuiz);