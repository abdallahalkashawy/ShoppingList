import express from 'express';
import { loggingMiddleware, logs } from './middleware/logging.mjs';
import routes from './routes/index.mjs';
const app = express();

// middleware to parse json data
app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 3000;

app.get("/api/v1/logs", (req, res) => {
    res.json(logs);
});

// middleware to log requests
app.use(loggingMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});