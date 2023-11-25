const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const ClienteSchema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    contacto: {
      email: String,
      telefonos: [String]
    },
    localidad: {
      codigoPostal: Number,
      descripcion: String
    },
    ubicacion: {
      geolocalizacion: GeoSchema,
      properties: {
        name: String
      }
    },
    plan: {
      nombre: String,
      cantCanales:Number,
      canales: [String]
    },
    esEmpleado: Boolean
}, { timestamps: true });

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
