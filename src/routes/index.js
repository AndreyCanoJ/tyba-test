//Redirigir  cada endpoint a su respectiva logica
const express = require("express");
const app = express();

app.use(require("./users"));
app.use(require("./login"));
app.use(require("./restaurants"));
app.use(require("./information"));
module.exports = app;
