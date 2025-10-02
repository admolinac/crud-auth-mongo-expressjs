const express = require('express');
const router = express.Router();

const jwtAuth = require('../middlewares/auth/jwt.auth');
const { validate } = require('../middlewares/validations');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { getUserByIdValidation, createUserValidation, updateUserValidation } = require('../middlewares/validations/user.validation');

router.post('/', validate(createUserValidation), createUser);

router.get('/:id', jwtAuth, validate(getUserByIdValidation), getUserById);
router.put('/:id', jwtAuth, validate(getUserByIdValidation), updateUser);
router.delete('/:id', jwtAuth, validate(getUserByIdValidation), deleteUser);
router.get('/', jwtAuth, getAllUsers);


module.exports = router;