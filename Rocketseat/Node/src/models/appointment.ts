import { uuid } from "uuidv4";

// class appointment
class Appointment{
    //decvlare the atributes/params

    id: string;

    provider: string;

    date: Date;

    //constructor get the infos given and declare that they're are the atributes 
    constructor(provider: string, date: Date){
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;