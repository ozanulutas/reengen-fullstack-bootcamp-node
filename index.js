const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const user = require("./router/user")

const app = express()
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use("/user", user)

// middleware
// altalata istenilan kadar callback yazılabilir
app.use("/financial", 
  (req, resp, next) => {
    if(req.headers.get("x-access-token")) {
      next()
    } else {
      resp.send("you are not authorized to access this route")
    }
  },
  (req, resp, next) => {
    if(req.headers.get("x-access-token")) {
      next()
    }
  },
  // financial // her şey yolundaysa financial'a gidecek
)

dotenv.config()

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if(err) {
    console.log(err);
  } else {
    console.log("connected to mongodb...");
  }
})

app.listen(process.env.PORT, err => {
  if(err) {
    console.log(err);
  } else {
    console.log(`Listening ${process.env.PORT}...`);
  }
})