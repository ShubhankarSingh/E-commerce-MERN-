const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stars: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

const ProductSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    description:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    image:{
        type: Buffer
    },
    reviews: [reviewSchema]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;