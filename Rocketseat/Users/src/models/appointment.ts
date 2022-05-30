import { uuid } from "uuidv4";

class User{

    //class atributes
    id: string;

    name: string;

    age: number;

    //constructor (define the actions that 'll be executed on the creation of an object)
    constructor({name, age}: Omit<User, 'id'>){
        this.id = uuid();
        this.name = name;
        this.age = age;
    }
}

export default User;