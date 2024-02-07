const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const Order = require('../models/OrderModel');
const fetchuser = require('../middleware/fetchuser');


// POST route to create order
router.post("/createOrder/:cartId", fetchuser, async(req, res)=>{

    console.log("Inside create order");

    try{

        const cartId = req.params.cartId;
        const cart = await Cart.findById(cartId);
        const products = cart.products;
        const user = cart.user;
        const totalPrice = cart.cartTotalPrice;

        //Create an array and add the cart items to this array 
        const orderItems = [];

        
        for(const cartItem of products){
            const product = cartItem.product;   //cartItem.product stores product Id
            const name = cartItem.name;
            const quantity = cartItem.quantity;
            const price = cartItem.itemPrice;

            const orderItem ={
                product: product,
                name: name,
                quantity: quantity,
                price: price,
            }

            orderItems.push(orderItem);
        }

        // Create a new order instance using the Order model
        const order = new Order({
            user: user,
            items: orderItems,
            totalAmount: totalPrice,
        });

        // Save the order to the database
        order.save();

        res.status(200).json({ message: 'Order created successfully' });
    }catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});



router.get('/fetchOrder/:userId', fetchuser, async (req, res) => {
    console.log("Inside Fetch Order");
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId });

        console.log("Orders: "+ orders);
        
        if (orders.length === 0) {
            res.json({ orders: [] }); // Send empty array if no orders are found
        } else {
            res.json({ orders }); // Send the found orders
        }

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;