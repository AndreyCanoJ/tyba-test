const userRoutes = require('./routes/users')
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const db = require('./database')
db.sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'))

app.listen(3000);
console.log('Server on port', 3000);
