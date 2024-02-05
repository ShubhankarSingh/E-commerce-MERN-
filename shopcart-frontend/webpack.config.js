const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... other webpack configurations

  plugins: [
    // other plugins
    new Dotenv(),
  ],
};