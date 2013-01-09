var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'huscarle');

var schema = mongoose.Schema({ 
  ano: Number,
  jurado: [{
    funcion: String,
    nombre: String
  }]
});

module.exports = db.model('exposiciones', schema);