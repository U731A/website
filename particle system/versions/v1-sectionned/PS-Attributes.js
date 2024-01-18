//File by U731 / Nola
//make sure to read the TOS on gumroad.
//if you have any questions, you can join my discord server and either ask your question in the #help channel or directly in DMs to me.
//https://discord.gg/NxMTPH6ZYV
const attributes = {
    "lifeSpan"          : 100,  //in miliseconds
    "emissionRate"      : 100,   //number of ticks inbetween each particles
    "restartAfter"      : 100, //restart the list after [...] (will not restart the particle system, just restart the position index) if a particle is not part of the list anymore, it will not react to anything. it will continue moving, but without collisions or interactions.

//-----------------------------------------------------------------------------------

    //definitive properties

    "velocityX"             : 5,    //0 for none (starting velocity)
    "velocityY"             : 0,    //0 for none (starting velocity)

    "gravityStrength"       : 0,    //0 for none
    "maxGravitySpeed"       : 0,    //0 for none

    "rotationSpeed"         : 0,    //0 for none
    "startingRotation"      : 0,    //in degrees (0 to 360)

    "size"                  : 1,    //1 is default
    
//-----------------------------------------------------------------------------------

    //sinus influenced speed
    //a = strength
    //b = length
    //h = start position
    //k = start height
    "sinXA"                 : 0,    //0 for no effect   EFFECT STRENGTH
    "sinXB"                 : 0,  //0 for no effect   EFFECT LENGTH
    "sinXH"                 : 0,    //0 for default
    "sinXK"                 : 0,   //0 for default

    "sinYA"                 : 0,    //0 for no effect   EFFECT STRENGTH
    "sinYB"                 : 0,    //0 for no effect   EFFECT LENGTH
    "sinYH"                 : 0,   //0 for default
    "sinYK"                 : 0,    //0 for default

    //sinus functions give a wave motion to your particle. It's pretty useful to make smoke

//-----------------------------------------------------------------------------------

    //falloffs
    "rotationFalloff"       : 1, //1 for none (1.1 is a lot. I personally like to use values close to 1.01)
    "velocityXFalloff"      : 1, //1 for none
    "velocityYFalloff"      : 1, //1 for none
    "sizeFalloff"           : 1, //1 for none

    //sinus falloff
    "sinFalloffXA"          : 1, //1 for none X sin function, A property
    "sinFalloffXB"          : 1, //1 for none

    "sinFalloffYA"          : 1, //1 for none
    "sinFalloffYB"          : 1, //1 for none

    //Falloffs make the propertie's strenght degrade over time.
    //1 is no change
    //0 to 1 is increase
    //more than one is decrease

    //the calculus looks like this example (velocityX) : velocityX = velocityX / velocityXFalloff;
    //which is executed at every frame. 

//-----------------------------------------------------------------------------------

    //randomness
    "randomStartingVelocityX": 0,    //0 for none
    "randomStartingVelocityY": 0,    //0 for none
    "randomStartingRotation": 0,   //in degrees (0 to 360)
    "randomRotationSpeed"   : 0,     //0 for none
    "randomSize"            : 0,     //0 for none

    //sinus randomness
    "randomSinXA"           : 0,    //0 for none (randomizes the "a")
    "randomSinXB"           : 0,    //0 for none (randomizes the "b")
    "randomSinXH"           : 0, //0 for none (randomizes the "h")
    "randomSinXK"           : 0,    //0 for none (randomizes the "k")

    "randomSinYA"           : 0,    //0 for none (randomizes the "a")
    "randomSinYB"           : 0,    //0 for none (randomizes the "b")
    "randomSinYH"           : 0,    //0 for none (randomizes the "h")
    "randomSinYK"           : 0,    //0 for none (randomizes the "k")

    //random values are added to the fixed value, so if you want a random starting rotation from -90deg to 90,
    //just put the fixed starting rotation to -90 and put the random starting one at 180

//-----------------------------------------------------------------------------------

    //colliders
    "colliders" : document.getElementsByClassName("collider"), //must be an array
    "bounce"    : 0, //0 for none

    //note that each particles are part of the class "particle"
    //DO NOT display:none; your colliders. Completely remove them if you want to disable them. using a display none breaks the collision checks.

//-----------------------------------------------------------------------------------

    //particle rendering settings
    "particleHolder"    : document.getElementById("particle-system"), //particle holder, aswell as spawning area
    "imageDir"          : 
        [
            "assets\\ParticleDefaultTexture.png",
        ],
}
//-----------------------------------------------------------------------------------

//FUNCTIONS TRIGGERED BY PARTICLES

/**
 * triggered when a particle is clicked.
 * @param {number} index position of the particle in the particleList list
 */
function clicked(index){
    
}

/**
 * triggered when a particle collides with a collider
 * @param {number} index position of the particle in the particleList list
 */
function collision(index){

}