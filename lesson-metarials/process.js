// lifecycle hooklar gibi kullandığımız yapı
// çok hook var. dökümantasyondan incelenebilir
// https://nodejs.org/api/process.html
const process = require("process")

// uygulamadan çıkmadan önce
process.on("beforeExit", (val) => {
  console.log("user: " + val + "is leaving");
})

process.on("exit", (val) => {
  console.log("user: " + val + "left");

  // diğer console'lar
  console.info("info")
  console.warn("warn")
  console.error("error")
  console.table("table")
})