var createError = require("http-errors");
var fs = require("fs");
var express = require("express");
var path = require("path");
var sass = require("node-sass");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");

var app = express();
app.engine("art", require("express-art-template"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 配置sass
var watch = fs.watch(
  path.resolve("./public/scss"),
  function (type, filename) {}
);
watch.on("change", function (type, filename) {
  console.log(filename, "&&&&&&&&&&&&");
  saveCss(filename);
});
function saveCss(filename) {
  // 使用node-sass模块进行转换，后保存到css文件夹
  let suffix = path.extname(filename);
  if (suffix !== ".scss") return;
  let outputName = path.resolve(
    "./public/css/",
    path.basename(filename, suffix) + ".css"
  );
  sass.render(
    {
      file: path.resolve("./public/scss", filename),
      outFile: outputName,
      outputStyle: "compressed",
      sourceMap: true,
    },
    function (err, result) {
      if (err) return;
      fs.writeFile(outputName, result.css, function (err) {});
    }
  );
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
