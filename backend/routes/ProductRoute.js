const express = require('express');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const router = express.Router();
const { body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const path = require('path'); // Add this line
const fs = require('fs');

//ROUTE 1.1: Fetch a product using GET "/api/getproduct/id"
//express validator to validate data entered by user

router.get('/getproduct/:id',async (req, res)=>{

    try{
        
        const product = await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});


//ROUTE 1.2: Fetch a product by category using GET "/api/getproduct/category/category_type"
//express validator to validate data entered by user


router.get('/getproduct/category/:category', async (req, res)=>{

    try{

        console.log("Finding Products in category: " + req.params.category)
        const products = await Product.find({category: req.params.category});

        if(products.length === 0 || !products){
            res.status(404).json({ error: 'Products not found in this category' });
        }
        
        res.json(products)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});


// ROUTE 3: 1.3: Fetch all the products using GET method
//express validator to validate data entered by user

router.get("/", async (req, res)=>{
    try{
        const products = await Product.find();

        if(products.length === 0 || !products){
            res.status(404).json({error: 'No Product found'})
        }

        res.json(products)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE to get image

router.get("/getimage/:id", async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if (!product || !product.image) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }

        // Set response content type to image/jpeg (adjust based on your image type)
        res.contentType('image/jpeg');

        // Send the image binary data
        res.send(product.image);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});


router.get("/:productId/reviews", async (req,res)=>{

    try{
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        const reviews = product.reviews();

        res.json(reviews);

    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});

//ROUTE 2: Create a product using POST "/api/addProduct"
//express validator to validate data entered by user. Login required

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../images')); // Use path.join for correct path handling
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });

const storage = multer.memoryStorage();

const upload = multer({storage: storage, limits: { fileSize: 10 * 1024 * 1024 }});


// // Multer error handling
// router.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         console.error('Multer Error:', err.message);
//         res.status(400).json({ error: 'Multer Error', message: err.message });
//     } else {
//         next(err);
//     }
// });


router.post('/addproduct', upload.single('image') ,async(req, res)=>{
    console.log("Inside post route")
    try{
        const {name, brand, category, price, description, about} = req.body;
        
        const product = new Product({
            name, brand, category, price, description, about, 
            image: req.file.buffer, //Save image as binary data
        });

        const newProduct = await product.save();

        res.json(newProduct);
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

});

//ROUTE 2.2: Create a post route for product review
router.post("/:id/addreview", fetchuser ,upload.none(), async (req, res) => {
    console.log("Inside POST review");
    console.log("Request Body:", req.body);
    try {
        const { title, description, stars } = req.body;
        
        const userIdObject = await User.findById(req.user.id);
        const username = userIdObject.name;
        const userId = userIdObject._id.toString();
    
        // Ensure all required fields are present
        if (!userId || !username || !title || !description || !stars) {
            return res.status(400).json({ message: 'All fields (title, description, stars) are required.' });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product Not Found");
        }

        const review = {
            userId,
            username,
            title,
            description,
            stars,
        };

        product.reviews.push(review);

        await product.save();

        res.status(201).json({ message: 'Review added successfully', review });

    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//ROUTE 3: Update a product using PUT "/api/updateproduct/id"

router.put('/updateproduct/:id', async (req, res)=>{

    try{
        const {name, brand, category, price, description} = req.body;
        const newProduct = {};
        if(name){newProduct.name = name};
        if(brand){newProduct.brand = brand};
        if(category){newProduct.category = category};
        if(price){newProduct.price = price};
        if(description){newProduct.description = description};

        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).send("Product Not Found");
        }

        // if(product.user.toString() != req.user.id){
        //     res.status(401).send("Not Allowed");
        // }
        
        // {new:true} will return the updated object instead of original object
        product = await Product.findByIdAndUpdate(req.params.id, {$set:newProduct}, {new:true});
        res.json({product});

    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Delete a product using DEL "/api/deleteproduct/id". Login required
router.delete('/deleteproduct/:id', async (req, res)=>{

    try{

        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).send("Product Not Found");
        }

        if(product.user.toString() != req.user.is){
            res.status(401).send("Not Allowed");
        }

        product = await Product.findByIdAndDelete(req.params.id);
        res.json("Successfully Deleted Product");

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});


router.delete("/:productId/deletereview/:reviewId", fetchuser, async (req, res)=>{
    try{
        const productId = req.params.productId;
        const reviewId = req.params.reviewId;

        const product = await Product.findByIdAndUpdate(
            productId,
            {$pull : {reviews: {_id: reviewId}}},
            {new: true}
        );
        
        if (!product) {
            return res.status(404).send("Product Not Found");
        }

        console.log("Review Deleted successfully")
        res.json({ message: 'Review deleted successfully' });
    }catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

module.exports = router;