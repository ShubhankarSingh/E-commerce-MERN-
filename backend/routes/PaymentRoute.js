const express = require('express');
const router = express.Router();
const config = require('../config');
const stripe = require("stripe")(config.stripeSecretKey);


router.post('/create-checkout-session', async(req, res)=>{
    const {cart} = req.body

    const products= cart.products;
    const totalPrice = cart.cartTotalPrice;

    const lineItems = products.map((product, index)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name
            },
            unit_amount: (product.itemPrice * product.quantity)*100,
        },
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/payment/success",
        cancel_url:"http://localhost:3000/payment/cancel",
        customer_email: 'test@gmail.com',
        billing_address_collection: 'required',
    });

    res.json({id:session.id})
})

module.exports = router;

