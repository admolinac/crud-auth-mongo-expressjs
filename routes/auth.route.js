const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validations');
const { createUser } = require('../controllers/user.controller');
const basicAuthMiddleware = require('../middlewares/auth/basic.auth');

const { generateToken, login, logout } = require('../controllers/auth.controller');
const { createUserValidation } = require('../middlewares/validations/user.validation');

router.get('/token', basicAuthMiddleware, generateToken);
router.post('/register', validate(createUserValidation), createUser);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;