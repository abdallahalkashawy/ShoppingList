import shoppingListSwagger from './shoppingList.swagger.mjs';
import productsSwagger from './products.swagger.mjs';
import swaggerDefinitions from './swaggerDefinitions.mjs';  // Import your schema definitions
const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Shopping List API',
    version: '1.0.0',
    description: 'API documentation for Shopping List application',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' },
  ],
  paths: {
    ...shoppingListSwagger.paths,
    ...productsSwagger.paths,// Import paths only from shopping list documentation
  },
  components: {
    schemas: {
      ...swaggerDefinitions.components.schemas,  // Merge the schema definitions from your swaggerDefinitions
    },
  },
  tags: [
    { name: 'Shopping List', description: 'Operations related to shopping list management' },
    { name: 'Products', description: 'Operations related to products management' },
  ],
};

export default swaggerConfig;
