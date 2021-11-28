const User = require("../models/user")
const Log = require("../models/log")

module.exports = async (req, resp, next) => {
  const id = req.user.id
  if(!id) {
    return resp.status(401).json({ message: "Auth error" })
  } 
  
  try {
    const user = await User.findById(id)
    const requestBody = { ... req.body }
    const path = req.path
    const baseUrl = req.baseUrl

    req.user.email = user.email
    req.user.role = user.role
    req.user.username = user.username
    req.user.age = user.age

    // TODO: hatalı?
    const log = new Log({ requestBody, path, baseUrl, ...req.user, type: isAdmin ? "valid" : "invalid" })
    await log.save()

    if(user.role !== "admin") {
      return resp.status(401).json({ message: "you are not admin" })
    } else {
      next()
    }
  } catch(err) {
    resp.status(500).json({ message: "invalida token" })
    console.log(err.message);
  }
}