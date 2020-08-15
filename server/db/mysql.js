const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.db,
  multipleStatements: true
});

module.exports = connection.promise();