import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export default function helloWorld(request: Request, response: Response) {
   const user = createUser({
       name: "gabi", 
       email: "email", 
       password: 123,
       techs: [
           'node', 
           'react',
           {title: 'JS', rate: 95}
        ],
    });

    console.log(user.name)

    return response.json({message: 'Hello World'});
}