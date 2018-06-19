// Features to add: 
    // Dynamic # of answer buttons based on # of possible answers in the 'questions' object (currently assumes 4 possible answers for all questions)

var numQuestions = questions.length;
var currentQuestion = -1;
var currentAnswer;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var finalScore;

$(document).ready(function() {

    // function reset() {
    //     currentQuestion = -1;
    //     userAnswers = [];
    // ... etc
        
    // }

    $("#num-questions").text(numQuestions);
    
    $("#start-btn").click(function(){
        $("#game-start-screen").addClass("d-none");
        $("#question-screen").removeClass("d-none");
        nextQuestion();
    });

    $(".possible-answers").click(function() {
        $("#next-question-btn").removeClass("d-none"); // TO-DO: temporary until timers implemented
        currentAnswer = $(this).text();
        questionResult();
        // TO-DO: need to make buttons unclickable on question result screen
    });

    $("#next-question-btn").click(function() { // TO-DO: temporary until timers implemented
        $("#next-question-btn").addClass("d-none");
        nextQuestion();
    })

    function nextQuestion() {
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
            gameResults();
        }
    };

    function questionResult() {
            if (currentAnswer === questions[currentQuestion].correctAnswer) {
                numCorrect++;
            } else if (currentAnswer === null) {
                numUnanswered++;
            } else {
                numIncorrect++;
            }

            $(".possible-answers").each(function(index) {
                if ($(this).text() === questions[currentQuestion].correctAnswer) {
                    $(this).addClass("btn-success");
                } else if ($(this).text() === currentAnswer) {
                    $(this).addClass("btn-danger");
                }
            });
            var imgURL = "assets/images/" + questions[currentQuestion].answerImage;
            console.log(imgURL);
            $("#answer-image").attr("src", imgURL);
            $("#answer-text").text(questions[currentQuestion].answerText);
            $("#question-result").removeClass("d-none");
    }

    function gameResults() {
        $("#question-screen").addClass("d-none");
        finalScore = Math.floor((numCorrect / (numIncorrect + numUnanswered + numCorrect))*100);
        $("#final-score").text(finalScore);
        $("#num-correct").text(numCorrect);
        $("#num-incorrect").text(numIncorrect);
        $("#num-unanswered").text(numUnanswered);
        $("#game-over-screen").removeClass("d-none");
    };
});