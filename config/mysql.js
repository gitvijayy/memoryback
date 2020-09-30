const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  timezone: 'UTC',
  dateStrings: true
  // ssl      : process.env.DB_SSL,
});
connection.connect(err => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
