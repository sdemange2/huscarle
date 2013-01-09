var Autores = require('../models/Autores');

exports.show = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {

    var obra = autor.obras.id(req.params.obra);
    var md = require("markdown");

    if(obra.difusionPrensa)
      obra.difusionPrensa = md.markdown.toHTML(obra.difusionPrensa);

    if(obra.fuente)
      mdFuente = md.markdown.toHTML(obra.fuente);
    else
      mdFuente = '';

    res.render('obras/show', {
      obra: obra,
      autor: autor, 
      obras: autor.obras,
      mdFuente: mdFuente
    });
  });
}

exports.uploadFile = function(req, res, next) {
  
  if(req.files.obra.size > 0) {
    var tmpPath    = req.files.obra.path;
    var folder     = './public/images/corpus/';
    var name       = req.params.id + '-' + req.params.obra;
    var ext        = require('path').extname(req.files.obra.name||'').split('.').pop();
    var targetPath =  folder + name + '.' + ext;

    var fs = require('fs');

    fs.rename(tmpPath, targetPath, function(err) {
    
      if (err) throw err;

      Autores.update(
        { _id: req.params.id, "obras._id": req.params.obra }
      , { $set: { "obras.$.imagen": name + '.' + ext, 'obras.$.fuente': req.body.fuente } }
      , { multi: true }
      , function(err, result) {
          if(err) throw err;
          
          fs.unlink(tmpPath, function() {
            if (err) throw err;
            res.redirect('/autores/' + req.params.id + '/obras/' + req.params.obra);
          });
      });
    });
  }
  else {
     Autores.update(
        { _id: req.params.id, "obras._id": req.params.obra }
      , { $set: { 'obras.$.fuente': req.body.fuente } }
      , { multi: true }
      , function(err, result) {
          if(err) throw err;
          res.redirect('/autores/' + req.params.id + '/obras/' + req.params.obra);
        });
  }
}

exports.otrasImagenes = function(req, res, next) {

  Autores.findById(req.params.id, function(err, autor) {

    for(index in req.body.fuente) {

      var otraImagen = autor.obras.id(req.params.obra).otrasImagenes.id(index);
      
      if(!otraImagen) {
        var newIndex = autor.obras.id(req.params.obra).otrasImagenes.push({
          fuente: req.body.fuente[index],
          descripcion: req.body.descripcion[index]
        });

        otraImagen = autor.obras.id(req.params.obra).otrasImagenes[newIndex-1];
      }
      else {
        otraImagen.fuente      = req.body.fuente[index];
        otraImagen.descripcion = req.body.descripcion[index];
      }

      if(req.files.otras[index].size > 0) {
        var tmpPath    = req.files.otras[index].path;
        var folder     = './public/images/corpus/';
        var name       = req.params.id + '-' + req.params.obra + otraImagen.id;
        var ext        = require('path').extname(req.files.otras[index].name||'').split('.').pop();
        var targetPath =  folder + name + '.' + ext;

        var fs = require('fs');

        fs.renameSync(tmpPath, targetPath);

        otraImagen.imagen = name + '.' + ext;
      }

    };

    autor.save(function(err) {
      res.redirect('/autores/' + req.params.id + '/obras/' + req.params.obra);
    });
  });
}

exports.insertTag = function(req, res) {

  Autores.update(
      { _id: req.params.id, "obras._id": req.params.obra }
    , { $push: { "obras.$.etiquetas": req.body.etiqueta } }
    , { multi: true }
    , function(err, result) {
        if(err) throw err;
        res.json('ok');
      });
}

exports.removeTag = function(req, res) {

  Autores.update(
      { _id: req.params.id, "obras._id": req.params.obra }
    , { $pull: { "obras.$.etiquetas": req.body.etiqueta } }
    , { multi: true }
    , function(err, result) {
        if(err) throw err;
        res.json('ok');
      });
}

exports.etiquetas = function(req, res) {

  Autores.find().distinct('obras.etiquetas', function(err, etiquetas) {
    res.json(etiquetas);
  });
}

exports.add = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {
    
    var index = autor.obras.push({
      tituloObra: req.body.tituloObra
    });

    var obra = autor.obras[index-1];
    
    autor.save();

    res.render('autores/obra', {
      autor: autor,
      obra: obra
    })
  });
}

exports.remove = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {
    autor.obras.id(req.body.obra).remove();
    autor.save();    
    res.json('ok');
  });
}

exports.titulo = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {
    Autores.update(
      { _id: req.params.id, "obras._id": req.params.obra }
    , { $set: { "obras.$.tituloObra": req.body.tituloObra, "obras.$.subtituloObra": req.body.subtituloObra } }
    , { multi: true }
    , function(err, result) {
        if(err) throw err;
        res.render('obras/titulo', {
          autor: { id: req.params.id },
          obra: { id: req.params.obra, tituloObra: req.body.tituloObra, subtituloObra: req.body.subtituloObra },
          obras: autor.obras
        })
      });
  });
}

exports.datos = function(req, res) {
  
  Autores.findById(req.params.id, function(err, autor) {
      var obra = autor.obras.id(req.params.obra);
      
      if(obra.difusionPrensa)
        obra.difusionPrensa = require("markdown").markdown.toHTML(obra.difusionPrensa);

      res.render('obras/datos', {
        obra: obra,
        autor: autor
      });
    });
}

exports.datosEdicion = function(req, res) {
  
  Autores.findOne({ 
    _id: req.params.id,
    "obras._id": req.params.obra
  }).select('nombre obras.$').exec(function(err, autor) {
      res.render('obras/datos_edicion', {
        obra: autor.obras[0],
        autor: autor
      });
    });
}

exports.saveDatos = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {
    
    var obra = autor.obras.id(req.params.obra);

    for(var property in req.body)
      obra[property] = req.body[property];

    autor.save();

    res.json('ok');
  });
}