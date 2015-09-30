import thinky from 'thinky';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import BaseRoute from './routes/base';
import ApiRoute from './routes/api';

thinky(config.rethinkdb);

const baseRoute = new BaseRoute();
const apiRoute = new ApiRoute({
    thinky
});

const app = express();
const api = express.Router();

app.use(bodyParser.json());

// Base Routes
app.route('/').get(baseRoute.index);

app.use('/api', api);
api.route('/').get(apiRoute.index);

app.use((req, res) => {
    res.json(404, { message: 'Not Found' });
});

app.use((err, req, res) => {
    res.json(500, { error: error.message });
});

const server = app.listen(config.server.port, () => {
    console.log(`Server listening on port ${server.address().port}.`);
});
