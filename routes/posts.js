const express = require("express")
const Post = require("../models/posts")
const router = express.Router()

router.get("/posts", async (req, resp) => {
  try {
    const posts = await Post.find()
    resp.status(200).send(posts)

  } catch (error) {
    resp.status(404).send(error.message)
  }
})

router.post("/posts", async (req, resp) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    })
    await post.save()
    resp.status(200).send(post)

  } catch (error) {
    resp.status(404).send(error.message)
  }
})

router.get("/posts/:id", async (req, resp) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    resp.status(200).send(post)

  } catch (error) {
    resp.status(404).send(error.message)
  }
})

router.patch("/posts/:id", async (req, resp) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    if(req.body.title) {
      post.title = req.body.title
    }
    if(req.body.content) {
      post.content = req.body.content
    }

    post.save()
    
    resp.status(200).send(post)
  
  } catch (error) {
    resp.status(404).send(error.message)
  }
  
})

router.delete("/posts/:id", async (req, resp) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    resp.status(204).send("deleted")
  
  } catch (error) {
    resp.status(404).send(error.message)
  }
  
})

module.exports = router