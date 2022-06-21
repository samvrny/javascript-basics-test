var form = document.querySelector("#apple");
var quizContainerElement = document.getElementById('quiz-container');
var endForm = document.getElementById('end-form');
var playAgain = document.getElementById('play-again');
var playAgainAgain = document.getElementById('play-again-again');
var highScoresButton = document.getElementById('view-highscore');
var wrongRight = document.getElementById('wrong-or-right');
var time; //this variable is needed to clock how fast the time is moving
var timeRemaining; // this is the global timer variable. It can be added to/deducted from anywhere.
var veiwTheHighScoresPage = document.getElementById('highscore-page');
var questionHeader = document.getElementById('question'); //this is the h2 that will be filled with questions
var theQuizAnswerButtons = document.getElementById('quiz-buttons'); // this is the container with the quiz's buttons that will be filled with the answeres
var quizQuestions, currentQuestionIndex;
var submit = document.getElementById('submit'); 
var initials = document.getElementById('name-initials');
var highScores;
var heresTheList = document.getElementById('heres-the-list');
var thingy;

//Initial screen when page loads up
var quizHeader = document.createElement("div");
var quizStartButton = document.createElement("div");
var rightOrWrong = document.createElement("p")

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizStartButton.innerHTML ="<button class = 'start-button'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizStartButton);

//Timer function for the quiz
function quizTimer() {
    console.log(timeRemaining); //consolelog
        time = setInterval( function() {
        if (timeRemaining > 0) {
             timeRemaining --;
        }
        else {
            clearInterval(time); //this stops the timer
            endQuiz(); //this ends the quiz
        } console.log(timeRemaining); //consolelog
        timeText = document.querySelector("#quiztimer");
        timeText.value = timeRemaining;
    }, 1000);
};

//This function starts the quiz
function startQuiz(event) {
    console.log("started"); //consolelog
    event.preventDefault();
    rightOrWrong.innerHTML = "";
    timeRemaining = 60; //this resets the clock every time the quiz is started by clocking the begin or the play again button
    quizTimer();
    quizHeader.remove();
    quizStartButton.remove(); // this and the line right before it remove the begin button and header
    quizQuestions = quizQuestionsArray; //these correspond to the global variables at the top, and to the questions array
    currentQuestionIndex = 0 //if you change this number, a different item in the quizQuestionsArray pops up
    quizContainerElement.classList.remove('hide'); // this unhides the buttons for the quiz
    endForm.classList.add('hide');
    veiwTheHighScoresPage.classList.add('hide');
    while (heresTheList.firstChild) {
        heresTheList.removeChild(heresTheList.firstChild);
    }
    cueNextQuestion();
};

//This calls to remove the old questions and gets the next one ready to be printed
function cueNextQuestion() {
        resetForNextQuestion(); //this resets the buttons
        printQuestion(quizQuestions[currentQuestionIndex]);
};

//This function prints the current question in the index to the page
function printQuestion(prompt) {
    questionHeader.innerText = prompt.prompt;
    prompt.answers.forEach(answer => {   //for each is going through each item in the array
        var button = document.createElement("button"); //this is creating a new button for the questions
        button.innerText = answer.text;
        button.classList.add('buttons');
        button.dataset.answer = answer.correct; // converts the boolean to a string
        button.addEventListener("click", displayAnswer); //THIS IS WHERE the event listener for the display answer is. A starting point.
        theQuizAnswerButtons.appendChild(button);
    });
};

//This function displays whether the question was answered correctly on the page
function displayAnswer(event) {  //NEEDS TO BE UPDATED TO REFLECT THE CORRECT/INCORRECT. Use an if/else statement to determine the inner HTML of this shnizzle.
    var answer = event.target.attributes[1].value; // console log this to look at the object later for extra guidance
    console.log(answer); // console.log
    rightOrWrong.innerHtml = "";// This may be needed to empty out this text before displaying the next

    if (answer === "true") {
        rightOrWrong.innerText = "Correct!";
    }
    else {
        rightOrWrong.innerText = "Incorrect!";
        timeRemaining = timeRemaining - 5;
    }
    
    wrongRight.appendChild(rightOrWrong);
    

    if (quizQuestions.length > currentQuestionIndex +1) {
        currentQuestionIndex++;
        cueNextQuestion();
    }
    else {
        clearInterval(time);
        endQuiz();
    }
};

