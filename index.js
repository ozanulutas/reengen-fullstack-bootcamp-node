const mongoose = require("mongoose")
const app = require("./server")

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(3000, () => console.log("Listening Port 3000..."))
  })