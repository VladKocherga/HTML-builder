/*При использовании скрипта, убедитесь что live server выключен */
const fs = require('fs');
const path = require('path');

let styles = path.join(__dirname, 'styles');
let inOnestyles = path.join(__dirname, 'project-dist', 'bundle.css');

function createFile(inOnestyles) {
  fs.stat(inOnestyles, function (err) {
    if (err) {
      fs.open(inOnestyles, 'w', (err) => {
        if (err) throw err;
        fileInOne();
      });
    } else {
      fs.unlink(inOnestyles, (err) => {
        if (err) throw err;
        fs.open(inOnestyles, 'w', (err) => {
          if (err) throw err;
        });
        fileInOne();
      });
    }
  });
}
function fileInOne() {
  fs.readdir(styles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      let fileSrc = path.join(styles, file.name);
      fs.stat(fileSrc, (err, stat) => {
        if (err) throw err;
        if (stat.isFile()) {
          if (file.name.split('.').reverse().splice(0, 1).join('') === 'css') {
            fs.readFile(
              path.join(styles, file.name),
              { encoding: 'utf-8' },
              (err, data) => {
                if (err) throw err;

                fs.appendFile(inOnestyles, data, (err) => {
                  if (err) throw err;
                });
              }
            );
          }
        }
      });
    });
  });
}

createFile(inOnestyles);
console.log('End!!');
