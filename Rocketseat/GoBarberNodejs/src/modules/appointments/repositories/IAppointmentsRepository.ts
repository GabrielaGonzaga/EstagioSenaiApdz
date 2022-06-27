import Appointment from '../infra/typeorm/entities/appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findApByDate( date: Date): Promise<Appointment|undefined>;
    findAllInMonthProvider( data: IFindAllMonthFromProviderDTO): Promise<Appointment[]>;
}