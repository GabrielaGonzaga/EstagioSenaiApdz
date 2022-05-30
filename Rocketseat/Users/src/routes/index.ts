import {Router} from 'express';
import usersRoute from './usersRoute';

const routes = Router();

// all the routes that use "user" 'll be passed to the usersRoute
routes.use('/users', usersRoute);

export default routes;