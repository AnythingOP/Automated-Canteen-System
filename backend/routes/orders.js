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
            user: req.user.id,
            status: 'Pending Payment',
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Server error while creating order.' });
    }
});

// PUT /api/orders/:id/pay - Confirms payment and moves order to kitchen
router.put('/:id/pay', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        
        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        order.status = 'Received';
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
        const orders = await Order.find({ status: { $ne: 'Pending Payment' } }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
});

// GET /api/orders/my-history - Get orders for the logged-in user
router.get('/my-history', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// *** NEW: GET /api/orders/recommendations/popular - Get most ordered items ***
router.get('/recommendations/popular', async (req, res) => {
    try {
        const popularItems = await Order.aggregate([
            // 1. De-normalize the items array
            { $unwind: '$items' },
            // 2. Group by item name and sum the quantities
            { $group: {
                _id: '$items.name',
                totalOrdered: { $sum: '$items.quantity' }
            }},
            // 3. Sort by the total quantity in descending order
            { $sort: { totalOrdered: -1 } },
            // 4. Limit to the top 5 items
            { $limit: 5 }
        ]);
        res.json(popularItems);
    } catch (error) {
        console.error("Error fetching popular items:", error);
        res.status(500).json({ message: 'Server error while fetching popular items.' });
    }
});

// *** NEW: GET /api/orders/recommendations/recent - Get recently ordered items for a user ***
router.get('/recommendations/recent', auth, async (req, res) => {
    try {
        const recentOrders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(3); // Get the last 3 orders

        // Extract unique items from these recent orders
        const recentItemsMap = new Map();
        recentOrders.forEach(order => {
            order.items.forEach(item => {
                if (!recentItemsMap.has(item.name)) {
                    recentItemsMap.set(item.name, item);
                }
            });
        });

        const uniqueRecentItems = Array.from(recentItemsMap.values());
        res.json(uniqueRecentItems);
    } catch (error) {
        console.error("Error fetching recent items:", error);
        res.status(500).json({ message: 'Server error while fetching recent items.' });
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