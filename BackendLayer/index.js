const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

config = require('./db');

const userRoute = require('./routes/user');
const locationRoutes = require('./routes/location');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/addLocation', locationRoutes);

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});
