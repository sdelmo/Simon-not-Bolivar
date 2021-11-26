var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
let level = 0;

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChosenColour);
}

function makeSound(key) {
  switch (key) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;

    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;

    default:
      console.log(key);
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // Check if the LAST button clicked is right
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // set a variable to count how many colors the user got right
    var count = 0;
    // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        // if the two values matche, count + 1
        count++;
      }
    }
    // ONLY if the count is the same number as gamePattern length,
    // (meaning each one of the colors was right) then it's success
    if (count === gamePattern.length) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }

    // owtherwise, it's wrong and trigger Game Over
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press Any Key to Restar");
    startOver();
  }
}

function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}
