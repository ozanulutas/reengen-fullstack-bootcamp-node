const http = require("http")
const mat = require("./math")

// const cl = require("./global")

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })  // gönderilen response düzgün gitmezse deyu
  
  const calc = mat.Topla(3, 5)
  // process.env.APP_ENV // .env erişmek için

  res.end("res: " + calc)
}).listen(8080)