var form = document.querySelector("#main-content");
var quizContainerElement = document.getElementById('quiz-container');
var endForm = document.getElementById('end-form');
var playAgain = document.getElementById('play-again');
var playAgainAgain = document.getElementById('play-again-again');
var highScoresButton = document.getElementById('view-highscore');
var wrongRight = document.getElementById('wrong-or-right');
var time; 
var timeRemaining; 
var veiwTheHighScoresPage = document.getElementById('highscore-page');
var questionHeader = document.getElementById('question'); 
var theQuizAnswerButtons = document.getElementById('quiz-buttons'); 
var quizQuestions, currentQuestionIndex;
var submit = document.getElementById('submit'); 
var initials = document.getElementById('name-initials');
var highScores;
var heresTheList = document.getElementById('heres-the-list');
var score;
var totalScore;
//HOW TO:
//Add a submitted form everytime submit is clicked
//Initial screen when page loads up
var quizHeader = document.createElement("div");
var quizStartButton = document.createElement("div");
var rightOrWrong = document.createElement("p")

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizStartButton.innerHTML ="<button class = 'start-button'>Start Quiz!</button>";

form.appendChild(quizHeader);
form.appendChild(quizStartButton);

//Timer function for the quiz
function quizTimer() {
        time = setInterval( function() {
        if (timeRemaining > 0) {
             timeRemaining --;
        }
        else {
            clearInterval(time); 
            endQuiz(); 
        } 
        timeText = document.querySelector("#quiztimer");
        timeText.value = timeRemaining;
    }, 1000);
};

//This function starts the quiz
function startQuiz(event) {
    event.preventDefault();
    rightOrWrong.innerHTML = "";
    timeRemaining = 45; 
    totalScore = 0;
    quizTimer();
    quizHeader.remove();
    quizStartButton.remove(); 
    quizQuestions = quizQuestionsArray; 
    currentQuestionIndex = 0 
    quizContainerElement.classList.remove('hide'); 
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
    prompt.answers.forEach(answer => {  
        var button = document.createElement("button"); 
        button.innerText = answer.text;
        button.classList.add('buttons');
        button.dataset.answer = answer.correct; 
        button.addEventListener("click", displayAnswer); 
        theQuizAnswerButtons.appendChild(button);
    });
};

//This function displays whether the question was answered correctly on the page
function displayAnswer(event) { 
    var answer = event.target.attributes[1].value; 
    console.log(answer);
    rightOrWrong.innerHtml = "";

    if (answer === "true") {
        rightOrWrong.innerText = "Correct! +5 points";
        totalScore = totalScore + 5;
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
    while (theQuizAnswerButtons.firstChild) { 
        theQuizAnswerButtons.removeChild(theQuizAnswerButtons.firstChild); 
    }
};

//This function ends the quiz and stops the timer
function endQuiz() {
    quizContainerElement.classList.add('hide');
    endForm.classList.remove('hide');

    playAgain.addEventListener("click", startQuiz); 
};

//This function saves the highscore to local storage
function saveHighscore(event) { 
    event.preventDefault();

    //HERE I AM
    var newScore = {
        initials: initials.value,
        score: totalScore
    } 
    highScores = JSON.parse(localStorage.getItem("highScore"));
    if (highScores === null) {
        highScores = [];
    }
    highScores.push(newScore);
    localStorage.setItem("highScore", JSON.stringify(highScores));
};

//This function displays the highscores
function highScoresPage(event) {
    event.preventDefault();
    endForm.classList.add('hide');
    veiwTheHighScoresPage.classList.remove('hide');

    playAgainAgain.addEventListener("click", startQuiz);

    highScores = JSON.parse(localStorage.getItem("highScore"));
    
    highScores.forEach(thing => {
        score = document.createElement("li");
        score.innerText = "Name: " + thing.initials + ".  Score: " + thing.score;
        heresTheList.appendChild(score);
    });
};

//This is the array with all the quiz questions in it
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
playAgainAgain.addEventListener("click,", startQuiz)
quizStartButton.addEventListener("click", startQuiz);
