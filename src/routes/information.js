const express = require("express");
const app = express();
const db = require("../database");
const Info = db.info;
const verifyToken = require("../middleware/autentication");

app.get("/information", verifyToken, async (request, response) => {
  const { user_id } = request;
  const findUser = await Info.findAll({ where: { user_id } });
  response.send(findUser);
});

module.exports = app;
