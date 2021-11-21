const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/index')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.json({info: 'initial route'})
})

app.get('/students', db.students.getAll)
app.get('/students/:name', db.students.getByName)
app.post('/students', db.students.create)
app.put('/students/:name', db.students.update)
app.put('/students', db.students.updateOne)
app.delete('/students', db.students.deleteByName)

app.get('/classes', db.classes.getAll)
app.get('/class', db.classes.getClasses)
app.post('/classes', db.classes.create)
app.put('/classes', db.classes.updateOne)
app.put('/classes/:name', db.classes.update)
app.delete('/classes', db.classes.deleteByName)

app.listen(8080, () => console.log('Listening 8080...'))
