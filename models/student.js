const mongoose = require("mongoose")

const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: String,
  surname: String,
  noteRate: Number,
  ability: Object,
})

module.exports = mongoose.model("Student", studentSchema)