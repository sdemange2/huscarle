var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'huscarle');

var schema = mongoose.Schema({ 
  nombre: String,
  corpus: Number,
  fechaDeNacimiento: String,
  ciudadDeNacimiento: String,
  provinciaDeNacimiento: String,
  fechaDeDefuncion: String,
  ciudadDeDefuncion: String,
  provinciaDefuncion: String,
  cargos: [{
    funcion: String,
    exposicion: Number
  }],
  elegidoAcadémicoCorrespondienteEn: Number,
  elegidoMiembroDeLaAcademiaDeBellasArtesEn: String,
  académicoCorrespondienteEnLaCiudadDe: String,
  recibidoEnEnLaAcademiaDeBellasArtesEn: Number,
  biografia: String,
  galardones: [{
    exposicion: Number,
    galardon: String,
    renunciaOficial: Boolean
  }],
  etiquetas: [],
  obras: [{
    _id: mongoose.Schema.Types.ObjectId,
    tituloObra: String,
    subtituloObra: String,
    otrosTitulos: String,
    fechaObraHacia: String,
    fechaInicioObra: String,
    fechaFinalObra: String,
    presentadaEnLaExposicionNacionalDe: String,
    tecnica: String,
    informacionAdicionalDeLaObra: String,
    premiadaCon: String,
    reunciaOficialAlPremio: String,
    votacionPremio: String,
    rOPremios: String,
    adquisicion: String,
    rOAdquisicion: String,
    fechaAdquisicionParticular: String,
    precioAdquisicion: String,
    unidad: String,
    destinoAdquisicion: String,
    ciudadColeccion: String,
    coleccion: String,
    enDepositoEn: String,
    institucionDeDeposito: String,
    numeroDeInventario: String,
    datosLibresEstadoObra: String,
    alto: String,
    ancho: String,
    imagen: String,
    comentarios: String,
    difusionPrensa: String,
    fuente: String,
    etiquetas: [],
    otrasImagenes: [{
      imagen: String,
      fuente: String
    }]
  }]
});

var model = db.model('autores', schema);

model.find(function(err, autores) {

  autores.forEach(function(autor) {
    autor.obras.forEach(function(obra, index) {
      if(!obra.imagen) {
        var id = mongoose.Types.ObjectId;
        autor.obras[index]._id = new id();
        autor.save();
      }
    });
    //autor.save();    
  });

  console.log('fin.');
});