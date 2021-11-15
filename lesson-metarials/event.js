const events = require("events")

const eventEmitter = new events.EventEmitter()

function logger(msg) {
  console.log(msg)
}

// event oluşturduk
// event adı, ve func
// logFong isimli bir istek gelirse logger()ı çalıştır
eventEmitter.on("logFong", logger) 
// event birden çok çağırısal da bir kez çalışır
eventEmitter.once("logFonce", logger) 

// eventi çalışıtırıyoruz
eventEmitter.emit("logFonce", "msg from once...")
eventEmitter.emit("logFonce", "msg from once...")
eventEmitter.emit("logFong", "msg from on...")
eventEmitter.emit("logFong", "msg from on...")