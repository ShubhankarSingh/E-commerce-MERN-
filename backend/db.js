const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/shopcart';

//Connect to mongodb
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to mongoose successfully!")
}

// Export function
module.exports = connectToMongo

