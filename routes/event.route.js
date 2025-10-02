const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validations');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/event.controller');
const { createEventValidation, getEventByIdValidation, updateEventValidation, getEventsByPaginationValidation } = require('../middlewares/validations/event.validation');
const jwtAuth = require('../middlewares/auth/jwt.auth');

router.use(jwtAuth)

router.get('/', validate(getEventsByPaginationValidation), getAllEvents);

router.get('/:id', validate(getEventByIdValidation), getEventById);

router.post('/', validate(createEventValidation), createEvent);

router.put('/:id', validate(updateEventValidation), updateEvent);

router.delete('/:id', validate(getEventByIdValidation), deleteEvent);

module.exports = router;