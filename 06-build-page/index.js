const fs = require('fs');
const path = require('path');

let styles = path.join(__dirname, 'styles');

let copy = path.join(__dirname, 'project-dist');
let styleUpdate = path.join(__dirname, 'project-dist', 'style.css');
let index = path.join(__dirname, 'project-dist', 'index.html');
let template = path.join(__dirname, 'template.html');
let components = path.join(__dirname, 'components');
let assetsOrigin = path.join(__dirname, 'assets');
let assets = path.join(__dirname, 'project-dist', 'assets');

fs.stat(copy, function (err) {
  if (err) {
    fs.mkdir(copy, (err) => {
      if (err) throw err;
    });
  }
});

function createFile(style) {
  fs.stat(style, function (err) {
    if (err) {
      fs.open(style, 'w', (err) => {
        if (err) throw err;
        styleCreate();
      });
      fs.open(index, 'w', (err) => {
        if (err) throw err;
        fs.readFile(template, { encoding: 'utf-8' }, (err, data) => {
          if (err) throw err;
          fs.appendFile(index, data, (err) => {
            if (err) throw err;
          });
          tempCreate();
        });
      });
    } else {
      fs.unlink(style, (err) => {
        if (err) throw err;
        fs.open(style, 'w', (err) => {
          if (err) throw err;
        });
        styleCreate();
      });
      fs.unlink(index, (err) => {
        if (err) throw err;
        fs.open(index, 'w', (err) => {
          if (err) throw err;
        });
        fs.readFile(template, { encoding: 'utf-8' }, (err, data) => {
          if (err) throw err;
          fs.appendFile(index, data, (err) => {
            if (err) throw err;
          });
          tempCreate();
        });
      });
    }
  });
}
/*Index.html */
function tempCreate() {
  fs.readFile(index, { encoding: 'utf-8' }, (err, data) => {
    let at;
    let reg;

    if (err) throw err;
    if (/{{.+}}/gi.test(data)) {
      // console.log(data.match(/{{.+}}/gi));
      reg = data.match(/{{.+}}/gi);
      reg = Array.from(reg);
      at = data.match(/{{.+}}/gi);
      at = Array.from(reg);
      for (let i = 0; i < reg.length; i++) {
        reg[i] = reg[i].replace(/{{/gi, '').replace(/}}/gi, '.html');
        fs.readdir(components, { withFileTypes: true }, (err, files) => {
          if (err) throw err;
          files.forEach((file) => {
            let fileSrc = path.join(components, file.name);
            fs.stat(fileSrc, (err, stat) => {
              if (err) throw err;
              if (stat.isFile()) {
                if (
                  file.name.split('.').reverse().splice(0, 1).join('') ===
                  'html'
                ) {
                  fs.readFile(
                    path.join(components, file.name),
                    { encoding: 'utf-8' },
                    (err, rep) => {
                      if (err) throw err;
                      if (file.name == reg[i]) {
                        data = data.replace(at[i], rep);
                      }
                      fs.writeFile(index, data, (err) => {
                        if (err) {
                          console.error(err);
                        }
                      });
                    }
                  );
                }
              }
            });
          });
        });
      }
    }
  });
}
createFile(styleUpdate);
function styleCreate() {
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

                fs.appendFile(styleUpdate, data, (err) => {
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
/*create aassets*/

function copyDir(assetsOrigin, assets) {
  fs.readdir(assetsOrigin, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      let fileSrc = path.join(assetsOrigin, file.name);
      fs.stat(fileSrc, (err, stat) => {
        if (err) throw err;
        if (stat.isFile()) {
          fs.copyFile(
            path.join(assetsOrigin, file.name),
            path.join(assets, file.name),
            (err) => {
              if (err) throw err;
            }
          );
        } else {
          fs.mkdir(path.join(assets, file.name), (err) => {
            if (err) throw err;
          });

          copyDir(
            path.join(assetsOrigin, file.name),
            path.join(assets, file.name)
          );
        }
      });
    });
  });
}
function createDir(assets) {
  fs.stat(assets, function (err) {
    if (err) {
      fs.mkdir(assets, (err) => {
        if (err) throw err;
        copyDir(assetsOrigin, assets);
      });
    } else {
      fs.rmdir(assets, { recursive: true }, (err) => {
        if (err) throw err;
        fs.mkdir(assets, (err) => {
          if (err) throw err;
        });
        copyDir(assetsOrigin, assets);
      });
    }
  });
}
createDir(assets);
console.log('End!');
