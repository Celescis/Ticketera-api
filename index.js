const express = require("express");
const cors = require("cors");
const ticketRoutes = require('./src/routes/ticketRoutes');
const ticketController = require("./src/controllers/ticketController");
const app = express();
app.use(express.json());

require("dotenv").config();
const connect = require('./connectMongo');
connect();
app.use(cors());

// Usar rutas
app.use('/api/tickets', ticketRoutes);
app.get("/api/tickets", ticketController.traerTickets);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
