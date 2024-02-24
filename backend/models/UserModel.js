const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Default role is 'user'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;