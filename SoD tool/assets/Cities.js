const DEFAULTCITIES = [
            {
            "name"  :   "Beep Boop",
            "id"    :   "beep boop.1.3605.46EqPMKX17tCms3z",
            "size"  :   "medium",
            "population":396,
            "profiles": [
                        "none",
                        "Kamila Allen"
                        ],
            "people":[
                new Person(0)
            ]
            }
];









// --------------------------------------------------------------Initiator
let cities = [

];
//add defaults to dynamic
function InitTables(){
    for (let i = 0; i < DEFAULTCITIES.length; i++){
        cities[i] = DEFAULTCITIES[i];
        InitCitizens(i);
    }
    cities[0].people[0].name = "john";
    console.log("naming : " + cities[0].people[0].name)
}
InitTables();

function InitCitizens(cityIndex){
    for (let i = 0; i < cities[cityIndex].population; i++){
        cities[cityIndex].people[i] = new Person(i); 
    }
}