import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) =>{

    //request body
    const {email, password} = request.body;

    const usersRepository = new UsersRepository();

    // call the service with the authentications
    const authenticateUser = new AuthenticateUserService(usersRepository);

    // says what the service will verify
    const {user, token} = await authenticateUser.execute({
      email,
      password
    });

    // remove the password from the response 
    delete user.password;

    // retrun the user
    return response.json({user, token});

})

export default sessionsRouter;