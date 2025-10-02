const ERROR_MESSAGES = require('../helpers/messages');

const isAdmin = (req, res, next) => {
    try {
        const user = req.session?.user || req.user;

        if (!user) {
            return res.status(401).json(ERROR_MESSAGES.UNAUTHORIZED);
        }

        if (user.role !== 'admin') {
            return res.status(403).json(ERROR_MESSAGES.FORBIDDEN_ROLE);
        }

        next();
    } catch (error) {
        console.error('isAdmin middleware error:', error);
        return res.status(500).json(ERROR_MESSAGES.SERVER_ERROR);
    }
};

module.exports = { isAdmin };
