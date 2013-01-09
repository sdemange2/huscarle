var Autores = require('../models/Autores');

exports.index = function(req, res) {
  res.render('buscar/index');
}

exports.general = function(req, res) {

  var query = new RegExp(req.query.q, 'i');

  Autores.find(
    { nombre: query }
  ).limit(5)
   .sort('nombre')
   .exec(function(err, autores) {
      _findObras(query, autores, res);
   });
}

var _findObras = function(query, autores, res) {
  Autores.aggregate(
    { $match: { 'obras.tituloObra': query } },
    { $unwind: '$obras' },
    { $match: { 'obras.tituloObra': query } },
    { 
      $group: { 
        '_id': { 
          id: '$obras._id', 
          tituloObra: '$obras.tituloObra', 
          autor: '$_id', 
          nombre: '$nombre' 
        } 
      } 
    },
    { 
      $project: {
        _id: 0,
        _id: '$_id.id',
        tituloObra: '$_id.tituloObra',
        autor: {
          _id: '$_id.autor',
          nombre: '$_id.nombre'
        }
      }
    },
    function(err, obras) {
      res.render('buscar/general', { 
        autores: autores,
        obras: obras
      });
    }
  );
}