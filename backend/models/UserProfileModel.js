const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      phone:{
        type: String
      },
      address: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      country: {
        type: String
      },
      pinCode: {
        type: String
      },
      updated: Date,
      created: {
        type: Date,
        default: Date.now
      }
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;