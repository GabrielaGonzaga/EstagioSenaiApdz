import { Router } from 'express';
import ProvidersControllers from '../controllers/ProvidersControllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersControllers();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);

export default providersRouter;