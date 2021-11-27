const router = require("express").Router()
const { check, validationResult } = require("express-validator/check")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

router.post("/signup", 
  [
    check("username", "username is not valid")
      .not()
      .isEmpty(),
    check("email", "email is not valid")
      .isEmail(),
    check("password", "password is not valid, must be min 6 char lengths")
      .isLength({min: 6})
  ],
  async (req, resp) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return resp.status(400).json({
        errors: errors.array()
      })
    }

    const { username, email, password, age, role } = req.body
    
    try {
      const user = new User({ username, email, password, age, role })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user._id,
        }
      }

      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 10000 }, (err, token) => {
        if(err) {
          throw err
        } 
        resp.status(200).json({ token })
      })

    } catch (err) {
      console.log(err.message);
      resp.status(500).send(err.message)
    }
  }
)

router.post("/signin",
  [
    check("email", "email is not valid")
      .isEmail(),
    check("password", "password is not valid, must be min 6 char lengths")
      .isLength({min: 6})
  ],
  async(req, resp) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return resp.status(400).json({
        errors: errors.array()
      })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      
      if(!user) {
        return resp.status(400).send("user is not exists")
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return resp.status(400).send("Incorrect password")
      }
      
      const payload = {
        user: {
          user: user.id
        }
      }

      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 10000 }, (err, token) => {
        if(err) {
          throw err.message
        }

        resp.status(200).json(token)
      })
    } catch (err) {
      console.log(err.message);
      resp.status(500).json({ message: err.message })
    }
  }
)

router.get("/me", async (req, resp) => {
  try {
    const user = await User.findById(req.body.id)
    resp.status(201).json({ user })
  } catch (err) {
    resp.send(err.message)
  }
})

module.exports = router
