let menu = document.getElementById("div-main");
let game = document.getElementById("game");
let profile = document.getElementById("profile");
let battlePass = document.getElementById("battle-pass");
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
    "latestScore"   : 0,
    "attempts"      : 0,
    "totalTime"     : 0
}

function Play(input){
    menu.style.display = "none";
    game.style.display = "block";
    profile.style.display = "none";
    battlePass.style.display = "none";
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
    profile.style.display = "flex";
    battlePass.style.display = "none";

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
    battlePass.style.display = "none";

    gameState = 0;
}
function Validate(){
    alert("Validation... Highest score : " + stats.highScore);
}
function OpenSaveMenu(){
    let saveMenu = document.getElementById("save");
    saveMenu.style.display = "flex";
}
function OpenBattlePass() {
    menu.style.display = "none";
    game.style.display = "none";
    profile.style.display = "none";
    battlePass.style.display = "block";
}
//init battlepass
for (let i = 0; i <= 500; i++){
    let level = document.createElement("div");
    level.innerHTML = 
    '<h1 class="level-text f'+ i +'">' + i + '</h1>'+
    '<div onclick="UpdateSkins(' + i + ')" class="level-square f'+ i +'">' + 'Joy</div>'

    level.className = "level f" + i;
    document.getElementById("bp-bounds").appendChild(level)
}
function UpdateSkins(index){
    let elements = document.querySelectorAll("*");

    for (let i = 0; i < document.getElementsByClassName("level").length; i++){
        for (let j = 0; j < elements.length; j++){
            elements[j].classList.remove("g"+ i);
        }
    }

    for (let i = 0; i < elements.length; i++){
        elements[i].classList.add("g"+ index);
    }
}
// --------------------------------------------------------------SAVE SYSTEM-------------------------------------
function GenerateSave(){
    //prompt("this is your save, copy it and keep it.", "heehee");
    let randomBase = Math.floor(Math.random()*30+2);
    let statsHEX = [
        stats.highScore.toString(randomBase),
        stats.latestScore.toString(randomBase),
        stats.attempts.toString(randomBase),
        stats.totalTime.toString(randomBase),
    ]
    let saveFile = "";
    for (let i = 0; i < statsHEX.length; i++){
        if (!(statsHEX[i] == 0)){
            saveFile += statsHEX[i] + "g" + (i.toString().substring(0, 1));
        }
    }

    if (randomBase.toString(16).length != 2){
        randomBase = "0" + randomBase.toString(16);
    }
    else{
        randomBase = randomBase.toString(16);
    }
    if (saveFile == ""){
        saveFile = "you have done nothing. Truly. Congrats."
    }
    else{
        saveFile = (randomBase + "l" + saveFile + "sz" + saveFile + "12m2k2j" + saveFile);
    }
    prompt("this is your save, copy it and keep it.", saveFile);
}
function LoadSave(){
    let saveData = document.getElementById("load-save-input").value;
    let index = -1;
    let invalid = true;

    //remove unnecessary data
    for (let i = 0; i < saveData.length; i++){
        if (saveData.substring(i, i+2) == "sz"){
            index = i;
            invalid = false;
        }
    }

    if (index == -1){
        alert("this code is invalid");
    }
    else{

        saveData = saveData.substring(0, index);
    }

    let key = parseInt(saveData.substring(0,2), 16);
    saveData = saveData.substring(3);

    //deconstruct string
    let temporaryListHex = [];
    let temporaryIndex = -1;
    while ((saveData.length != 0) && !invalid){
        temporaryIndex++;
        let running = true;
        let index = 0;

        //find where first one ends
        while (running && !invalid){
            if (saveData[index] == "g"){
                running = false;
            }
            else if (index == saveData.length){
                alert("invalid save code.");
                invalid = true;
            }
            index++;
        }

        temporaryString = saveData.substring(0, index-1);
        temporaryListHex[temporaryIndex] = parseInt(temporaryString, key);

        saveData = saveData.substring(index+1);

        

    }
    if (!invalid){
        alert("successfully loaded save!");
        for (let i = 0; i < temporaryListHex.length; i++){
            if (i == 0){ stats.highScore = temporaryListHex[i];}
            else if (i == 1){ stats.latestScore = temporaryListHex[i];}
            else if (i == 2){ stats.attempts = temporaryListHex[i];}
            else if (i == 3){ stats.totalTime = temporaryListHex[i];}
        }
    }
    
}
function CloseSave(){
    let saveMenu = document.getElementById("save");
    saveMenu.style.display = "none";
}
//----------------------------------------------------------------SAVE SYSTEM END---------------------------------