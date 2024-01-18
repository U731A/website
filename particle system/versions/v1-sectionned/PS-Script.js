//File by U731 / Nola
//make sure to read the TOS on gumroad.
//if you have any questions, you can join my discord server and either ask your question in the #help channel or directly in DMs to me.
//https://discord.gg/NxMTPH6ZYV



let particleCount = 0;
let particleList = [];

attributes.particleHolder.style.overflow = "hidden";

class Particle{



    constructor(index){

        //variables
        this.areaWidth = attributes.particleHolder.offsetWidth;
        this.areaHeight = attributes.particleHolder.offsetHeight;
        this.startPosX = getPosition(attributes.particleHolder)[0];
        this.startPosY = getPosition(attributes.particleHolder)[1];

        this.velocityX = attributes.velocityX + Math.floor(Math.random()*attributes.randomStartingVelocityX);
        this.velocityY = attributes.velocityY + Math.floor(Math.random()*attributes.randomStartingVelocityY);

        this.sinXA = attributes.sinXA + Math.floor(Math.random()*attributes.randomSinXA*100)/100;
        this.sinXB = attributes.sinXB + Math.floor(Math.random()*attributes.randomSinXB*100)/100;
        this.sinXH = attributes.sinXH + Math.floor(Math.random()*attributes.randomSinXH*100)/100;
        this.sinXK = attributes.sinXK + Math.floor(Math.random()*attributes.randomSinXK*100)/100;

        this.sinYA = attributes.sinYA + Math.floor(Math.random()*attributes.randomSinYA*100)/100;
        this.sinYB = attributes.sinYB + Math.floor(Math.random()*attributes.randomSinYB*100)/100;
        this.sinYH = attributes.sinYH + Math.floor(Math.random()*attributes.randomSinYH*100)/100;
        this.sinYK = attributes.sinYK + Math.floor(Math.random()*attributes.randomSinYK*100)/100;

        this.positionX = Math.floor(Math.random()*this.areaWidth) + this.startPosX;
        this.positionY = Math.floor(Math.random()*this.areaHeight) + this.startPosY;
        this.rotationSpeed = attributes.rotationSpeed + Math.floor(Math.random()*attributes.randomRotationSpeed); 
        this.rotation = attributes.startingRotation + Math.floor(Math.random()*attributes.randomStartingRotation);
        this.size = (attributes.size + Math.floor(Math.random()*attributes.randomSize)) * 10;

        this.index = index;

        //specs
        let newParticle = document.createElement("img");
        newParticle.setAttribute("src", attributes.imageDir[Math.floor(Math.random()*attributes.imageDir.length)]);
        newParticle.setAttribute("onClick", "clicked("+ this.index +")");

        // style
        newParticle.style.position = "absolute";
        newParticle.style.margin = "0px";
        newParticle.style.display = "none";
        newParticle.style.width =  this.size + "px";
        newParticle.className = "particle";

        this.element = newParticle;
        
    }
    //ONLY USE updatePosition() TO SYNC THE PARTICLE
    updatePosition() {
        this.element.style.left = this.positionX.toString()+"px";
        this.element.style.top  = this.positionY.toString()+"px";
    }  
    applyVelocity(iteration){

        for (let i = 0; i < attributes.colliders.length; i++){
            this.feelCollisions(attributes.colliders[i]);
        }
        

        //nouvelle position
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.updatePosition();

        //updater la vélocité
        this.velocityX /= attributes.velocityXFalloff;
        this.velocityY /= attributes.velocityYFalloff;

        //gravité
            if (attributes.maxGravitySpeed > 0){
                if (this.velocityY <= attributes.maxGravitySpeed)
                {
                    this.velocityY *= attributes.gravityStrength;
                    this.velocityY += attributes.gravityStrength
                }
            }
            if (attributes.maxGravitySpeed < 0){
                if (this.velocityY >= attributes.maxGravitySpeed)
                {
                    this.velocityY *= attributes.gravityStrength;
                    this.velocityY += attributes.gravityStrength
                }
            }
        
        

        //rotation
        this.rotation += this.rotationSpeed;
        this.rotationSpeed /= attributes.rotationFalloff;
        this.element.style.rotate = this.rotation+"deg";

        this.element.style.display = "block";

        //update size
        this.size /= attributes.sizeFalloff;
        this.element.style.width = this.size + "px";

        //Sinus speed
        if (this.sinXA != 0){
            //fonction sinusoïdale
            this.velocityX = 
            (this.sinXA)//"a"
            *
            Math.sin
            (
                (this.sinXB)//"b"
                * 
                (
                    iteration //"x"
                    + 
                    (this.sinXH)//"h"
                )
            )
            +
            attributes.sinXK//"k"  
            ;
        }
        if (this.sinYA != 0)
        {
            //fonction sinusoïdale
            this.velocityY = 
            (this.sinYA)//"a"
            *
            Math.sin
            (
                (this.sinYB) //"b"
                *
                (
                    iteration //"x"
                    +
                    (this.sinYH) //"h"
                )
            )
            +
            attributes.sinYK //"k"
            ;
        }

        //sin falloffs
        this.sinXA /= attributes.sinFalloffXA;
        this.sinXB /= attributes.sinFalloffXB;
        this.sinYA /= attributes.sinFalloffYA;
        this.sinYB /= attributes.sinFalloffYB;

    }
    animation(){
        let id = null;
        let iteration = 0;
        let object = this.particleObject;
        id = clearInterval();
        id = setInterval(function () {
            if (iteration == attributes.lifeSpan) 
            {
                clearInterval(id);
                object.autoDestruct();
                
            } 
            else 
            {
                iteration++; 
                object.applyVelocity(iteration);
            }
        }, 10);

    }
    feelCollisions(collider){

        //bounds
        let particle = getBounds(this.element);
        let box = getBounds(collider);

        let bottom = false;

        if (box != particle)
        {

        let heightMid = (box[1][1]-box[1][0])/2 + box[1][0];

        //right
        if (particle[0][1] >= box[0][0] && particle[0][1] <= box[0][1])//check if right bound is touching cube
        {

            if (particle[1][0] <= box[1][1] && particle[1][1] >= box[1][0])//check if cube is fine on the Y axis
            {
                if (this.velocityX > 0)//check if velocity is in the right direction
                {
                    this.velocityX = this.velocityX*-1*attributes.bounce;
                    collision(this.index);
                }
            }
        }

        //left
        if (particle[0][0] >= box[0][0] && particle[0][0] <= box[0][1])//check if right bound is touching cube
        {

            if (particle[1][0] <= box[1][1] && particle[1][1] >= box[1][0])//check if cube is fine on the Y axis
            {
                if (this.velocityX < 0)//check if velocity is in the right direction
                {
                    this.velocityX = this.velocityX*-1*attributes.bounce;
                    collision(this.index);
                }
            }
        }

        //bottom
        if (particle[1][1] >= box[1][0] && particle[1][1] <= box[1][1])//check if right bound is touching cube
        {
            if (particle[0][0] <= box[0][1] && particle[0][1] >= box[0][0])//check if cube is fine on the X axis
            {
                if (this.velocityY > 0)//check if velocity is in the right direction
                {
                    this.velocityY = this.velocityY*-1*attributes.bounce;
                    collision(this.index);
                    bottom = true;
                }
            }
        }

        //top
        if (particle[1][0] <= box[1][1] && particle[1][0] >= box[1][0])//check if right bound is touching cube
        {
            if (particle[0][0] <= box[0][1] && particle[0][1] >= box[0][0])//check if cube is fine on the X axis
            {
                if (this.velocityY < 0)//check if velocity is in the right direction
                {
                    this.velocityY = this.velocityY*-1*attributes.bounce;
                    collision(this.index);
                }
            }
        }
        }
        
        return bottom;
    }
    autoDestruct(){
        attributes.particleHolder.removeChild(this.element);
        particleList[this.index] = undefined;
        this.particleObject = undefined;
    }
}

