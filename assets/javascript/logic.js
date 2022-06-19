var form = document.querySelector("#apple");
var quizContainerElement = document.getElementById('quiz-container');
var endForm = document.getElementById('end-form');
var playAgain = document.getElementById('play-again');
var time; //this variable is needed to clock how fast the time is moving
var timeRemaining; // this is the global timer variable. It can be added to/deducted from anywhere.


//THIS IS THE SPACE FOR WORKING ON PRINTING
var questionHeader = document.getElementById('question'); //this is the h2 that will be filled with questions
var theQuizAnswerButtons = document.getElementById('quiz-buttons'); // this is the container with the quiz's buttons that will be filled with the answeres
var quizQuestions, currentQuestionIndex;
//END THE WORKING ON PRINTING SPACE


//Initial screen when page loads up
var quizHeader = document.createElement("div");
var quizStartButton = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizStartButton.innerHTML ="<button class = 'start-button'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizStartButton);

//Timer function THIS WORKS THANK GOD :)
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

function startQuiz(event) {
    console.log("started"); //consolelog
    event.preventDefault();
    timeRemaining = 10; //this resets the clock every time the quiz is started by clocking the begin or the play again button
    quizTimer();
    quizHeader.remove();
    quizStartButton.remove(); // this and the line right before it remove the begin button and header
    quizQuestions = quizQuestionsArray; //these correspond to the global variables at the top, and to the questions array
    currentQuestionIndex = 0
    quizContainerElement.classList.remove('hide'); // this unhides the buttons for the quiz
    endForm.classList.add('hide');
    cueNextQuestion();
};

function cueNextQuestion() {
    printQuestion(quizQuestions[currentQuestionIndex]);
};

function printQuestion(prompt) {
    questionHeader.innerText = prompt.prompt
}



//AFTER THIS IS ALL MY DOING
function endQuiz() {
    quizContainerElement.classList.add('hide');
    endForm.classList.remove('hide');

    playAgain.addEventListener("click", startQuiz); //this restarts the game
};


var quizQuestionsArray = [
    {
        prompt: 'What does DOM stand for?',
        answers: [
            { text: 'Domino Onion Martha', correct: false},
            { text: 'Dont Onload Morse', correct: false},
            { text: 'Document Object Model', correct: true},
            { text: 'Download Orient Material', correct: false}
        ]
    },
    {
        prompt: 'What does DRY stand for?',
        answers: [
            { text: 'Dont Repeat Yourself', correct: true},
            { text: 'Do Repeat Yourself', correct: false},
            { text: 'Doesnt Really Yosemite', correct: false},
            { text: 'Deranged Refreshment Yarp', correct: false}
        ]
    }
];

quizStartButton.addEventListener("click", startQuiz);
