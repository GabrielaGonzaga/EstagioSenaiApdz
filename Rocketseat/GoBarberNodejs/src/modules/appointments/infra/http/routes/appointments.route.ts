import { Router } from 'express';
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateApService from '@modules/appointments/services/CreateApService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response)=>{

    console.log(request.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments)
});

appointmentsRouter.post('/', async (request, response) =>{
   
    const {provider_id, date} = request.body;

    // convert the date and change the hour to 0
    const parseDate = parseISO(date);

    const createAppointment = new CreateApService();
    
    const appointment = await createAppointment.execute({
        date: parseDate, 
        provider_id
    });
    
    // return the new appointment
    return response.json(appointment);
})

// appointmentsRoute.put('/:id', (request, response) => {

//     const {id} = request.params;
//     const {provider, date} = request.body;
//     const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//     const findAppointmentById = appointmentsRepository.findApById(id);

//     const appointment = appointmentsRepository.updateAppointment(provider);

//     if (findAppointmentById){
//         return response.json(appointment);
//     }else{
//         return response.status(400).json({error: 'Appointment not found :/'})
//     };

// })

export default appointmentsRouter;