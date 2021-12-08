const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const routesPosts = require("./routes/posts")
const routesManagers = require("./routes/managers")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

dotenv.config()

app.use("/api", routesPosts)
app.use("/api", routesManagers)

module.exports = app