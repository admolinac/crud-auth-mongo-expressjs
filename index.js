
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');

const logger = require('./middlewares/logger');

const connectToDatabase = require('./config/dbClient');

const healthRouter = require('./routes/health.route');
const eventRouter = require('./routes/event.route');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT || 3001;

connectToDatabase();

app.use(express.json());

app.use(cors({
    origin: '*',
    // Configure according to your frontend URL
    // origin: process.env.FRONTEND_URL,
    // credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: 'session',
        maxAge: 8 * 60 * 60 * 1000, // 8h
        httpOnly: true,
        secure: process.env.ENV === 'production', // true only on production with HTTPS
        sameSite: process.env.ENV === 'production' ? 'strict' : 'lax'
    }
}));

app.use(logger);

app.use('/health', healthRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ code: 'ERR', message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});