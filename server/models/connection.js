var pgp = require('pg-promise')(options);
var promise=require('promise');
var options = {
  // Initialization Options
  promiseLib: promise
};
var connectionString = 'postgres://tester:test_password@localhost:5432/test';
//postgres://tester:test_password@localhost/test
var db = pgp(connectionString);

module.exports=db;