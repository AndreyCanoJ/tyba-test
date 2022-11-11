const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const verifyToken = require("../middleware/autentication");
const db = require("../database");
const User = db.user;
const Blacklist = db.blacklist;

app.post("/login", async (request, response) => {
  const { body } = request;
  console.log(process.env.SECRET_KEY)
  try {
    //Buscar usuario
    let user = await User.findOne({
      where: {
        user_name: body.userName,
      },
    });

    if (!user.status)
      return response.status(404).json({ msg: "Usuario no autorizado" });

    if (!user)
      return response
        .status(404)
        .json({ msg: "Usuario o contraseña incorrecta" });

    if (!bcrypt.compareSync(body.password, user.password))
      return response
        .status(404)
        .json({ msg: "Usuario o contraseña incorrecta" });

    //Creacion de token para autorizar acceso
    let token = jsonwebtoken.sign(
      { user_id: user.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    response.json({
      success: true,
      token: token,
    });
  } catch (err) {
    return response.status(400).json({
      ok: false,
      err,
    });
  }
});
//Cerrar sesion
app.post("/logout", verifyToken, async (request, response) => {
  let token = request.get("token");
  const { user_id } = request;
  await Blacklist.create({
    token,
    user_id,
  });
  response.json({ msg: "Sesion cerrada correctamente" });
});

module.exports = app;
