//top level statements
let divisions = document.getElementsByClassName("slot");
let images = document.getElementsByClassName("img");
//tableau qui sert à retenir ce qui est affiché
let gameBoard = [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty"
];
//tableau remplis temporairement pour aider le CPU à trouver le meilleur coup
let CPUPlacements = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

//reset le board juste pour être sûr
reset();


/**
 * la fonction donne la valeur de base à tous les tableaux (fonction non utilisé, j'ai pas eu le temps de finir le jeu)
 */
function reset(){
    for (let i = 0; i < images.length; i++){
        images[i].setAttribute("src", "");
    }
    for (let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = "empty";
    }
    for (let i = 0; i < CPUPlacements.length; i++){
        CPUPlacements[i] = "";
    }
}

/**
*S'exécute chaque fois que le joueur joue
*
*@param id nombre qui contient l'index de la case que le joueur a cliqué
*/
function update(id){
    console.log("update(id);")

    //vérifie si l'espace est vide, si oui, il place un X et fais jouer le CPU
    if (gameBoard[id] == "empty"){
        images[id].setAttribute("src", "assets\\X.png");
        gameBoard[id] = "X";
        CPU();
    }
}

/**
 * fonction qui sert à faire jouer le CPU.
 * Elle ne contient pas l'IA, elle sert seulement à lire l'info de l'IA et placer son cercle
 */
function CPU(){
    let running = false;    //sert au while
    let winnable = false;   //bool de si c'est possible pour le CPU de gagner
    let aid = false;        //bool de si ya un coup meilleur qu'un autre
    //regarde si le jeu est plein ou non
    for (let i = 0; i < gameBoard.length; i++){
        if (gameBoard[i] == "empty"){
            running = true;
        }
    }
    CPUhelp("O");
    //regarde si c'est possible de gagner pour le CPU
    for (let i = 0; i < CPUPlacements.length; i++){
        if (CPUPlacements[i] == "A"){
            winnable = true;
        }
    }
    console.log("Winnable: " + winnable)
    if (!winnable){
        CPUhelp("X");
        //regarde si le joueur est sur le bord de gagner
        for (let i = 0; i < CPUPlacements.length; i++){
            if (CPUPlacements[i] == "A"){
                aid = true;
            }
        }
        console.log("Aid: " + aid)
    }

    //si il n'y a pas de coups meilleurs que d'autres et que le millieu est vide, le CPU prends le millieu
    if (!aid && !winnable && gameBoard[4] == "empty"){
                images[4].setAttribute("src", "assets\\O.png");
                images[4].style.width = "90%";
                gameBoard[4] = "O";
                running = false;
    }

    //jeu
    while (running){
        console.log("CPU() running...")
        //si le joueur est sur le bord de gagner
        if (aid){
            let rng = Math.floor(Math.random()*9);
            if (CPUPlacements[rng] == "A"){
                images[rng].setAttribute("src", "assets\\O.png");
                images[rng].style.width = "90%";
                gameBoard[rng] = "O";
                running = false;
            }
        }
        //si le CPU est sur le bord de gagner
        else if(winnable){
            let rng = Math.floor(Math.random()*9);
            if (CPUPlacements[rng] == "A"){
                images[rng].setAttribute("src", "assets\\O.png");
                images[rng].style.width = "90%";
                gameBoard[rng] = "O";
                running = false;
            }
        }
        //jeu aléatoire, car il n'y a pas de coups meilleurs que d'autres
        else{
            let rng = Math.floor(Math.random()*9);
            if (gameBoard[rng] == "empty"){
                images[rng].setAttribute("src", "assets\\O.png");
                images[rng].style.width = "90%";
                gameBoard[rng] = "O";
                running = false;
            }
        }
        
    }
    
}

/**
 * fonction qui remplis le tableau CPUPlacements avec des A à tous les endroits où il trouve des combos du char donné.
 * Cela permet au CPU de voir si le joueur peut gagner au prochain tour ou si il peut lui-même gagner
 * @param {char} char caractère à rechercher
 */
function CPUhelp(char){
    // update CPUPlacements list
    console.log("reset CPUhelp... char = " + char)
    for (let i = 0; i < CPUPlacements.length; i++){
        CPUPlacements[i] = "";
    }
    console.log("done.")
    console.log("filling CPUhelp board")
    //remplis le board temporaire avec les positions du tableau permanent
    for (let i = 0; i < gameBoard.length; i++){
        if (gameBoard[i] == "X"){
            CPUPlacements[i] = "X"
        }
        else if (gameBoard[i] == "O"){
            CPUPlacements[i] = "O";
        }
    }

    for (let i = 0; i < 3; i++){

        // regarde pour des matchs horizontallement
        if (
            ((CPUPlacements[0+(i*3)] == CPUPlacements[1+(i*3)]) && (CPUPlacements[0+(i*3)] == char)) ||
            ((CPUPlacements[0+(i*3)] == CPUPlacements[2+(i*3)]) && (CPUPlacements[0+(i*3)] == char)) ||
            ((CPUPlacements[1+(i*3)] == CPUPlacements[2+(i*3)]) && (CPUPlacements[1+(i*3)] == char))
            ){
                for (let j = 0; j < 3; j++){
                    if (CPUPlacements[j+(i*3)] == ""){
                        CPUPlacements[j+(i*3)] = "A";
                    }
                }
            }

        //regarde pour des matchs verticalement
        if (
            ((CPUPlacements[i+(0*3)] == CPUPlacements[i+(1*3)]) && (CPUPlacements[i+(0*3)] == char)) ||
            ((CPUPlacements[i+(0*3)] == CPUPlacements[i+(2*3)]) && (CPUPlacements[i+(0*3)] == char)) ||
            ((CPUPlacements[i+(1*3)] == CPUPlacements[i+(2*3)]) && (CPUPlacements[i+(1*3)] == char))
            ){
                for (let j = 0; j < 3; j++){
                    if (CPUPlacements[i+(j*3)] == ""){
                        CPUPlacements[i+(j*3)] = "A";
                    }
                }  
        }
    }
    //regarde pour des matchs diagonalement
    //première diagonale
    if (
        ((CPUPlacements[0] == CPUPlacements[4]) && (CPUPlacements[0] == char)) ||
        ((CPUPlacements[0] == CPUPlacements[8]) && (CPUPlacements[0] == char)) ||
        ((CPUPlacements[4] == CPUPlacements[8]) && (CPUPlacements[4] == char))
        ){
        for (let i = 0; i < 3; i++){
            if (CPUPlacements[i*4] == ""){
                CPUPlacements[i*4] = "A";
            }
        }
    }
    //deuxième diagonale
    if (
        ((CPUPlacements[2] == CPUPlacements[4]) && (CPUPlacements[2] == char)) ||
        ((CPUPlacements[2] == CPUPlacements[6]) && (CPUPlacements[2] == char)) ||
        ((CPUPlacements[4] == CPUPlacements[6]) && (CPUPlacements[4] == char)) 
        ){
        for (let i = 0; i < 3; i++){
            if (CPUPlacements[2+(i*2)] == ""){
                CPUPlacements[2+(i*2)] = "A";
            }
        }
    }

    //petit debug (fais un console.log de la liste CPUPlacements[])
    for (let i = 0; i < CPUPlacements.length; i++){
        console.log(i + CPUPlacements[i])
    }
}

/**
 * début d'un truc que j'ai pas eu le temps de faire
 */
function winCheck(){
    for (let i = 0 ; i < 3; i++){
        // check horizontally
    }
}
function mailTo(){
    window.open("mailto:alexbel.yoshi@gmail.com")
}