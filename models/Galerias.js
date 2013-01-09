var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'huscarle');

var schema = mongoose.Schema({ 
  galeria     : { type: String, default: '' }
, fuente      : { type: String, default: '' }
, descripcion : { type: String, default: '' }
, imagen      : { type: String, default: '' }
});

module.exports = db.model('galerias', schema);