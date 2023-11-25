const Ticket = require('../models/ticketModel');

// POST - CREAR UN NUEVO TICKET
exports.crearTicket = async (req, res) => {
  try {
    const nuevoTicket = new Ticket(req.body);

    const ticketGuardado = await nuevoTicket.save();
    res.status(201).json(ticketGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - TRAER TODOS LOS TICKETS
exports.traerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

//OPERADORES - - $eq, $gt, $gte, $lt, $lte, $ne, $in, $nin

//GET - ($eq) Traer tickets en estado ABIERTO
//rta: 4
exports.traerTicketsEq = async (req, res) => {
  try {
    const traerTicketsEq = await Ticket.find({ "infoTicket.estado": { $eq: "abierto" } });
    res.status(200).json(traerTicketsEq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($gt) Traer tickets con fecha mayor a junio 2023
exports.traerTicketsGt = async (req, res) => {
  try {
    const fechaLimite = new Date("2023-06-01");
    const ticketsGt = await Ticket.find({ "infoTicket.fecha": { $gte: fechaLimite } });
    res.status(200).json(ticketsGt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($gte) Traer tickets con fecha mayor o igual a agosto 2023
exports.traerTicketsGte = async (req, res) => {
  try {
    const fechaLimite = new Date("2023-04-01");
    const ticketsGte = await Ticket.find({ "infoTicket.fecha": { $gte: fechaLimite } });
    res.status(200).json(ticketsGte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($lt) Traer tickets creados hasta las 16 hs
exports.traerTicketsLt = async (req, res) => {
  try {
    const horaLimite = "16:00";
    const ticketsHastaHora = await Ticket.find({
      "infoTicket.hora": { $lte: horaLimite }
    });
    res.status(200).json(ticketsHastaHora);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($lte) Traer tickets creados entre las 7 am y 11 am
exports.traerTicketsLte = async (req, res) => {
  try {
    const horaInicio = "07:00";
    const horaFin = "11:00";
    const ticketsEnHorario = await Ticket.find({
      "infoTicket.hora": {
        $gte: horaInicio,
        $lt: horaFin
      }
    });
    res.status(200).json(ticketsEnHorario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($ne) Traer tickets en estado NO cerrados
//rta: 6
exports.traerTicketsNe = async (req, res) => {
  try {
    const traerTicketsNe = await Ticket.find({ "infoTicket.estado": { $ne: "cerrado" } });
    res.status(200).json(traerTicketsNe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($in) Traer tickets que estan en desperfecto/acceso denegado
//rta: 6
exports.traerTicketsIn = async (req, res) => {
  try {
    const traerTicketsIn = await Ticket.find({ "infoTicket.motivo": { $in: ["desperfecto", "acceso denegado"] } });

    res.status(200).json(traerTicketsIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($nin) Traer tickets que no esten en estado ni "cerrado" ni "suspendido"
exports.traerTicketsNin = async (req, res) => {
  try {
    const ticketsNin = await Ticket.find({ "infoTicket.estado": { $nin: ["cerrado", "suspendido"] } });
    res.status(200).json(ticketsNin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGICOS - $or, $and, $nor, $not
//GET - ($or) Traer tickets en estado abierto o motivo desperfecto
//rta: 5
exports.traerTicketsOr = async (req, res) => {
  try {
    const traerTicketsOr = await Ticket.find({
      $or: [
        { "infoTicket.estado": "abierto" },
        { "infoTicket.motivo": "desperfecto" }
      ]
    });
    res.status(200).json(traerTicketsOr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($and) Traer tickets donde el cliente es empleado y el estado es "abierto".
//rta: 2
exports.traerTicketsAnd = async (req, res) => {
  try {
    const traerTicketsAnd = await Ticket.find({
      $and: [
        { "cliente.esEmpleado": true },
        { "infoTicket.estado": "abierto" }
      ]
    });
    res.status(200).json(traerTicketsAnd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($nor) Traer tickets donde el cliente no es empleado y el estado no es "cerrado".
//rta: 3
exports.traerTicketsNor = async (req, res) => {
  try {
    const traerTicketsNor = await Ticket.find({
      $nor: [
        { "cliente.esEmpleado": true },
        { "infoTicket.estado": "cerrado" }
      ]
    });
    res.status(200).json(traerTicketsNor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($not) Traer tickets donde el estado no es "pendiente".
//rta: 8
exports.traerTicketsNot = async (req, res) => {
  try {
    const traerTicketsNot = await Ticket.find({
      "infoTicket.estado": { $not: { $eq: "pendiente" } }
    });
    res.status(200).json(traerTicketsNot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GEOESPACIALES - $near, $geoWithin, $geoIntersects
//GET - ($near) Traer clientes que viven en el mismo punto
exports.traerTicketsNear = async (req, res) => {
  try {
    const ticketsCercanos = await Ticket.find({
      'cliente.ubicacion.geolocalizacion': {
        $near: {
          $geometry: { type: "Point", coordinates: [-70.6506, -33.4378] },
          $maxDistance: 1000
        }
      }
    });
    res.status(200).json(ticketsCercanos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($geoWithin) Traer clientes del area aldedor de la plaza mitre
exports.traerTicketsGeoWithin = async (req, res) => {
  try {
    const ticketsEnArea = await Ticket.find({
      'cliente.ubicacion.geolocalizacion': {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [
                  -58.367051146592885,
                  -34.66155605449324
                ],
                [
                  -58.36971189793573,
                  -34.66284445721147
                ],
                [
                  -58.367845080461194,
                  -34.665756526526145
                ],
                [
                  -58.36170818623479,
                  -34.66200611525318
                ],
                [
                  -58.36507704075797,
                  -34.658529111759016
                ],
                [
                  -58.367051146592885,
                  -34.66155605449324
                ]
              ]
            ]
          }
        }
      }
    });
    res.status(200).json(ticketsEnArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//GET - ($geoIntersects) Traer clientes que viven sobre la calle Belgrano
exports.traerTicketsGeoIntersects = async (req, res) => {
  try {
    const ticketsIntersectando = await Ticket.find({
      'cliente.ubicacion.geolocalizacion': {
        $geoIntersects: {
          $geometry: {
            type: "LineString",
            coordinates: [
              [
                -58.36839831596094,
                -34.66419364702507
              ],
              [
                -58.36639831596094,
                -34.66219364702507
              ]
            ]
          }
        }
      }
    });
    res.status(200).json(ticketsIntersectando);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//BUSQUEDA TEXTO - $text, $search
//GET - ($text y $search) Traer los clientes con la palabra "interrupcion" en su comentario
exports.traerTicketsText = async (req, res) => {
  try {
    const resultado = await Ticket.aggregate([
      { $match: { $text: { $search: "interrupción" } } },
      { $project: { cliente: 1, comentarioCliente: 1, infoTicket: 1 } }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//AGREGATION
//GET - ($exists) Traer tickets que tienen comentario de cliente 
exports.traerTicketsExists = async (req, res) => {
  try {
    const ticketsConComentarios = await Ticket.find({
      "comentarioCliente": { $exists: true, $ne: "" }
    });
    res.status(200).json(ticketsConComentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($all) Traer clientes que tienen Canal de deportes 
exports.traerTicketsAll = async (req, res) => {
  try {
    const canalesRequeridos = ["Canal Deportes"];
    const ticketsConCanales = await Ticket.find({
      "cliente.plan.canales": { $all: canalesRequeridos }
    });
    res.status(200).json(ticketsConCanales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($elemMatch) Traer tickets con solucion exitosa
exports.traerTicketsElemMatch = async (req, res) => {
  try {
    const ticketsConDerivacionExitosa = await Ticket.find({
      "derivacion.historialDerivaciones": {
        $elemMatch: { "responsables.soluciones.exito": true }
      }
    });
    res.status(200).json(ticketsConDerivacionExitosa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($size) Traer tickets sin derivaciones
exports.traerTicketsSize = async (req, res) => {
  try {
    const numeroDerivaciones = 0;
    const ticketsPorNumeroDerivaciones = await Ticket.find({
      "derivacion.historialDerivaciones": { $size: numeroDerivaciones }
    });
    res.status(200).json(ticketsPorNumeroDerivaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($unwind, $match, $group, $project) Qué desperfecto ocurre, dónde, cada cuánto, etc.
exports.traerClientesDesperfectos = async (req, res) => {
  try {
    const resultado = await Ticket.aggregate([
      { $unwind: "$infoTicket" },
      { $match: { "infoTicket.motivo": { $exists: true } } },
      {
        $group: {
          _id: "$infoTicket.motivo",
          ubicaciones: { $addToSet: "$cliente.ubicacion.geolocalizacion.coordinates" },
          frecuencia: { $sum: 1 }
        }
      },
      {
        $project: {
          motivo: "$_id",
          ubicaciones: 1,
          frecuencia: 1,
          _id: 0
        }
      }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($unwind y $group) Traer los responsables de tickets y la cantidad de tickets atendidos
exports.informesUnwindGroup = async (req, res) => {
  try {
    const informe = await Ticket.aggregate([
      { $unwind: "$infoTicket" },
      {
        $group: {
          _id: {
            nombre: "$infoTicket.responsableTicket.nombre",
            apellido: "$infoTicket.responsableTicket.apellido"
          },
          totalTickets: { $sum: 1 }
        }
      },
      {
        $project: {
          responsable: { $concat: ["$_id.nombre", " ", "$_id.apellido"] },
          totalTickets: 1,
          _id: 0
        }
      },
      { $sort: { totalTickets: -1 } }
    ]);
    res.status(200).json(informe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - ($lookup, $match y $project) Traer los clientes que son empleados y generaron ticket
exports.traerTicketsEmpleados = async (req, res) => {
  try {
    const informe = await Ticket.aggregate([
      {
        $lookup: {
          from: "clientes",
          localField: "cliente.dni",
          foreignField: "dni",
          as: "clienteInfo"
        }
      },
      {
        $unwind: {
          path: "$clienteInfo"
        }
      },
      {
        $match: {
          "clienteInfo.esEmpleado": true
        }
      },
      {
        $project: {
          "nombreCliente": "$clienteInfo.nombre",
          "apellidoCliente": "$clienteInfo.apellido",
          "dniCliente": "$clienteInfo.dni",
          "emailCliente": "$clienteInfo.contacto.email",
          "telefonosCliente": "$clienteInfo.contacto.telefonos",
          "ubicacionCliente": "$clienteInfo.ubicacion",
        }
      }
    ]);
    res.status(200).json(informe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







