import Order from '../models/orderModel.js';

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, status, date, payment } = req.body;
        const newOrder = new Order({ userId, items, amount, address, status, date, payment });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// View Orders
export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        } else {
            res.json(orders);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// View Single Order
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        } else if (order.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view this order' });
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
