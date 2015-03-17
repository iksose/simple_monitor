var mongoose = require('mongoose');

// Define our schema
var SecretSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number
});

SecretSchema.methods.test = function() {
  console.log("schema test")
}

// Export the Mongoose model
module.exports = mongoose.model('secrets', SecretSchema);