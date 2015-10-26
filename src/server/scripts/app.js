import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import BaseRoute from './routes/base';
import ApiRoute from './routes/api';

const baseRoute = new BaseRoute();
const apiRoute = new ApiRoute();

const app = express();
const api = express.Router();

app.use(bodyParser.json());

// Base Routes
app.route('/').get(baseRoute.index);

app.use('/api', api);
api.route('/').get(apiRoute.index);
api.route('/celestials').get(apiRoute.celestials);
api.route('/celestials/types').get(apiRoute.celestialTypes);
api.route('/celestials/:id').get(apiRoute.celestial);
api.route('/events').get(apiRoute.events);

app.use((req, res) => {
    res.status(400).json({ message: 'Not Found' });
});

app.use((err, req, res) => {
    res.status(500).json({ error: error.message });
});

const server = app.listen(config.server.port, () => {
    console.log(`Server listening on port ${server.address().port}.`);
});
