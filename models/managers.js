const mongoose = require("mongoose")

const schema = mongoose.Schema({
  username: String, 
  age: Number, 
  email: String, 
  // location: String, 
  authorization: String
})

module.exports = mongoose.model("Manager", schema)