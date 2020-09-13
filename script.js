// Query Selections / Elements
// Time Area
var timeRemainingElement = document.getElementById("timeRemaining");
var timeRemainingCount = document.getElementById("timeCount");
var highscoresButton = document.getElementById("highscores");
var highscoreTableContainer = document.getElementById("highscoreTable");

// Start Screen
var startScreenContainer = document.getElementById("startScreen");
var startButton = document.getElementById("startQuiz");

// Countdown to Start
var countdownContainer = document.getElementById("countdown");
var countdownStartElement = document.getElementById("countdownStart");

// Questions
var questionsContainer = document.getElementById("questions");

// Correct and Incorrect Responses
var continueButtonCorrect = document.getElementById("continueQuizCorrect");
var continueButtonIncorrect = document.getElementById("continueQuizIncorrect");

// Final Scores
var finalScoreContainer = document.getElementById("finalScore");
var finalScoreTitleElement = document.getElementById("finalScoreTitle");
var totalQuestionsElement = document.getElementById("totalQuestions");
var correctElement = document.getElementById("correct");
var incorrectElement = document.getElementById("incorrect");
var totalScoreElement = document.getElementById("totalScore");
var playerNameElement = document.getElementById("playerName");
var errorElement = document.getElementById("error");

// Variable Declaration
var countDownToStart = 5;
var countDownTimer = 60;
var currentQuestion = 0;
var totalQuestions = Object.entries(quizQuestions).length;
var questionOrder = [];
var myCorrect = 0;
var myIncorrect = 0;
var playerScore = 0;
var player_highScores = [];

// Timer Declaration
var startQuizIn;
var quizEndsIn;

// Initial State
function init() {
    
    // Check for highscores
    var highScores = localStorage.getItem("game_highscores");

    //   * Check if the todos were retrieved from `localStorage` and if so, set a `todos` variable with the `storedTodos`.
    if (highScores != null) {
        player_highScores = JSON.parse(highScores);
    }

    // Hide the time remaining element on the instruction screen
    timeRemainingElement.style.display = "none";
    highscoresButton.style.display = "";

    // Show the Start Screen
    hideUnhide(startScreenContainer);
}

// Start Quiz
function startQuiz() {

    highscoresButton.style.display = "none";

    // Show the Countdown Timer
    hideUnhide(countdownContainer);

    // Reset Countdown Timers
    countDownToStart = 5;
    countDownTimer = 60;

    // Reset Scores    
    myCorrect = 0;
    myIncorrect = 0;
    playerScore = 0;

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

    questionsContainer.innerHTML = "";

    var addRow = document.createElement("div");
    addRow.setAttribute("class", "row");

    var theQuestionNumber = document.createElement("h1");
    theQuestionNumber.textContent = "Q" + (currentQuestion + 1) + ": ";
    addRow.appendChild(theQuestionNumber);

    questionsContainer.appendChild(addRow);

    var addRow = document.createElement("div");
    addRow.setAttribute("class", "row");

    var theQuestionText = document.createElement("h2");
    theQuestionText.textContent += quizQuestions[questionOrder[currentQuestion]].question;
    addRow.appendChild(theQuestionText);

    questionsContainer.appendChild(addRow);

    var theOptions = quizQuestions[questionOrder[currentQuestion]].options;
    var theCorrect = quizQuestions[questionOrder[currentQuestion]].answer;

    for (var i = 0; i < theOptions.length; i++) {

        var addRow = document.createElement("div");
        addRow.setAttribute("class", "row");

        var theDiv = document.createElement("div");
        theDiv.setAttribute("class", "theOptions");

        var thisButton = document.createElement("button");
        thisButton.setAttribute("data-index", i);
        thisButton.setAttribute("data-toggle", "modal");
        if (i == theCorrect) {
            thisButton.setAttribute("data-target", "#correctResponse");
        }
        else {
            thisButton.setAttribute("data-target", "#incorrectResponse");
        }
        thisButton.setAttribute("class", "btn-primary btn-lg");
        thisButton.textContent = theOptions[i];

        theDiv.appendChild(thisButton);
        addRow.appendChild(theDiv);

        questionsContainer.appendChild(addRow);
    }

}

// Check answer is correct
function checkCorrect(which) {

    if (quizQuestions[questionOrder[currentQuestion]].answer == which) {
        myCorrect++;
    }
    else {
        myIncorrect++;
        countDownTimer -= 10;

        if (countDownTimer <= 0) {
            // Brings up the Final Screen
            finalScoreTitleElement.textContent = "You ran out of time!";
            finalScreen();
        }
    }

}

// Check final question
function checkQuizEnd() {

    currentQuestion++;

    if ((currentQuestion < totalQuestions) && (countDownTimer > 0)) {
        displayNextQuestion();
    }
    else {
        // Brings up the Final Screen
        finalScoreTitleElement.textContent = "Congratulations!";
        finalScreen();
    }

}

// Final Screen Function
function finalScreen() {

    highscoresButton.style.display = "";

    // Stop the Quiz Countdown Timer
    clearInterval(quizEndsIn);
    timeRemainingElement.style.display = "none";

    var questionsAnswered = myCorrect + myIncorrect;
    playerScore = (myCorrect * 3) - (myIncorrect * 2) + countDownTimer;

    if (playerScore < 0) {
        playerScore = 0;
    }

    totalQuestionsElement.textContent = questionsAnswered;
    correctElement.textContent = myCorrect;
    incorrectElement.textContent = myIncorrect;
    totalScoreElement.textContent = playerScore;

    hideUnhide(finalScoreContainer);
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
        // Brings up the Final Screen
        finalScoreTitleElement.textContent = "You ran out of time!";
        finalScreen();
    }
}

