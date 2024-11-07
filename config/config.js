require('dotenv').config()
const SECRET = process.env.SECRET_KEY

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '2elab'
})


module.exports = { connection, SECRET }