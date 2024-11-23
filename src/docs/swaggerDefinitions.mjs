const productDefinition = {
    Product: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            productName: { type: 'string', example: 'product 1' },
            quantityAvailable: { type: 'integer', example: 4 },
            price: { type: 'number', format: 'float', example: 300 },
        },
    },
};

const shoppingListDefinition = {
    ShoppingList: {
        type: 'object',
        properties: {
            products: {
                type: 'array',
                items: { $ref: '#/components/schemas/Product' },  // Reference to Product schema
            },
            totalPrice: { type: 'number', format: 'float', example: 1000 },
            count: { type: 'integer', example: 2 },
            promoCodes: {
                type: 'array',
                items: { $ref: '#/components/schemas/PromoCode' },  // Reference to PromoCode schema
            },
        },
    },
};

const promoCodeDefinition = {
    PromoCode: {
        type: 'object',
        properties: {
            promoCodeID: { type: 'integer', example: 1 },
            promoCodeName: { type: 'string', example: '50PERCENTOFF' },
            promoCodePercentage: { type: 'integer', example: 50 },
        },
    },
};

const swaggerDefinitions = {
    components: {
        schemas: {
            Product: productDefinition.Product,
            ShoppingList: shoppingListDefinition.ShoppingList,
            PromoCode: promoCodeDefinition.PromoCode,
        },
    },
};

export default swaggerDefinitions;

