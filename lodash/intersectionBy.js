const fp = require("lodash/fp")

// iki kümenin kesişimini getirir

const one = [
  { name: "foo" },
  { name: "john" },
  { name: "doe" },
]

const two = [
  { name: "bar" },
  { name: "john" },
  { name: "doenna" },
]

console.log(fp.intersectionBy("name", one, two));
