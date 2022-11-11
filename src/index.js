const userRoutes = require("./routes/users");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//se llama la conexion con la base de datos
const db = require("./database");

db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//se llaman las rutas
app.use(require("./routes/index"));

app.listen(3000);
