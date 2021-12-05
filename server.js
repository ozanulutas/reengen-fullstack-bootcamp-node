const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
// const routes = require("./routes/posts")

const app = express();

app.use(express.json())

app.use(cors())

dotenv.config()

// app.use("api", routes)

module.exports = app