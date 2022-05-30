import User from "../models/appointment";
import UserRepository from "../repositories/userRepository";

interface requestDTO{
    name: string;
    age: number;
}

class verifyAtributesService{

    private usersRepository: UserRepository;

    constructor( usersRepository: UserRepository){
        this.usersRepository = usersRepository;
    }

    public execute({name, age}: requestDTO) : User{

        const user = new User({name, age});
        
        const verifyNulls = (user.name == null || user.age == null);

        if(verifyNulls){
            throw Error('You need to inform an age and a name to proceed!')
        }

        return user;
    }
}

export default verifyAtributesService;