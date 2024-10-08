let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// start btn
$(".start").click(function(){
    $("#level-title").text("Level" + level)
    nextSequence()
    started = true;
})

// evey btn click
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100)
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor(Math.random() * 3) + 1;   
    let randomChosenColours = buttonColours[randomNum];
    gamePattern.push(randomChosenColours)

    // console.log(randomChosenColours)
    // console.log(gamePattern)

    $("#" + randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColours)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Refresh Page to Play Again");

        setTimeout(() => {
            $("body").removeClass("game-over");
            
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
