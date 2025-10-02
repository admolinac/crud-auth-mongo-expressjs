const { param, body } = require('express-validator');

const getUserByIdValidation = [
    param('id').isMongoId().withMessage('Id must be a valid MongoDB ObjectId')
];

const createUserValidation = [
    body("fullName")
        .isString().withMessage("Full name is mandatory.")
        .isLength({ min: 1 }).withMessage("Full name must not be empty.")
        .isLength({ max: 50 }).withMessage("Full name cannot exceed 50 characters"),

    body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("age")
        .isInt({ min: 0 }).withMessage("Age must be a positive number"),

    body("password")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("Role must be either admin or user"),
];

const updateUserValidation = [
    param('id')
        .isMongoId().withMessage('Id must be a valid MongoDB ObjectId'),

    body("fullName")
        .optional()
        .isLength({ min: 1 }).withMessage("Full name must not be empty.")
        .isLength({ max: 50 }).withMessage("Full name cannot exceed 50 characters"),

    body("email")
        .optional()
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("age")
        .optional()
        .isInt({ min: 0 }).withMessage("Age must be a positive number"),

    body("password")
        .optional()
        .isString().withMessage("Password must be a string")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("Role must be either admin or user"),
];

module.exports = {
    getUserByIdValidation,
    createUserValidation,
    updateUserValidation
};