// middlewares/logging.mjs
const logs = [];

const loggingMiddleware = (req, res, next) => {
    const startTime = Date.now();

    // Capture the response status code
    const originalSend = res.send;
    res.send = function(...args) {
        const responseTime = Date.now() - startTime;
        const logEntry = {
            url: req.url,
            method: req.method,
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            timestamp: new Date().toISOString()
        };

        // Log the entry
        console.log(logEntry);
        if(logEntry.url !== '/api/v1/logs')
        {
            logs.push(logEntry);
        }
        originalSend.apply(res, args);
    };

    next();
};

export { loggingMiddleware, logs };
