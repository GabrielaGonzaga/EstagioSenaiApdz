import { isEqual } from "date-fns";
import Appointment from "../models/appointment";

interface NoIdApDTO{
    provider: string, 
    date: Date
}

interface IdApDTO{
    id: string,
    provider: string, 
    date: Date
}

class AppointmentsRepository {

   //declare that appointments 'll use the "Appointment" model, but only in this archive (private)
    private appointments: Appointment[];
    // constructor with the array of appointments
    constructor(){
        this.appointments = [];
    }

    public findApById(id:string){
        const findApById = this.appointments.findIndex(appointment => appointment.id == id);
        return findApById;
    }

    //Find Appointment By Date method
    public findApByDate(date: Date): Appointment | null{
         // search appointments that have the same date
        const findApByDate = this.appointments.find(appointment => 
        isEqual(date, appointment.date))
        //return the appointment if found, and if not return null
        return findApByDate || null;
    }

    //List Method
    public listAppointments(): Appointment[]{
        return this.appointments;
    }

    //Create Method
    public create({provider, date}: NoIdApDTO): Appointment{
        //instance a new appointment
        const appointment = new Appointment({provider, date});
        // add a new apppointment on the array of appointments
        this.appointments.push(appointment)
        // return a new appointment
        return appointment;
    }

    public updateAppointment({id, provider, date}: IdApDTO){

        const appointment = {
            id,
            provider,
            date
        }

        const findApById = this.findApById(id);
    
       this.appointments[findApById] = appointment;

       return appointment;
    }


}

export default AppointmentsRepository