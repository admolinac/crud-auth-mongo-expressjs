const jwt = require('jsonwebtoken');

const Users = require('../models/user.model');
const ERROR_MESSAGES = require('../helpers/messages');

const TOKEN_EXPIRATION = '1h';
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';

const generateToken = (req, res) => {
    jwt.sign(
        { userId: req.user._id },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRATION },
        (err, token) => {
            if (err) {
                console.error('JWT error:', err);
                return res.status(500).json(ERROR_MESSAGES.TOKEN_ERROR);
            }
            res.json({ ...ERROR_MESSAGES.TOKEN_SUCCESS, data: { token } });
        }
    );
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_CREDENTIALS);
        }

        const user = await Users.loginUser(email, password);

        if (!user) {
            return res.status(401).json(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        req.session.user = { id: user._id, email: user.email };

        res.json({ ...ERROR_MESSAGES.LOGIN_SUCCESS, data: { user: req.session.user } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json(ERROR_MESSAGES.LOGIN_ERROR);
    }
};

const logout = (req, res) => {
    try {
        if (!req.session) {
            return res.status(400).json(ERROR_MESSAGES.LOGOUT_ERROR);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json(ERROR_MESSAGES.LOGOUT_ERROR);
            }
            res.json(ERROR_MESSAGES.LOGOUT_SUCCESS);
        });
    } catch (error) {
        console.error('Unexpected logout error:', error);
        res.status(500).json(ERROR_MESSAGES.LOGOUT_ERROR);
    }
};

module.exports = {
    generateToken,
    login,
    logout
}