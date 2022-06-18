var form = document.querySelector("#apple");
var header = document.querySelector("#quiz-header");
var buttons = document.querySelector("#buttons-div");
var questionsArr = [];

//Initial screen when page loads up

var quizHeader = document.createElement("div");
var quizButtons = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizButtons.innerHTML ="<button class = 'buttons'>Begin!</button>";

form.appendChild(quizHeader);
form.appendChild(quizButtons);

var firstQuestion = function(event) {  //should I add event in the parenthsis for this? Why would that even be there?
    event.preventDefault();
    quizHeader.remove();
    quizButtons.remove();

    var question1 = document.createElement("div");
    

    question1.innerHTML = "<h2 class = 'quiz-titles'>What does DOM stand for?</h2>";

    form.appendChild(question1);
};

quizButtons.addEventListener("click", firstQuestion);