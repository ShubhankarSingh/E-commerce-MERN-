const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
    itemPrice: {
        type: Number,
        default: 0
    }
});

const cartSchema = new mongoose.Schema({
    products: [cartItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartTotalPrice: {
        type: Number,
        default: 0
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;