const Users = require('../../models/user.model');
const ERROR_MESSAGES = require('../../helpers/messages');

const basicAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json(ERROR_MESSAGES.MISSING_AUTH_HEADER);
        }

        const [type, credentials] = authHeader.split(' ');

        if (type !== 'Basic') {
            return res.status(401).json(ERROR_MESSAGES.INVALID_AUTH_TYPE);
        }

        if (!credentials) {
            return res.status(401).json(ERROR_MESSAGES.MISSING_CREDENTIALS);
        }

        const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
        const [email, password] = decodedCredentials.split(':');

        if (!email || !password) {
            return res.status(401).json(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const user = await Users.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json(ERROR_MESSAGES.SERVER_ERROR);
    }
};

module.exports = basicAuth;