// const app = require("../server")
// const Post = require("../models/posts")
// const mongoose = require("mongoose")
// const supertest = require("supertest")

// beforeEach((done) => {
//   mongoose.connect(process.env.DB_TEST,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     () => done()
//   )
// })

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   })
// })


// test("GET /api/posts", async () => {
//   const data = {
//     title: "get test title",
//     content: "get test content"
//   }
//   const post = await Post.create(data)

//   await supertest(app).get("/api/posts")
//     .expect(200)
//     .then(async (resp) => {
//       expect(Array.isArray(resp.body)).toBeTruthy()
//       expect(resp.body.length).toEqual(1)

//       expect(resp.body[0]._id).toBe(post.id)
//       expect(resp.body[0].title).toBe(post.title)
//       expect(resp.body[0].content).toBe(post.content)
//     })
// })

// test("GET /api/posts/:id", async () => {
//   const data = {
//     title: "get one test title",
//     content: "get one test content"
//   }
//   const post = await Post.create(data)

//   await supertest(app).get("/api/posts/" + post.id)
//     .expect(200)
//     .then(async (resp) => {
//       expect(resp.body._id).toBe(post.id)
//       expect(resp.body.title).toBe(post.title)
//       expect(resp.body.content).toBe(post.content)
//     })
// })

// test("DELETE /api/posts/:id", async () => {
//   const post = await Post.create({
//     title: "delete test title",
//     content: "delete test content"
//   })

//   await supertest(app).delete("/api/posts/" + post.id)
//     .expect(204)
//     .then(async () => {
//       expect(await Post.findOne({ _id: post.id })).toBeFalsy()
//     })
// })

// test("PATCH /api/posts/:id", async () => {
//   const post = await Post.create({
//     title: "patch test title",
//     content: "patch test content"
//   })

//   const data = {
//     title: "updated test title",
//     content: "updated test content"
//   }

//   await supertest(app).patch("/api/posts/" + post.id)
//     .send(data)
//     .set("Content-Type", "application/x-www-form-urlencoded") // gönderme ayarı
//     .expect(200)
//     .then(async (resp) => {
//       expect(resp.body._id).toBe(post.id)
//       expect(resp.body.title).toBe(data.title)
//       expect(resp.body.content).toBe(data.content)

//       const updatedPost = await Post.findOne({ _id: resp.body.id })
//       expect(updatedPost).toBeTruthy()
//       expect(updatedPost.title).toBe(data.title)
//       expect(updatedPost.content).toBe(data.content)
//     })
// })

// test("POST /api/posts", async () => {
//   const data = {
//     title: "post test title",
//     content: "post test content"
//   }

//   await supertest(app).post("/api/posts")
//     .send(data)
//     .set("Content-Type", "application/x-www-form-urlencoded") // gönderme ayarı
//     .expect(200)
//     .then(async (resp) => {
//       expect(resp.body._id).toBeTruthy()
//       expect(resp.body.title).toBeTruthy()
//       expect(resp.body.content).toBeTruthy()

//       const post = await Post.findOne({ _id: resp.body._id })
//       expect(post).toBeTruthy()
//       expect(post.title).toBeTruthy()
//       expect(post.content).toBeTruthy()
//     })
// })