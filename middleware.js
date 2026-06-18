// creating middleware logger
const requestLogger = (req, res, next) => {
    console.log(`[logger] ${req.method} request made to ${req.url}`);
    next();
};

// 
const apiHeaderSetter = (req, res, next) => {
    res.setHeader("status", "completed");
    next();
};

// error handling middleware (4 arguments)
const ErrorHandler = (err, req, res, next) => {
    console.error("server error details:", err.stack);
    res.status(500).json({Error:"server error occured."});
};

module.exports = { requestLogger, apiHeaderSetter, ErrorHandler};
