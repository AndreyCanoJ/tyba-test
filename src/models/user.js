//Importar tipos de datos de sequelize
module.exports = (sequelize,Sequelize) => {
    //Crear tabla en db
    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN
        },
    });
    return User
}



