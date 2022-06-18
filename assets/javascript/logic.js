var form = document.querySelector("#apple");
var header = document.querySelector("#quiz-header");
var buttons = document.querySelector("#buttons-div");
var question;
var questionButtons;
var time;
var timeRemaining = 15 // this is the global timer variable. It can be deducted from anywhere.
//Initial screen when page loads up

var quizHeader = document.createElement("div");
var quizButtons = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizButtons.innerHTML ="<button class = 'buttons'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizButtons);

//Timer function THIS WORKS THANK GOD :)
function quizTimer() {
    console.log(timeRemaining);
        time = setInterval( function() {
        if (timeRemaining > 0) {
             timeRemaining --;
        }
        else {
            clearInterval(time); //this stops the timer
            highScorePage();
        } console.log(timeRemaining);
        timeText = document.querySelector("#quiztimer");
        timeText.value = timeRemaining;
    }, 1000);
};

//first question screen
var firstQuestion = function(event) {  //should I add event in the parenthsis for this? Why would that even be there?
    quizTimer(); //NOTE: This had to be at the top of this function for everything to display
    event.preventDefault();
    quizHeader.remove();
    quizButtons.remove();

    question = document.createElement("div");
    questionButtons = document.createElement("div");

    //COULD just add another div for the correct answer and make the wrong answers their own div.... But holy smokes this is insane. How in the F is this supposed to actually work :()
    
    question.innerHTML = "<h2 class = 'quiz-titles'>What does DOM stand for?</h2>";
    questionButtons.innerHTML = "<button class = 'buttons'>Domino Opinon Mayonaise</button><button class = 'buttons'>Blank</button>";

    form.appendChild(question);
    form.appendChild(questionButtons);

    questionButtons.addEventListener("click", secondQuestion);
};

//second question screen
var secondQuestion = function(event) {
    event.preventDefault();
    question.remove();
    questionButtons.remove();

    question = document.createElement("div");
    questionButtons = document.createElement("div");
    
    question.innerHTML = "<h2 class = 'quiz-titles'>What does API stand for?</h2>";
    questionButtons.innerHTML = "<button class = 'buttons'>After Party Irate</button><button class = 'buttons'>Blank</button>";

    form.appendChild(question);
    form.appendChild(questionButtons);

    questionButtons.addEventListener("click", thirdQuestion);
};

//third question screen
var thirdQuestion = function(event) {
    event.preventDefault();
    question.remove();
    questionButtons.remove();

    question = document.createElement("div");
    questionButtons = document.createElement("div");
    
    question.innerHTML = "<h2 class = 'quiz-titles'>Why is this working??</h2>";
    questionButtons.innerHTML = "<button class = 'buttons'>Bet you wish you hadn't spent an hour</button><button class = 'buttons'>and a half figuring out you need to remove the word var</button>";

    form.appendChild(question);
    form.appendChild(questionButtons);

    questionButtons.addEventListener("click", fourthQuestion);
};

//fourth question screen
var fourthQuestion = function(event) {
    event.preventDefault();
    question.remove();
    questionButtons.remove();

    question = document.createElement("div");
    questionButtons = document.createElement("div");
    
    question.innerHTML = "<h2 class = 'quiz-titles'>What does DRY stand for?</h2>";
    questionButtons.innerHTML = "<button class = 'buttons'>Does look like your Repeating Yourself</button><button class = 'buttons'>Doughnuts Repeat (Y)Themselves</button>";

    form.appendChild(question);
    form.appendChild(questionButtons);

    questionButtons.addEventListener("click", theEnd);
};


var theEnd = function(event) { //for timer to work in this context, this has to be 2 functions.
    event.preventDefault();
    clearInterval(time); //this stops the timer IMPORTANT
    question.remove();
    questionButtons.remove();
    highScorePage();
};

var highScorePage = function() {
    question.remove();
    questionButtons.remove();

    var theEnd = document.createElement("div");
    var theEndForm = document.createElement("div");
    var theEndButtons = document.createElement("div");

    theEnd.innerHTML = "<h2 class = 'quiz-titles'>The quiz is over!</h2>";
    theEndForm.innerHTML = "<form><h3 class = 'end-form-title'>Add your initials and save your score!</h3><input class = 'text-box' type= 'text' placeholder = 'Your Initials'/><button class = 'buttons' type = 'submit'></button></form>";
    theEndButtons.innerHTML = "<form><button class = 'buttons'>Play Again</button><button class = 'buttons'>Veiw Highscores</button></form>";

    form.appendChild(theEnd);
    form.appendChild(theEndForm);
    form.appendChild(theEndButtons);
};


quizButtons.addEventListener("click", firstQuestion);