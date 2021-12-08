const app = require("../server")
const Manager = require("../models/managers")
const mongoose = require("mongoose")
const supertest = require("supertest")

// username, age, email, location, authorization

beforeEach((done) => {
  mongoose.connect(process.env.DB_TEST,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})


test("POST /api/managers", async () => {
  const data = {
    username: "ata",
    age: 40,
    email: "ata@ata.com",
    authorization: "admin"
  }
  const manager = await Manager.create(data)

  await supertest(app).post("/api/managers")
    .send(manager)
    .set("Content-Type", "application/x-www-form-urlencoded") // gönderme ayarı
    .expect(200)
    .then(async (resp) => {
      expect(resp.body._id).toBeTruthy()
      expect(resp.body.username).toBe(manager.username)
      expect(resp.body.age).toBe(manager.age)
      expect(resp.body.email).toBe(manager.email)
      expect(resp.body.authorization).toBe(manager.authorization)

      const manager = await Manager.findOne({ _id: resp.body._id })
      expect(manager).toBeTruthy()
      expect(manager.username).toBe(data.username)
      expect(manager.age).toBe(data.age)
      expect(manager.email).toBe(data.email)
      expect(manager.authorization).toBe(data.authorization)
    })
})

test("GET /api/managers/:id", async () => {
  const data = {
    username: "ozan",
    age: 30,
    email: "ozan@ozan.com",
    authorization: "admin"
  }
  const manager = await Manager.create(data)

  await supertest(app).get("/api/managers/" + manager.id)
    .expect(200)
    .then(async (resp) => {
      expect(resp.body._id).toBe(manager.id)
      expect(resp.body.username).toBe(manager.username)
      expect(resp.body.age).toBe(manager.age)
      expect(resp.body.email).toBe(manager.email)
      expect(resp.body.authorization).toBe(manager.authorization)
    })
})

// test("GET /api/managers", async () => {
//   const data = {
//     title: "get test title",
//     content: "get test content"
//   }
//   const post = await Post.create(data)

//   await supertest(app).get("/api/managers")
//     .expect(200)
//     .then(async (resp) => {
//       expect(Array.isArray(resp.body)).toBeTruthy()
//       expect(resp.body.length).toEqual(1)

//       expect(resp.body[0]._id).toBe(post.id)
//       expect(resp.body[0].title).toBe(post.title)
//       expect(resp.body[0].content).toBe(post.content)
//     })
// })

// test("DELETE /api/managers/:id", async () => {
//   const post = await Post.create({
//     title: "delete test title",
//     content: "delete test content"
//   })

//   await supertest(app).delete("/api/managers/" + post.id)
//     .expect(204)
//     .then(async () => {
//       expect(await Post.findOne({ _id: post.id })).toBeFalsy()
//     })
// })

// test("PATCH /api/managers/:id", async () => {
//   const post = await Post.create({
//     title: "patch test title",
//     content: "patch test content"
//   })

//   const data = {
//     title: "updated test title",
//     content: "updated test content"
//   }

//   await supertest(app).patch("/api/managers/" + post.id)
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
