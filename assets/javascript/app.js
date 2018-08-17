// Things I could add to make it better: 
    // Dynamic # of answer buttons based on # of possible answers in the 'questions' object (currently assumes 4 possible answers for all questions)

var numQuestions = questions.length;
var currentQuestion = -1;
var startingTime = 30; // for Countdown Timer
var timeLeft = 30; // for Countdown Timer
var answerResultTimer; // for Answer Result Timer
var displayAnswerDuration = 10; // for Answer Result Timer
var currentAnswer;
var acceptingAnswers = true; // used to prevent multiple button clicks from
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var finalScore;

function toQuestionScreen() {
    $("#game-start-screen").addClass("d-none");
    $("#question-screen").removeClass("d-none");
};

$(document).ready(function() {

    // Define Countdown Timer
    var countdownTimer;
    function updateTime() {
        timeLeft--;
        $("#countdown-timer").text(timeLeft);
        $("#answer-countdown-timer").text(timeLeft);
        if (timeLeft <= 0) {

            clearInterval(countdownTimer);
            
            if (acceptingAnswers === true) {
                toQuestionResult();
            } else if (acceptingAnswers === false) {
                nextQuestion();
            } else {
                console.log("Error");
            }
            
        }
    };

    function resultToNextQuestion() { 
        nextQuestion();
    }

    // Set home screen values
    $("#countdown-timer").text(startingTime);
    $("#answer-countdown-timer").text(displayAnswerDuration);
    $("#num-questions").text(numQuestions);
    $("#question-time-limit").text(startingTime);
    $("#question-review-time").text(displayAnswerDuration);
    
    $("#start-btn").click(function(){
        toQuestionScreen();
        nextQuestion();
    });

    $(".possible-answers").click(function() {

        if (acceptingAnswers === true) {
            // Countdown Timer
            clearInterval(countdownTimer); // after answer is clicked

            $("#countdown-timer-div").addClass("d-none");
            currentAnswer = $(this).text();

            toQuestionResult();
            // TO-DO: need to make buttons unclickable on question result screen
        }
        
    });

    function nextQuestion() {

        acceptingAnswers = true;

        $(".possible-answers-side-text").text("");

        timeLeft = startingTime;
        $("#countdown-timer").text(timeLeft);
        $("#countdown-timer-div").removeClass("d-none");

        // Countdown Timer
        clearInterval(countdownTimer);
        countdownTimer = setInterval(updateTime, 1000);

        // reset button colors
        $(".possible-answers").each(function () {
            $(this).removeClass("btn-danger");
            $(this).removeClass("btn-success");
        });

        // reset answer box
        $("#question-result").addClass("d-none");
        
        currentQuestion++;
        currentAnswer = null;
        if (currentQuestion < questions.length) {
            $(".current-question").text(questions[currentQuestion].question);
            $(".possible-answers").each(function(index) {
                $(this).text(questions[currentQuestion].options[index]);
            });
        } else {
            toGameResults();
        }
    };

    function toQuestionResult() {

        $("#countdown-timer-div").addClass("d-none");

        acceptingAnswers = false;
        
        // Increment counters to show on results page
        if (currentAnswer === questions[currentQuestion].correctAnswer) {
            numCorrect++;
        } else if (currentAnswer === null) {
            numUnanswered++;
        } else {
            numIncorrect++;
        }

        // Change button colors to: Green for Correct Answer, Red for Incorrectly guessed answer
        $(".possible-answers").each(function(index) {
            var sideTextElement = $(".possible-answers-side-text")[index];
            console.log($(".possible-answers-side-text")[index]);
            if ($(this).text() === questions[currentQuestion].correctAnswer) {
                $(this).addClass("btn-success");
                if ($(this).text() === currentAnswer) {
                    $(sideTextElement).text(" <-- You guessed it right!")
                } else { 
                    $(sideTextElement).text(" <-- Correct Answer")
                }
            } else if ($(this).text() === currentAnswer) {
                $(this).addClass("btn-danger");
                $(sideTextElement).text(" <-- Your Guess")
            }
        });

        // Show Answer Information
        var imgURL = "assets/images/" + questions[currentQuestion].answerImage;
        $("#answer-image").attr("src", imgURL);
        $("#answer-text").text(questions[currentQuestion].answerText);
        $("#question-result").removeClass("d-none");

        // Answer Result Timer
        timeLeft = displayAnswerDuration;
        $("#answer-countdown-timer").text(displayAnswerDuration);
        countdownTimer = setInterval(updateTime, 1000);

    };

    function toGameResults() {
        $("#question-screen").addClass("d-none");
        finalScore = Math.floor((numCorrect / (numIncorrect + numUnanswered + numCorrect))*100);
        $("#final-score").text(finalScore);
        $("#num-correct").text(numCorrect);
        $("#num-incorrect").text(numIncorrect);
        $("#num-unanswered").text(numUnanswered);
        $("#game-over-screen").removeClass("d-none");
    };
});
