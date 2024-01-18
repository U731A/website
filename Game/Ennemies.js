const game = {
    "bounds" : document.getElementById("sandbox").getBoundingClientRect(),
    "spawnRate": 500,
    "ennemySpeed": 0.1,
    "ennemyMaxSpeed": 4,
    "velocityFalloff": 1.01,
}
class Ennemy {

    constructor(startPos){
        this.size = Math.floor(Math.random()*20)+10;
        this.velocityX = 0;
        this.velocityY = 0;
        
        //start position
        if (startPos == 0){
            this.positionX = Math.floor(Math.random()*game.bounds.right);
            this.positionY = 0;
        }
        else if (startPos == 1){
            this.positionX = 0;
            this.positionY = Math.floor(Math.random()*game.bounds.bottom);
        }
        else if (startPos == 2){
            this.positionX = game.bounds.right;
            this.positionY = Math.floor(Math.random()*game.bounds.bottom);
        }
        else if (startPos == 3){
            this.positionX = Math.floor(Math.random()*game.bounds.right);
            this.positionY = game.bounds.bottom;
        }
        console.log(startPos)

        //element
        let newEnnemy = document.createElement("div");
        newEnnemy.style.position = "absolute";
        newEnnemy.style.margin = "0px";
        newEnnemy.style.display = "block";
        newEnnemy.style.width =  this.size + "px";
        newEnnemy.style.height =  this.size + "px";
        newEnnemy.style.border = "2px solid red"
        newEnnemy.className = "ennemy";

        this.element = newEnnemy;
        this.object = null;
    }
    UpdatePosition(){
        this.element.style.left = this.positionX + "px";
        this.element.style.top = this.positionY + "px";
    }
    Update(){

        if (this.velocityX > (game.ennemyMaxSpeed * -1) && this.velocityX < game.ennemyMaxSpeed){
            if(this.positionX > player.positionX){
                this.velocityX -= game.ennemySpeed;
            }
            else if (this.positionX < player.positionX){
                this.velocityX += game.ennemySpeed;
            }
        }
        
        if (this.velocityY > (game.ennemyMaxSpeed * -1) && this.velocityY < game.ennemyMaxSpeed){
            if (this.positionY > player.positionY){
                this.velocityY -= game.ennemySpeed;
            }
            else if (this.positionY < player.positionY){
                this.velocityY += game.ennemySpeed;
            }
        }
        

        this.UpdateVelocity();
    }
    UpdateVelocity(){

        this.velocityX /= game.velocityFalloff;
        this.velocityY /= game.velocityFalloff;

        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        this.UpdatePosition();
    }
    animation(){
        let id = null;
        let iteration = 0;
        let object = this.object;
        id = clearInterval();
        id = setInterval(function () {
            if (iteration == -1) 
            {
                clearInterval(id);             
            } 
            else 
            {
                object.Update();
                iteration++; 
            }
        }, 10);

    }
}
function spawnEnnemy(){
    let startPos = Math.floor(Math.random()*4)

    let newEnnemy = new Ennemy(startPos);

    document.getElementById("ennemy-holder").appendChild(newEnnemy.element);
    newEnnemy.object = newEnnemy;

    newEnnemy.animation();

    let i = true;
    let interval = setInterval(function () {
        if (i){
            spawnEnnemy();
            i = false;
        }
        else{
            interval = clearInterval();
        }
            
    }, game.spawnRate);
}
spawnEnnemy();
