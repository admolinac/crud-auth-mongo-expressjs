const ERROR_MESSAGES = {
    MISSING_AUTH_HEADER: { code: 'UA', message: 'Authorization header is required' },
    INVALID_AUTH_TYPE: { code: 'UA', message: 'Authorization type is not supported' },
    MISSING_CREDENTIALS: { code: 'UA', message: 'Credentials are required' },
    INVALID_CREDENTIALS: { code: 'UA', message: 'Email or password is invalid' },
    SERVER_ERROR: { code: 'ER', message: 'Internal server error' },
    INVALID_TOKEN: { code: 'UA', message: 'Invalid token!' },
    NOT_LOGGED_IN: { code: 'UA', message: 'User not logged in' }
};

module.exports = ERROR_MESSAGES;