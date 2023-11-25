const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.post('/', clienteController.crearCliente);
router.get('/', clienteController.traerClientes);
module.exports = router;
