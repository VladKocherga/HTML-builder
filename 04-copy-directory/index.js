const fs = require("fs");
const path = require("path");

let dir = path.join(__dirname, "files");
let copy = path.join(__dirname, "files-copy");
function createDir(copy) {
  fs.stat(copy, function (err) {
    if (err) {
      fs.mkdir(copy, (err) => {
        if (err) throw err;
        copyDir(dir, copy);
      });
    } else {
      fs.rmdir(copy, { recursive: true }, (err) => {
        if (err) throw err;
        fs.mkdir(copy, (err) => {
          if (err) throw err;
        });
        copyDir(dir, copy);
      });
    }
  });
}
createDir(copy);

function copyDir(dir, copy) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      let fileSrc = path.join(dir, file.name);
      fs.stat(fileSrc, (err, stat) => {
        if (err) throw err;
        if (stat.isFile()) {
          fs.copyFile(
            path.join(dir, file.name),
            path.join(copy, file.name),
            (err) => {
              if (err) throw err;
            }
          );
        } else {
          fs.mkdir(path.join(copy, file.name), (err) => {
            if (err) throw err;
          });

          copyDir(path.join(dir, file.name), path.join(copy, file.name));
        }
      });
    });
  });
}
console.log("End!");
