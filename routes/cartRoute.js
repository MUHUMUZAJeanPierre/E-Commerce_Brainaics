import express from 'express';
import {addToCart, getCart, removeFromCart} from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - itemId
 *               - quantity
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
cartRouter.post('/add', authMiddleware, addToCart);

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *             required:
 *               - itemId
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
cartRouter.post('/remove', authMiddleware, removeFromCart);

/**
 * @swagger
 * /cart/get:
 *   post:
 *     summary: Get user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return user's cart
 *       401:
 *         description: Unauthorized
 */
cartRouter.post('/get', authMiddleware, getCart);

export default cartRouter;
