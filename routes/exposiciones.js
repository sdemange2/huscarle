var Exposiciones = require('../models/Exposiciones');
var Autores = require('../models/Autores');

exports.index = function(req, res) {

  Exposiciones.find().exec(function(err, exposiciones) {
    res.render('exposiciones/index', {
        exposiciones: exposiciones
    });
  });
}

exports.show = function(req, res) {
  Exposiciones.findOne({ "ano": req.params.id }).exec(function(err, exposicion) {
    res.render('exposiciones/show', {
      exposicion: exposicion
    });
  });
}