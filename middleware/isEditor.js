const User = require("../models/user")
// TODO: hatalı?
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
    req.user.email = user.email
    req.user.role = user.role
    req.user.username = user.username
    req.user.age = user.age
    // console.log(user);

    if(!["admin", "editor"].includes(user.role)) {
      // TODO: hatalı?
      const log = new Log({ requestBody, path, ...req.user, type: "invalid" })
      await log.save()
      
      return resp.status(401).json({ message: "you are not editor" })
    } else {
      next()
    }
  } catch(err) {
    resp.status(500).json({ message: "invalida token" })
    console.log(err.message);
  }
}