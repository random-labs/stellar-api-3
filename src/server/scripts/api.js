import express from 'express';

const api = express.Router();

api.get('/', (req, res) => {
    res.json({ message: 'success' });
});

export default api;