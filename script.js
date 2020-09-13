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
var theQuestionContainer = document.getElementById("theQuestion");

// Variable Declaration
var countDownToStart = 5;
var countDownTimer = 60;
var currentQuestion = 0;
var totalQuestions = Object.entries(quizQuestions).length;
var questionOrder = [];
var myCorrect = 0;
var myIncorrect = 0;

// Timer Declaration
var startQuizIn;
var quizEndsIn;

// Initial State
function init() {

    // Hide the time remaining element on the instruction screen
    timeRemainingElement.style.display = "none";

    // Show the Start Screen
    hideUnhide(startScreenContainer);
}

// Start Quiz
function startQuiz() {

    event.preventDefault();

    // Show the Countdown Timer
    hideUnhide(countdownContainer);

    // Reset Countdown Timers
    countDownToStart = 5;
    countDownTimer = 60;

    // Reset Scores    
    myCorrect = 0;
    myIncorrect = 0;

    // Start Countdown Timer
    countdownStartElement.textContent = countDownToStart + "...";
    startQuizIn = setInterval(countdownStart, 1000);
}

// Load Questions
function loadQuestionsContainer() {

    // Show the Quiz Timer
    timeRemainingCount.textContent = countDownTimer;
    timeRemainingElement.style.display = "block";

    // Start Quiz Countdown Timer
    quizEndsIn = setInterval(countdownQuiz, 1000);

    // Show the Questions
    hideUnhide(questionsContainer);

    // Setup Question Order
    setupQuestions();

    // Display First Question
    displayNextQuestion();

}

// Array Shuffle
function shuffle(which) {

    var originalArray = which;
    var newArray = [];

    // While there are elements in the array
    while (originalArray.length > 0) {

        // Pick a random index
        var index = Math.floor(Math.random() * originalArray.length);

        // Move the number from 1 array to the other
        newArray.push(originalArray[index]);
        originalArray.splice(index, 1);
    }

    // Return the new array order
    return newArray;
}

// Sets up the Questions Order
function setupQuestions() {

    // Add the total amount of questions
    for (var i = 0; i < totalQuestions; i++) {
        questionOrder.push(i);
    }

    // Shuffle the question order
    var tempArray = shuffle(questionOrder);
    questionOrder = tempArray;

}

// Display Next Question
function displayNextQuestion() {

    var theQuestionText = document.createElement("h2");
    theQuestionText.textContent = quizQuestions[questionOrder[currentQuestion]].question;
    theQuestionContainer.appendChild(theQuestionText);

    var theOptions = quizQuestions[questionOrder[currentQuestion]].options;

    for (var i = 0; i < theOptions.length; i++) {

        var theDiv = document.createElement("div");
        theDiv.setAttribute("class", "theOptions");

        var thisButton = document.createElement("button");
        thisButton.setAttribute("data-index", i);
        thisButton.setAttribute("class", "btn-primary btn-lg");
        thisButton.textContent = theOptions[i];

        theDiv.appendChild(thisButton);
        theQuestionContainer.appendChild(theDiv);
    }

}

// Check answer is correct
function checkCorrect(which) {

    if (quizQuestions[questionOrder[currentQuestion]].answer == which) {
        correctResponse();
    }
    else {
        incorrectResponse();
    }

}

// Correct Response
function correctResponse(){
    
    myCorrect++;
}

// Incorrect Response
function incorrectResponse(){
    
    myIncorrect++;
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
        loadQuestionsContainer();
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

theQuestionContainer.addEventListener("click", function (event) {

    event.preventDefault();

    if (event.target.matches("button")) {
        var myNum = event.target.getAttribute("data-index");
        checkCorrect(myNum);
    }
})