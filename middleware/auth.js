const jwt = require("jsonwebtoken")

module.exports = (req, resp, next) => {
  const token = req.header("token")
  if(!token) {
    return resp.status(401).json({ message: "Auth error" })
  } 
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // sonraki middleware göndermek için
    req.user = { id: decoded.user.user }
    // console.log("decoded", req.user);
    next()
  } catch(err) {
    resp.status(500).json({ message: "invalida token" })
    console.log(err.message);
  }
}