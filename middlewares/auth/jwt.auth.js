const jwt = require('jsonwebtoken');
const ERROR_MESSAGES = require('../../helpers/messages')

const JWT_SECRET = process.env('JWT_SECRET') || 'my-secret-key';

const jwtAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json(ERROR_MESSAGES.MISSING_AUTH_HEADER);
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer') {
            return res.status(401).json(ERROR_MESSAGES.INVALID_AUTH_TYPE);
        }

        return jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json(ERROR_MESSAGES.INVALID_TOKEN);
            }
            console.log('User decoded:', user);
            req.session.user = user;
            next();
        });

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json(ERROR_MESSAGES.SERVER_ERROR);
    }
};

module.exports = jwtAuth;