let container = document.getElementById("particle-system");
function sendParticle(){

    if (particleCount + 1 == attributes.restartAfter){
        particleCount = 0;
    }

    //init particle
    particleList[particleCount] = new Particle(particleCount);
    particleList[particleCount].particleObject = particleList[particleCount];
    container.appendChild(particleList[particleCount].element);

    particleList[particleCount].animation();
    particleCount++;

    let i = true;
    let interval = setInterval(function () {
        if (i){
            sendParticle();
            i = false;
        }
        else{
            interval = clearInterval();
        }
            
    }, attributes.emissionRate);
}

sendParticle();


/**
 * code found on stackoverflow
 * @param {Element} elem find this element's position
 * @returns [0]X [1]Y
 */
function getPosition(elem){
    var x=0;
    var y=0;
    while(true){
        x += elem.offsetLeft;
        y += elem.offsetTop;
        if(elem.offsetParent === null){
            break;
        }
        elem = elem.offsetParent;
    }
    return [x, y];
}

/**
 * returns the boundaries of an object
 * @param {element} elem 
 * @returns {Array} [0][0]left, [0][1]right, [1][0]top, [1][1]bottom. 
 */
function getBounds(elem){
    let pos = elem.getBoundingClientRect();
    return [[pos.left, pos.right], [pos.top, pos.bottom]];
}