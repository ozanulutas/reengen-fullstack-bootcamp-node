const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: '123123',
  database: 'test_db'
})

client.connect()

module.exports = client