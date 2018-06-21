// Features to add: 
    // Dynamic # of answer buttons based on # of possible answers in the 'questions' object (currently assumes 4 possible answers for all questions)

var numQuestions = questions.length;
var currentQuestion = -1;
var startingTime = 5; // seconds
var timeLeft = 5; // seconds
var intervalID = null;
var currentAnswer;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var finalScore;

function toStartScreen() {
    $("#game-start-screen").addClass("d-none");
    $("#question-screen").removeClass("d-none");
};

$(document).ready(function() {

    // Timer
    var countdownTimer;
    function updateTime() {
        timeLeft--;
        $("#countdown-timer").text(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
        }
    };

    // Set home screen values
    $("#starting-time").text(startingTime);
    $("#num-questions").text(numQuestions);
    
    $("#start-btn").click(function(){
        toStartScreen();
        nextQuestion();
    });

    $(".possible-answers").click(function() {

        // Timer
        clearInterval(countdownTimer); // after answer is clicked

        $("#countdown-timer-div").addClass("d-none");
        $("#next-question-btn").removeClass("d-none"); // TO-DO: temporary until timers implemented
        currentAnswer = $(this).text();
        toQuestionResult();
        // TO-DO: need to make buttons unclickable on question result screen
    });

    $("#next-question-btn").click(function() { // TO-DO: temporary until timers implemented
        $("#next-question-btn").addClass("d-none");
        nextQuestion();
    });

    function nextQuestion() {

        $("#countdown-timer-div").removeClass("d-none");
        timeLeft = startingTime;
        console.log("time left at nextQuestion(): " + timeLeft);

        // Timer
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
        
        // Increment counters to show on results page
        if (currentAnswer === questions[currentQuestion].correctAnswer) {
            numCorrect++;
        } else if (currentAnswer === null) {
            numUnanswered++;
        } else {
            numIncorrect++;
        }

        // Change button colors to: Green for Correct Answer, Red for Incorrectly guessed answer
        $(".possible-answers").each(function() {
            if ($(this).text() === questions[currentQuestion].correctAnswer) {
                $(this).addClass("btn-success");
            } else if ($(this).text() === currentAnswer) {
                $(this).addClass("btn-danger");
            }
        });

        // Show Answer Information
        var imgURL = "assets/images/" + questions[currentQuestion].answerImage;
        console.log(imgURL);
        $("#answer-image").attr("src", imgURL);
        $("#answer-text").text(questions[currentQuestion].answerText);
        $("#question-result").removeClass("d-none");
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
