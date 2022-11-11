const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const db = require("../database");
const User = db.user;

//endpoint para crear usuario
app.post("/user", async (request, response) => {
  const { body } = request;

  try {
    //validar que el usuario no este creado en la bd
    const existUser = await User.findOne({
      where: {
        user_name: body.userName,
      },
    });

    if (existUser)
      return response.status(400).json({ msg: "Usuario ya existe" });

    let userBody = {
      name: body.name,
      last_name: body.lastName,
      user_name: body.userName,
      password: bcrypt.hashSync(body.password, 10),
      status: 1,
    };
      
    //Crear usuario
    await User.create(userBody); 

    response.json({
      name: body.name,
      lastName: body.lastName,
      userName: body.userName,
    });

  } catch (error) {
    console.log("Error", error);
    response.status(400).json({ msg: "Usuario no creado" });
  }
});

module.exports = app;
