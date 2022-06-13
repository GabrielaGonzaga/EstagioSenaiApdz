import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import AppError from "@shared/errors/AppError";
import CreateUserService from "./CreateUserService";

describe('CreateAppointment', () =>{
    
    it('should be able to authenticate a user', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);

        //use the user service by the fake repopsitory/interface
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

        //call the createUsers method from the service to test
        await createUser.execute({
            name: 'Teste',
            email: 'email@gmail.com',
            password: '123456'
        });

        //call the createUsers method from the service to test
        const response = await authenticateUser.execute({
            email: 'email@gmail.com',
            password: '123456'
        });

        //verify if the user have an id
        expect(response).toHaveProperty('token');
    });
});