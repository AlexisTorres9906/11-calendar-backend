const express = require("express");
const { dbconnection } = require("./database/config");
require("dotenv").config();
var cors = require("cors");
//crear el servidor
const app = express();

//base de datos
dbconnection();

//CORS
app.use(cors());
//cors only for www.example.com
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/

//Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//TODO: CRUD: Eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
