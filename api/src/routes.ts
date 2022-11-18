import { Router } from 'express';
import { create } from './controllers/create';
import { exclude } from './controllers/exclude';
import { list } from './controllers/list';
import { login } from './controllers/login';
import { update } from './controllers/update';
import { verifyJWT } from './middleware/jwt';

const routes = Router();

routes.get('/list', list);
routes.post('/create', verifyJWT, create);
routes.put('/update', verifyJWT, update);
routes.delete('/exclude/:id', verifyJWT, exclude);
routes.post('/login', login);

export default routes;