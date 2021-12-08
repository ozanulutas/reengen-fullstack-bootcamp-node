const express = require("express")
const Manager = require("../models/managers")
const router = express.Router()


router.post("/managers", async (req, resp) => {
  try {
    const manager = new Manager({
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
      authorization: req.body.authorization,
    })
    await manager.save()
    resp.status(200).send(manager)

  } catch (error) {
    resp.status(404).send(error.message)
  }
})

router.get("/managers/:id", async (req, resp) => {
  try {
    const manager = await Manager.findOne({ _id: req.params.id })
    resp.status(200).send(manager)

  } catch (error) {
    resp.status(404).send(error.message)
  }
})


// router.get("/managers", async (req, resp) => {
//   try {
//     const managers = await Post.find()
//     resp.status(200).send(managers)

//   } catch (error) {
//     resp.status(404).send(error.message)
//   }
// })
// router.patch("/managers/:id", async (req, resp) => {
//   try {
//     const post = await Post.findOne({ _id: req.params.id })
//     if(req.body.title) {
//       post.title = req.body.title
//     }
//     if(req.body.content) {
//       post.content = req.body.content
//     }

//     post.save()
    
//     resp.status(200).send(post)
  
//   } catch (error) {
//     resp.status(404).send(error.message)
//   }
  
// })

// router.delete("/managers/:id", async (req, resp) => {
//   try {
//     await Post.deleteOne({ _id: req.params.id })
//     resp.status(204).send("deleted")
  
//   } catch (error) {
//     resp.status(404).send(error.message)
//   }
  
// })

module.exports = router