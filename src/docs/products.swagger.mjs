const productsSwagger = {
    paths: {
      '/getProducts': {
        get: {
          summary: 'Get all products',
          description: 'Retrieve all products from the product list.',
          tags: ['Products'],
          responses: {
            200: {
              description: 'A list of products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',  // Reference to Product schema
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/getProductById/{id}': {
        get: {
          summary: 'Get a specific product by ID',
          description: 'Retrieve a specific product using its ID.',
          tags: ['Products'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              description: 'The ID of the product to retrieve',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'Product found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',  // Reference to Product schema
                  },
                },
              },
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
      '/createProduct': {
        post: {
          summary: 'Create a new product',
          description: 'Add a new product to the product list.',
          tags: ['Products'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',  // Reference to Product schema
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',  // Reference to Product schema
                  },
                },
              },
            },
            400: {
              description: 'Bad request (validation error)',
            },
          },
        },
      },
      '/putUpdateProduct/{id}': {
        put: {
          summary: 'Update a product by ID (full update)',
          description: 'Update all fields of a product using its ID.',
          tags: ['Products'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              description: 'The ID of the product to update',
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',  // Reference to Product schema
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Product updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',  // Reference to Product schema
                  },
                },
              },
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
      '/patchUpdateProduct/{id}': {
        patch: {
          summary: 'Update specific attributes of a product by ID',
          description: 'Partially update a product\'s attributes by ID.',
          tags: ['Products'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              description: 'The ID of the product to update',
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productName: { type: 'string' },
                    price: { type: 'number', format: 'float' },
                    quantityAvailable: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Product updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',  // Reference to Product schema
                  },
                },
              },
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
      '/deleteProduct/{id}': {
        delete: {
          summary: 'Delete a product by ID',
          description: 'Remove a product from the product list using its ID.',
          tags: ['Products'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              description: 'The ID of the product to delete',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'Product deleted successfully',
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
    },
  };
  
  export default productsSwagger;
  