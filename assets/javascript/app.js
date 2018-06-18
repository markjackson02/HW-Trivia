$(document).ready(function() {

    var currentQuestion = -1;
    var currentAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

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
    });

    $("#next-question-btn").click(function() { // temporary until timers implemented
        $("#next-question-btn").addClass("d-none");
        nextQuestion();
    })

    function nextQuestion() {
        //reset green/red success/danger buttons
        $(".possible-asnswers").each(function () {
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
        $(".possible-answers").each(function(index) {
            if ($(this).text === questions[currentQuestion].correctAnswer) { //make correct answer green
                $(this).addClass("btn-success");
                if ($(this).text === currentAnswer) {
                    numCorrect++;
                }
            } else {
                numIncorrect++; // once introduct timers, need to account for unanswered
                if ($(this).text === currentAnswer) { // if user guessed incorrect answer make that one red
                    $(this).addClass("btn-danger");
                }
            }
            
        });
    }

    function gameResults() {
        $("#question-screen").addClass("d-none");
        $("#game-results").removeClass("d-none");
    };
});

