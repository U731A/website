//obtenir une liste de tous les assets
let objects = document.getElementsByClassName("asset-name");

//fonction de recherche ( elle permet de highlighter la recherche dans les noms et display: none les assets qui n'ont pas de match avec la recherche)
function search(){
    //déclaration des variables
    let searchBar = document.getElementById("search-field");
    objects = document.getElementsByClassName("asset-name");
    let first = true;
    let concatenatedString = "";

    let search = searchBar.value.toLowerCase();
    console.log("search : " + search);

    searchBar.value = search;

    //appelle la fonction qui enlève tous les <span> pour ne pas briser le prochain code
    clearSpans();

    //gros IF qui va regarder si la recherche est trouvée dans le nom de chaque asset
    if (search != null){
        for (let i = 0; i < objects.length; i++){
            let foundResults = false;
            for (let j = 0; j < objects[i].innerHTML.length; j++){
                if ((objects[i].innerHTML.substring(j, search.length + j).toLowerCase()) == search){
                    concatenatedString = objects[i].innerHTML.substring(0, j) + "<span>" + objects[i].innerHTML.substring(j, j+search.length) + "</span>" + objects[i].innerHTML.substring(j+search.length);
                    //console.log("found search!");
                    foundResults = true;
                }
                    //console.log("Objects[i] : " + objects[i].innerHTML.toLowerCase())
                    //console.log("i : " + i)
                    //console.log(j)
                    
            }
            //si un match a été trouvé, il ajoute les <span>. Les <span> ont un style qui les change en rouge.
            if (foundResults){
                objects[i].innerHTML = concatenatedString;
                //console.log("object: " + objects[i].innerHTML);
                //console.log("concatenated string: " + concatenatedString)
            }
                
            
        }
        first = false;
    }
}
function clearSpans(){


        for (let i = 0; i < objects.length; i++){
            for (let j = 0; j < objects[i].innerHTML.length; j++){
                if (objects[i].innerHTML.substring(j, "<span>".length + j) == "<span>"){
                    objects[i].innerHTML = objects[i].innerHTML.substring(0, j) + objects[i].innerHTML.substring(j+"<span>".length);
                }
            }
        }
        for (let i = 0; i < objects.length; i++){
            for (let j = 0; j < objects[i].innerHTML.length; j++){
                if (objects[i].innerHTML.substring(j, "</span>".length + j) == "</span>"){
                    objects[i].innerHTML = objects[i].innerHTML.substring(0, j) + objects[i].innerHTML.substring(j+"</span>".length);
                }
            }
        }
}