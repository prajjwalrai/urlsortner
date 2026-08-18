const formatResponse = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    console.error(err.stack);

    res.status(statusCode).json(
        formatResponse(false, err.message || 'Server Error', process.env.NODE_ENV === 'production' ? null : err.stack)
    );
};

module.exports = { errorHandler };
