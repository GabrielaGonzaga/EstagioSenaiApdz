import { Request, Response, NextFunction } from "express";
import authConfig from '../config/auth';
import { verify } from "jsonwebtoken";

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{

    //get the token by the header
    const authHeader = request.headers.authorization;

    // verify if there's a header
    if (!authHeader){
        throw new Error('JWT token is missing');
    }

    //split Bearer/token
    const  [, token] = authHeader.split(' ')

    
    try{
        const decoded = verify(token, authConfig.jwt.secret);

        console.log(decoded);

        return next();
    }catch{
        throw new Error('Invalid JWT token');
    }

   


}