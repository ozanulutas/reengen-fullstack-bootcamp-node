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

console.log(fp.at(["name", "undefined.key", "room.no"], obj));

const [name, roomNo] = fp.at(["name", "room.no"], obj)
console.log(name, roomNo);
