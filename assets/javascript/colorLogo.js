// 

var colors = ["#009bd9", "#fccf00", "#e62310", "#44af35"]; // blue, yellow, red, green

var colorIndex = -1;
function colorToUse() {
    if (colorIndex > colors.length - 2) {
        colorIndex = 0;
    } else {
        colorIndex++;
    }
    return colors[colorIndex];
}

$(document).ready(function () {
    var textToColor = $("#header").text().split("");
    $("#header").empty();
    textToColor.forEach(function(element) {
        var newTextToInsert = $("<span>").text(element);
        if (element !== " ") {
            $(newTextToInsert).css("color", colorToUse());
        }
        $("#header").append(newTextToInsert);
    });
})