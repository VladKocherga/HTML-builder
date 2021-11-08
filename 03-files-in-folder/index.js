const fs = require('fs');

const path = require('path');
let kekw;
let dir = path.join(__dirname, 'secret-folder');
function readFile(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    err ? console.log(err) : null;
    files.forEach((file) => {
      kekw = path.join(dir, file.name);
      fs.stat(kekw, (err, stats) => {
        err ? console.log(err) : null;
        if (file.isFile()) {
          console.log(
            `${path.basename(
              file.name.split('.').splice(0, 1).join('')
            )} - ${path.basename(
              file.name.split('.').splice(1, 1).join('')
            )} - ${stats.size / 1024}kb`
          );
        }
      });
    });
  });
}

readFile(dir);
