const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
// const connection = require('./configs/db-adapters/db-connect');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const constants = require('./config/constants');
// const momentTim = require('moment');


module.exports = function () {
    let server = express(), create, start;

    create = function (config) {
        let routes = require('./routes');

        // Server settings
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // Returns middleware that parses json
        server.use(bodyParser.json());

        // Setup morgan for development
        server.use(morgan('dev'));

        // Setting up templating engine
        // server.set('view engine', 'ejs');

        // CORS
        server.use(cors());

        // Set up routes
        server.use('/', routes);
        // routes.init(server);

        moment.tz.setDefault(constants.momentTimezone);


        server.use((req, res) => {
            res.status(404).send('not found');


        });

    };

    start = function () {
        let hostname = server.get('hostname'),
            port = server.get('port');

        var uri = 'mongodb+srv://web3db:z6UTQZLB2slbWXJ3@cluster0.8bvu3.mongodb.net/?retryWrites=true&w=majority';

        const client = mongoose.connect(uri, {
            useNewUrlParser: true,
            // replicaSet: 'rs0'
        })
        mongoose.set('useFindAndModify', false);
        mongoose.set('debug', true)

        mongoose.Promise = global.Promise;

        //Get the default connection
        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        db.once('open', async function () {
            console.log('Db is Successfully Connected')
            server.listen(port, function () {
                console.log('EDb connected successfully && Server started at - http://' + hostname + ':' + port);
            })
        });
        // }).catch(err => {
        //     console.error('Unable to connect to the database:', err);
        // });
    };

    unhandledRoutes = function () {
        // Handling errors if route doesn't match 
        server.use((req, res, next) => {
            const error = new Error('Undefined route.');
            error.status = 404;
            next(error);
        });

        // Returning error with response
        server.use((error, req, res, next) => {
            res.status(error.status || 500);

        });
    };

    return { create, start };
};
