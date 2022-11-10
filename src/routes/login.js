const express = require('express')
const app = express()
const bcrypt = require ("bcrypt");
const jsonwebtoken = require('jsonwebtoken')

const db = require('../database')
const User = db.user
const Op = db.Sequelize.Op


app.post('/login', async(request, response)=> {
    const {body} = request;

    try {

        let user = await User.findOne(
            {
                where:{
                    user_name: body.userName,
                      }
            });

        if (!user.status)
            return response.status(404).json({message: "User not authorized"});

        if (!user)
            return response.status(404).json({msg: 'User or password incorrect'});

        if (!bcrypt.compareSync(body.password, user.password))
            return response.status(404).json({msg: 'User or password incorrect'});

        let token = jsonwebtoken.sign({user_id: user.id},"secretkey", {expiresIn:'1h'});

        response.json({
            success: true,
            token: token
        });

    } catch (err) {
        return response.status(400).json({
            ok: false,
            err
        });
    }
})
module.exports = app