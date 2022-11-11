const express = require("express");
const app = express();
const verifyToken = require("../middleware/autentication");
const axios = require("axios");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const db = require("../database");
const User = db.user;
const Info = db.info;

app.post("/restaurants", verifyToken, async (request, response) => {
  const { body, user_id } = request;
  let results = [];
  let coordinate = {};

  //Si existe el campo ciudad obtendremos sus coordenadas
  if (body.city) {
    await client
      .geocode({
        params: {
          address: body.city,
          key: process.env.KEY_GOOGLE,
        },
      })
      //Contiene toda la informacion recibida del client
      .then((r) => {
        coordinate = { ...r.data.results[0].geometry.location };
      })
      .catch((e) => {
        console.log(e);
        response
          .status(400)
          .json({ msg: "Ocurrio un error obteniendo latitud y longitud" });
      });
  } else {
    coordinate = { lat: body.latitude, lng: body.longitude };
  }

  try {
    const location = `${coordinate.lat},${coordinate.lng}`;
    const getRestaurant = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: "restaurant",
          location,
          radius: 1500,
          key: process.env.KEY_GOOGLE,
        },
      }
    );

    getRestaurant.data.results.forEach((restaurant) => {
      let restaurants = {
        estadoEmpresa: restaurant.business_status,
        direccion: restaurant.formatted_address,
        localizacion: restaurant.geometry.location,
        imagen: restaurant.icon,
      };
      results.push(restaurants);
    });
    //Crear historial de registro
    await findAndCreateInfo(user_id, coordinate.lat, coordinate.lng);

    response.status(200).send(results);
  } catch (error) {
    console.log(error);
    response.status(400).json({ msg: "Error inesperado" });
  }
});
//Guardar registro en la tabla de Info
async function findAndCreateInfo(userId, latitude, longitude) {
  const user = await User.findByPk(userId);
  let infoBody = {
    user_name: user.getDataValue("user_name"),
    user_id: userId,
    latitude,
    longitude,
  };
  await Info.create(infoBody);
}

module.exports = app;
