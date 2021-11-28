const Log = require("../models/log")

module.exports = async (req, resp, next) => {
  try {
    const requestBody = {...req.body}
    const path = req.path
    // const requestUser = req.user
    const log = new Log({ requestBody, path, ...req.user })
    await log.save()
    next() // sorun yoksa devam etsin diye next demeliyiz

  } catch (err) {
    resp.send(err.message)
  }
}