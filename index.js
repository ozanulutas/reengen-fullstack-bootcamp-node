const express = require("express")
const cors = require("cors") // https://devnot.com/2019/cors-nedir/
const bodyParser = require('body-parser')
const fs = require('fs-extra')

const users = require("./database/users.json")
const log = require("./database/log.json")

const app = express()

// create application/json parser
// const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())

app.get('/', function (req, res) {
  if (req.method !== "GET") {  // istek methodunu aldık
    return res.status(404)
  }
  res.send(users)
})

// http://localhost:3000/users?email=ozan@patika.com
// isteği gönderilince users.content döndrürür
app.get('/users/', urlencodedParser, function (req, res) {
  if (req.method !== "GET") {
    return res.status(404)
  }

  if (req.query.email) {
    const val = users.users.find(el => el.email === req.query.email)
    if (val.content) {
      res.send({ content: val.content })
    } else {
      res.send("email not found")
    }
  } else {
    res.send("email must be send in request")
  }
  // body-parser gerekli
  // bodyden gelen veriyi görmek için
  console.log(req.body)

  let data = {
    [new Date()]: {
      userID: new Date(),
      reqEmail: req.query.email,
    }
  }

  fs.writeJsonSync("./database/log.json", data)
    .then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    })

  // fs.writeJson("./database/log.json", {...log, ...data})
  //   .then(() => {
  //     console.log("success");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
})


app.listen(3000, () => {
  console.log("listening port 3000");
})