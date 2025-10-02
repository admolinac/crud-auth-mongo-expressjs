const mongoose = require('mongoose');

const getHealth = (req, res) => {
    const uptime = process.uptime();

    let dbStatus = 'disconnected';

    switch (mongoose.connection.readyState) {
        case 0:
            dbStatus = 'disconnected';
            break;
        case 1:
            dbStatus = 'connected';
            break;
        case 2:
            dbStatus = 'connecting';
            break;
        case 3:
            dbStatus = 'disconnecting';
            break;
        default:
            dbStatus = 'unknown';
    }

    res.json(
        {
            status: 'OK',
            uptime,
            db: dbStatus
        }
    );
};

module.exports = { getHealth };