import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO{
    provider_id: string;
    date: Date;
}

class CreateApService {
    
    public async execute({date, provider_id}: RequestDTO): Promise<Appointment>{
    
    const appoitmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    // search appointments that have the same date by the method findApByDate
    const findAppointmentInSameDate = await appoitmentsRepository.findApByDate(appointmentDate);
    //if has the same date, then it shows an error 
    if(await findAppointmentInSameDate){
        throw Error('This appointment is already booked');
    }
    // create a new appointment by the create method on the AppointementsRepository
    const appointment = appoitmentsRepository.create({
        provider_id, 
        date: appointmentDate
    });
  
    await appoitmentsRepository.save(appointment);

    return appointment;

    }

}

export default CreateApService;