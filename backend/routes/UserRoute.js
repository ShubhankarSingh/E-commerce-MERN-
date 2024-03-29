const express = require('express');
const User = require("../models/UserModel");
const UserProfile = require("../models/UserProfileModel");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/ProductModel');
const fetchuser = require('../middleware/fetchuser');
const config = require('../config');

const JWT_SECRET = config.JWT_SECRET;


//ROUTE 1: Create a user using POST "/api/user/createuser"
//express validator to validate data entered by user

router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min:5})
], async(req, res)=>{

    // It returns bad request and errors if user enters invalid data
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error: result.array()})
    }

    // check if user exists
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        let userProfile = await UserProfile.create({
            user: user
        });

        await user.save();
        await userProfile.save();
        
        res.status(200).json({ message: "User Account Created" });
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occured");
    }

});


// ROUTE 2: Authenticate a user using: /api/user/login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{


    let success = false
    // It returns bad request and errors if user enters invalid data.
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({ errors: result.array() })
    }

    const {email, password} = req.body;

    try{

        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentails"});
        }

        const passwordComapre = await bcrypt.compare(password, user.password);
        
        if(!passwordComapre){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentails"});
        }

        const payload = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        success = true
        res.json({success, authtoken})

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.get("/getuser/", fetchuser, async (req, res) =>{
    console.log("Inside get user route");
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router