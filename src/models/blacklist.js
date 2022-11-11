//Importar tipos de datos de sequelize
module.exports = (sequelize, Sequelize) => {
  //Crear tabla en db
  const Blacklist = sequelize.define("blacklist", {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Blacklist;
};
