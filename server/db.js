var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'navbar'
})

db.connect();


module.exports = db;
