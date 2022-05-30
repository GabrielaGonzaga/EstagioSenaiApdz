import { application, response, Router } from "express";
import UserRepository from "../repositories/userRepository";
import verifyAtributesService from "../services/verifyAtributesService";

const usersRoute = Router();

const userRepository = new UserRepository();

usersRoute.get('/', (request, response) =>{

    const users = userRepository.listUsers();

    return response.json(users);
});

usersRoute.post('/', (request, response) =>{

    try{
        const {name, age} = request.body;
        const userVerified = new verifyAtributesService(userRepository);
        const user = userVerified.execute({name, age});
        return response.json(user);   

    }catch(e){
        return response.status(400).json({error: })
    }
   
});

export default usersRoute;
