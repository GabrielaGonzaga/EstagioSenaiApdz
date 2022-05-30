import {Router} from 'express';
import appointmentsRoute from './appointments.route';

const routes = Router();

// all the routes that use "appointment" 'll be passed to the appointments.route
routes.use('/appointments', appointmentsRoute);

export default routes;