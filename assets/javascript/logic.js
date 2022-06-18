var form = document.querySelector("#apple");
var header = document.querySelector("#quiz-header");
var buttons = document.querySelector("#buttons-div");
var question1;
var question1Buttons;
var question2;
var question2Buttons;
var question3;
var question3Buttons;
var question4;
var question4Buttons;
// var theEnd;
// var theEndButtons; //These may need to be used for the theEnd function. We shall see.

//Initial screen when page loads up

var quizHeader = document.createElement("div");
var quizButtons = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizButtons.innerHTML ="<button class = 'buttons'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizButtons);

//Timer function THIS WORKS THANK GOD :)
function quizTimer() {
    var timeRemaining = 25;
    console.log(timeRemaining);
    var time = setInterval( function() {
        if (timeRemaining > 1) {
             timeRemaining --;
        }
        else {
            clearInterval(time);
            theEnd();
        } console.log(timeRemaining);
    }, 1000);
};

//first question screen
var firstQuestion = function(event) {  //should I add event in the parenthsis for this? Why would that even be there?
    event.preventDefault();
    quizHeader.remove();
    quizButtons.remove();

    //TIMER call
    quizTimer();

    question1 = document.createElement("div");
    question1Buttons = document.createElement("div");

    //COULD just add another div for the correct answer and make the wrong answers their own div.... But holy smokes this is insane. How in the F is this supposed to actually work :()
    
    question1.innerHTML = "<h2 class = 'quiz-titles'>What does DOM stand for?</h2>";
    question1Buttons.innerHTML = "<button class = 'buttons'>Domino Opinon Mayonaise</button><button class = 'buttons'>Blank</button>";

    form.appendChild(question1);
    form.appendChild(question1Buttons);

    question1Buttons.addEventListener("click", secondQuestion);
};

//second question screen
var secondQuestion = function(event) {
    event.preventDefault();
    question1.remove();
    question1Buttons.remove();

    question2 = document.createElement("div");
    question2Buttons = document.createElement("div");
    
    question2.innerHTML = "<h2 class = 'quiz-titles'>What does API stand for?</h2>";
    question2Buttons.innerHTML = "<button class = 'buttons'>After Party Irate</button><button class = 'buttons'>Blank</button>";

    form.appendChild(question2);
    form.appendChild(question2Buttons);

    question2Buttons.addEventListener("click", thirdQuestion);
};

//third question screen
var thirdQuestion = function(event) {
    event.preventDefault();
    question2.remove();
    question2Buttons.remove();

    question3 = document.createElement("div");
    question3Buttons = document.createElement("div");
    
    question3.innerHTML = "<h2 class = 'quiz-titles'>Why is this working??</h2>";
    question3Buttons.innerHTML = "<button class = 'buttons'>Bet you wish you hadn't spent an hour</button><button class = 'buttons'>and a half figuring out you need to remove the word var</button>";

    form.appendChild(question3);
    form.appendChild(question3Buttons);

    question3Buttons.addEventListener("click", fourthQuestion);
};

//fourth question screen
var fourthQuestion = function(event) {
    event.preventDefault();
    question3.remove();
    question3Buttons.remove();

    question4 = document.createElement("div");
    question4Buttons = document.createElement("div");
    
    question4.innerHTML = "<h2 class = 'quiz-titles'>What does DRY stand for?</h2>";
    question4Buttons.innerHTML = "<button class = 'buttons'>Does look like your Repeating Yourself</button><button class = 'buttons'>Doughnuts Repeat (Y)Themselves</button>";

    form.appendChild(question4);
    form.appendChild(question4Buttons);

    question4Buttons.addEventListener("click", theEnd);
};

var theEnd = function(event) { //for timer to work in this context, this has to be 2 functions. One to clear all the data if the timer runs out, and then to move on to the end, so on and so forth
    event.preventDefault();
    question4.remove();
    question4Buttons.remove();

    var theEnd = document.createElement("div");
    var theEndForm = document.createElement("div");
    var theEndButtons = document.createElement("div");

    theEnd.innerHTML = "<h2 class = 'quiz-titles'>The quiz is over!</h2>";
    theEndForm.innerHTML = "<form><h3 class = 'end-form-title'>Add your initials and save your score!</h3><input class = 'text-box' type= 'text' placeholder = 'Your Initials'/></form>";
    theEndButtons.innerHTML = "<form><button class = 'buttons'>Play Again</button><button class = 'buttons'>Veiw Highscores</button></form>";

    form.appendChild(theEnd);
    form.appendChild(theEndForm);
    form.appendChild(theEndButtons);
};


quizButtons.addEventListener("click", firstQuestion);