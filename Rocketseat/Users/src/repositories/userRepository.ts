import User from "../models/appointment";

interface idDTO{
    id: string;
    name: string;
    age: number;
}

interface noIdDTO{
    name: string;
    age: number;
}

class UserRepository{

    private users: User[];

    constructor(){
        this.users = [];
    }

    public listUsers(): User[]{
        return this.users;
    }

    public createUser({name, age }: noIdDTO): User{

        const newUser = new User({name, age});

        this.users.push(newUser);

        return newUser;
    }

}

export default UserRepository