function submitHighscore() {

    var thisPlayer = playerNameElement.value.trim();
    if (thisPlayer.length > 0) {

        player_highScores.push([thisPlayer, playerScore]);

        var theHighscores = JSON.stringify(player_highScores);
        localStorage.setItem("game_highscores", theHighscores);

        errorElement.innerHTML = "";
        viewHighscores();
    }
    else {
        errorElement.innerHTML = "<br/>Please enter a valid name.";
    }
}

function resetHighscores() {

    player_highScores = [];

    var theHighscores = JSON.stringify(player_highScores);
    localStorage.setItem("game_highscores", theHighscores);

    errorElement.innerHTML = "";
    viewHighscores();
}

function viewHighscores() {

    highscoresButton.style.display = "none";

    var tempArray = [];
    var tempArrayScores = [];
    var tempScoresInOrder = [];

    for (var i = 0; i < player_highScores.length; i++) {
        tempArray.push(i);
        tempArrayScores.push(player_highScores[i][1]);
    }

    do {
        var theIndex = indexOfMax(tempArrayScores);
        tempScoresInOrder.push(tempArray[theIndex]);
        tempArray.splice(theIndex, 1);
        tempArrayScores.splice(theIndex, 1);
    }
    while (tempArray.length > 0);

    highscoreTableContainer.innerHTML = "";

    var addRow = document.createElement("div");
    addRow.setAttribute("class", "row");

    var theHeading = document.createElement("h1");
    theHeading.setAttribute("class", "col-12");
    theHeading.textContent = "Highscores!";
    addRow.appendChild(theHeading);

    highscoreTableContainer.appendChild(addRow);

    if (player_highScores.length == 0) {

        var addRow = document.createElement("div");
        addRow.setAttribute("class", "row instructions");

        var thePlayerName = document.createElement("div");
        thePlayerName.setAttribute("class", "col-12");
        thePlayerName.textContent = "No highscores have been set!";
        addRow.appendChild(thePlayerName);

        highscoreTableContainer.appendChild(addRow);
    }
    else {
        // Display the top 10 scores
        for (var j = 0; j < 10; j++) {

            if (player_highScores[tempScoresInOrder[j]] != undefined) {
                var addRow = document.createElement("div");
                addRow.setAttribute("class", "row instructions");

                var addDiv = document.createElement("div");
                addDiv.setAttribute("class", "col-12");

                var thePlayerScore = document.createElement("span");
                thePlayerScore.setAttribute("class", "playerscores");
                thePlayerScore.textContent = player_highScores[tempScoresInOrder[j]][1];
                addDiv.appendChild(thePlayerScore);

                var thePlayerName = document.createElement("span");
                thePlayerName.textContent = player_highScores[tempScoresInOrder[j]][0];
                thePlayerName.setAttribute("style", "line-height: 1.3")
                addDiv.appendChild(thePlayerName);

                addRow.appendChild(addDiv);
                highscoreTableContainer.appendChild(addRow);
            }
            else {
                break;
            }
        }

    }

    var addRow = document.createElement("div");
    addRow.setAttribute("class", "row");

    var theDiv = document.createElement("div");
    theDiv.setAttribute("class", "col-12 mt-2");

    var thisButton = document.createElement("button");
    thisButton.setAttribute("class", "btn-primary btn-lg");
    thisButton.textContent = "Go Back";
    thisButton.addEventListener("click", init);

    theDiv.appendChild(thisButton);

    var resetButton = document.createElement("button");
    resetButton.setAttribute("class", "btn-secondary btn-lg ml-3");
    resetButton.textContent = "Reset Highscores";
    resetButton.addEventListener("click", resetHighscores)

    theDiv.appendChild(resetButton);

    addRow.appendChild(theDiv);

    highscoreTableContainer.appendChild(addRow);

    hideUnhide(highscoreTableContainer);

}

function indexOfMax(which) {
    if (which.length === 0) {
        return -1;
    }

    var max = which[0];
    var maxIndex = 0;

    for (var i = 1; i < which.length; i++) {
        if (which[i] > max) {
            maxIndex = i;
            max = which[i];
        }
    }

    return maxIndex;
}

// Hide / Unhide Elements
function hideUnhide(which) {

    // Hide the Start Screen
    startScreenContainer.style.display = "none";

    // Hide the Countdown Timer
    countdownContainer.style.display = "none";

    // Hide the Questions
    questionsContainer.style.display = "none";

    // Hide the Final Score
    finalScoreContainer.style.display = "none";

    highscoreTableContainer.style.display = "none";

    // Unhide the Required Container
    which.style.display = "block";

}

// Start Program
init();

// Event Listeners
startButton.addEventListener("click", startQuiz);
continueButtonCorrect.addEventListener("click", checkQuizEnd);
continueButtonIncorrect.addEventListener("click", checkQuizEnd);
highscoresButton.addEventListener("click", viewHighscores);

questionsContainer.addEventListener("click", function (event) {

    event.preventDefault();

    if (event.target.matches("button")) {
        var myNum = event.target.getAttribute("data-index");
        checkCorrect(myNum);
    }
})

playerNameElement.addEventListener("keydown", function (event) {

    if (event.key == "Enter") {
        event.preventDefault();
        submitHighscore();
    }
})
submitScore.addEventListener("click", submitHighscore);