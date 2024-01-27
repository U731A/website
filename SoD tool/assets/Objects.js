class Person{
    constructor(index){
        this.id =           index;
        this.name =         "john";
        this.lastName =     "";
        this.picture =      "";
        this.vocalID =      "";
        this.fingerPrint =  "";
        this.age =          "";
        this.dateOfBirth =  "";
        this.sex =          '';
        this.height =       "";
        this.bodyShape =    "";
        this.hair =         "";
        this.eyes =         "";
        this.shoeSize =     "";
        this.glasses =      "";
        this.facialHair =   "";
        this.bloodType =    "";
        this.address =      "";
        this.phone =        "";
        this.workplace =    "";
        this.duty =         "";
        this.workSchedule = "";
        this.salary =       "";
        this.writing =      "";
        this.passCode =     "";
        this.arrestedBefore="";
        this.notes =        "";
    }
}
class City{
    constructor(city){

        //constants
        this.name       = city.name;
        this.id         = city.id;
        this.size       = city.size;
        this.population = city.population;
        this.profiles   = city.profiles;

        //dynamics
        this.people = city.people;

        this.InitHabitants();
    }
    InitHabitants(){
        for (let i = 0; i < this.population; i++){
            this.people[i] = new Person(i);
        }
    }
}