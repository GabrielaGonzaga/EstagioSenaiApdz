import { EntityRepository, Repository } from "typeorm";
import Appointment from "../infra/typeorm/entities/appointment";

@EntityRepository(Appointment)
                                    //function params
class AppointmentsRepository extends Repository<Appointment>{

    public async findApById(id: string): Promise<Appointment | null>{
        const findApById = await this.findOne({
            where: {id: id}
        })
        return findApById || null
    }

    //Find Appointment By Date method
    public async findApByDate(date: Date): Promise<Appointment | null>{
        const findApByDate = await this.findOne({
            where: {date: date}
        })

        return findApByDate || null;
    }

    public listAppointments(){
        const appointments = this
    }
    
}

export default AppointmentsRepository

// interface NoIdApDTO{
//     provider: string, 
//     date: Date
// }

// interface IdApDTO{
//     id: string,
//     provider: string, 
//     date: Date
// }

// public listAppointments(): Appointment[]{
//     return this.appointments;
// }

// //Create Method
// public create({provider, date}: NoIdApDTO): Appointment{
//     //instance a new appointment
//     const appointment = new Appointment({provider, date});
//     // add a new apppointment on the array of appointments
//     this.appointments.push(appointment)
//     // return a new appointment
//     return appointment;
// }

// public updateAppointment({id, provider, date}: IdApDTO){

//     const appointment = {
//         id,
//         provider,
//         date
//     }

//     const findApById = this.findApById(id);

//    this.appointments[findApById] = appointment;

//    return appointment;
// }