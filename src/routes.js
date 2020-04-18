import { Router } from 'express';

import ProductController from './app/controllers/ProductController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.use(authMiddleware);
routes.get('/products', ProductController.list);

export default routes;
