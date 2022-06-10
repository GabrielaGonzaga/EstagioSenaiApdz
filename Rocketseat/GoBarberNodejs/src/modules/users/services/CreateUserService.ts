import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/user'
import IUsersRepository from "../repositories/IUserRepository";

interface IRequest{
    name:string;
    email: string;
    password:string;
}

@injectable()
class CreateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({name, email, password}: IRequest):  Promise<User> {

        //Verify if the email is unique
        const checkUserExists = await this.usersRepository.findByEmail(email)
        //if don't throws an exception
        if (checkUserExists){
            throw new AppError('Email adress already used.')
        }

        const hashedPassword = await hash(password, 8)

        //create the new user and save
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        //return the created user
        return user;
    }
}

export default CreateUserService;