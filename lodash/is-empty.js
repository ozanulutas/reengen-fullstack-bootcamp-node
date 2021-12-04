const fp = require("lodash/fp")

// isEmpty object veya arraylerin boş olup olmadığını kontrol eder
console.log(fp.isEmpty([]))
console.log(fp.isEmpty({}))
console.log(fp.isEmpty(''))
console.log(fp.isEmpty(null))
console.log(fp.isEmpty(undefined))
console.log(fp.isEmpty(0))

console.log(fp.isEmpty(2022))
console.log(fp.isEmpty(false))
console.log(fp.isEmpty(true))
console.log(fp.isEmpty(() => {}))

console.log(fp.isEmpty(["ozan"]))
console.log(fp.isEmpty({ name: "ozan" }))


const data = { name: "ozan" }

if(!fp.isEmpty(data)) {
  console.log("data is not empty");
}
