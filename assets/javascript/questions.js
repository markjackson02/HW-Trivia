var questions = shuffle([
    // Correct answer is the first one in the options array
    {
        question: "In which game did Mario first appear?",
        correctAnswer: "Donkey Kong",
        options: shuffle(["The Legend of Zelda", "Donkey Kong", "Mario Paint", "Dig-Dug"]),
        answerImage: "Donkey_Kong.jpg",
        answerText: "Yep, believe it or not, Mario's first game was Donkey Kong, released in 1981. Back then, though, Donkey Kong was the bad guy, but Mario was still there saving the day."
    },
    {
        question: "Before Mario became Mario, what was his name?",
        correctAnswer: "Jumpman",
        options: shuffle(["Jumpman", "The Plumber", "Redman", "Appleboy"]),
        answerImage: "Jumpman.jpg",
        answerText: "Mario was called Jumpman in Donkey Kong, but had his name changed to Mario, after the landlord of Nintendo of America, who bore resemblence to Jumpman."
    },
    {
        question: "What is Mario's brother's name?",
        correctAnswer: "Luigi",
        options: shuffle(["Luigi", "Toad", "Wario", "Yoshi"]),
        answerImage: "Luigi.png",
        answerText: "What started as a color palette swap, Luigi turned into a character of his own, as Mario's taller, skinnier brother!"
    },
    {
        question: "Yoshi is a character that most resembles a:",
        correctAnswer: "Dinosaur",
        options: shuffle(["Dinosaur", "Mushroom", "Human", "Vine"]),
        answerImage: "Yoshi.png",
        answerText: "Since Super Mario World was supposed to take place in Dinosaur Land, Yoshi was designed as a reptile similar to a large lizard. Since the initial design felt out of place, he was redesigned, making Yoshi related to turtles, with the saddle actually being his shell"
    },
    {
        question: "One of Mario's most successful spin-off series was a racing game, for the Super NES. The name of this series is:",
        correctAnswer: "Mario Kart",
        answerImage: "Mario_Kart.jpg",
        options: shuffle(["Mario Kart", "Mario Racing", "Mario Party", "Need for Mario Speed"]),
        answerText: "Super Mario Kart is the very first Mario Kart game, released in 1992."
    },
    {
        question: "In Super Mario Sunshine for the Gamecube, Mario made friends with a machine. It's name was:",
        correctAnswer: "FLUDD",
        options: shuffle(["Dolphin", "FLUDD", "The magic paintbrush", "It had no name"]),
        answerImage: "FLUDD.jpg",
        answerText: "FLUDD is an amazing water pump that can not only spray water forwards, but also down, allowing Mario to hover, and even rocket himself into the air."

    },
    {
        question: "Mario's first 3D platformer game was:",
        correctAnswer: "Super Mario 64",
        options: shuffle(["Super Mario Sunshine", "Super Mario 64", "Super Mario World", "Mario Paint"]),
        answerImage: "Mario64.jpg",
        answerText: "Along with Pilotwings 64, it was one of the launch games for the Nintendo 64."
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