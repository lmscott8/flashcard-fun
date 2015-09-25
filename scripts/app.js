$(document).ready(function() {
  var $answerInput = $("#answer");
  var $equationDiv = $("#equation");
  var answer;
  var operator = "+";
  var numCorrect = 0;
  var $progressBarFill = $("#progress_bar_fill");
  var progressBarWidth = 90;
  var correctPerLevel = 2;
  var level = 1;
  var $levelDiv = $("#level");
  var $flashcard = $("#flashcard");
  var numWrong = 0;
  var $percentage = $("#percentage");
  var $additionDiv = $("#addition");
  var $subtractionDiv = $("#subtraction");
  var $multiplicationDiv = $("#multiplication");
  var mathType = "addition";
  var $operators = $(".operator");


  newCard();

  $answerInput.keyup(function(event) {
    if (event.keyCode == 13) {
      if ($answerInput.val() == answer) {
        numCorrect += 1;
        updateProgress();
        newCard();
      } else {
        $flashcard.effect("shake");
        numWrong += 1;
      }
      $answerInput.val("");
      var percent = numCorrect / (numCorrect + numWrong) * 100;
      percent = Math.round(percent);
      $percentage.text(percent + "%");
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

  function updateProgress() {
    $progressBarFill.width(numCorrect % correctPerLevel * progressBarWidth / correctPerLevel);
    if (numCorrect % correctPerLevel == 0) {
      level += 1;
      $levelDiv.text("Level " + level);
    }
  }

  $("#help").click(function() {
    $("#instructions").slideToggle()
  });

  $additionDiv.click(function() {
    if (mathType != "addition") {
      mathType = "addition";
      newCard();
      $operators.removeClass("selected");
      $additionDiv.addClass("selected");
    }
  });

  $subtractionDiv.click(function() {
    if (mathType != "subtraction") {
      mathType = "subtraction";
      newCard();
      $operators.removeClass("selected");
      $subtractionDiv.addClass("selected");
    }
  });

  $multiplicationDiv.click(function() {
    if (mathType != "multiplication") {
      mathType = "multiplication";
      newCard();
      $operators.removeClass("selected");
      $multiplicationDiv.addClass("selected");
    }
  });

});
