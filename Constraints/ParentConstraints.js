//--------------------------------------PARENT CONSTRAINT-----------------------------------------------\\

//keepActive updateSpeed (the higher the slower)
let speed = 0.1;

//use margin instead of top & left
let margin = false; 

//each object with the specified class will be moved to the object in target[] with the respective position. MUST be an array
let move = 
[
    document.getElementsByClassName("move"),    //0
    document.getElementsByClassName("moveCursor"),
];

//target location of the move[] objects. DO NOT put an array. you can put "cursor" as a string to make it follow the cursor
let target = 
[

    document.getElementById("target"),
    "cursor",

];


let mousePos = [];

document.addEventListener('mousemove', updateMousePos);

       function updateMousePos(event) {
          mousePos = [event.pageX, event.pageY];
       }

//------------------


/**
 * update all positions
 */
function activate(event){

    //make sure that everything is on position: absolute; and set their position
    for (let i = 0; i < move.length; i++){
        for (let j = 0; j < move[i].length; j++){

            let bounds = [];

            if (target[i] == "cursor"){
                bounds = 
                [
                    [mousePos[0], 0],
                    [mousePos[1], 0]
                ]
            }
            else{
                bounds = getBounds(target[i]);
            }


            if (!margin){
                move[i][j].style.position = "absolute";
                move[i][j].style.top = bounds[1][0] + "px";
                move[i][j].style.left = bounds[0][0] + "px";
            }
            else{
                move[i][j].style.position = "absolute";
                move[i][j].style.marginTop = bounds[1][0] + "px";
                move[i][j].style.marginLeft = bounds[0][0] + "px";
            }
            
            
            
            
            
        }
    }
}

/**
 * starts a never ending loop that constantly updates the constraint at the interval of the variable 'speed'
 */
function keepActive(){
    let i = true;
    let interval = setInterval(function () {
        if (i){
            activate();
            keepActive();
            i = false;
        }
        else{
            interval = clearInterval();
        }
            
    }, speed);
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
keepActive();