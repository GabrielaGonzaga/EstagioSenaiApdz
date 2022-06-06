import { getRepository } from 'typeorm'; 
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/user'

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async execute({email, password}: Request): Promise<Response>{

        const usersRepository = getRepository(User);

        //find the user by the email
        const user = await usersRepository.findOne({
            where: {email}
        })

        //if don't throws an exception
        if (!user){
            throw new Error ('Email or passoword incorrect :/')
        }

        //if yes get the user found passoword
        user.password

        //compare the encrypt passoword with the passoerd given
        const passowordMatched = await compare(password, user.password);

        //if the passowrd is wrong throws an exception
        if (!passowordMatched){
            throw new Error ('Email or passoword incorrect :/')
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret,{
            subject: user.id,
            expiresIn: expiresIn,
        } )

        //if yes, the user is authenticated and return the user authenticated
        return {
            user,
            token
        };

    }
}

export default AuthenticateUserService;