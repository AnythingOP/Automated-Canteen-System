const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number,
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        // UPDATED: Added 'Pending Payment' as the new default status
        enum: ['Pending Payment', 'Received', 'Preparing', 'Ready for Pickup', 'Completed'],
        default: 'Pending Payment',
    },
    // Keep track of which user placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;