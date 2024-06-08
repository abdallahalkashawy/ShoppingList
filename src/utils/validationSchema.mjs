export const createProductValidationSchema = {
    productName:{
        isString:{
            errorMessage:'productName must be a string'
        },
        notEmpty:{
            errorMessage:'productName cannot be empty'
        }
    },
    quantityAvailable:{
        isInt :{
            options:{gt:-1},
            errorMessage:'quantityAvailable must be a non-negative integer'
        }
    },
    price:{
        isFloat:{
            options:{gt:0},
            errorMessage:'price must be a positive number'
        }
    }
}

export const updateProductValidationSchema = {
    productName: {
        optional: true,
        isString: {
            errorMessage: 'productName must be a string'
        },
        notEmpty: {
            errorMessage: 'productName cannot be empty'
        }
    },
    quantityAvailable: {
        optional: true,
        isInt: {
            options: { gt: -1 },
            errorMessage: 'quantityAvailable must be a non-negative integer'
        }
    },
    price: {
        optional: true,
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'price must be a positive number'
        }
    }
};


export const createPromoCodeValidationSchema = {
    promoCodeName:{
        isString:{
            errorMessage:'promoCodeName must be a string'
        },
        notEmpty:{
            errorMessage:'promoCodeName cannot be empty'
        }
    },
    promoCodePercentage:{
        isInt :{
            options:{gt:0,lt:101},
            errorMessage:'promoCodePercentage must be an integer between 1 and 100'
        }
    }
}