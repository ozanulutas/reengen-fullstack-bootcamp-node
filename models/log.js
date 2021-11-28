const mongoose = require("mongoose")
const Schema = mongoose.Schema

const logSchema = new Schema({
  requestBody: {
    type: Object,
  },
  path: String,
  baseUrl: String,
  requestUser: {
    type: Object,
  },
  id: String,
  email: String,
  username: String,
  role: {
    type: String,
    enum: { 
      values: ["admin", "viewer", "editor", "user"] ,
      message: "{VALUE} is not supported"
    },
  },
  requestDate: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    enum: { 
      values: ["valid", "invalid"] ,
      message: "{VALUE} is not supported"
    },
    default: "valid"
  },
})

module.exports = mongoose.model("Log", logSchema)