let menu = document.getElementById("div-main");
let game = document.getElementById("game");
let profile = document.getElementById("profile")
let gameText = document.getElementById("game-text");
let mode = 0;
let clock = 0;
let timer = 0;
let isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
let mouseIn = false;
let gameState = 0;

//stats
let stats = {
    "highScore"     : 0,
    "attempts"      : 0,
    "latestScore"   : 0,
    "totalTime"     : 0
}

function Play(input){
    menu.style.display = "none";
    game.style.display = "block";
    profile.style.display = "none";
    gameState = 1;
    mode = input;
    
    // zen mode
    if (mode == 0){
        gameState = 0;
        gameText.innerText = "Zen mode. You can do nothing. Refresh to go back."
    }
    if (mode == 1){
        gameText.innerText = "Casual mode. Press ENTER to start doing nothing"
        if (isMobile){
            gameText.innerText = "Casual mode. Tap to start doing nothing"
        }
    }
    if (mode == 2){
        gameText.innerText = "Competitive mode. Press ENTER to start doing nothing"
        if (isMobile){
            gameText.innerText = "Competitive mode. Tap to start doing nothing"
        }
    }
}
document.onkeydown = function(key){
    ChangeText(key);
}
document.onmousemove = function(){
    ChangeText("cursorMove");
}
document.onfocusout = function(){
    ChangeText("windowBlur");
}
document.onmouseleave = function(){
    mouseIn = false;
}
document.onmouseenter = function(){
    mouseIn = true;
}
function ChangeText(key){
    if (gameState == 1){
        if (key.keyCode == 13){
            if (mouseIn){
                gameState = 2;
                gameText.innerText = "You are doing nothing.";
                timer = 0;
            }
            else{
                alert("Your cursor must be in the website!");
            }
            
        }
        else if(isMobile){
            gameState = 2;
            gameText.innerText = "You are doing nothing.";
            timer = 0;
        }
    }
    else if (gameState == 2){
        gameText.innerText = "Oh no! Looks like you did something!";
        gameState = 1;

        if (mode == 2){
            gameText.innerText += " You did nothing for " + timer + " seconds.";
            stats.latestScore = timer;
            if (timer > stats.highScore){
                stats.highScore = timer;
            }
            stats.attempts++;
            alert("your score : " + timer + " seconds")
        }

        stats.totalTime += timer;
    }
}
function PlayTimer(){
    if (gameState == 2){
        timer++;
        if (mode == 2){
            gameText.innerText = "You've been doing nothing for " + timer + " seconds.";
        }
    }
    else{
        //zen mode
    }
}
GameClock();
function GameClock(){
    let interval = setInterval(function () {
        PlayTimer();
        clock++;
            
    }, 1000);
}
function OpenProfile(){
    menu.style.display = "none";
    game.style.display = "none";
    profile.style.display = "block";

    //delete old h3s
    let elements = document.querySelectorAll(".profile-stat");
    for (let i = 0; i < elements.length; i++){
        elements[i].remove();
    }

    //Reload stats
    let element = document.createElement("h3");
    element.className = "profile-stat";
    element.innerHTML = "High score : " + stats.highScore;
    profile.appendChild(element);

    element = document.createElement("h3");
    element.className = "profile-stat";
    element.innerHTML = "Latest score : " + stats.latestScore;
    profile.appendChild(element);

    element = document.createElement("h3");
    element.className = "profile-stat";
    element.innerHTML = "Attempts : " + stats.attempts;
    profile.appendChild(element);

    element = document.createElement("h3");
    element.className = "profile-stat";
    element.innerHTML = "Total time spent doing nothing : " + stats.totalTime;
    profile.appendChild(element);
}
function GoToMain(){
    menu.style.display = "flex";
    game.style.display = "none";
    profile.style.display = "none";
    gameState = 0;
}
