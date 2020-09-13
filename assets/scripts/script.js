// Query Selections / Elements
// Time Area
var timeRemainingElement = document.getElementById("timeRemaining");
var timeRemainingCount = document.getElementById("timeCount");

// Highscore Elements
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
var timedOut = false;

// Timer Declaration
var startQuizIn;
var quizEndsIn;

// Functions
// Return Page to Initial State
function init() {

    // Console logs
    console.log("[SYSTEM] init()");

    // Check for highscores from Local Storage
    var highScores = localStorage.getItem("game_highscores");

    // Check if the highscores were retrieved from `localStorage` and if so, set them to the player_highScores
    if (highScores != null) {
        player_highScores = JSON.parse(highScores);
    }

    // Hide the time remaining element on the instruction screen
    timeRemainingElement.style.display = "none";

    // Show the view highscores button
    highscoresButton.style.display = "";

    // Show the Start Screen
    hideUnhide(startScreenContainer);
}

// Start Quiz
function startQuiz() {

    // Console logs
    console.log("[SYSTEM] startQuiz()");

    // Hide the view highscores button
    highscoresButton.style.display = "none";

    // Show the Countdown Timer
    hideUnhide(countdownContainer);

    // Reset Countdown Timers
    countDownToStart = 5;
    countDownTimer = 60;

    // Reset Variables    
    questionOrder = [];
    myCorrect = 0;
    myIncorrect = 0;
    playerScore = 0;
    currentQuestion = 0;
    timedOut = false;

    // Start Countdown Timer
    countdownStartElement.innerHTML = "Get ready<br/>" + countDownToStart + "...";
    startQuizIn = setInterval(countdownStart, 1000);
}

// Load Questions
function loadQuestionsContainer() {

    // Console logs
    console.log("[SYSTEM] loadQuestionsContainer()");

    // Show the Quiz Timer
    timeRemainingCount.textContent = countDownTimer;
    timeRemainingElement.style.display = "block";

    // Start Quiz Countdown Timer
    quizEndsIn = setInterval(countdownQuiz, 1000);

    // Setup Question Order
    setupQuestions();

    // Display First Question
    displayNextQuestion();

    // Show the Questions
    hideUnhide(questionsContainer);

}

// Array Shuffle (Used to shuffle questions)
function shuffle(which) {

    // Console logs
    console.log("[SYSTEM] shuffle(" + which + ")");

    // Creates copies of the original array
    var originalArray = which;
    var newArray = [];

    // While there are elements in the array
    while (originalArray.length > 0) {

        // Pick a random index
        var index = generateRandomNumber(0, originalArray.length-1);

        // Move the number from 1 array to the other
        newArray.push(originalArray[index]);
        originalArray.splice(index, 1);
    }

    // Return the new array order
    console.log(" - " + newArray)
    return newArray;
}

