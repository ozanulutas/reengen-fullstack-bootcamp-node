const client = require('../db.js')

const getAll = (request, response) => {
  client.query('SELECT * FROM classes ORDER BY name ASC', (err, res) => {
    if (!err) {
      response.status(200).json(res.rows)
      // console.log(res.rows);
    } else {
      console.log("err", err);
    }
  })

}

const getClasses = (request, response) => {
  const { size, type, manager } = request.query
  switch (type) {
    case "size": {
      client.query('SELECT * FROM classes WHERE size > $1 ORDER BY name DESC', [size], (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    case "managernot": {  // != veya <>
      client.query('SELECT * FROM classes WHERE manager != $1', [manager], (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    case "managerlist": {
      const { managerlist } = request.body()
      client.query(`SELECT * FROM classes WHERE manager IN (${managerlist.map(man => `'${man}'`).join()})`, (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    case "managerlistnot": {
      const { managerlist } = request.body()
      client.query(`SELECT * FROM classes WHERE manager NOT IN (${managerlist.map(man => `'${man}'`).join()})`, (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    // dinamik hali
    case "managerlist":
    case "managerlistnot": {
      const { managerlist } = request.body()
      const qstr = type === "managerlist" ? "IN" : "NOT IN"
      client.query(`SELECT * FROM classes WHERE manager ${qstr} (${managerlist.map(man => `'${man}'`).join()})`, (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    case "cost": {
      const { min, max } = request.body()
      client.query(`SELECT * FROM classes WHERE cost BETWEEN ${min} AND ${max} ORDER BY cost DESC`, (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;

    default: {
      client.query('SELECT * FROM classes', (err, res) => {
        if (!err) {
          response.status(200).json(res.rows)
          // console.log(res.rows);
        } else {
          console.log("err", err);
        }
      })
    }
      break;
  }


}

// const getByName = (request, response) => {
//   client.query('SELECT * FROM students WHERE name = $1', [request.params.name], (err, res) => {
//     if (!err) {
//       response.status(200).json(res.rows)
//     } else {
//       console.log(err);
//     }
//   })

// }

const deleteByName = (request, response) => {
  const { name } = require.body
  // with callback
  client.query('DELETE FROM classes WHERE name = $1', [name], (err, res) => {
    if (!err) {
      response.status(200).send("class is deleted")
    } else {
      console.log(err);
    }
  })

}

const create = (request, response) => {
  const { size, cost, manager, useful, name } = request.body()
  client.query('INSERT INTO classes ($1, $2, $3, $4, $5)', [size, cost, manager, useful, name], (err, res) => {
    if (!err) {
      response.status(201).send("Class is inserted")
    } else {
      console.log(err);
    }
  })

}

const update = (request, response) => {
  const { size, cost, manager, useful, name } = request.body()
  client.query(
    'UPDATE classes SET size = $1, cost = $2, manager = $3, useful = $4, name = $5, salaray = $6 WHERE name = $1',
    [size, cost, manager, useful, name],
    (err, res) => {
      if (!err) {
        response.status(201).send("class is updated")
      } else {
        console.log(err);
      }
    })

}

const updateOne = (request, response) => {

  let keys = Object.keys(request.body)
  let values = Object.values(request.body)
  let str = ""

  for (let i = 0; i < keys.length; i++) {
    if (i == keys.length - 1) {
      str += `${keys[i]}=$${i + 1}`
    } else {
      str += `${keys[i]}=$${i + 1}, `
    }
  }

  client.query(`UPDATE classes SET ${str} WHERE name=$1`, values, (err, res) => {
    if (!err) {
      response.status(201).send(`class is updated`)
    }
    else {
      console.log(err)
    }
  })
}

module.exports = {
  getAll,
  getClasses,
  // getByName, 
  deleteByName, 
  create, 
  update, 
  updateOne 
}