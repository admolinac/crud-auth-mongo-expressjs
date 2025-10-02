const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/event.controller');
const { validate, createEventValidation, getEventByIdValidation, updateEventValidation, getEventsByPaginationValidation } = require('../middlewares/validation');


router.get('/', validate(getEventsByPaginationValidation), getAllEvents);

router.get('/:id', validate(getEventByIdValidation), getEventById);

router.post('/', validate(createEventValidation), createEvent);

router.put('/:id', validate(updateEventValidation), updateEvent);

router.delete('/:id', validate(getEventByIdValidation), deleteEvent);

module.exports = router;