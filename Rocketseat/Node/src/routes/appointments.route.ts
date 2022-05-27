import {Router} from 'express';
import {startOfHour, parseISO, isEqual} from 'date-fns'
import Appointment from '../models/appointment';

const appointmentsRoute = Router();

//declare that appointments 'll use the "Appointment" model
const appointments: Appointment[] = [];

appointmentsRoute.post('/', (request, response) =>{

    const {provider, date} = request.body;
    
    // covert the date and change the hour to 0
    const parseDate = startOfHour(parseISO(date));

    // search appointments that have the same date
    const findAppointmentInSameDate = appointments.find(appointment => 
        isEqual(parseDate, appointment.date),
    );
    
    //if has the same date, then it shows an error 
    if(findAppointmentInSameDate){
        return response.status(400).json({message: 'This appointment is already booked'})
    }

    // create (instance) a new appointment by the class Appointment (models)
    const appointment = new Appointment(provider, parseDate)

    // add a new apppointment on the array of appointments
    appointments.push(appointment);

    // return the new appointment
    return response.json(appointment);
})

export default appointmentsRoute;