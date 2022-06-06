import {Router} from 'express';
import appointmentsRouter from './appointments.route';
import usersRouter from './users.route';
import sessionsRouter from './sessions.route';

const routes = Router();

// all the routes that use "appointment" 'll be passed to the appointments.route
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;