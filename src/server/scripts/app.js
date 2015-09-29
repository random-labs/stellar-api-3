import r from 'rethinkdb';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import config from '../config';

const app = express();

// Middleware
app.use(bodyParser.json());

// API Setup
app.use('/api', api);

// Base Routes
app.get('/', (req, res) => {
    res.send('Hello!');
});

// 404
app.use((req, res) => {
    res.status(404).end('not found');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ err: err.message });
});

function startExpress(connection) {
    app._rdbConn = connection;
    const server = app.listen(config.server.port, () => {
        console.log(`Server listening on port ${server.address().port}.`);
    });
}

r.connect(config.rethinkdb, (err, connection) => {
    if (err) throw err;

    // Create Database
    r.dbList().contains(config.rethinkdb.db).do(containsDb => {
        return r.branch(containsDb, { created: 0 }, r.dbCreate(config.rethinkdb.db));
    })
    .run(connection, err => {
        if (err) throw err;

        // Create Table
        r.tableList().contains('things').do(containsTable => {
            return r.branch(containsTable, { created: 0 }, r.tableCreate('things'));
        })
        .run(connection, err => {
            if (err) {
                console.error(err);
                process.exit(1);
                return;
            }

            startExpress(connection);
        });
    });
});