// Randomiser
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Sets up the Questions Order
function setupQuestions() {

    // Console logs
    console.log("[SYSTEM] setupQuestions()");

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

    // Console logs
    console.log("[SYSTEM] displayNextQuestion()");
    console.log("---------");

    // Reset the question to remove previous
    questionsContainer.innerHTML = "";

    // Add the row
    var addRow1 = document.createElement("div");
    addRow1.setAttribute("class", "row");

    // Add the question number
    var theQuestionNumber = document.createElement("h1");
    theQuestionNumber.textContent = "Q" + (currentQuestion + 1) + ": ";
    addRow1.appendChild(theQuestionNumber);
    questionsContainer.appendChild(addRow1);

    // Add the next row
    var addRow2 = document.createElement("div");
    addRow2.setAttribute("class", "row");

    // Add the question
    var theQuestionText = document.createElement("h2");
    theQuestionText.textContent += quizQuestions[questionOrder[currentQuestion]].question;
    addRow2.appendChild(theQuestionText);
    questionsContainer.appendChild(addRow2);

    // Log the question to the console
    console.log("Q" + (currentQuestion + 1) + ": " + quizQuestions[questionOrder[currentQuestion]].question)

    // Retrieve the options and correct answer for this question
    var theOptions = quizQuestions[questionOrder[currentQuestion]].options;
    var theCorrect = quizQuestions[questionOrder[currentQuestion]].answer;

    // Create a traditional options order
    var optionsOrder = [];
    for (var i = 0; i < theOptions.length; i++) {
        optionsOrder.push(i);
    }

    // Shuffle the options order
    var tempArray = shuffle(optionsOrder);
    optionsOrder = tempArray;

    // Loop through the number of options
    for (var i = 0; i < theOptions.length; i++) {

        // Add the row
        var addRowQ = document.createElement("div");
        addRowQ.setAttribute("class", "row");

        // Add the div for the option
        var theDiv = document.createElement("div");
        theDiv.setAttribute("class", "theOptions");

        // Create the button for the option
        var thisButton = document.createElement("button");
        // Set the option number
        thisButton.setAttribute("data-index", optionsOrder[i]);
        // Attributes to control the modal
        thisButton.setAttribute("data-toggle", "modal");
        thisButton.setAttribute("data-backdrop", "static");
        thisButton.setAttribute("data-keyboard", "false");
        // Check if correct or incorrect option
        if (optionsOrder[i] == theCorrect) {
            // Calls correct modal
            thisButton.setAttribute("data-target", "#correctResponse");
        }
        else {
            // Calls incorrect modal
            thisButton.setAttribute("data-target", "#incorrectResponse");
        }
        // Add the button
        thisButton.setAttribute("class", "btn-primary btn-lg");
        thisButton.textContent = theOptions[optionsOrder[i]];

        // Log the option to the console
        console.log(theOptions[optionsOrder[i]]);

        // Add the button to the div, the div to the row
        theDiv.appendChild(thisButton);
        addRowQ.appendChild(theDiv);

        // Add the row to the container
        questionsContainer.appendChild(addRowQ);
    }

    // Divide the console logs
    console.log("---------");
}

// Check answer is correct or incorrect
function checkCorrect(which) {

    // Console logs
    console.log("[SYSTEM] checkCorrect()");

    // If the question is correct, increment the total correct
    if (quizQuestions[questionOrder[currentQuestion]].answer == which) {
        myCorrect++;
    }
    // If it's incorrect, increment the total incorrect, decrease time
    else {
        myIncorrect++;
        countDownTimer -= 10;

        // If you've now run out of time, show the final screen
        if (countDownTimer <= 0) {
            timedOut = true;
            finalScoreTitleElement.textContent = "You ran out of time!";
            finalScreen();
        }
    }
}

// Check if that was the final question
function checkQuizEnd() {

    // Console logs
    console.log("[SYSTEM] checkQuizEnd()");

    // Increment the current question
    currentQuestion++;

    // If the player still has time available and more questions, go to the next question
    if ((currentQuestion < totalQuestions) && (countDownTimer > 0)) {
        displayNextQuestion();
    }
    else {
        // Otherwise, show the Final Screen
        // Make sure the final screen has the correct text, if timed out or not
        console.log("[SYSTEM] timedOut: " + timedOut);
        if (timedOut) {
            finalScoreTitleElement.textContent = "You ran out of time!";
        }
        else {
            finalScoreTitleElement.textContent = "Congratulations!";
        }
        finalScreen();
    }
}

// Final Screen Function
function finalScreen() {

    // Console logs
    console.log("[SYSTEM] finalScreen()");

    // Show the view highscores button
    highscoresButton.style.display = "";

    // Reset the input value
    playerNameElement.value = "";

    // Stop the Quiz Countdown Timer and hide
    clearInterval(quizEndsIn);
    timeRemainingElement.style.display = "none";

    // Check the number of questions answered and the player score
    var questionsAnswered = myCorrect + myIncorrect;
    playerScore = (myCorrect * 3) - (myIncorrect * 2) + countDownTimer;

    // Prevent negative scores
    if (playerScore < 0) {
        playerScore = 0;
    }

    // Set the players scores to the finalScoreContainer
    totalQuestionsElement.textContent = questionsAnswered;
    correctElement.textContent = myCorrect;
    incorrectElement.textContent = myIncorrect;
    totalScoreElement.textContent = playerScore;

    // Show the finalScoreContainer
    hideUnhide(finalScoreContainer);
}

