import { Router } from 'express';

import ProductController from './app/controllers/ProductController';
import PurchaseController from './app/controllers/PurchaseController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.list);
routes.put('/products/:product_id', ProductController.update);
routes.post('/purchases', PurchaseController.store);
routes.get('/purchases', PurchaseController.list);
routes.delete('/sessions/:session_id', SessionController.delete);

export default routes;
