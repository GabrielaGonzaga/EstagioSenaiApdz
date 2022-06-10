import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs  from "fs";
import uploadConfig from "@config/upload";
import User from "../infra/typeorm/entities/user";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({user_id, avatarFilename}: IRequest): Promise<User>{

        //verify if the user_id received is the user on the model
        const user = await this.usersRepository.findById(user_id);

        //if don't throw error
        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        //verify if the user already have an avatar
        if(user.avatar){
            //Get the avatar directory
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            //see with there's a file on the directory
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

             //if already exists, delete the old one
            if (userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
        
    }
}

export default UpdateUserAvatarService;