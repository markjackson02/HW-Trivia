$(document).ready(function() {

    var currentQuestion = -1;
    var currentAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;
    var finalScore;

    // function reset() {
    //     currentQuestion = -1;
    //     userAnswers = [];
    // ... etc
        
    // }
    
    $("#start-btn").click(function(){
        $("#game-start-screen").addClass("d-none");
        $("#question-screen").removeClass("d-none");
        nextQuestion();
    });

    $(".possible-answers").click(function() {
        $("#next-question-btn").removeClass("d-none"); // temporary until timers implemented
        currentAnswer = $(this).text();
        questionResult();
        // TO-DO: need to make buttons unclickable on question result screen
    });

    $("#next-question-btn").click(function() { // temporary until timers implemented
        $("#next-question-btn").addClass("d-none");
        nextQuestion();
    })

    function nextQuestion() {
        $(".possible-answers").each(function () { // reset colors
            $(this).removeClass("btn-danger");
            $(this).removeClass("btn-success");
        });
        
        currentQuestion++;
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
            if (currentAnswer === questions[currentQuestion].correctAnswer) { //make correct answer green
                numCorrect++;
            } else {
                numIncorrect++; // TO-DO: once introduct timers, need to account for unanswered
            }

            $(".possible-answers").each(function(index) {
                if ($(this).text() === questions[currentQuestion].correctAnswer) {
                    $(this).addClass("btn-success");
                } else if ($(this).text() === currentAnswer) {
                    $(this).addClass("btn-danger");
                }
            });
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

