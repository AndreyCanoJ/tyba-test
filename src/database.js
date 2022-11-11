const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tybadb", "root", "root", {
  host: "mysql",
  dialect: "mysql",
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//instanciar tablas que se utilizaran
db.user = require("./models/user")(sequelize, Sequelize);
db.info = require("./models/info")(sequelize, Sequelize);
db.blacklist = require("./models/blacklist")(sequelize, Sequelize);

module.exports = db;
