var db = connect('localhost/huscarle');

var general = db.autores.aggregate(
  { 
    $match: {
      $or: [{ 
        nombre: /^pat/i
      }, {
        'obras.tituloObra': /^pat/i
      }]
    }
  },
  {
    $unwind: '$obras'
  },
  { 
    $match: {
      $or: [{ 
        nombre: /^pat/i
      }, {
        'obras.tituloObra': /^pat/i
      }]
    }
  },
  {
    $project: {
      _id: 1,
      nombre: 1,
      'obras.tituloObra': 1
    }
  }
);

printjson(general);