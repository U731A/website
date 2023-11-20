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
let CPUplacements = [
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

//reset le board just pour être sûr
reset();


//la fonction donne la valeur de base à tous les tableaux (fonction non utilisé, j'ai pas eu le temps de finir le jeu)
function reset(){
    for (let i = 0; i < images.length; i++){
        images[i].setAttribute("src", "");
    }
    for (let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = "empty";
    }
    for (let i = 0; i < CPUplacements.length; i++){
        CPUplacements[i] = "";
    }
}

//s'éxécute quand le joueur clique un carré
function update(id){
    console.log("update(id);")

    //vérifie si l'espace est vide, si oui, il place un X et fais jouer le CPU
    if (gameBoard[id] == "empty"){
        images[id].setAttribute("src", "assets\\X.png");
        gameBoard[id] = "X";
        CPU();
    }
}

//tour du CPU
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
    for (let i = 0; i < CPUplacements.length; i++){
        if (CPUplacements[i] == "A"){
            winnable = true;
        }
    }
    console.log("Winnable: " + winnable)
    if (!winnable){
        CPUhelp("X");
        //regarde si le joueur est sur le bord de gagner
        for (let i = 0; i < CPUplacements.length; i++){
            if (CPUplacements[i] == "A"){
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
            if (CPUplacements[rng] == "A"){
                images[rng].setAttribute("src", "assets\\O.png");
                images[rng].style.width = "90%";
                gameBoard[rng] = "O";
                running = false;
            }
        }
        //si le CPU est sur le bord de gagner
        else if(winnable){
            let rng = Math.floor(Math.random()*9);
            if (CPUplacements[rng] == "A"){
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

//fonction qui remplis le tableau CPUplacements avec des "A" pour montrer les bons coups au CPU
function CPUhelp(char){
    // update CPUplacements list
    console.log("reset CPUhelp... char = " + char)
    for (let i = 0; i < CPUplacements.length; i++){
        CPUplacements[i] = "";
    }
    console.log("done.")
    console.log("filling CPUhelp board")
    //remplis le board temporaire avec les positions du tableau permanent
    for (let i = 0; i < gameBoard.length; i++){
        if (gameBoard[i] == "X"){
            CPUplacements[i] = "X"
        }
        else if (gameBoard[i] == "O"){
            CPUplacements[i] = "O";
        }
    }

    for (let i = 0; i < 3; i++){

        // regarde pour des matchs horizontallement
        if (
            ((CPUplacements[0+(i*3)] == CPUplacements[1+(i*3)]) && (CPUplacements[0+(i*3)] == char)) ||
            ((CPUplacements[0+(i*3)] == CPUplacements[2+(i*3)]) && (CPUplacements[0+(i*3)] == char)) ||
            ((CPUplacements[1+(i*3)] == CPUplacements[2+(i*3)]) && (CPUplacements[1+(i*3)] == char))
            ){
                for (let j = 0; j < 3; j++){
                    if (CPUplacements[j+(i*3)] == ""){
                        CPUplacements[j+(i*3)] = "A";
                    }
                }
            }

        //regarde pour des matchs verticalement
        if (
            ((CPUplacements[i+(0*3)] == CPUplacements[i+(1*3)]) && (CPUplacements[i+(0*3)] == char)) ||
            ((CPUplacements[i+(0*3)] == CPUplacements[i+(2*3)]) && (CPUplacements[i+(0*3)] == char)) ||
            ((CPUplacements[i+(1*3)] == CPUplacements[i+(2*3)]) && (CPUplacements[i+(1*3)] == char))
            ){
                for (let j = 0; j < 3; j++){
                    if (CPUplacements[i+(j*3)] == ""){
                        CPUplacements[i+(j*3)] = "A";
                    }
                }  
        }
    }
    //regarde pour des matchs diagonalement
    //première diagonale
    if (
        ((CPUplacements[0] == CPUplacements[4]) && (CPUplacements[0] == char)) ||
        ((CPUplacements[0] == CPUplacements[8]) && (CPUplacements[0] == char)) ||
        ((CPUplacements[4] == CPUplacements[8]) && (CPUplacements[4] == char))
        ){
        for (let i = 0; i < 3; i++){
            if (CPUplacements[i*4] == ""){
                CPUplacements[i*4] = "A";
            }
        }
    }
    //deuxième diagonale
    if (
        ((CPUplacements[2] == CPUplacements[4]) && (CPUplacements[2] == char)) ||
        ((CPUplacements[2] == CPUplacements[6]) && (CPUplacements[2] == char)) ||
        ((CPUplacements[4] == CPUplacements[6]) && (CPUplacements[4] == char)) 
        ){
        for (let i = 0; i < 3; i++){
            if (CPUplacements[2+(i*2)] == ""){
                CPUplacements[2+(i*2)] = "A";
            }
        }
    }

    //petit debug (fais un console.log de la liste CPUplacements[])
    for (let i = 0; i < CPUplacements.length; i++){
        console.log(i + CPUplacements[i])
    }
}

//début d'un truc que j'ai pas eu le temps de faire
function winCheck(){
    for (let i = 0 ; i < 3; i++){
        // check horizontally
    }
}