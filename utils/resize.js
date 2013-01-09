var fs = require('fs')
  , im = require('imagemagick')
  , path = require('path');

function resizeList(params, files, callback) {

  var pending = files.length;

  for(var i = 0; i < files.length; i++) {
    im.resize({
      srcPath: path.join(params.src, '/', files[i])
    , dstPath: path.join(params.dest, '/', files[i])
    , width: params.width
    }
    , function() {
      pending -= 1;
      if(pending == 0)
        callback();
    });
  }
}

function resize(params, callback) {

  fs.readdir(params.src, function(err, files) {
    
    if (err) {
      console.log('Error reading files: ', err);
    }
    else {
      resizeList(params, files, callback);
    }
  });
}

module.exports = resize;