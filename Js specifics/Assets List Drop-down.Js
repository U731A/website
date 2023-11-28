let order = "by price";
let PricesOrdered = false;
const elementList = [ //je déclare tous les éléments avec les 2 premiers caractère qui définissent le prix
    "00Astral Regulus Texture",
    "06Choco Texture",
    "10Cloak",
    "08Elemental Skins",
    "05Finnicki",
    "06Gana Texture",
    "03Horn Pack",
    "20Laser Tag Vest",
    "10Minecraft Armor",
    "15Overalls",
    "00Particle System",
    "00Projector Companion",
    "08Public Avatars Textures",
    "10Regulus Harness",
    "06Regulus Plush",
    "03Regulus Latex Suit",
    "10Sunset Fit",
];
let priceList = [];
let elementListNoSpaces = [];

removeSpaces();
reorder();

function removeSpaces(){

    //ordered by name
    if (order == "by name" || PricesOrdered == false){
        for (let i = 0; i < elementList.length; i++){
            let stringTemp = "";
            for (let j = 0; j < elementList[i].length; j++){
                if (elementList[i][j] == ' '){
                    stringTemp += "-";
                }
                else {
                    stringTemp += elementList[i][j];
                }
            }
            elementListNoSpaces[i] = stringTemp;
            console.log("converted strings :");
            console.log(stringTemp);
        }
    }
    else if (order == "by price" && PricesOrdered == true){
        for (let i = 0; i < priceList.length; i++){
            let stringTemp = "";
            for (let j = 0; j < priceList[i].length; j++){
                if (priceList[i][j] == ' '){
                    stringTemp += "-";
                }
                else {
                    stringTemp += priceList[i][j];
                }
            }
            elementListNoSpaces[i] = stringTemp;
        }
    }
    



    //send result in console
    console.log("removeSpaces() results : ------------")
    console.log("price list generated? " + PricesOrdered)
    console.log("order " + order)
    for (let i = 0; i < elementListNoSpaces.length; i++){
        console.log(elementListNoSpaces[i]);
    }
}
function reorder(){
    console.log("order = " + order)
    //swap
    if (order == "by name"){
        order = "by price"

        //find divisions
        let shownText = document.getElementById("shown-text")
        let hiddenText = document.getElementById("hidden-text")

        shownText.innerText = "by price";
        hiddenText.innerText = "by name";
        deleteElements();
    }
    else if (order == "by price"){
        order = "by name"

        //find divisions
        let shownText = document.getElementById("shown-text")
        let hiddenText = document.getElementById("hidden-text")

        shownText.innerText = "by name";
        hiddenText.innerText = "by price";
        deleteElements();
    }

    if (order == "by name"){
        console.log("Loading elements by name...");
        removeSpaces();
        for (let i = 0; i < elementList.length; i++){

            let newElement = document.createElement("div");
            newElement.id = elementListNoSpaces[i].substring(2);
            newElement.className = "asset-containers"
            document.getElementById("assets-holder").appendChild(newElement);

            newElement.innerHTML =
            '<img src="Assets/thumbnails&snapshots/' + elementList[i].substring(2) + '.png" alt="Projector snapshot" height="70px" id="asset-img">' +
                    '<h1 class="asset-name">' + elementList[i].substring(2) + '</h1>'+
                    '<a href="https://u731.gumroad.com/l/' + elementListNoSpaces[i].substring(2)+ '"></a>'+
                    '<h1 class="asset-price">' + elementList[i].substring(0,2) + '$CAD' + '</h1>';

            console.log("loaded : " + elementList[i].substring(2))
        }
    }
    else if (order == "by price"){
        console.log("loading elements by price...")
        

            //create a second list with the prices
            let prices = [];
            for (let k = 0; k < elementList.length; k++){
                prices[k] = elementList[k].substring(0,2)
                console.log(k + ". prix: " + prices[k])
            }

            //reorders a new list according to the prices
            priceList = [];
            for (let j = 0; j < elementList.length; j++){
                let cheapestElement = 999;
                let cheapestElementIndex = -1;
                console.log(j + "price list init");

                //trouver le prix le plus bas
                for (let k = 0; k < elementList.length; k++){
                    //console.log("init trouver le prix le plus bas")
                    if (prices[k] < cheapestElement){
                        cheapestElement = prices[k];
                        //console.log("cheapeast element iterations " + k + '. > ' +cheapestElement);
                    }
                }

                if (cheapestElement != 999){
                console.log("init find index");
                    //trouver son indexe
                for (let k = 0; k < prices.length; k++){
                    if (prices[k] == cheapestElement){
                        cheapestElementIndex = k;
                        //console.log("index found : " + k)
                    }
                    else{
                        //console.log("index not found at " + k)
                    }
                    
                }
                priceList[j] = elementList[cheapestElementIndex];
                //console.log("elementList[cheapestElementIndex] = " + elementList[cheapestElementIndex])
                //console.log("PriceList[j] = " + priceList[j])
                //console.log("j = " + j)
                //console.log("cheapest element index = " + cheapestElementIndex)
                prices[cheapestElementIndex] = 999;

                //console.log("---Prices---")
                for (let i = 0; i < prices.length; i++){
                    //console.log(i + ". " + prices[i])
                }
                //console.log("---PriceList---")
                for (let i = 0; i < priceList.length; i++){
                    //console.log(i + ". " + priceList[i])
                }
                }
                
            }
            PricesOrdered = true;
            removeSpaces();

            for (let i = 0; i < priceList.length; i++){

                let newElement = document.createElement("div");
                newElement.id = elementListNoSpaces[i].substring(2);
                newElement.className = "asset-containers"
                document.getElementById("assets-holder").appendChild(newElement);
    
                newElement.innerHTML =
                '<img src="Assets/thumbnails&snapshots/' + priceList[i].substring(2) + '.png" alt="Projector snapshot" height="70px" id="asset-img">' +
                        '<h1 class="asset-name">' + priceList[i].substring(2) + '</h1>'+
                        '<a href="https://u731.gumroad.com/l/' + elementListNoSpaces[i].substring(2)+ '"></a>'+
                        '<h1 class="asset-price">' + priceList[i].substring(0,2) + '$CAD' + '</h1>'
    
                console.log("loaded : " + priceList[i].substring(2))
            }
    }

    //assign special links to appropriate objects
    //projector companion
    let projectorCompanion = document.querySelector("#Projector-Companion a");
    projectorCompanion.href = "HTML Specifics/Assets/Projector Companion.html";
}
function openDropDown(){
    let img = document.getElementById("drop-down-icon")
    img.style.rotate = "180deg";

    let hiddenDiv = document.getElementById("drop-down-hidden")
    hiddenDiv.style.transform = "translateY(-5px)";
}
function resetMenus(){
    //drop down reset
    let img = document.getElementById("drop-down-icon")
    img.style.rotate = "0deg";

    let hidDiv = document.getElementById("drop-down-hidden")
    hidDiv.style.transform = "translateY(-36px)";
}
function deleteElements(){
    //delete all objects (code trouvé sur stackoverflow)
    const elements = document.getElementsByClassName("asset-containers");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function narrowSearch(){

        reorder();
        reorder();

        let search = document.querySelector("#search-field").value;
        let objects = document.getElementsByClassName("asset-name");
        let objectParents = document.getElementsByClassName("asset-containers")

        for (let i = 0; i < objects.length; i++){
            let foundResults = false;
            for (let j = 0; j < objects[i].innerHTML.length; j++){
                if (
                objects[i].innerHTML.substring(j, search.length + j).toLowerCase() == search){
                    foundResults = true;
                }
                    
            }
            if (!foundResults){
                objectParents[i].style.display = "none";
            }
                
            
        }
}
