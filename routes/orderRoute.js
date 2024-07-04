import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {getOrder, createOrder} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', authMiddleware, createOrder);
/**
 * @swagger
 * tags:
 *  name: order
 *  description: get list of order
 * 
 * 
*/

/**
 * @swagger
 * /get
 */
orderRouter.get('/get', authMiddleware,getOrder);

/**
 * @swagger
 * /get/{id}
 */

orderRouter.get('/get/:id', authMiddleware, getOrder);


export default orderRouter;