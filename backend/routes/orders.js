const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

// POST /api/orders - Creates an order with "Pending Payment" status
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item.' });
        }

        const newOrder = new Order({
            orderId: `ORD-${nanoid()}`,
            items,
            totalAmount,
            user: req.user.id, // Associate order with the logged-in user
            status: 'Pending Payment', // New orders are pending payment
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Server error while creating order.' });
    }
});

// NEW: PUT /api/orders/:id/pay - Confirms payment and moves order to kitchen
router.put('/:id/pay', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        
        // Ensure the user paying is the one who created the order
        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        order.status = 'Received'; // Update status to 'Received'
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// GET /api/orders - Get all orders (for kitchen staff)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'kitchen') {
        return res.status(403).json({ msg: 'Access denied: Requires kitchen role' });
    }
    try {
        // Kitchen now only sees orders that are past the payment stage
        const orders = await Order.find({ status: { $ne: 'Pending Payment' } }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
});

// GET /api/orders/:orderId - Get a specific order (Protected)
router.get('/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching order.' });
    }
});

// PUT /api/orders/:id - Update an order's status (Protected for kitchen staff)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'kitchen') {
        return res.status(403).json({ msg: 'Access denied: Requires kitchen role' });
    }
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating order.' });
    }
});

module.exports = router;
