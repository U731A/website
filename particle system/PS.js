let particleCount = 0;
let particleList = [];
const attributes = {
    "lifeSpan"          : 200,  //in miliseconds
    "emissionRate"      : 5,    //number of ticks inbetween each particles

    //definitive properties
    "velocityX"             : 5,    //0 for none (starting velocity)
    "velocityY"             : 5,    //0 for none (starting velocity)
    "gravityStrength"       : 0,    //0 for none
    "rotationSpeed"         : 0,    //0 for none
    "startingRotation"      : 0,    //in degrees (0 to 360)
    "size"                  : 10,    //1 is default
    
    //falloffs
    "rotationFalloff"       : 1.01, //1 for none (1.1 is a lot. I personally like to use values close to 1.01)
    "velocityXFalloff"      : 1.005, //1 for none
    "velocityYFalloff"      : 1.005,  //1 for none
    "sizeFalloff"           : 1.0025,  //1 for none

    //sinus influenced speed
    //a = strength
    //b = length
    //h = start position
    //k = start height
    "sinXA"                 : 0,    //0 for no effect   EFFECT STRENGTH
    "sinXB"                 : 0.1,  //0 for default (cannot have no effect)   EFFECT LENGTH
    "sinXK"                 : 0,   //0 for no effect
    "sinYA"                 : 1,    //0 for no effect   EFFECT STRENGTH
    "sinYB"                 : 0.1,  //0 for default (cannot have no effect)   EFFECT LENGTH
    "sinYK"                 : -2,   //0 for no effect


    //randomness
    "randomStartingVelocityX": 0,    //0 for none
    "randomStartingVelocityY": 0,    //0 for none
    "randomStartingRotation": 0,    //in degrees (0 to 360)
    "randomRotationSpeed"   : 0,     //0 for none
    "randomSize"            : 0,     //0 for none
    //sinus randomness
    "randomSinXH"           : 0,    //0 for none (randomizes the "h")
    "randomSinXA"           : 0,    //0 for none (randomizes the "a")
    "randomSinXB"           : 0,    //0 for none (randomizes the "b")
    "randomSinXK"           : 0,    //0 for none (randomizes the "k")
    "randomSinYH"           : 0,    //0 for none (randomizes the "h")
    "randomSinYA"           : 1,    //0 for none (randomizes the "a")
    "randomSinYB"           : 1,    //0 for none (randomizes the "b")
    "randomSinYK"           : 4,    //0 for none (randomizes the "k")


    //particle rendering settings
    "particleHolder"    : document.getElementById("particle-system"), //particle holder, aswell as spawning dimensions
    "imageDir"          : 
        [
            "assets\\smoketiles\\smoke1.png",
        ],
}
attributes.particleHolder.style.overflow = "hidden";

class Particle{



    constructor(){
        this.areaWidth = attributes.particleHolder.offsetWidth;
        this.areaHeight = attributes.particleHolder.offsetHeight;
        this.startPosX = getPosition(attributes.particleHolder)[0];
        this.startPosY = getPosition(attributes.particleHolder)[1];

        this.velocityX = attributes.velocityX + Math.floor(Math.random()*attributes.randomStartingVelocityX);
        this.velocityY = attributes.velocityY + Math.floor(Math.random()*attributes.randomStartingVelocityY);

        this.positionX = Math.floor(Math.random()*this.areaWidth);
        this.positionY = Math.floor(Math.random()*this.areaHeight);
        this.rotationSpeed = attributes.rotationSpeed + Math.floor(Math.random()*attributes.randomRotationSpeed); 
        this.rotation = attributes.startingRotation + Math.floor(Math.random()*attributes.randomStartingRotation);
        this.size = (attributes.size + Math.floor(Math.random()*attributes.randomSize)) * 10;

        this.index = 0;

        let newParticle = document.createElement("img");
        newParticle.setAttribute("src", attributes.imageDir[Math.floor(Math.random()*attributes.imageDir.length)]);

        // style
        newParticle.style.position = "absolute";
        newParticle.style.margin = "0px";
        newParticle.style.display = "none";
        newParticle.style.width =  this.size + "px";

        this.element = newParticle;
    }
    //ONLY USE updatePosition() TO SYNC THE PARTICLE
    updatePosition() {
        this.element.style.left = this.positionX.toString()+"px";
        this.element.style.top  = this.positionY.toString()+"px";
    }  
    applyVelocity(iteration){

        //nouvelle position
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.updatePosition();

        //updater la vélocité
        this.velocityX /= attributes.velocityXFalloff;
        this.velocityY /= attributes.velocityYFalloff;

        //gravité
        this.positionY += attributes.gravityStrength;

        //rotation
        this.rotation += this.rotationSpeed;
        this.rotationSpeed /= attributes.rotationFalloff;
        this.element.style.rotate = this.rotation+"deg";

        this.element.style.display = "block";

        //update size
        this.size /= attributes.sizeFalloff;
        this.element.style.width = this.size + "px";

        //Sinus speed
        if (attributes.sinXA != 0){
            //fonction sinusoïdale
            this.velocityX = 
            (attributes.sinXA + Math.floor(Math.random()*attributes.randomSinXA))//"a"
            *
            Math.sin
            (
                (attributes.sinXB + Math.floor(Math.random()*attributes.randomSinXB))//"b"
                * 
                (
                    iteration //"x"
                    + 
                    Math.floor(Math.random()*attributes.randomSinXH)//"h"
                )
            )
            +
            Math.floor(Math.random()*attributes.randomSinXK) + attributes.sinXK//"k"  
            ;
        }
        if (attributes.sinYA
     != 0){
            //fonction sinusoïdale
            this.velocityY = 
            (attributes.sinYA
         + Math.floor(Math.random()*attributes.randomSinYA))//"a"
            *
            Math.sin(
                (attributes.sinYB + Math.floor(Math.random()*attributes.randomSinYB)) //"b"
                *
                (
                    iteration //"x"
                    +
                    Math.floor(Math.random()*attributes.randomSinYH) //"h"
                )
            )
            +
            Math.floor(Math.random()*attributes.randomSinYK) + attributes.sinYK //"k"
            ;
        }

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
    autoDestruct(){
        attributes.particleHolder.removeChild(this.element);
        particleList[this.index] = undefined;
        this.particleObject = undefined;
    }
}

let container = document.getElementById("particle-system");
function sendParticle(){
    if (attributes[0] == undefined){
        particleCount = 0;
    }

    //init particle
    particleList[particleCount] = new Particle();
    particleList[particleCount].particleObject = particleList[particleCount];
    container.appendChild(particleList[particleCount].element);
    particleList[particleCount].index = particleCount;

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

function getPosition(ele){
    var x=0;
    var y=0;
    while(true){
        x += ele.offsetLeft;
        y += ele.offsetTop;
        if(ele.offsetParent === null){
            break;
        }
        ele = ele.offsetParent;
    }
    return [x, y];
}