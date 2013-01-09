var Autores = require('../models/Autores');

exports.create = function(req, res) {
  var autor = new Autores(req.body);

  autor.save(function(err) {
    res.json(autor.id);
  });
}

exports.remove = function(req, res) {

  Autores.findByIdAndRemove(req.params.id, function() {
    res.json('ok');
  });
}

/*
 * GET home page.
 */
exports.index = function(req, res) {

  Autores.find({})
         .sort('nombre')
         .exec(function(err, autores) {
            res.render('index', { autores: autores });
          });
};

exports.show = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {

    if(autor.biografia)
      biografia = require("markdown").markdown.toHTML(autor.biografia);
    else
      biografia = '<p>Sin datos</p>';

    res.render('autores/show', {
      autor: autor,
      biografia: biografia
    });
  });
}

exports.galeria = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {

    res.render('galeria', {
      obras: autor.obras
    });
  });
}

exports.save = function(req, res) {

  Autores.update({
    _id: req.params.id
  }, req.body, function(err) {
    res.render('autores/nombre', {
      autor: req.body
    })
  });
}

exports.biografia = function(req, res) {

  Autores.findById(req.params.id, function(err, autor) {

    res.render('autores/biografia', {
      autor: autor
    });
  });
}

exports.biografiaSave = function(req, res) {

  Autores.update({
    _id: req.params.id
  }, {
    $set : { biografia: req.body.biografia }
  }, function(err) {
    res.json('La biografía se ha guardado correctamente.');
  });
}

exports.query = function(req, res) {

  var findField = {};

  findField[req.params.field] = req.params.value;

  Autores.find(findField, function(err, autores) {
    res.render('autores/query', {
      titulo: req.params.title + ' ' + req.params.value,
      autores: autores
    });
  })
}

exports.informacion = function(req, res) {
  Autores.findById(req.params.id, function(err, autor) {

    res.render('autores/informacion', {
      autor: autor
    });
  });
}

exports.informacionEdicion = function(req, res) {
  Autores.findById(req.params.id, function(err, autor) {

    res.render('autores/informacion_edicion', {
      autor: autor
    });
  });
}

exports.insertTag = function(req, res) {

  Autores.update(
      { _id: req.params.id }
    , { $push: { "etiquetas": req.body.etiqueta } }
    , { multi: true }
    , function(err, result) {
        if(err) throw err;
        res.json('ok');
      });
}

exports.removeTag = function(req, res) {

  Autores.update(
      { _id: req.params.id }
    , { $pull: { "etiquetas": req.body.etiqueta } }
    , { multi: true }
    , function(err, result) {
        if(err) throw err;
        res.json('ok');
      });
}