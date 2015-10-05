$(document).ready(function() {
  // configuration variables
  var progressBarWidth = 90;
  var correctPerLevel = 3;
  var progressBarWidthPerCorrect = progressBarWidth / correctPerLevel;
  var starColors = ["gray", "blue", "green", "red", "purple", "yellow"];

  // jQuery variables
  var $answerInput = $("#answer");
  var $equationDiv = $("#equation");
  var $progressBarFill = $("#progress_bar_fill");
  var $levelDiv = $("#level");
  var $flashcard = $("#flashcard");
  var $percentage = $("#percentage");
  var $additionDiv = $("#addition");
  var $subtractionDiv = $("#subtraction");
  var $multiplicationDiv = $("#multiplication");
  var $operators = $(".operator");
  var $overlay = $("#overlay");
  var $starDiv = $("#overlay .star");
  var $help = $("#help");
  var $instructions = $("#instructions");

  // state variables
  var answer;
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

  // setting initial state
  var operator = "+";
  var mathType = "addition";
  var state = stateInfo["addition"];
  newCard();

  // answer input key listener
  $answerInput.keyup(function(event) {
    // if user hits enter
    if (event.keyCode == 13) {
      // if answer is correct
      if ($answerInput.val() == answer) {
        state.numCorrect += 1;
        updateProgress(true);
        newCard();

      // if answer is false
      } else {
        $flashcard.effect("shake");
        state.numWrong += 1;
        updateProgress(false);
      }

      // always clear answer input
      $answerInput.val("");
    }
  });

  // render a new flashcard
  function newCard() {
    var firstNumber = getRandomNumber(1,5);
    var secondNumber = getRandomNumber(1,5);
    if (mathType == "subtraction") {
      if (firstNumber < secondNumber) {
        // if first number is smaller than the second number, swap them
        var tmp = firstNumber;
        firstNumber = secondNumber;
        secondNumber = tmp;
      }
      answer = firstNumber - secondNumber;
      $equationDiv.text(firstNumber + " - " + secondNumber);
    } else if (mathType == "multiplication") {
      answer = firstNumber * secondNumber;
      $equationDiv.text(firstNumber + " x " + secondNumber);
    } else { // addition
      answer = firstNumber + secondNumber;
      $equationDiv.text(firstNumber + " + " + secondNumber);
    }
    // depending on what happens before this, the input could be out of focus
    $answerInput.focus();
  }

  function getRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  // updates progress bar, level, and percent correct
  // called when answer submitted or the operator changes
  function updateProgress(showOverlay) {
    // update progress bar
    var correctThisLevel = state.numCorrect % correctPerLevel;
    $progressBarFill.width(correctThisLevel * progressBarWidthPerCorrect);
    // update percent correct
    var percent = state.numCorrect / (state.numCorrect + state.numWrong) * 100;
    percent = Math.round(percent || 0);
    $percentage.text(percent + "%");
    // update level number
    if (showOverlay && correctThisLevel == 0) {
      state.level += 1;
    }
    // setting level text in bottom right corner
    var levelColor = starColors[state.level % starColors.length];
    $levelDiv.text("Level " + state.level);
    $levelDiv.removeClass().addClass(levelColor); // removing old class, adding new color

    // show overlay
    if (showOverlay && correctThisLevel == 0) {
      $starDiv.text(state.level);
      $starDiv.removeClass().addClass("star " + levelColor);
      $overlay.fadeIn(500).delay(2000).fadeOut(500);
      $flashcard.fadeOut(200).delay(2600).fadeIn(200);
      setTimeout(function() {
        $answerInput.focus();
      }, 3000);
    }
  }

  $help.click(function() {
    $instructions.slideToggle();
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
