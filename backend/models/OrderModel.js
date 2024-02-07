const mongoose = require('mongoose');

// Define the schema for an order item
const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    name: String,
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the schema for an order
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    orderdate: {
        type: Date,
        default: Date.now
    }
});

// Define the Order model using the schema
const Order = mongoose.model('Order', OrderSchema);

// Export the Order model
module.exports = Order;
