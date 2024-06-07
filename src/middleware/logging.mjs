// middlewares/logging.mjs
const logs = [];

const loggingMiddleware = (req, res, next) => {
    const startTime = Date.now();

    // Capture the response status code
    const originalSend = res.send;
    res.send = function(...args) {
        const responseTime = Date.now() - startTime;
        let logEntry;

        // Determine the action based on method and URL
        if (req.method === 'POST' && req.url.startsWith('/api/v1/products')) {
            logEntry = `User added product. URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}`;
        } else if (req.method === 'DELETE' && req.url.startsWith('/api/v1/products')) {
            const id = req.params.id;
            logEntry = `User deleted product with ID: ${id}. URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}`;
        } else if (req.method === 'GET' && req.url.startsWith('/api/v1/products')) {
            logEntry = `User retrieved products. URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}`;
        } else if (req.method === 'PUT' && req.url.startsWith('/api/v1/products')) {
            const id = req.params.id;
            logEntry = `User updated product with ID: ${id}. URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}`;
        } else if (req.method === 'PATCH' && req.url.startsWith('/api/v1/products')) {
            const id = req.params.id;
            logEntry = `User partially updated product with ID: ${id}. URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date().toISOString()}`;
        }

        if (logEntry) {
            console.log(logEntry);
            logs.push(logEntry);
        }

        originalSend.apply(res, args);
    };

    next();
};

export { loggingMiddleware, logs };
