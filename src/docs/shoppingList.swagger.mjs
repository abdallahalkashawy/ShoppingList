const shoppingListSwagger = {
    paths: {
      '/getShoppingList': {
        get: {
          summary: 'Get the current shopping list',
          description: 'Retrieve all the products currently in the shopping list.',
          tags: ['Shopping List'],
          responses: {
            200: {
              description: 'A list of products in the shopping list',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer' },
                      totalPrice: { type: 'number', format: 'float' },
                      promoCodes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            promoCodePercentage: { type: 'number' },
                          },
                        },
                      },
                      products: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            product: {
                              type: 'object',
                              properties: {
                                productId: { type: 'integer' },
                                productName: { type: 'string' },
                                price: { type: 'number', format: 'float' },
                                quantityAvailable: { type: 'integer' },
                              },
                            },
                            count: { type: 'integer' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/addProductToShoppingList': {
        post: {
          summary: 'Add a product to the shopping list',
          description: 'Adds a product to the shopping list.',
          tags: ['Shopping List'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productId: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Product added to the shopping list',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ShoppingList' }, // Reference to ShoppingList schema
                },
              },
            },
            404: {
              description: 'Product not found or out of stock',
            },
          },
        },
      },
      '/removeProductFromShoppingList': {
        delete: {
          summary: 'Remove a product from the shopping list',
          description: 'Removes a product from the shopping list.',
          tags: ['Shopping List'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productId: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Product removed from the shopping list',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ShoppingList' }, // Reference to ShoppingList schema
                },
              },
            },
            404: {
              description: 'Product not found in shopping list',
            },
          },
        },
      },
    },
    
  };
  
  export default shoppingListSwagger;
  