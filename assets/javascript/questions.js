var questions = shuffle([
    // Correct answer is the first one in the options array
    {
        question: "The earliest archeological evidence of grape wine dates back to",
        correctAnswer: "6000 B.C.",
        options: shuffle(["6000 B.C.", "600 B.C.", "60000 B.C.", "600000 B.C."])
    },
    {
        question: "In the United States, for a wine to be vintage-dated and labeled with a country/location of origin, __% of its volume must be from grapes harvested in that year",
        correctAnswer: "95%",
        options: shuffle(["95%", "51%", "75%", "100%"])
    },
    {
        question: "Burgundy wine is only made in:",
        correctAnswer: "France",
        options: shuffle(["France", "Italy", "United States", "North Pole"])
    },
    {
        question: "Sake is a type of wine made from:",
        correctAnswer: "Rice",
        options: shuffle(["Rice", "Potatoes", "Wheat", "Gasoline"])
    }
]);

function shuffle(array) { // randomizes order
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}