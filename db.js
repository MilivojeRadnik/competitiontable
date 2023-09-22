const mysql = require('mysql2');

const pool = mysql.createPool({
  host:
    process.env.HOST ||
    'competitiondb.cpdh7ubbl10e.eu-north-1.rds.amazonaws.com',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || 'Root123*',
  database: process.env.DATABASE || 'mas_v2',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  dateStrings: true,
});

module.exports = pool;
