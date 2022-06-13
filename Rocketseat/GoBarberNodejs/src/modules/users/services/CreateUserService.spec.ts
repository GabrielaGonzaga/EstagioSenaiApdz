import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import AppError from "@shared/errors/AppError";

describe('CreateAppointment', () =>{
    
    it('should be able to create a new user', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();

        //use the user service by the fake repopsitory/interface
        const createUser = new CreateUserService(fakeUsersRepository);

        //call the createUsers method from the service to test
        const user = await createUser.execute({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });

        //verify if the user have an id
        expect(user).toHaveProperty('id');
    });

    it('should be not able to create two users with the same email', async () =>{

        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const email = 'teste@gmail.com';

        await createUser.execute({
            name: 'Teste',
            email: email,
            password: '123456'
        });

        expect(createUser.execute({
            name: 'Teste',
            email: email,
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)

    });

    
});