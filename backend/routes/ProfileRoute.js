const express = require('express');
const User = require("../models/UserModel");
const UserProfile = require("../models/UserProfileModel");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');


router.put("/", fetchuser, async(req, res)=>{

    console.log("Inside User Profile route");
    try{

        const userId = req.user.id;
        const userProfile = await UserProfile.findById({user: userId});

        if (!userProfile) {
            // Create a new profile if it doesn't exist
            userProfile = await UserProfile.create({
                user: userId,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pinCode: req.body.pinCode,
            });
        } else {
            // Update existing profile if it exists
            userProfile.phone = req.body.phone;
            userProfile.address = req.body.address;
            userProfile.city = req.body.city;
            userProfile.state = req.body.state;
            userProfile.country = req.body.country;
            userProfile.pinCode = req.body.pinCode;
            await userProfile.save();
        }

        res.status(200).json({ message: "User Profile Updated" });
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occured");
    }

});

module.exports = router