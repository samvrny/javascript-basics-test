var body = document.querySelector("#apple");
var header = document.querySelector("#quiz-header");
var buttons = document.querySelector("#buttons-div");

//Initial screen when page loads up

var quizHeader = document.createElement("div");
var quizButtons = document.createElement("div");

quizHeader.innerHTML = "<h2 class = 'quiz-titles'>Click here to start the quiz!</h3>";
quizButtons.innerHTML ="<button class = 'buttons'>Begin!</button>";

body.appendChild(quizHeader);
body.appendChild(quizButtons);