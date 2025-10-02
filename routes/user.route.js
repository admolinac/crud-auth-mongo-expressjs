const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middlewares/authorization');
const { validate } = require('../middlewares/validations');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { getUserByIdValidation, createUserValidation, updateUserValidation } = require('../middlewares/validations/user.validation');

router.get('/', isAdmin, getAllUsers);
router.post('/', isAdmin, validate(createUserValidation), createUser);
router.get('/:id', isAdmin, validate(getUserByIdValidation), getUserById);
router.put('/:id', isAdmin, validate(updateUserValidation), updateUser);
router.delete('/:id', isAdmin, validate(getUserByIdValidation), deleteUser);


module.exports = router;