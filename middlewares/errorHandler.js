const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorType = err.errorType || 'GeneralError';
    const message = err.message || 'Internal Server Error';
    const timestamp = new Date().toISOString();

    console.log('\n================================================');
    console.error(
        `[ERROR] ${timestamp} - ${statusCode} - ${errorType} - ${message}`
    );

    if (process.env.ENV === 'development' && err.stack) {
        console.error(err.stack);
    }

    console.log('================================================\n');

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        errorType,
        ...(process.env.ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;