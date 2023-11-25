const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.crearTicket);
router.get('/', ticketController.traerTickets);

//OPERADORES
router.get('/eq', ticketController.traerTicketsEq);
router.get('/ne', ticketController.traerTicketsNe);
router.get('/gt', ticketController.traerTicketsGt);
router.get('/gte', ticketController.traerTicketsGte);
router.get('/lt', ticketController.traerTicketsLt);
router.get('/lte', ticketController.traerTicketsLte);
router.get('/in', ticketController.traerTicketsIn);
router.get('/nin', ticketController.traerTicketsNin);

//LOGICOS
router.get('/or', ticketController.traerTicketsOr);
router.get('/and', ticketController.traerTicketsAnd);
router.get('/nor', ticketController.traerTicketsNor);
router.get('/not', ticketController.traerTicketsNot);

//GEOLOCALIZACION
router.get('/near', ticketController.traerTicketsNear);
router.get('/geowithin', ticketController.traerTicketsGeoWithin);
router.get('/geointersects', ticketController.traerTicketsGeoIntersects);

//AGREGATION
router.get('/text', ticketController.traerTicketsText);
router.get('/exists', ticketController.traerTicketsExists);
router.get('/all', ticketController.traerTicketsAll);
router.get('/elemmatch', ticketController.traerTicketsElemMatch);
router.get('/size', ticketController.traerTicketsSize);
router.get('/desperfectos', ticketController.traerClientesDesperfectos);
router.get('/unwindgroup', ticketController.informesUnwindGroup);
router.get('/lookup', ticketController.traerTicketsEmpleados);

module.exports = router;

