const jsonwebtoken = require("jsonwebtoken");
const db = require("../database");
const Blacklist = db.blacklist;

let verifyToken = (request, response, next) => {
  let token = request.get("token");
  try {
    //verifica que el token este activo
    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      const findBlackList = await Blacklist.findOne({
        where: {
          token
        },
      });
      if (err || findBlackList) {
        return response.status(401).json({
          ok: false,
          err: "TOKEN NO VALIDO",
        });
      }

      request.user_id = decoded.user_id;
      next();
    });
  } catch (error) {
    response.status(400).json({
      msg: "Firma invalida",
    });
    next();
  }
};
module.exports = verifyToken;
