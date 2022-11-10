const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tybadb', 'root', 'root', {
    host:'mysql' , 
    dialect: 'mysql',
    
    
} );
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./models/user')(sequelize, Sequelize)
module.exports = db

/*db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });*/


