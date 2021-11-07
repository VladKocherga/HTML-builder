const fs = require('fs');

let stream = new fs.ReadStream('01-read-file/text.txt', {
  encoding: 'utf-8',
});
stream.on('readable', function () {
  let data = stream.read();
  if (data != null) console.log(data);
});
stream.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.log('file not found');
  } else {
    console.error(err);
  }
});
