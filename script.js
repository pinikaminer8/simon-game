const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false
let level = 0;
let header = document.getElementById("level-title");
let body = document.querySelector("body");

document.addEventListener('keydown', function () {
    if (!gameStart){
        header.innerHTML = "Level " + level;
        nextSequence();
        gameStart = true;
    }
})

const buttons = document.querySelectorAll('.btn'); 
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                1000
            })
        }
    }else{
        playSound("wrong");
        body.classList.add("game-over");
        header.innerHTML = "Game Over, Press Any Key to Restart";
        setTimeout(function(){
        body.classList.remove("game-over");
        }, 200)
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    header.innerHTML = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){    
    let button = document.querySelector("#" + currentColour);
    button.classList.add("pressed");
    setTimeout(function(){
    button.classList.remove("pressed");
    }, 100)
    }

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}