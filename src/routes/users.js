const express = require('express')
const app = express()
const bcrypt = require ("bcrypt"); //importar libreria encriptar password

const db = require('../database')
const User = db.user
const Op = db.Sequelize.Op

//endpoint para crear usuario
app.post('/user', async(request, response)=> {
    const {body} = request

    //validar que el usuario no este creado en la bd
    try {
        const existUser = await User.findOne({
            where:{
                user_name:body.userName
            }

        })
        if (existUser) return response.status(400).json({msg:'User already exist'});
        let userBody = {
            name: body.name,
            last_name: body.lastName,
            user_name: body.userName,
            password: bcrypt.hashSync(body.password,10),
            status: 1,
        }
        await User.create(userBody); //Crear usuario
        
        response.json(
            {
                name:body.name,
                lastName:body.lastName,
                userName:body.userName,

            })
    } catch (error) {
        console.log('Error', error)
        response.status(400).json({msg:'User is not create'});
    }
});

//Actualizar usuario 
/*app.put('/user/:id', async(request, response)=>{
    const {body} = request;

    try {

        const idUserAuth = await verifyToken(request, response);

        if (idUserAuth === "jwt expired")
            return response.status(401).send({message: "login expired"});

        if (idUserAuth.message === "invalid signature"  idUserAuth.message === "jwt must be provided")
            return response.status(401).send({message: "Token is not valid or undefined"});

        const user = await User.findByPk(idUserAuth);

        if (!user)
            return response.status(404).json({msg: "User not found"});

        if (body.password  body.userName)
            return response.status(400).json({msg: "Password or username can't be updated"});

        let userBody = {
            name: body.name,
            last_name: body.lastName,
            user_name: body.userName,
            preferred_currency: body.preferredCurrency,
        }

        await user.update(userBody);

        response.json({
            name: user.getDataValue("name"),
            last_name: user.getDataValue("last_name"),
            user_name: user.getDataValue("user_name"),
            preferred_currency: user.getDataValue("preferred_currency"),
        });

    } catch (error) {
        response.status(400).json({msg: "User is not updated"});
    }



})*/

module.exports = app

