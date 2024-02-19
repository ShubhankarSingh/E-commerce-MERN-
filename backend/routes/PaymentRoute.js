const express = require('express');
const router = express.Router();
const config = require('../config');
const stripe = require("stripe")(config.stripeSecretKey);

// POST route for cart Checkout 
router.post('/create-checkout-session', async(req, res) => {
    const { cart, userEmail } = req.body;

    const products = cart.products;
    const totalPrice = cart.cartTotalPrice;

    const successUrl = `http://localhost:3000/payment/success?orderId=${cart._id}`;

    const lineItems = products.map((product, index) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name
            },
            unit_amount: product.itemPrice * 100,
        },
        quantity: product.quantity,
        
    }));

    // On successful payment, Order will be added to the DB 
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: "http://localhost:4000/payment/cancel",
        customer_email: userEmail,
        billing_address_collection: 'required',
    });

    res.json({ id: session.id });
});

module.exports = router;
