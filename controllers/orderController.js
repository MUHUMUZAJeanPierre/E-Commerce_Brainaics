import orderModel from "../models/orderModel.js";
import UserModel from "../models/userMode.js"; // Corrected the typo

export const placeOrder = async (req, res) => {
    try {
        const {userId,  items, amount, address, status, date, payment } = req.body;
        // const userId = req.user._id;

        if (!items || !amount || !address || !status || !date || !payment) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            date,
            status,
            payment
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// export const viewOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.user._id });
//         res.status(200).json({ orders });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export const viewSingleOrder = async (req, res) => {
//     try {
//         const order = await orderModel.findById(req.params.id); // Corrected model name
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.status(200).json({ order });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