//This function is what removes the old questions to prepare for the next set to be printed
function resetForNextQuestion() {
    while (theQuizAnswerButtons.firstChild) { //This is saying WHILE theQuizAnswerButtons element has a child element...
        theQuizAnswerButtons.removeChild(theQuizAnswerButtons.firstChild); //this will loop through and remove each of the children until none remain.
    }
};

//This function ends the quiz and stops the timer
function endQuiz() {
    quizContainerElement.classList.add('hide');
    endForm.classList.remove('hide');

    playAgain.addEventListener("click", startQuiz); //this restarts the game.
};

//This function saves the highscore to local storage
function saveHighscore(event) { // This is certainly the most confusing aspect of the quiz. Tutor helped here but I'd have trouble explaining what everything is
    event.preventDefault();
    var newScore = {
        initials: initials.value,
        score: timeRemaining
    } 
    highScores = JSON.parse(localStorage.getItem("highScore")); //FOR LATER: get item, parse it, etc for displaying the highscore.
    if (highScores === null) {
        highScores = [];
    }
    highScores.push(newScore);
    localStorage.setItem("highScore", JSON.stringify(highScores));
    console.log(newScore);
};

//This function displays the highscores
function highScoresPage(event) {
    event.preventDefault();
    endForm.classList.add('hide');
    veiwTheHighScoresPage.classList.remove('hide');
    highScores = JSON.parse(localStorage.getItem("highScore"));
    

    console.log(highScores, typeof highScores);
    highScores.forEach(thing => {
        thingy = document.createElement("li");
        thingy.innerText = thing.initials + ":" + thing.score;
        heresTheList.appendChild(thingy);
        console.log(thingy);
    });
    
    playAgainAgain.addEventListener("click", startQuiz);
};

var quizQuestionsArray = [
    {
        prompt: 'What does DOM stand for?',
        answers: [
            { text: 'Domino Onion Martha', correct: false},
            { text: 'Dont Onload Morse', correct: false},
            { text: 'Document Object Model', correct: true},
            { text: 'Download Orient Material', correct: false}
        ],
    },
    {
        prompt: 'What does DRY stand for?',
        answers: [
            { text: 'Dont Repeat Yourself', correct: true},
            { text: 'Do Repeat Yourself', correct: false},
            { text: 'Doesnt Really Yosemite', correct: false},
            { text: 'Deranged Refreshment Yarp', correct: false}
        ],
    },
    {
        prompt: 'What does API stand for?',
        answers: [
            { text: 'Acupuncture Polaroid Index', correct: false},
            { text: 'Application Programming Interface', correct: true},
            { text: 'Apple Piece Iteration', correct: false},
            { text: 'Application Program Interweb', correct: false}
        ],
    },
    {
        prompt: 'Is JavaScript an important language?',
        answers: [
            { text: 'Its not important', correct: false},
            { text: 'About 12% of apps use it', correct: false},
            { text: 'Its a coffee shop POS system', correct: false},
            { text: 'Its the most used programming language', correct: true}
        ],
    },
    {
        prompt: 'It is possible to ______ create HTML elements with Javascript',
        answers: [
            { text: 'Computerally', correct: false},
            { text: 'Dynamically', correct: true},
            { text: 'Impossibly', correct: false},
            { text: 'Mathmatically', correct: false}
        ],
    },
    {
        prompt: 'Is JavaScript the same as Java?',
        answers: [
            { text: '   Yes   ', correct: false},
            { text: '   No   ', correct: true},
            { text: ' Maybe ', correct: false},
            { text: '   So   ', correct: false}
        ],
    },
    {
        prompt: 'How can you tell the webpage to listen for events, like a click, with JavaScript?',
        answers: [
            { text: 'localStorage', correct: false},
            { text: 'addEventListener', correct: true},
            { text: 'preventDefault', correct: false},
            { text: 'clearInterval', correct: false}
        ]
    }
];

//Event listeners for the Begin button, Veiw highscores button, and submit (highscores) button
highScoresButton.addEventListener("click", highScoresPage);
submit.addEventListener("click", saveHighscore);
quizStartButton.addEventListener("click", startQuiz);
