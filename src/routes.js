import express from 'express';

import ProductController from './app/controllers/ProductController.js';
import PurchaseController from './app/controllers/PurchaseController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

import authMiddleware from './app/middlewares/auth.js';

const routes = new express.Router();

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
