const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validations');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { getUserByIdValidation, createUserValidation, updateUserValidation } = require('../middlewares/validations/user.validation');

router.post('/', validate(createUserValidation), createUser);

router.get('/:id', validate(getUserByIdValidation), getUserById);
router.put('/:id', validate(getUserByIdValidation), updateUser);
router.delete('/:id', validate(getUserByIdValidation), deleteUser);
router.get('/', getAllUsers);


module.exports = router;