const express = require('express');
const User = require("../models/UserModel");
const UserProfile = require("../models/UserProfileModel");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');


router.get("/", fetchuser, async(req, res)=>{

    console.log("Inside GET Profile route");
    try{
        let userId = req.user.id;
        let userProfile = await UserProfile.findOne({user: userId});

        
        res.json(userProfile);

    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

});

router.put("/update", fetchuser, async(req, res)=>{

    console.log("Inside User Profile route");
    try{

        const userId = req.user.id;
        const userProfile = await UserProfile.findOne({user: userId});

        console.log("User Profile: "+ userProfile);
        const {phone, address, city, state, country, pinCode} = req.body;

        console.log("User Profile Details: " + phone + " " + address + " " + state);

        if (!userProfile) {
            // Create a new profile if it doesn't exist
            userProfile = await UserProfile.create({
                user: userId,
                phone: phone,
                address: address,
                city: city,
                state: state,
                country: country,
                pinCode: pinCode,
            });
        }else {
            // Update existing profile if it exists
            userProfile.phone = phone;
            userProfile.address = address;
            userProfile.city = city;
            userProfile.state = state;
            userProfile.country = country;
            userProfile.pinCode = pinCode;
            await userProfile.save();
        }

        res.status(200).json({ message: "User Profile Updated" });
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occured");
    }

});

module.exports = router