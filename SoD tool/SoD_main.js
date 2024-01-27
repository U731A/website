let city;
let currentCity = -1;
let main = document.getElementById("main");
let explorer = document.getElementById("city-explorer");

function InitArchives(){
    let list = document.getElementById("archive-list");

    list.innerHTML = '<h1 id="load-button" onclick="LoadSave()">Load city from text <input type="text" id="load-data"></h1>';

    for (let i = 0; i < cities.length; i++){
        let newCity = document.createElement("div");
        newCity.className = "city";
        newCity.id = cities[i].id;

        let newCityHTML = '<h1 class="city-title">' + cities[i].name + "</h1>" +
        '<h3>Select a profile :</h3>'+
        '<select class="profile-select">';
        for (let j = 0; j < cities[i].profiles.length; j++){
            newCityHTML += '<option value="'+ cities[i].profiles[j] + '">'+ cities[i].profiles[j] + '</option>'
        }
        newCityHTML += "</select>"+
        '<h1 onclick="LoadCity('+ i +')" class="city-button" >></h1>';

        newCity.innerHTML = newCityHTML;
        list.appendChild(newCity);
    }
    
}
InitArchives();

function GoToMain(){
    main.style.display = "flex";
    explorer.style.display = "none";

    
    //remove old people list
    let people = document.getElementsByClassName("person");
    
    while (people.length != 0){
        people[0].remove();
    }
}
function GoToExplorer(){
    main.style.display = "none";
    explorer.style.display = "flex";
}
//Load City
function LoadCity(cityIndex){
    currentCity = cityIndex;

    let deprecatedPeople = document.getElementsByClassName("person");
    while (deprecatedPeople.length != 0){
        deprecatedPeople[0].remove();
    }
    

    //create new people
    for (let i = 0; i < cities[cityIndex].population; i++){
        let person = cities[cityIndex].people[i];
        let newPerson = document.createElement("div");
        newPerson.className = "person";
        newPerson.id = "f"+i;

        newPerson.innerHTML =   '<div class="person-title" onclick="OpenProfile('+i+')">'+
                                    '<h1>' + person.id + " " + person.name + "</h1>"+
                                    '<h1>' + person.lastName + '</h1>'+
                                '</div>'+
                                '<div class="person-attributes">'+
                                    '<h1 class="edit-button" onclick="EditContent('+i+')">Edit</h1>'+
                                    '<div class="person-subdivider">'+
                                        '<div class="person-left">'+
                                            '<p>'+"Name : "+ person.name +'</p>'+
                                            '<p>'+"Last Name : "+ person.lastName +'</p>'+
                                            '<p>'+"Picture : "+ person.picture +'</p>'+
                                            '<p>'+"Vocal identification : "+ person.vocalID +'</p>'+
                                            '<p>'+"Fingerprint : "+ person.fingerPrint +'</p>'+
                                            '<p>'+"Age : "+ person.age +'</p>'+
                                            '<p>'+"Date of birth : "+ person.dateOfBirth +'</p>'+
                                            '<p>'+"Gender : "+ person.sex +'</p>'+
                                            '<p>'+"Height : "+ person.height +'</p>'+
                                            '<p>'+"Body Shape : "+ person.bodyShape +'</p>'+
                                            '<p>'+"Hair : "+ person.hair +'</p>'+
                                            '<p>'+"Eye color : "+ person.eyes +'</p>'+
                                            '<p>'+"Shoe size : "+ person.shoeSize +'</p>'+
                                        '</div>'+
                                        '<div class="person-right">'+
                                            '<p>'+"Glasses : "+ person.glasses +'</p>'+
                                            '<p>'+"Facial Hair : "+ person.facialHair +'</p>'+
                                            '<p>'+"Blood Type : "+ person.bloodType +'</p>'+
                                            '<p>'+"Address : "+ person.address +'</p>'+
                                            '<p>'+"Phone Number : "+ person.phone +'</p>'+
                                            '<p>'+"Workplace : "+ person.workplace +'</p>'+
                                            '<p>'+"Duty : "+ person.duty +'</p>'+
                                            '<p>'+"Work Schedule : "+ person.workSchedule +'</p>'+
                                            '<p>'+"Salary : "+ person.salary +'</p>'+
                                            '<p>'+"Writing type : "+ person.writing +'</p>'+
                                            '<p>'+"Passcode : "+ person.passCode +'</p>'+
                                            '<p>'+"Arrested before : "+ person.arrestedBefore +'</p>'+
                                            '<p>'+"Additionnal notes : "+ person.notes +'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'
        document.getElementById("people-holder").appendChild(newPerson);
        //console.log("loading person " + i + " | " + person.id)
    }

    GoToExplorer();
}
function OpenProfile(index){
    let toHide = document.getElementsByClassName("person-attributes");
    //console.log("open profile " + toHide.length)
    for (let i = 0; i < toHide.length; i++){
        toHide[i].style.height = "0vh";
    }

    let attribute = document.querySelector("#f"+index+" .person-attributes");

    attribute.style.height = "auto";
}
function EditContent(index){
    let editButton = document.querySelector("#f"+index+" .edit-button")
    editButton.innerHTML = "Save";
    editButton.setAttribute("onclick", "SaveMods("+index+")")


    let element = document.querySelectorAll("#f"+index+" .person-left *, " + "#f"+index+" .person-right *")
    for (let i = 0; i < element.length; i++){
        element[i].remove();
    }

    //create new people
    for (let i = 0; i < cities[currentCity].population; i++){
        let person = cities[currentCity].people[index];
        let newPerson = document.querySelector("#f"+index+" .person-subdivider");

        newPerson.innerHTML =   
                                '<div class="person-left">'+
                                    '<p>'+"Name :"+                 '<input type="text" id="person-name" value="'+ person.name +'">' +'</p>'+
                                    '<p>'+"Last Name :"+            '<input type="text" id="person-lastName" value="'+ person.lastName +'">' +'</p>'+
                                    '<p>'+"Picture :"+              '<input type="text" id="person-picture" value="'+ person.picture +'">' +'</p>'+
                                    '<p>'+"Vocal identification :"+ '<input type="text" id="person-vocalID" value="'+ person.vocalID +'">' +'</p>'+
                                    '<p>'+"Fingerprint : "+         '<input type="text" id="person-fingerPrint" value="'+ person.fingerPrint +'">' +'</p>'+
                                    '<p>'+"Age : "+                 '<input type="text" id="person-age" value="'+ person.age +'">' +'</p>'+
                                    '<p>'+"Date of birth : "+       '<input type="text" id="person-dateOfBirth" value="'+ person.dateOfBirth +'">' +'</p>'+
                                    '<p>'+"Gender : "+              '<input type="text" id="person-sex" value="'+ person.sex +'">' +'</p>'+
                                    '<p>'+"Height : "+              '<input type="text" id="person-height" value="'+ person.height +'">' +'</p>'+
                                    '<p>'+"Body Shape : "+          '<input type="text" id="person-bodyShape" value="'+ person.bodyShape +'">' +'</p>'+
                                    '<p>'+"Hair : "+                '<input type="text" id="person-hair" value="'+ person.hair +'">' +'</p>'+
                                    '<p>'+"Eye color : "+           '<input type="text" id="person-eyes" value="'+ person.eyes +'">' +'</p>'+
                                    '<p>'+"Shoe size : "+           '<input type="text" id="person-shoeSize" value="'+ person.shoeSize +'">' +'</p>'+
                                '</div>'+
                                '<div class="person-right">'+
                                    '<p>'+"Glasses :"+              '<input type="text" id="person-glasses" value="'+ person.glasses +'">' +'</p>'+
                                    '<p>'+"Facial Hair :"+          '<input type="text" id="person-facialHair" value="'+ person.facialHair +'">' +'</p>'+
                                    '<p>'+"Blood Type :"+           '<input type="text" id="person-bloodType" value="'+ person.bloodType +'">' +'</p>'+
                                    '<p>'+"Address :"+              '<input type="text" id="person-address" value="'+ person.address +'">' +'</p>'+
                                    '<p>'+"Phone Number : "+        '<input type="text" id="person-phone" value="'+ person.phone +'">' +'</p>'+
                                    '<p>'+"Workplace : "+           '<input type="text" id="person-workplace" value="'+ person.workplace +'">' +'</p>'+
                                    '<p>'+"Duty : "+                '<input type="text" id="person-duty" value="'+ person.duty +'">' +'</p>'+
                                    '<p>'+"Work Schedule : "+       '<input type="text" id="person-workSchedule" value="'+ person.workSchedule +'">' +'</p>'+
                                    '<p>'+"Salary : "+              '<input type="text" id="person-salary" value="'+ person.salary +'">' +'</p>'+
                                    '<p>'+"Writing type : "+        '<input type="text" id="person-writing" value="'+ person.writing +'">' +'</p>'+
                                    '<p>'+"Passcode : "+            '<input type="text" id="person-passCode" value="'+ person.passCode +'">' +'</p>'+
                                    '<p>'+"Arrested before : "+     '<input type="text" id="person-arrestedBefore" value="'+ person.arrestedBefore +'">' +'</p>'+
                                    '<p>'+"Additionnal notes : "+   '<input type="text" id="person-notes" value="'+ person.notes +'">' +'</p>'+
                                '</div>';
        //console.log("loading person " + i + " | " + person.id)
    }
}
function SaveMods(index){
    
    cities[currentCity].people[index].name = document.querySelector("#f"+index+" #person-name").value;
    cities[currentCity].people[index].lastName = document.querySelector("#f"+index+" #person-lastName").value;
    cities[currentCity].people[index].picture = document.querySelector("#f"+index+" #person-picture").value;
    cities[currentCity].people[index].vocalID = document.querySelector("#f"+index+" #person-vocalID").value;
    cities[currentCity].people[index].fingerPrint = document.querySelector("#f"+index+" #person-fingerPrint").value;
    cities[currentCity].people[index].age = document.querySelector("#f"+index+" #person-age").value;
    cities[currentCity].people[index].dateOfBirth = document.querySelector("#f"+index+" #person-dateOfBirth").value;
    cities[currentCity].people[index].sex = document.querySelector("#f"+index+" #person-sex").value;
    cities[currentCity].people[index].height = document.querySelector("#f"+index+" #person-height").value;
    cities[currentCity].people[index].bodyShape = document.querySelector("#f"+index+" #person-bodyShape").value;
    cities[currentCity].people[index].hair = document.querySelector("#f"+index+" #person-hair").value;
    cities[currentCity].people[index].eyes = document.querySelector("#f"+index+" #person-eyes").value;
    cities[currentCity].people[index].shoeSize = document.querySelector("#f"+index+" #person-shoeSize").value;
    cities[currentCity].people[index].glasses = document.querySelector("#f"+index+" #person-glasses").value;
    cities[currentCity].people[index].facialHair = document.querySelector("#f"+index+" #person-facialHair").value;
    cities[currentCity].people[index].bloodType = document.querySelector("#f"+index+" #person-bloodType").value;
    cities[currentCity].people[index].address = document.querySelector("#f"+index+" #person-address").value;
    cities[currentCity].people[index].phone = document.querySelector("#f"+index+" #person-phone").value;
    cities[currentCity].people[index].workplace = document.querySelector("#f"+index+" #person-workplace").value;
    cities[currentCity].people[index].duty = document.querySelector("#f"+index+" #person-duty").value;
    cities[currentCity].people[index].workSchedule = document.querySelector("#f"+index+" #person-workSchedule").value;
    cities[currentCity].people[index].salary = document.querySelector("#f"+index+" #person-salary").value;
    cities[currentCity].people[index].writing = document.querySelector("#f"+index+" #person-writing").value;
    cities[currentCity].people[index].passCode = document.querySelector("#f"+index+" #person-passCode").value;
    cities[currentCity].people[index].arrestedBefore = document.querySelector("#f"+index+" #person-arrestedBefore").value;
    cities[currentCity].people[index].notes = document.querySelector("#f"+index+" #person-notes").value;
    
    LoadCity(0);
}
function GenerateSave(){
    let save = "";

    //add the city's config to the beginning of the save string
    //Config;Config;Config
    save = cities[currentCity].name+";"+cities[currentCity].id+";"+cities[currentCity].size+";"+cities[currentCity].population+";";

    //add the profiles
    //profile;profile;profile
    for (let i = 0; i < cities[currentCity].profiles.length; i++){
        save += cities[currentCity].profiles[i];

        if (i+1 != cities[currentCity].profiles.length){
            save += ";";
        }
    }

    //add a separator
    //pre\post
    save += "\\";

    //add profiles
    for (let i = 0; i < cities[currentCity].population; i++){

        let person = cities[currentCity].people[i];
        //check if empty
        let index = -1;
        let string = "";
        for (let key in person){
            index++;
            if ( key != "id" ){

                //Compose the code
                string += ";" + person[key];
            }
        }
        if (string == ";;;;;;;;;;;;;;;;;;;;;;;;;;"){ string = ""; }
        else{
            //add to save
            save += string;

            //separator
            save += "\\";
        }

        
    }
    let w = window.open("");
    w.document.write("<title>your save file</title>" + save);
}