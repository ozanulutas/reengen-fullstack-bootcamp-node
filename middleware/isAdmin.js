const User = require("../models/user")

module.exports = async (req, resp, next) => {
  const id = req.user.id
  if(!id) {
    return resp.status(401).json({ message: "Auth error" })
  } 
  
  try {
    const user = await User.findById(id)
    // console.log(user);
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