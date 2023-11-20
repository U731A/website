let particleCount = 0;
let particleList = [];
let attributes = {
    "lifeSpan"          : 100,  //in miliseconds
    "emissionRate"      : 5,    //number of ticks inbetween each particles

    //definitive properties
    "velocityX"             : 0,    //0 for none (starting velocity)
    "velocityY"             : 0,    //0 for none (starting velocity)
    "gravityStrength"       : 5,    //0 for none
    "rotationSpeed"         : 0,    //0 for none
    "startingRotation"      : 0,    //in degrees (0 to 360)
    "size"                  : 1,    //1 is default
    
    //falloffs
    "rotationFalloff"       : 1.01, //1 for none (1.1 is a lot. I personally like to use values close to 1.01)
    "velocityXFalloff"      : 1.01, //1 for none
    "velocityYFalloff"      : 1.1,  //1 for none
    "sizeFalloff"           : 1.1,  //1 for none

    //randomness
    "randomStartingVelocityX": 10,    //0 for none
    "randomStartingVelocityY": 10,    //0 for none
    "randomStartingRotation": 360,    //in degrees (0 to 360)
    "randomRotationSpeed"   : 30,     //0 for none
    "randomSize"            : 10,     //0 for none

    //particle rendering settings
    "particleHolder"    : document.getElementById("particle-system"), //particle holder, aswell as spawning dimensions
    "imageDir"          : "assets\\ParticleDefaultTexture.png",
}
attributes.particleHolder.style.overflow = "hidden";

class Particle{



    constructor(){
        this.areaWidth = attributes.particleHolder.offsetWidth;
        this.areaHeight = attributes.particleHolder.offsetHeight;

        this.velocityX = attributes.velocityX + Math.floor(Math.random()*attributes.randomStartingVelocityX);
        this.velocityY = attributes.velocityY + Math.floor(Math.random()*attributes.randomStartingVelocityY);

        this.positionX = Math.floor(Math.random()*this.areaWidth);
        this.positionY = Math.floor(Math.random()*this.areaHeight);
        this.rotationSpeed = attributes.rotationSpeed + Math.floor(Math.random()*attributes.randomRotationSpeed); 
        this.rotation = attributes.startingRotation + Math.floor(Math.random()*attributes.randomStartingRotation);
        this.size = (attributes.size + Math.floor(Math.random()*attributes.randomSize)) * 10;

        this.index = 0;

        let newParticle = document.createElement("img");
        newParticle.setAttribute("src", attributes.imageDir);

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
    applyVelocity(){

        //nouvelle position
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.updatePosition();

        //updater la vélocité
        this.velocityX /= attributes.velocityXFalloff;
        this.velocityY /= attributes.velocityYFalloff;

        //gravité
        this.positionY += attributes.gravityStrength;
        if (this.velocityY < attributes.gravityStrength || this.velocityY == 0){
            this.velocityY = attributes.gravityStrength;
        }

        //rotation
        this.rotation += this.rotationSpeed;
        this.rotationSpeed /= attributes.rotationFalloff;
        this.element.style.rotate = this.rotation+"deg";

        this.element.style.display = "block";

        //update size
        this.size
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
                object.AutoDestruct();
                
            } 
            else 
            {
                iteration++; 
                object.applyVelocity();
            }
        }, 10);

    }
    AutoDestruct(){
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
            interval - clearInterval();
        }
            
    }, 1);
}





sendParticle();