const express = require('express')
const app = express()
const jsonwebtoken = require('jsonwebtoken')
const verifyToken = require('../middleware/autentication')
const axios = require('axios')
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

client
  .geocode({
    params: {
        
        components: {
            country:'Ecuador'
        } ,
        key: "AIzaSyCl6BQajE_2aukdRtyGnmpD0ePLe1yuuxY",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].geometry.location);
  })
  .catch((e) => {
    console.log(e);
  });

app.post('/lrestaurantes', verifyToken , async(request, response)=> {
    const {body} = request;
    let results = []
    try {
        const getRestaurant = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json` , {
            params:{
                query:body.city,
                key:'AIzaSyCRvzoSvx_Ttal-hMc9QdQ7AcAvnHVRULo',
                sensor:false,
                type:'restaurant',
                radius:1500,
            }
        })
        getRestaurant.data.results.forEach(restaurant => {
            let restaurants = {
                estadoEmpresa:restaurant.business_status,
                direccion:restaurant.formatted_address,
                localizacion:restaurant.geometry.location,
                imagen:restaurant.icon,
            }
            results.push(restaurants)
        });

        response.status(200).send(results)
        
    } catch (error) {
       console.log(error)
       response.status(400).json({msg:'Error inesperado'}) 
       
    }
})

module.exports = app