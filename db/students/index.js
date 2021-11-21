const client = require('../db.js')

const getAll = (request, response) => {
  client.query('SELECT * FROM students', (err, res) => {
    if (!err) {
      response.status(200).json(res.rows)
      // console.log(res.rows);
    } else {
      console.log(err);
    }
  })

  // client.end()
}

const getByName = (request, response) => {
  client.query('SELECT * FROM students WHERE name = $1', [request.params.name], (err, res) => {
    if (!err) {
      response.status(200).json(res.rows)
    } else {
      console.log(err);
    }
  })

  // client.end()
}

const deleteByName = (request, response) => {
  const { name } = require.body
  // with callback
  client.query('DELETE FROM students WHERE name = $1', [name], (err, res) => {
    if (!err) {
      response.status(200).send("user is deleted")
    } else {
      console.log(err);
    }
  })

  // with promise
  // client.query('DELETE FROM students WHERE name = $1', [name])
  //   .then(response => response.status(200).send("user is deleted"))
  //   .catch(err => console.log(err))

  // client.end()
}

const create = (request, response) => {
  const { name, surname, age, depression, location, salaray } = request.body()
  client.query('INSERT INTO students ($1, $2, $3, $4, $5, $6)', [name, surname, age, location, depression, salaray], (err, res) => {
    if (!err) {
      response.status(201).send("Student is inserted")
    } else {
      console.log(err);
    }
  })

  // client.end()
}

const update = (request, response) => {
  const { name, surname, age, depression, location, salaray } = request.body()
  client.query(
    'UPDATE students SET name = $1, surname = $2, age = $3, depression = $4, location = $5, salaray = $6 WHERE name = $1',
    [name, surname, age, depression, location, salaray],
    (err, res) => {
      if (!err) {
        response.status(201).send("Student is updated")
      } else {
        console.log(err);
      }
    })

  // client.end()
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

  client.query(`UPDATE students SET ${str} WHERE name=$1`, values, (err, res) => {
    if (!err) {
      response.status(201).send(`user updated`)
    }
    else {
      console.log(err)
    }
  })
}

module.exports = { getAll, getByName, deleteByName, create, update, updateOne }