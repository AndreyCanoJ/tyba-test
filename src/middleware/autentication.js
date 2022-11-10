const jsonwebtoken = require('jsonwebtoken')


let verifyToken =(request, response, next) => {
    let token = request.get('token');

    //verifica que el token este activo
    jsonwebtoken.verify(token, "secretkey" , (err, decoded) => {
        if (err) {
            return response.status(401).json({
                ok: false,
                err: 'TOKEN NO VALIDO'
            });
        }

        request.usuario = decoded.usuario;
        next();
    });
}
module.exports = verifyToken