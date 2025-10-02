const { param, body, query } = require('express-validator');

const getEventsByPaginationValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];

const getEventByIdValidation = [
    param('id').isUUID().withMessage('Id must be a valid UUID')
];

const createEventValidation = [
    body("name")
        .isString().withMessage("Name is mandatory.")
        .isLength({ min: 1 }).withMessage("Name must not be empty.")
        .isLength({ max: 20 }).withMessage("The maximum number of characters has been exceeded"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string")
        .isLength({ max: 100 }).withMessage("The maximum number of characters has been exceeded"),

    body("amount")
        .isNumeric().withMessage("Amount is mandatory.")
        .custom(value => {
            if (typeof value !== "number") {
                throw new Error("Amount must be a number");
            }
            if (value <= 0) {
                throw new Error("The number must be positive");
            }
            return true;
        }),

    body("date")
        .notEmpty().withMessage("Date is mandatory")
        .isISO8601().withMessage("Bad date format")       // ISO (yyyy-mm-dd)
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return true;
        }),

    body("type")
        .isIn(["income", "expense"]).withMessage("Type must be either income or expense"),

    body("attachment")
        .optional()
        .isString().withMessage("Attachment must be a string"),
];

const updateEventValidation = [
    param('id').isUUID().withMessage('Id must be a valid UUID'),

    body("name")
        .optional()
        .isLength({ min: 1 }).withMessage("Name must not be empty.")
        .isLength({ max: 20 }).withMessage("The maximum number of characters has been exceeded"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string")
        .isLength({ max: 100 }).withMessage("The maximum number of characters has been exceeded"),

    body("amount")
        .optional()
        .custom(value => {
            if (typeof value !== "number") {
                throw new Error("Amount must be a number");
            }
            if (value <= 0) {
                throw new Error("The number must be positive");
            }
            return true;
        }),

    body("date")
        .optional()
        .isISO8601().withMessage("Bad date format")       // ISO (yyyy-mm-dd)
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return true;
        }),

    body("type")
        .optional()
        .isIn(["income", "expense"]).withMessage("Type must be either income or expense"),

    body("attachment")
        .optional()
        .isString().withMessage("Attachment must be a string"),
];

module.exports = {
    createEventValidation,
    getEventByIdValidation,
    updateEventValidation,
    getEventsByPaginationValidation
};