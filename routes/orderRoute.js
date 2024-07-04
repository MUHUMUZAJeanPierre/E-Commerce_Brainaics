import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {getOrder, createOrder} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', authMiddleware, createOrder);
orderRouter.get('/get', authMiddleware, createOrder);

orderRouter.get('/get/:id', authMiddleware, getOrder);


export default orderRouter;