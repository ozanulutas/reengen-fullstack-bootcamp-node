const fp = require("lodash/fp")

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

const arr = [
  "ozan",
  "onur"
]

console.log(fp.get("name", obj));
console.log(fp.get("room.no", obj));
console.log(fp.get("user[0]", obj));
console.log(fp.get("undefined.nested.obj", obj));
console.log(fp.getOr("default value", "undefined.nested.obj", obj));

console.log(fp.get(1, arr));