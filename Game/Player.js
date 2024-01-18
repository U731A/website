let player = {
    "positionX": game.bounds.right / 2,
    "positionY": game.bounds.bottom / 2,
    "velocityX": 0,
    "velocityY": 0,
    "maxVelocity": 7,
    "velocityFalloff": 1.05,
    "element" : document.getElementById("player"),

    "speed" : 0.5,
}
let keysDown = []

document.onkeydown = function(key){
    //0w = 87
    //1a = 65
    //2s = 83
    //3d = 68
    if (key.keyCode == 68){
        keysDown[3] = true;
    }
    else if (key.keyCode == 65){
        keysDown[1] = true;
    }
    else if (key.keyCode == 87){
        keysDown[0] = true;
    }
    else if (key.keyCode == 83){
        keysDown[2] = true;
    }
    
};
document.onkeyup = function(key){
    if (key.keyCode == 68){
        keysDown[3] = false;
    }
    else if (key.keyCode == 65){
        keysDown[1] = false;
    }
    else if (key.keyCode == 87){
        keysDown[0] = false;
    }
    else if (key.keyCode == 83){
        keysDown[2] = false;
    }
}
function move(){
    if (keysDown[0]){

        //check if max velocity is reached
        if (player.velocityY > (player.maxVelocity * -1) + 1){
            player.velocityY -= player.speed;
        }
    }
    if (keysDown[1]){

        //check if max velocity is reached
        if (player.velocityX > (player.maxVelocity * -1) + 1){
            player.velocityX -= player.speed;
        }
    }
    if (keysDown[2]){

        //check if max velocity is reached
        if (player.velocityY < player.maxVelocity - 1){
            player.velocityY += player.speed;
        }
    }
    if (keysDown[3]){

        //check if max velocity is reached
        if (player.velocityX < player.maxVelocity - 1){
            player.velocityX += player.speed;
        }
    }

    let i = true;
    let interval = setInterval(function () {
        if (i){
            updatePosition();
            move();
            i = false;
        }
        else{
            interval = clearInterval();
        }
            
    }, 15);
}
function updatePosition(){

    //update position
    player.positionX += player.velocityX;
    player.positionY += player.velocityY;

    //move
    player.element.style.top = player.positionY + "px";
    player.element.style.left = player.positionX + "px";

    //update velocity
    player.velocityX /= player.velocityFalloff;
    player.velocityY /= player.velocityFalloff;

}
move();