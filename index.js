var simonArray = [];
var choiceArray = ["red", "green", "blue", "yellow"];
var userArray = [];
var level = 0;

// Determines the sound based on color

function playSound(key) {
  var audio = new Audio(`sounds/${key}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
}

// picks the choices for the user to follow

function nextSequence() {
  $("#level-title").text(`Level ${++level}`);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = choiceArray[randomNum];
  simonArray.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Logs choices made by user

$(".btn").on("click", function (event) {
  var userChosenColor = event.currentTarget.id;
  userArray.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  compareChoices(userArray.length - 1);
});

// Start the game

$(document).on("keydown", function () {
  if (simonArray.length === 0) {
    userArray = [];
    nextSequence();
  }
});

function compareChoices(currentLevel) {
  if (simonArray.length != 0) {
    if (userArray[currentLevel] === simonArray[currentLevel]) {
      if (userArray.length === simonArray.length) {
        setTimeout(nextSequence, 1000);
        userArray = [];
      }
    } else {
      gameOver();
      playSound("wrong");
    }
  }
}

function gameOver() {
  $("h1").text(
    `Game over. Your score is ${level - 1}. Press any key to try again`
  );
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  simonArray = [];
  level = 0;
}
