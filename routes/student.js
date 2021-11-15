const router = require("express").Router()
const Student = require("../models/student")

router.post("/student", async (req, resp) => {
  try {
    const student = new Student()
    student.name = req.body.name
    student.surname = req.body.surname
    student.noteRate = req.body.noteRate
    student.ability = req.body.ability

    await student.save()

    resp.status(201).json({
      success: true,
      student
    })

  } catch (err) {
    console.log(err);
    resp.status(500).json({
      success: false,
      err: err.message
    })
  }
})

router.get("/student/:id", async (req, resp) => {
  try {
    const student = await Student.findOne({ _id: req.params.id }).exec()

    resp.status(20).json({
      success: true,
      student
    })

  } catch (err) {
    console.log(err);
    resp.status(500).json({
      success: false,
      err: err.message
    })
  }
})

module.exports = router;