// Submit a new highscore
function submitHighscore() {

    // Console logs
    console.log("[SYSTEM] submitHighscore()");

    // Retrieve the players name from the input
    var thisPlayer = playerNameElement.value.trim();

    // Check valid player name
    if (thisPlayer.length > 0) {

        // Add the player name and score to the highscore table
        player_highScores.push([thisPlayer, playerScore]);

        // Convert the highscores into JSON and add to local storage
        var theHighscores = JSON.stringify(player_highScores);
        localStorage.setItem("game_highscores", theHighscores);

        // Clear the error element
        errorElement.innerHTML = "";

        // View the highscores
        viewHighscores();
    }
    // Prompt user to enter a valid name
    else {
        errorElement.innerHTML = "<br/>Please enter a valid name.";
    }
}

// Delete the highscores like a cheating punk
function resetHighscores() {

    // Console logs
    console.log("[SYSTEM] resetHighscores()");

    // Reset the browsers highscores
    player_highScores = [];

    // Reset the local storage highscores
    var theHighscores = JSON.stringify(player_highScores);
    localStorage.setItem("game_highscores", theHighscores);

    // View the now empty highscores
    viewHighscores();
}

// Display the highscores table
function viewHighscores() {

    // Console logs
    console.log("[SYSTEM] viewHighscores()");

    // Hide the view highscores button, as already there
    highscoresButton.style.display = "none";

    // Create empty arrays to sort the highscores
    var tempArray = [];
    var tempArrayScores = [];
    var tempScoresInOrder = [];

    // Loop through the currently stored highscores and push to temp arrayas
    for (var i = 0; i < player_highScores.length; i++) {
        tempArray.push(i);
        tempArrayScores.push(player_highScores[i][1]);
    }

    // Find the highest score in the highscores and push to the temp arrays
    // Keep looping and adding the next highest score until none left
    do {
        var theIndex = indexOfMax(tempArrayScores);
        tempScoresInOrder.push(tempArray[theIndex]);
        tempArray.splice(theIndex, 1);
        tempArrayScores.splice(theIndex, 1);
    }
    while (tempArray.length > 0);

    // Reset the highscore container to empty (prevents duplication)
    highscoreTableContainer.innerHTML = "";

    // Add the row
    var addRow1 = document.createElement("div");
    addRow1.setAttribute("class", "row");

    // Add the highscores heading
    var theHeading = document.createElement("h1");
    theHeading.setAttribute("class", "col-12");
    theHeading.textContent = "Highscores!";
    addRow1.appendChild(theHeading);

    // Add the row to the container
    highscoreTableContainer.appendChild(addRow1);

    // Check if there are no highscores
    if (player_highScores.length == 0) {

        // Add the row
        var addRow2 = document.createElement("div");
        addRow2.setAttribute("class", "row instructions");

        // Add the warning of no highscores
        var thePlayerName = document.createElement("div");
        thePlayerName.setAttribute("class", "col-12");
        thePlayerName.textContent = "No highscores have been set!";
        addRow2.appendChild(thePlayerName);

        // Add the row to the container
        highscoreTableContainer.appendChild(addRow2);
    }
    else {
        // Display only the top 10 scores
        for (var j = 0; j < 10; j++) {

            // Check there is a highscore at j
            if (player_highScores[tempScoresInOrder[j]] != undefined) {

                // Add the row
                var addRow2 = document.createElement("div");
                addRow2.setAttribute("class", "row instructions");

                // Create a div
                var addDiv = document.createElement("div");
                addDiv.setAttribute("class", "col-12");

                // Insert the players score to the table
                var thePlayerScore = document.createElement("span");
                thePlayerScore.setAttribute("class", "playerscores");
                thePlayerScore.textContent = player_highScores[tempScoresInOrder[j]][1];
                addDiv.appendChild(thePlayerScore);

                // Insert the players name to the table
                var thePlayerName = document.createElement("span");
                thePlayerName.textContent = player_highScores[tempScoresInOrder[j]][0];
                thePlayerName.setAttribute("style", "line-height: 1.3")
                addDiv.appendChild(thePlayerName);

                // Add the div and the row to the container
                addRow2.appendChild(addDiv);
                highscoreTableContainer.appendChild(addRow2);
            }
            // Break out of the loop as there are no more highscores to set
            else {
                break;
            }
        }
    }

    // Add a row for buttons after the table
    var addRow3 = document.createElement("div");
    addRow3.setAttribute("class", "row");

    // Add a div to hold the buttons
    var theDiv = document.createElement("div");
    theDiv.setAttribute("class", "col-12 mt-2");

    // Add the "go back" button
    var thisButton = document.createElement("button");
    thisButton.setAttribute("class", "btn-primary btn-lg");
    thisButton.textContent = "Go Back";
    thisButton.addEventListener("click", init);
    theDiv.appendChild(thisButton);

    // Add the "reset highscores" button
    var resetButton = document.createElement("button");
    resetButton.setAttribute("class", "btn-secondary btn-lg ml-3");
    resetButton.textContent = "Reset Highscores";
    resetButton.addEventListener("click", resetHighscores)
    theDiv.appendChild(resetButton);

    // Add the buttons to the row
    addRow3.appendChild(theDiv);

    // Add the row to the container
    highscoreTableContainer.appendChild(addRow3);

    // Show the highscoreTableContainer
    hideUnhide(highscoreTableContainer);

}

