const DB = require('./db/mysql');

const dbName = 'tollplaza';
const tableName = 'trips';

// create db and tables
DB.query(`
DROP DATABASE IF EXISTS ${dbName};
CREATE DATABASE ${dbName};

DROP TABLE IF EXISTS ${dbName}.${tableName};
CREATE TABLE  IF NOT EXISTS ${dbName}.${tableName} (
  ID int(11) NOT NULL AUTO_INCREMENT,
  registration_number varchar(50) NOT NULL,
  amount varchar(10) NOT NULL,
  visit_type varchar(20) NOT NULL,
  entry_date DATETIME NOT NULL DEFAULT current_timestamp(),
  exit_date DATETIME NULL,
  PRIMARY KEY (ID),
  KEY registration_number (registration_number),
  KEY entry_date (entry_date),
  KEY exit_date (exit_date)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;`)
.then((res) => {
  // console.log(res);
  res = res[0] ? res[0] : res;
  if(res[0].serverStatus > 0) {
    console.log(`Dropped DB(if exists), ${dbName}`);
  }

  if(res[1].serverStatus > 0) {
    console.log(`Created DB, ${dbName}`);
  }

  if(res[2].serverStatus > 0) {
    console.log(`Dropped Table(if exists), ${tableName}`);
  }

  if(res[3].serverStatus > 0) {
    console.log(`Created Table, ${tableName}`);
  }
})
.catch((err) => {
  console.log(err.message);
})
.finally((res)=>{
  DB.end();
});