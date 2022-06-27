import { uuid } from 'uuidv4'
import {isEqual, getMonth, getYear} from 'date-fns';
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import Appointment from "../../infra/typeorm/entities/appointment";
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';


class AppointmentsRepository implements IAppointmentsRepository{
    
    provider_id: string;
    date: Date;

    private appointments: Appointment[] = [];

    public async findAllInMonthProvider({provider_id, month, year}: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
        
        const appointments = this.appointments.filter(appointment => 
                appointment.provider_id == provider_id && 
                getMonth(appointment.date) + 1 == month &&
                getYear(appointment.date) == year
            )

        return appointments;
    }

    //Find Appointment By Date method
    public async findApByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
        return findAppointment
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        //declare the atributes, from the instanced class
        Object.assign(appointment, {id:uuid(), date, provider_id});

        this.appointments.push(appointment);

        return appointment
    }

}

export default AppointmentsRepository
