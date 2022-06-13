import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import AppError from "@shared/errors/AppError";

describe('CreateAppointment', () =>{
    
    it('should be able to authenticate a user', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();

        //use the user service by the fake repopsitory/interface
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

        //call the createUsers method from the service to test
        const response = await authenticateUser.execute({
            email: 'teste@gmail.com',
            password: '123456'
        });

        //verify if the user have an id
        expect(response).toHaveProperty('email');
    });

    // it('should be not able to create two users with the same email', async () =>{

    //     const fakeUsersRepository = new FakeUsersRepository();
    //     const createUser = new AuthenticateUserService(fakeUsersRepository);

    //     const email = 'teste@gmail.com';

    //     await createUser.execute({
    //         email: email,
    //         password: '123456'
    //     });

    //     expect(createUser.execute({
    //         email: email,
    //         password: '123456'
    //     })).rejects.toBeInstanceOf(AppError)

    // });

    
});