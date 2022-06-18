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

//Initial screen when page loads up

var quizHeader = document.createElement("div");
var quizButtons = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizButtons.innerHTML ="<button class = 'buttons'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizButtons);

//first question screen
var firstQuestion = function(event) {  //should I add event in the parenthsis for this? Why would that even be there?
    event.preventDefault();
    quizHeader.remove();
    quizButtons.remove();
    question1 = document.createElement("div");
    question1Buttons = document.createElement("div");
    
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

var theEnd = function(event) {
    event.preventDefault();
    question4.remove();
    question4Buttons.remove();

};


quizButtons.addEventListener("click", firstQuestion);