const fp = require("lodash/fp")

// omit belirtilmeyen değerleri geri getirir
// pick get e benziyor

const obj = {
  name: "patika",
  room: {
    no: 30
  },
  user: [
    "ozan",
    "onur"
  ]
}

console.log("pick");
console.log(fp.pick(["name"], obj));
console.log(fp.pick(["undefinedKey"], obj));
console.log("omit");
console.log(fp.omit(["name"], obj));
console.log(fp.omit(["name", "user"], obj));
console.log("asc", fp.omit(["undefinedKey"], obj));

