import { uuid } from 'uuidv4';
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRepository from "../IUsersRepository";
import User from "../../infra/typeorm/entities/user";


class FakeUsersRepository implements IUsersRepository{
    
    private users: User[] = [];

    public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]> {
        let users = this.users;

        if (except_user_id){
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }
   
    public async findById(id: string): Promise<User | undefined>{
        const user = this.users.find(user => user.id == id)
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = this.users.find(user => user.email == email)
        return user;
    }

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {

        const user = new User();

        //declare the atributes, from the instanced class
        Object.assign(user, {id:uuid(), name, email, password});

        this.users.push(user);

        return user
    }

    public async save(user: User): Promise<User> {

        const findeIndex = this.users.findIndex(user => user.id == user.id)
        this.users[findeIndex] = (user);
        return user;
    }
}

export default FakeUsersRepository;