// Function to check the highest value in an array
function indexOfMax(which) {

    // Console logs
    console.log("[SYSTEM] indexOfMax(" + which.toString() + ")");

    // If the array is invalid, return negative
    if (which.length === 0) {
        return -1;
    }

    // Sets the default max to the first value
    var max = which[0];
    var maxIndex = 0;

    // Loop through all the values
    for (var i = 1; i < which.length; i++) {
        // If the current value is highest, reset max to this value
        if (which[i] > max) {
            maxIndex = i;
            max = which[i];
        }
    }

    // Return the highest value
    return maxIndex;
}

// Countdown Timers
function countdownStart() {

    // Console logs
    console.log("[SYSTEM] countdownStart(" + countDownToStart + ")");

    // Remove 1 second
    countDownToStart--;

    // Set the Countdown Timer to the current time
    countdownStartElement.innerHTML = "Get ready<br/>" + countDownToStart + "...";

    // If the timer has run out
    if (countDownToStart <= 0) {
        // Stop the Countdown Timer
        clearInterval(startQuizIn);
        // Load the Questions
        loadQuestionsContainer();
    }
}

function countdownQuiz() {

    // Console logs
    console.log("[SYSTEM] countdownQuiz()");

    // Remove 1 second
    countDownTimer--;

    // Set the Quiz Countdown Timer to the current time
    timeRemainingCount.textContent = countDownTimer;

    // If the timer has run out
    if (countDownTimer <= 0) {
        // Brings up the Final Screen
        timedOut = true;
        finalScoreTitleElement.textContent = "You ran out of time!";
        finalScreen();
    }
}

// Hide / Unhide Elements
function hideUnhide(which) {

    // Console logs
    console.log("[SYSTEM] hideUnhide()");

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
// Buttons
startButton.addEventListener("click", startQuiz);
continueButtonCorrect.addEventListener("click", checkQuizEnd);
continueButtonIncorrect.addEventListener("click", checkQuizEnd);
highscoresButton.addEventListener("click", viewHighscores);
submitScore.addEventListener("click", submitHighscore);

// Loop through all buttons in a question area
questionsContainer.addEventListener("click", function (event) {

    event.preventDefault();

    if (event.target.matches("button")) {
        var myNum = event.target.getAttribute("data-index");
        checkCorrect(myNum);
    }
})

// Prevent page refresh when pressing enter in the player highscore
playerNameElement.addEventListener("keydown", function (event) {

    if (event.key == "Enter") {
        event.preventDefault();
        submitHighscore();
    }
})