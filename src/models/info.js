//Importar tipos de datos de sequelize
module.exports = (sequelize, Sequelize) => {
  //Crear tabla en db
  const Info = sequelize.define("information", {
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Info;
};
