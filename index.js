const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

const studentRouter = require("./routes/student.js")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/api", studentRouter) // api önekiyle gidiyor

dotenv.config()

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mongodb");
  }
})

app.listen(8080, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("port 8080...");
  }
})