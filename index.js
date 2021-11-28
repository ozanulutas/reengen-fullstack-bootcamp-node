const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const log = require("./middleware/log")
const auth = require("./middleware/auth")
const isAdmin = require("./middleware/isAdmin")
const isAdminForLogs = require("./middleware/isAdminForLogs")
const isEditor = require("./middleware/isEditor")

const db = require("./db/index")
const user = require("./router/user")
const logs = require("./router/logs")

const app = express()
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))

// user routelarında çalışacak olan middleware
app.use("/user", log, user)
app.get("/financial", auth, isAdmin, db.financial.getAll)
app.get("/employes", auth, isEditor, log, db.employes.getAll)
app.use("/logs", auth, isAdminForLogs, logs)

// middleware
// altalata istenilan kadar callback yazılabilir
// app.use("/financial", 
//   (req, resp, next) => {
//     if(req.headers.get("x-access-token")) {
//       next()
//     } else {
//       resp.send("you are not authorized to access this route")
//     }
//   },
//   (req, resp, next) => {
//     if(req.headers.get("x-access-token")) {
//       next()
//     }
//   },
//   // financial // her şey yolundaysa financial'a gidecek
// )

dotenv.config()

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // autoIndex: false,
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