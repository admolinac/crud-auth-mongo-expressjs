const jwtAuthMiddleware = require('./jwt.auth');
const ERROR_MESSAGES = require('../../helpers/messages')

const session = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            return jwtAuthMiddleware(req, res, next);
        }

        const user = req.session?.user;

        if (!user) {
            return res.status(401).json(ERROR_MESSAGES.NOT_LOGGED_IN);
        }

        req.user = user;

        next();

    } catch (error) {
        console.error('Session middleware error:', error);
        return res.status(500).json(ERROR_MESSAGES.SERVER_ERROR);
    }
};

module.exports = session;
