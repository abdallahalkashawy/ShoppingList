import express from 'express';
import swaggerUi from 'swagger-ui-express';  // Import swagger UI
import swaggerJsdoc from 'swagger-jsdoc';   // Import swagger jsdoc
import { loggingMiddleware, logs } from './middleware/logging.mjs';
import routes from './routes/index.mjs';
import  swaggerConfig  from './docs/swaggerConfig.mjs';  // Import Swagger config

const app = express();

// Initialize swagger-jsdoc with the Swagger config
const swaggerDocs = swaggerJsdoc({
  definition: swaggerConfig,
  apis: ['./docs/*.swagger.mjs'],  // Point to your API route files that contain JSDoc comments
});

// Use Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse json data
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

// Route to view logs
app.get("/api/v1/logs", (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
