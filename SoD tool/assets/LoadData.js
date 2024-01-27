let save = ";";
let cityLoading;

function LoadSave(){
    save = document.getElementById("load-data").value;

    cityLoading = {
        "name"  :   Deconcat(Deconcat(save, "\\")[0], ";")[0],
        "id"    :   Deconcat(Deconcat(save, "\\")[0], ";")[1],
        "size"  :   Deconcat(Deconcat(save, "\\")[0], ";")[2],
        "population":Deconcat(Deconcat(save, "\\")[0], ";")[3],
        "profiles": [],
        "people":[],
        "saveCode": Deconcat(Deconcat(save, "\\")[0], ";")[1]
    }
    InitProfiles();
    DebugCity();
    LoadPeople();

    cities[cities.length] = cityLoading;
    InitArchives();

}
function InitProfiles(){
    let attributes = Deconcat(Deconcat(save, "\\")[0], ";");

    for (let i = 0; i < attributes.length - 4; i++){
        cityLoading.profiles[i] = attributes[i+4];
    }
}
function DebugCity(){
    for (let key in cityLoading){
        if (key == "profiles"){
            for (let i = 0; i < cityLoading.profiles.length; i++){
                console.log("profile " + i + " : " + cityLoading.profiles[i])
            }
        }
        else{
            console.log(key + cityLoading[key])
        }
        
    }
}
function LoadPeople(){
    console.log("loading people... " + (Deconcat(save, "\\").length-1))
    for (let i = 0; i < Deconcat(save, "\\").length-1; i++){
        i++;
        
        let person = new Person(i);
        console.log("person attributes length : " + Deconcat(Deconcat(save, "\\")[i], ";").length);

        let index = -1;
        for (let key in person){

            if (key == "id"){
                person[key] = i - 1;
            }
            else{
                person[key] = Deconcat(Deconcat(save, "\\")[i], ";")[index + 2];
                if ( person[key] == undefined ){ person[key] = ""; }
                index++;
            }

            //console.log("result : " + i + " " + index + " " + key + " " + person[key])
            
        }

        person.id = i - 1;
        cityLoading.people[i] = person;
        i--;
    }
}

//rawr
function Deconcat(string, char){
    let output = [];
    let instance = 0;
    while (string.length != 0){
        let index = -1;
        for (let i = string.length-1; i >= 0; i--){
            if (string[i] == char){
                index = i;
            }
        }

        if (index == -1){
            output[instance] = string;
            string = "";
        }
        else if (index == 0){
            if (string.length == 1){
                string = "";
            }
            else{
                output[instance] = " ";
                string = string.substring(1);
                instance++;
            }
        }
        else{
            output[instance] = string.substring(0, index);
            string = string.substring(index+1);
            instance++;
        }
        
    }
    return output;
}