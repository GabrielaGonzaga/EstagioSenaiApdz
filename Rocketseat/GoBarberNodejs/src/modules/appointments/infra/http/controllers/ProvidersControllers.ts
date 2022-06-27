import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderService from "@modules/appointments/services/ListProvidersService";

export default class ProvidersControllers{

    public async index(request: Request, response: Response): Promise<Response>{
        
        const user_id = request.user.id;        
        
        const listProviders = container.resolve(ListProviderService);
        
        const providers = await listProviders.execute({
            user_id
        }); 

        // return the new appointment
        return response.json(providers);

    }
}