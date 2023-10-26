let objects = document.getElementsByClassName("asset-name");
function search(){
    let search = document.getElementById("search-field").value;
    objects = document.getElementsByClassName("asset-name");
    let first = true;
    let concatenatedString = "";

    search = search.toLowerCase();
    console.log("search : " + search);


    clearSpans();

    if (search != null){
        for (let i = 0; i < objects.length; i++){
            let foundResults = false;
            for (let j = 0; j < objects[i].innerHTML.length; j++){
                if (
                objects[i].innerHTML.substring(j, search.length + j).toLowerCase() == search){
                    concatenatedString = objects[i].innerHTML.substring(0, j) + "<span>" + objects[i].innerHTML.substring(j, j+search.length) + "</span>" + objects[i].innerHTML.substring(j+search.length);
                    //console.log("found search!");
                    foundResults = true;
                }
                    //console.log("Objects[i] : " + objects[i].innerHTML.toLowerCase())
                    //console.log("i : " + i)
                    //console.log(j)
                    
            }
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