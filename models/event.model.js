const Event = require('../schemas/event.schema');

const getAllEvents = async (page, limit) => {
    if (page && limit) {
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const skip = (pageNum - 1) * limitNum;

        const paginatedEvents = await Event.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        const totalEvents = await Event.countDocuments();

        return {
            data: paginatedEvents,
            pagination: {
                currentPage: pageNum,
                pageSize: limitNum,
                total: totalEvents,
                totalPages: Math.ceil(totalEvents / limitNum)
            }
        };
    }

    const events = await Event.find().sort({ createdAt: -1 });

    return {
        data: events,
        pagination: null
    };
}

const getEventById = async (id) => {
    return await Event.findOne({ id });
};

const createEvent = async (data) => {
    const event = new Event(data);
    return await event.save();
};

const updateEvent = async (id, data) => {
    return await Event.findOneAndUpdate({ id }, data, { new: true });
};

const deleteEvent = async (id) => {
    return await Event.findOneAndDelete({ id });
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};