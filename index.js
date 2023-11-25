const express = require("express");
const cors = require("cors");
const ticketRoutes = require('./src/routes/ticketRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes')
const app = express();
app.use(express.json());

require("dotenv").config();
const connect = require('./connectMongo');
connect();
app.use(cors());

// Usar rutas
app.use('/api/tickets', ticketRoutes);
app.use('/api/clientes', clienteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
