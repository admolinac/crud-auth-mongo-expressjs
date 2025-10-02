const Events = require('../models/event.model');

const getAllEvents = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const events = await Events.getAllEvents(page, limit);
        return res.status(200).json({
            code: 'OK',
            message: 'Events are available',
            data: events.data,
            ...(events.pagination && { pagination: events.pagination })
        });
    } catch (error) {
        console.error('Error in getAllEvents:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while fetching events'
        });
    }
}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.getEventById(id);

        if (!event) {
            return res.status(404).json({
                code: 'NF',
                message: `Event with id ${id} not found`
            });
        }

        return res.status(200).json({
            code: 'OK',
            message: 'Event retrieved successfully',
            data: event
        });
    } catch (error) {
        console.error('Error in getEventById:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while fetching event'
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, description, amount, date, type, attachment } = req.body;

        const newEvent = {
            id: require('uuid').v4(),
            name,
            amount,
            date: new Date(date),
            type,
        };

        if (description) {
            newEvent.description = description;
        }

        if (attachment) {
            newEvent.attachment = attachment;
        }

        await Events.createEvent(newEvent);

        return res.status(200).json({
            code: 'OK',
            message: 'Event created successfully!',
            data: newEvent
        });
    } catch (error) {
        console.error('Error in createEvent:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while creating event'
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEvent = await Events.getEventById(id);

        if (!existingEvent) {
            return res.status(404).json({
                code: 'NF',
                message: `Event with id ${id} not found`
            });
        }

        const { name, description, amount, date, type, attachment } = req.body;

        const updates = Object.fromEntries(
            Object.entries({ name, description, amount, date, type, attachment })
                .filter(([__, value]) => value !== undefined)
        );

        if (updates.date) updates.date = new Date(updates.date);

        const updatedEvent = await Events.updateEvent(id, updates);

        return res.status(200).json({
            code: 'OK',
            message: 'Event updated successfully',
            data: updatedEvent
        });

    } catch (error) {
        console.error('Error in updateEvent:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while updating event'
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEvent = await Events.getEventById(id);

        if (!existingEvent) {
            return res.status(404).json({
                code: 'NF',
                message: `Event with id ${id} not found`
            });
        }

        await Events.deleteEvent(id);

        return res.status(200).json({
            code: 'OK',
            message: 'Event deleted successfully',
            data: existingEvent
        });

    } catch (error) {
        console.error('Error in deleteEvent:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while deleting event'
        });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}