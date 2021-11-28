const client = require("../db")

const getAll = (req, resp) => {
  client.query("SELECT * FROM employes", (err, res) => {
    if(!err) {
      resp.status(200).json(res.rows)
    } else {
      console.log(err.message);
    }
  })
}

module.exports = {
  getAll,

}