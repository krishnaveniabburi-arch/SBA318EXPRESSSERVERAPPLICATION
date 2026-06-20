// creating middleware logger
const requestLogger = (req, res, next) => {
    console.log(`[logger] ${req.method} request made to ${req.url}`);
    next();
};

// 
const apiHeaderSetter = (req, res, next) => {
    res.setHeader("X-API-status", "Active");
    next();
};

// error handling middleware (4 arguments)
const errorHandler = (err, req, res, next) => {
    console.error("server error details:", err.stack);
    res.status(500).json({error:"server error occured."});
};

export { requestLogger, apiHeaderSetter, errorHandler};
