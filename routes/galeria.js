var Galerias = require('../models/Galerias');

exports.index = function(req, res) {

  Galerias.find({ galeria: req.params.id })
          .exec(function(err, obras) {

    var md = require("markdown");

    obras.forEach(function(obra) {
      obra.fuente = md.markdown.toHTML('Fuente: ' + obra.fuente);
      obra.descripcion = md.markdown.toHTML(obra.descripcion);
    });

    res.render('galeria/index', {
      nombre: req.params.id,
      obras: obras
    });      
  });
}

exports.paginada = function(req, res) {

  Galerias.find({ galeria: req.params.id })
          .skip((25 * req.params.page - 1))
          .limit(25)
          .exec(function(err, obras) {
    res.render('galeria/paginada', {
      nombre: req.params.id,
      obras: obras
    });      
  });
}

exports.uploadImage = function(req, res) {

  var obra = new Galerias({
    galeria: req.body.galeria,
    fuente: req.body.fuente,
    descripcion: req.body.descripcion,
  });

  var tmpPath    = req.files.imagen.path;
  var folder     = './public/images/galerias/';
  var name       = obra.id;
  var ext        = require('path').extname(req.files.imagen.name||'').split('.').pop();
  var targetPath = folder + name + '.' + ext;
  var targetPath100 = folder + '/100/' + name + '.' + ext;

  var fs = require('fs');

  fs.rename(tmpPath, targetPath, function(err) {
    if(err) console.log(err);

    obra.imagen = name + '.' + ext;
    obra.save(function(err) {
      if(err) console.log(err);

      require('imagemagick').resize({
        srcPath: targetPath,
        dstPath: targetPath100,
        width:   100
      }, function(err, stdout, stderr){
        if(err) console.log(err);
        res.redirect('/galeria/' + req.body.galeria);
      });
    });
  });
}

exports.eliminar = function(req, res) {

  Galerias.findById(req.params.id, function(err, obra) {
    
    if(err) console.log(err);

    var fs = require('fs');

    fs.unlinkSync('./public/images/galerias/' + obra.imagen);
    fs.unlinkSync('./public/images/galerias/100/' + obra.imagen);

    obra.remove(function(err, obra) {
      
      if(err) console.log(err);

      res.json({
        success: true
      });
    });

  });
}