const Mat = function () {

}

Mat.prototype.Topla = function (a, b) {
  return a + b
}

Mat.prototype.Cikar = function (a, b) {
  return a - b
}

Mat.prototype.Bol = function (a, b) {
  return a / b
}

Mat.prototype.Carp = function (a, b) {
  return a * b
}

Mat.prototype.Rnv = function () {
  let api = ""

  switch (process.env.APP_ENV) {
    case "dev": {
      api = "dev"
    }
    break;
    default: {
      api = "test"
    }
    break;

  }
  return api
}

module.exports = new Mat()
