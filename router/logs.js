const router = require("express").Router()
const Log = require("../models/log")

router.get("/all", async (req, resp) => {
  try {
    const logs = await Log.find()
    resp.status(201).json({ logs, logsLength: logs.length })
  } catch (err) {
    resp.send(err.message)
  }
})

module.exports = router
