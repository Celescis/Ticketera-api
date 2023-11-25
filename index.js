const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

const ticketRoutes = require('./src/routes/ticketRoutes');
const ticketController = require('./src/controllers/ticketController');
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Conectar a MongoDB local
// mongoose.connect('mongodb://localhost:27017/Ticketera', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB se conecto!'))
//   .catch(err => console.log('No se pudo conectar', err));

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_CONNECT_URI)
  .then(() => console.log('MongoDB se conecto!'))
  .catch(err => console.log('No se pudo conectar', err));


// Usar rutas
app.use('/api/tickets', ticketRoutes);
app.get('/', ticketController.traerTickets);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
