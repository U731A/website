let menu = document.getElementById("div-main");
let game = document.getElementById("game");
let gameText = document.getElementById("game-text");
let mode = 0;
let timer = 0;

let gameState = 0;
let mousePosition = [0,0];
function Play(input){
    menu.style.display = "none";
    game.style.display = "block";
    gameState = 1;
    mode = input;
    
    // zen mode
    if (mode == 0){
        gameState = 0;
        gameText.innerText = "Zen mode. You can do nothing. Refresh to go back."
    }
    if (mode == 1){
        gameText.innerText = "Casual mode. Press ENTER to start doing nothing"
    }
    if (mode == 2){
        gameText.innerText = "Competitive mode. Press ENTER to start doing nothing"
    }
}
document.onkeydown = function(key){
    changeText(key);
}
document.onmousemove = function(){
    changeText("cursorMove");
}
function changeText(key){
    if (gameState == 1){
        if (key.keyCode == 13){
            gameState = 2;
            gameText.innerText = "You are doing nothing.";
            timer = 0;
            playTimer();
        }
    }
    else if (gameState == 2){
        gameText.innerText = "Oh no! Looks like you did something!";
        gameState = 1;

        if (mode == 2){
            gameText.innerText += " You did nothing for " + timer + " seconds.";
        }
    }
}
function playTimer(){
    let interval = setInterval(function () {
        if (gameState == 2){
            timer++;
            if (mode == 2){
                gameText.innerText = "You've been doing nothing for " + timer + " seconds.";
            }
        }
        else{
            interval = clearInterval();
        }
            
    }, 1000);
}