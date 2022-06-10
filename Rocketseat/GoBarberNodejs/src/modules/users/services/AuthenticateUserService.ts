import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/user'
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUserRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}
@injectable()
class AuthenticateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({email, password}: IRequest): Promise<IResponse>{
        //find the user by the email
        const user = await this.usersRepository.findByEmail(email)

        //if don't throws an exception
        if (!user){
            throw new AppError('Email or passoword incorrect :/', 401)
        }

        //if yes get the user found passoword
        user.password

        //compare the encrypt passoword with the passoerd given
        const passowordMatched = await compare(password, user.password);

        //if the passowrd is wrong throws an exception
        if (!passowordMatched){
            throw new AppError('Email or passoword incorrect :/', 401)
        }

        //get the configurations from authConfig
        const {secret, expiresIn} = authConfig.jwt;

        // get the token given and turn it into a token 
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