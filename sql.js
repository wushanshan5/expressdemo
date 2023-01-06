var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "cms",
  port: 3306,
});
db.connect();
module.exports = db;
