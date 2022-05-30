import { startOfHour } from "date-fns";
import Appointment from "../models/appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO{
    provider: string;
    date: Date;
}

class CreateApService {

    
    private appoitmentsRepository: AppointmentsRepository;

    constructor(appoitmentsRepository: AppointmentsRepository){
        this.appoitmentsRepository = appoitmentsRepository;
    } 
    
    public execute({date, provider}: RequestDTO): Appointment{
    const appointmentDate = startOfHour(date);
    // search appointments that have the same date by the method findApByDate
    const findAppointmentInSameDate = this.appoitmentsRepository.findApByDate(appointmentDate);
    //if has the same date, then it shows an error 
    if(findAppointmentInSameDate){
        throw Error('This appointment is already booked');
    }
    // create a new appointment by the create method on the AppointementsRepository
    const appointment = this.appoitmentsRepository.create({provider, date: appointmentDate});
  
    return appointment;

    }

}

export default CreateApService;