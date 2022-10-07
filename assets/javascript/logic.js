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
var submitScore = document.getElementById('submit-score');

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
    submitScore.classList.add('hide');
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

    submitScore.classList.remove('hide');

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
        prompt: 'In what year did the First World War break out?',
        answers: [
            { text: '1893', correct: false},
            { text: '1934', correct: false},
            { text: '1914', correct: true},
            { text: '1906', correct: false}
        ],
    },
    {
        prompt: 'Who was the first country to use chemical gas as a weapon?',
        answers: [
            { text: 'Germany', correct: true},
            { text: 'France', correct: false},
            { text: 'Ottoman Empire', correct: false},
            { text: 'Russian Empire', correct: false}
        ],
    },
    {
        prompt: 'What was the country the Germans decided to use as a roadway for their advancing armies during their execution of the Schlieffen plan?',
        answers: [
            { text: 'Netherlands', correct: false},
            { text: 'Belgium', correct: true},
            { text: 'Switzerland', correct: false},
            { text: 'Italy', correct: false}
        ],
    },
    {
        prompt: 'What was the famous morale boosting phrase the French general Charles Petain coined during the horrible battle of Verdun?',
        answers: [
            { text: 'For honor, for country, for glory!', correct: false},
            { text: 'For honor, for the Republic!', correct: false},
            { text: 'Fight them to the river!', correct: false},
            { text: 'They shall not pass!', correct: true}
        ],
    },
    {
        prompt: 'What was the name of the famous passenger ship that, when sunk by a German U-boat, killed the 128 American passengers on board?',
        answers: [
            { text: 'Hindenburg', correct: false},
            { text: 'Lusitania', correct: true},
            { text: 'Endeavour', correct: false},
            { text: 'Queen Mary', correct: false}
        ],
    },
    {
        prompt: 'Which German general walked up to the door of the citidel of Liege and pounded on the door with his hilt demanding, and recieving, the surrender of the city?',
        answers: [
            { text: 'Alexander Von Kluck', correct: false},
            { text: 'Erich Ludendorf', correct: true},
            { text: 'Helmuth Von Moltke', correct: false},
            { text: 'Otto Von Bismarck', correct: false}
        ],
    },
    {
        prompt: 'Which was the first power to deploy tanks to the battlefield?',
        answers: [
            { text: 'Austria-Hungary', correct: false},
            { text: 'Britain', correct: true},
            { text: 'Germany', correct: false},
            { text: 'Italy', correct: false}
        ]
    },
    {
        prompt: 'What is the name of the highest ranking French general during the onset of the war?',
        answers: [
            { text: 'Charles De Gaulle', correct: ''},
            { text: 'Jean Moreau', correct: ''},
            { text: 'Joseph Joffre', correct: ''},
            { text: 'Claude Blanchet', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
    {
        prompt: '',
        answers: [
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''},
            { text: '', correct: ''}
        ],
    },
];

//Event listeners for the Begin button, Veiw highscores button, and submit (highscores) button
highScoresButton.addEventListener("click", highScoresPage);
submit.addEventListener("click", saveHighscore);
playAgainAgain.addEventListener("click,", startQuiz)
quizStartButton.addEventListener("click", startQuiz);
