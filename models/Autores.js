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
    tituloObra: { type: String, default: '' },
    subtituloObra: { type: String, default: '' },
    otrosTitulos: { type: String, default: '' },
    fechaObraHacia: { type: String, default: '' },
    fechaInicioObra: { type: String, default: '' },
    fechaFinalObra: { type: String, default: '' },
    presentadaEnLaExposicionNacionalDe: { type: String, default: '' },
    tecnica: { type: String, default: '' },
    informacionAdicionalDeLaObra: { type: String, default: '' },
    premiadaCon: { type: String, default: '' },
    reunciaOficialAlPremio: { type: String, default: '' },
    votacionPremio: { type: String, default: '' },
    rOPremios: { type: String, default: '' },
    adquisicion: { type: String, default: '' },
    rOAdquisicion: { type: String, default: '' },
    fechaAdquisicionParticular: { type: String, default: '' },
    precioAdquisicion: { type: String, default: '' },
    unidad: { type: String, default: '' },
    destinoAdquisicion: { type: String, default: '' },
    ciudadColeccion: { type: String, default: '' },
    coleccion: { type: String, default: '' },
    enDepositoEn: { type: String, default: '' },
    institucionDeDeposito: { type: String, default: '' },
    numeroDeInventario: { type: String, default: '' },
    datosLibresEstadoObra: { type: String, default: '' },
    alto: { type: String, default: '' },
    ancho: { type: String, default: '' },
    imagen: { type: String, default: '' },
    comentarios: { type: String, default: '' },
    difusionPrensa: { type: String, default: '' },
    fuente: { type: String, default: '' },
    etiquetas: [],
    otrasImagenes: [{
      imagen: { type: String, default: '' },
      fuente: { type: String, default: '' },
      descripcion: { type: String, default: '' }
    }]
  }]
});

module.exports = db.model('autores', schema);