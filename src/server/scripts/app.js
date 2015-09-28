import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Setup
const api = express.Router();
app.use('/api', api);

// Base Routes
app.get('/', (req, res) => {
    res.send('Hello!');
});

// API Routes
api.get('/', (req, res) => {
    res.send('API!');
});

const server = app.listen(5000, () => {
    console.log(`Server listening on port ${server.address().port}.`);
});
