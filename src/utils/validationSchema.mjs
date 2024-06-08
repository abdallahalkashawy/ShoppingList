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