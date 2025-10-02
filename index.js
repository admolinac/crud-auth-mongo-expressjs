
require('dotenv').config();

const express = require('express');

const logger = require('./middlewares/logger');

const connectToDatabase = require('./config/dbClient');

const healthRouter = require('./routes/health.route');
const eventRouter = require('./routes/event.route');

const app = express();
const PORT = process.env.PORT || 3030;

connectToDatabase();

app.use(express.json());


app.use(logger);

app.use('/health', healthRouter);

app.use('/api/v1/events', eventRouter);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ code: 'ERR', message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});