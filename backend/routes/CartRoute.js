const express = require("express");
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');


router.post("/addtoCart/:productId", fetchuser, async(req, res)=>{
    try{
        // check if the user has an existing cart
        let cart = await Cart.findOne({user:req.user.id});
        console.log("Cart :" + cart);

        if(!cart){
            console.log("Cart is null")
            cart = new Cart({
                user: req.user.id,
                products: [],
                cartTotalPrice: 0,
            });
        }

        const productId = req.params.productId;

        const product = await Product.findById(productId);
        const quantity = 1;
        const itemPrice = product.price;

        const cartItem = {
            product: productId,
            quantity,
            itemPrice,
        };

        console.log("Cart item:" + cartItem);

        cart.products.push(cartItem);
        
        cart.cartTotalPrice = cart.products.reduce((total, item) => total + item.itemPrice * item.quantity, 0);

        await cart.save();

        res.status(201).json({ message: 'Product added to cart successfully', cartItem });
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});

router.get("/", fetchuser, async(req, res)=>{
    try{

        const user = req.user.id;

        let cart = await Cart.findOne({user});

        if(!cart){
            console.log("Cart is null");
            cart = new Cart({
                user: req.user.id,
                products: [],
                cartTotalPrice: 0,
            });
            await cart.save();
        }
        
        const products = cart.products;     
        res.json({products, cart});

    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
});


router.put("/:cartId/:itemId/updateQuantity/:quantity", fetchuser, async (req, res)=>{
    console.log("Inside Update quantity")
    try{
        const cartId = req.params.cartId;
        const itemId = req.params.itemId;
        const updatedQuantity = req.params.quantity;

        console.log("Quantity is: "+ updatedQuantity)
        console.log("Cart id : "+ cartId)
        console.log("item Id : "+ itemId)

        //const cart = await Cart.findById(cartId);

        const cart = await Cart.findOneAndUpdate(
            { _id: cartId, "products.product": itemId }, // Find the cart with the given ID and matching product ID
            {
                $set: {
                    "products.$.quantity": updatedQuantity,
                },
            },
            { new: true }
        );
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart or Item Not Found' });
        }
        
        cart.cartTotalPrice = cart.products.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
        
        await cart.save();
        
        console.log("Quantity updated successfully");
        res.json({ message: 'Quantity updated successfully', cart });

    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});


router.delete("/:cartId/removeFromCart/:productId", fetchuser, async (req, res)=>{
    try{
        const cartId = req.params.cartId;
        const productId = req.params.productId;

        //const cart = await Cart.findById(cartId);
        const cart = await Cart.findByIdAndUpdate(
            cartId,
            {$pull : {products: {product: productId}}},
            {new: true}
        );

        if(!cart){
            res.json(404).send("Cart Not Found");
        }

        cart.cartTotalPrice = cart.products.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
        
        await cart.save();
        
        res.json({ message: 'Item removed from card successfully' });
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;