$(document).ready(function() {
  var $answerInput = $("#answer");
  var $equationDiv = $("#equation");
  var answer;
  var operator = "+";
  var $progressBarFill = $("#progress_bar_fill");
  var progressBarWidth = 90;
  var correctPerLevel = 2;
  var $levelDiv = $("#level");
  var $flashcard = $("#flashcard");
  var $percentage = $("#percentage");
  var $additionDiv = $("#addition");
  var $subtractionDiv = $("#subtraction");
  var $multiplicationDiv = $("#multiplication");
  var mathType = "addition";
  var $operators = $(".operator");
  var $overlay = $("#overlay");
  var $starDiv = $("#overlay .star");
  var starColors = ["gray", "blue", "green", "red", "purple", "yellow"];

  var stateInfo = {
    addition: {
      level: 1,
      numCorrect: 0,
      numWrong: 0
    },
    subtraction: {
      level: 1,
      numCorrect: 0,
      numWrong: 0
    },
    multiplication: {
      level: 1,
      numCorrect: 0,
      numWrong: 0
    }
  }
  var state = stateInfo["addition"];

  newCard();

  $answerInput.keyup(function(event) {
    if (event.keyCode == 13) {
      if ($answerInput.val() == answer) {
        state.numCorrect += 1;
        updateProgress(true);
        newCard();
      } else {
        $flashcard.effect("shake");
        state.numWrong += 1;
        updateProgress(false);
      }
      $answerInput.val("");
    }
  })

  function newCard() {
    var firstNumber = getRandomNumber(1,5);
    var secondNumber = getRandomNumber(1,5);
    if (mathType == "subtraction") {
      if (firstNumber < secondNumber) {
        var tmp = firstNumber;
        firstNumber = secondNumber;
        secondNumber = tmp;
      }
      answer = firstNumber - secondNumber;
      $equationDiv.text(firstNumber + " - " + secondNumber);
    } else if (mathType == "multiplication") {
      answer = firstNumber * secondNumber;
      $equationDiv.text(firstNumber + " x " + secondNumber);
    } else {
      answer = firstNumber + secondNumber;
      $equationDiv.text(firstNumber + " + " + secondNumber);
    }
    $answerInput.focus();
  }

  function getRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  function updateProgress(showOverlay) {
    $progressBarFill.width(state.numCorrect % correctPerLevel * progressBarWidth / correctPerLevel);
    var percent = state.numCorrect / (state.numCorrect + state.numWrong) * 100;
    percent = Math.round(percent || 0);
    $percentage.text(percent + "%");

    if (showOverlay && state.numCorrect % correctPerLevel == 0) {
      state.level += 1;
    }
    var levelColor = starColors[state.level % starColors.length];
    $levelDiv.text("Level " + state.level);
    $levelDiv.removeClass().addClass(levelColor);
    if (showOverlay && state.numCorrect % correctPerLevel == 0) {
      $starDiv.text(state.level);
      $starDiv.removeClass().addClass("star " + levelColor);
      $overlay.fadeIn(500).delay(2000).fadeOut(500);
      $flashcard.fadeOut(200).delay(2600).fadeIn(200);
      setTimeout(function() {
        $answerInput.focus();
      }, 3000);
    }
  }

  $("#help").click(function() {
    $("#instructions").slideToggle()
  });

  $additionDiv.click(function() {
    if (mathType != "addition") {
      mathType = "addition";
      state = stateInfo.addition;
      updateProgress(false);
      newCard();
      $operators.removeClass("selected");
      $additionDiv.addClass("selected");
    }
  });

  $subtractionDiv.click(function() {
    if (mathType != "subtraction") {
      mathType = "subtraction";
      state = stateInfo.subtraction;
      updateProgress(false);
      newCard();
      $operators.removeClass("selected");
      $subtractionDiv.addClass("selected");
    }
  });

  $multiplicationDiv.click(function() {
    if (mathType != "multiplication") {
      mathType = "multiplication";
      state = stateInfo.multiplication;
      updateProgress(false);
      newCard();
      $operators.removeClass("selected");
      $multiplicationDiv.addClass("selected");
    }
  });

});
