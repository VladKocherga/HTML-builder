const fs = require("fs");
const chalk = require("chalk");

let stream = new fs.ReadStream("01-read-file/text.txt", {
  encoding: "utf-8",
});
stream.on("readable", function () {
  let data = stream.read();
  if (data != null) console.log(chalk.blue(data.trim()));
});
stream.on("error", function (err) {
  if (err.code == "ENOENT") {
    console.log("file not found");
  } else {
    console.error(err);
  }
});
