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

const TicketSchema = new Schema({
  cliente: {
    nombre: String,
    apellido: String,
    contacto: {
      email: String,
      telefonos: [String]
    },
    ubicacion: {
      geolocalizacion: GeoSchema,
      properties: {
        name: String
      }
    },
    plan: {
      nombre: String,
      canales: [String]
    },
    esEmpleado: Boolean
  },
  comentarioCliente: String,
  infoTicket: [
    {
      fecha: Date,
      hora: String,
      estado: String,
      responsableTicket: {
        nombre: String,
        apellido: String
      },
      motivo: String
    }
  ],
  derivacion: {
    historialDerivaciones: [
      {
        fecha: Date,
        hora: String,
        departamento: String,
        responsables: [
          {
            nombre: String,
            apellido: String,
            soluciones: [
              {
                descripcion: String,
                exito: Boolean
              }
            ],
            ticketCerrado: Boolean
          }
        ]
      }
    ]
  }
}, { timestamps: true });

GeoSchema.index({ 'geolocalizacion': '2dsphere' });

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
