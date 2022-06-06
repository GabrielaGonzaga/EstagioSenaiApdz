import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) =>{
    try{

      //request body
      const {email, password} = request.body;

      // call the service with the authentications
      const authenticateUser = new AuthenticateUserService();

      // says what the service will verify
      const {user, token} = await authenticateUser.execute({
        email,
        password
      });

      // remove the password from the response 
      delete user.password;

      // retrun the user
      return response.json({user, token});

    }catch(err){
        return response.status(400).json({ error: err.message })
    }
})
export default sessionsRouter;