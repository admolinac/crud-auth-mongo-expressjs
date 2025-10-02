const express = require('express');
const router = express.Router();
const basicAuthMiddleware = require('../middlewares/auth/basic.auth');
const { generateToken, login, logout } = require('../controllers/auth.controller');

router.get('/token', basicAuthMiddleware, generateToken);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;