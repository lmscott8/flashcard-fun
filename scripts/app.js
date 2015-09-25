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
  var $levelDiv = $("#level")
  var $flashcard = $("#flashcard")
  var numWrong = 0;
  var $percentage = $("#percentage")


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
    var firstNumber = getRandomNumber(1,5)
    var secondNumber = getRandomNumber(1,5)
    answer = firstNumber + secondNumber
    $equationDiv.text(firstNumber + " + " + secondNumber);
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
})
