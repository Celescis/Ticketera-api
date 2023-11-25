const Cliente = require('../models/clienteModel');

// POST - CREAR UN NUEVO CLIENTE
exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET - TRAER TODOS LOS CLIENTES
exports.traerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};