var express = require("express");
var db = require("../sql.js");
// var mysql = require("mysql");
// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "cms",
//   port: 3306,
// });
// db.connect();
var router = express.Router();
router.get("/", function (req, res) {
  res.render("login/index", {
    title: "登录页面",
    keyword: "8u889jnfjdjdhfdhskjf",
    meta: "379e47jnxfjhd",
    data: {},
  });
});

router.get("/main", function (req, res) {
  res.render("login/main", {
    title: "首页",
    data: {},
  });
});

router.post("/api", function (req, res) {
  var data = req.body;
  db.query(
    "select * from user where username=? and userpwd=?",
    [data.username, data.userpwd],
    function (err, result, fields) {
      if (err) throw err;
      // res.writeHead(200, { "Content-Type": "application/json;charset=utf8;" });
      // res.write('<head><meta charset="utf-8" /></head>');
      if (result.length) {
        // 登陆成功
        // res.end(data.username + data.userpwd + "登录成功！");
        res.render("login/main", {
          title: "首页",
          data,
        });
      } else {
        // 登录失败
        res.end("登录失败");
      }
    }
  );
  // db.end();
});
module.exports = router;
