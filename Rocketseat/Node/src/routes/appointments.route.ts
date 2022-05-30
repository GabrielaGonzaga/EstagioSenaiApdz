import { Router } from 'express';
import { parseISO } from 'date-fns'
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateApService from '../services/CreateApService';

const appointmentsRoute = Router();

const appointmentsRepository = new AppointmentsRepository();


appointmentsRoute.get('/', (request, response)=>{

    const appointments = appointmentsRepository.listAppointments();

    return response.json(appointments)
});

appointmentsRoute.put('/:id', (request, response) => {

    const {id} = request.params;
    const {provider, date} = request.body;

    const findAppointmentById = appointmentsRepository.findApById(id);

    const appointment = appointmentsRepository.updateAppointment(provider);

    if (findAppointmentById){
        return response.json(appointment);
    }else{
        return response.status(400).json({error: 'Appointment not found :/'})
    };

})

appointmentsRoute.post('/', (request, response) =>{
    try{
        const {provider, date} = request.body;
        // covert the date and change the hour to 0
        const parseDate = parseISO(date);
    
        const createAppointment = new CreateApService(appointmentsRepository);
        
        const appointment = createAppointment.execute({date: parseDate, provider});
        
        // return the new appointment
        return response.json(appointment);

    }catch(err){
        return response.status(400).json({ error: err })
    }
})

export default appointmentsRoute;