import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm'; // function to use a repository with non custom methods
import User from '../models/user'

interface Request{
    name:string;
    email: string;
    password:string;
}

class CreateUserService{
    public async execute({name, email, password}: Request):  Promise<User> {
        const usersRepository = getRepository(User);

        //Verify if the email is unique
        const checkUserExists = await usersRepository.findOne({
            where: {email: email}
        })
        //if don't throws an exception
        if (checkUserExists){
            throw new Error('Email adress already used.')
        }

        const hashedPassword = await hash(password, 8)

        //create the new user
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // save the new user on the database
        await usersRepository.save(user);

        //return the created user
        return user;
    }
}

export default CreateUserService;