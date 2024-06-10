# Product Management API

## Overview

This API allows you to manage a list of products, including creating, updating, fetching, and deleting products. It also manages a shopping list that includes the products.

## Table of Contents

- [Product Management API](#product-management-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Logging Middleware Documentation](#logging-middleware-documentation)
    - [Overview](#overview-1)
  - [Middleware Code](#middleware-code)
  - [How to Run Tests Using npm Test](#how-to-run-tests-using-npm-test)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
    - [Get All Products](#get-all-products)
    - [Get Specific Product by ID](#get-specific-product-by-id)
    - [Add Product to the Products List](#add-product-to-the-products-list)
    - [Delete Product by ID](#delete-product-by-id)
    - [Get Shopping List](#get-shopping-list)
    - [Add Product to Shopping List](#add-product-to-shopping-list)
    - [Remove Product from Shopping List](#remove-product-from-shopping-list)
    - [Get Promo Codes List](#get-promo-codes-list)
    - [Add Promo Code to the List](#add-promo-code-to-the-list)
    - [Remove Promo Code from the List](#remove-promo-code-from-the-list)
    - [Apply Promo Code to the Shopping List](#apply-promo-code-to-the-shopping-list)
    - [Remove Promo Code from the Shopping List](#remove-promo-code-from-the-shopping-list)
## Logging Middleware Documentation

### Overview

This document describes the logging middleware integrated into an Express.js application. It captures details about API requests and responses, including their URL, method, status code, response Christensen and timestamp. It excludes logging for the API that retrieves the logs themselves.
    
```json 
    {
    "url": "/api/v1/products",
    "method": "GET",
    "statusCode": 200,
    "responseTime": "45ms",
    "timestamp": "2021-05-01T12:34:56.789Z"
    } 
```

## Middleware Code

Located in `middlewares/logging.mjs`, the logging middleware is designed to intercept all requests, process them, and log the necessary details before sending a response back to the client.

## How to Run Tests Using npm Test

To run the automated tests for the API, navigate to the root directory of your project and execute the following command:

```bash
npm test
```
## Base URL

The base URL for all endpoints is: `http://localhost:3000/api/v1`

## Endpoints

### Get All Products

- **URL**: `/products`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.

### Get Specific Product by ID

- **URL**: `/products/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific product by its ID.
- **Responses**:
  - `200 OK`: A product object.
    ```json
    {
      "id": 1,
      "productName": "Product 1",
      "quantityAvailable": 10,
      "price": 100
    }
    ```
  - `404 Not Found`: If the product is not found.


### Add Product to the Products List

- **URL**: `/products`
- **Method**: `POST`
- **Description**: Adds a new product to the list.
- **Request Body**:
  ```json
  {
    "productName": "New Product",
    "quantityAvailable": 20,
    "price": 150
  }
    ```

- **Responses**:
    - `200 OK`: Returns the updated list of all products, including the newly added product.

        ```json

        [
        {
            "id": 1,
            "productName": "Product 1",
            "quantityAvailable": 10,
            "price": 100
        },
        {
            "id": 2,
            "productName": "Product 2",
            "quantityAvailable": 5,
            "price": 50
        },
        {
            "id": 3,
            "productName": "New Product",
            "quantityAvailable": 20,
            "price": 150
        }
        ]
        ```


  - `400 Bad Request`: If the request body is invalid.

    ```json

    {
    "error": "Missing required field 'productName'"
    }
    ```

### Update Product by ID (All Fields Must Be Updated)

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Description**: Updates a product by ID. All fields must be updated.
- **Request Body**:
  ```json
  {
    "productName": "Updated Product Name",
    "quantityAvailable": 30,
    "price": 200
  }
    ```
- **Responses**:
   - `400 Bad Request`: If any of the fields are missing or invalid.
404 Not Found: If the product is not found.
  - `200 OK`: Successfully updated the product.

    ```json
    {
    "id": 1,
    "productName": "Updated Product Name",
    "quantityAvailable": 30,
    "price": 200
    } 
    ```


### Update Specific Product-specific  by ID

- **URL**: `/products/:id`
- **Method**: `PATCH`
- **Description**: Updates specific attributes of a product.
- **Request Body**:
  ```json
  {
    "quantityAvailable": 25
  }
  ```
- **Responses**:
    - `200 OK`: Successfully updated the specified product attribute.

        ```json
        {
        "id": 1,
        "productName": "Product 1",
        "quantityAvailable": 25,
        "price": 100
        }
        ```
    - `400 Bad Request`: If the attribute provided is invalid.
    - `404 Not Found`: If the product is not found.
### Delete Product by ID

- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific product by ID.
- **Responses**:
  - `200 OK`: Successfully deleted the product. The response body is typically empty.
  - `404 Not Found`: If the product is not found.


### Get Shopping List

- **Endpoint**: `/api/v1/shoppingList`
- **Method**: `GET`
- **Description**: Fetches the current shopping list with all products and quantities.
- **Handler Function**: `getShoppingListHandler`

```javascript
router.get("/api/v1/shoppingList", getShoppingListHandler);
```

### Add Product to Shopping List

- **Endpoint**: `/api/v1/shoppingList`
- **Method**: `POST`
- **Description**: Adds a specified product to the shopping list if available in inventory.
- **Handler Function**: `addProductToShoppingListHandler`

```javascript
router.post("/api/v1/shoppingList", addProductToShoppingListHandler);
```

### Remove Product from Shopping List

- **Endpoint**: `/api/v1/shoppingList`
- **Method**: `DELETE`
- **Middleware**: Validates product name in the request body.
- **Description**: Removes a specified product from the shopping list and updates the stock.
- **Handler Function**: `removeProductFromShoppingListReturnHandler`

```javascript
router.delete("/api/v1/shoppingList", body("productName").notEmpty().withMessage("Product name must be included"), removeProductFromShopping ListHandler);
```


### Get Promo Codes List
- **Endpoint**: `/api/v1/promocodes`

- **Method**: `GET`

- **Handler**: `getPromocodesHandler`

- **Description**: Retrieves a list of all promo codes.

- **Response**:

  ```json
  [
    {
      "promoCodeID": 1,
      "promoCodeName": "SAVE10",
      "promoCodePercentage": 10
    }
  ]
  ```
### Add Promo Code to the List

- **Endpoint**: `/api/v1/promocodes`
- **Method**: `POST`
- **Middleware**: `checkSchema(createPromoCodeValidationSchema)`
- **Handler**: `createPromoCodeHandler`
- **Request Body**:
  ```json
  {
    "promoCodeName": "NEWYEAR20",
    "promoCodePercentage": 20
  }
  ```

- **Response**:

  ```json
  {
    "message": "Promo code added successfully.",
    "data": [
      {
        "promoCodeID": 1,
        "promoCodeName": "SAVE10",
        "promoCodePercentage": 10
      },
      {
        "promoCodeID": 2,
        "promoCodeName": "NEWYEAR20",
        "promoCodePercentage": 20
      }
    ]
  }
  ```
### Remove Promo Code from the List

- **Endpoint**: `/api/v1/promocodes`
- **Method**: `DELETE`
- **Handler**: `deletePromoCodeHandler`
- **Request Body**:

  ```json
  {
    "promoCodeName": "SAVE10"
  }
  ```
- **Response**:

  ```json
  {
    "message": "Promo code removed successfully.",
    "remainingCodes": [
      {
        "promoCodeID": 2,
        "promoCodeName": "NEWYEAR20",
        "promoCodePercentage": 20
      }
    ]
  }
  ```
### Apply Promo Code to the Shopping List

- **Endpoint**: `/api/v1/promocodes/apply`
- **Method**: `POST`
- **Handler**: `applyPromoCodeHandler`
- **Request Body**:

  ```json
  {
    "promoCodeName": "NEWYEAR20"
  }
  ```
- **Response**:

  ```json
  {
    "message": "Promo code applied successfully.",
    "newTotal": 90.00
  }
  ```
### Remove Promo Code from the Shopping List

- **Endpoint**: `/api/v1/promocounters/remove`
- **Method**: `DELETE`
- **Handler**: `removePromoCodeFromShoppingListHandler`
- **Response**:

  ```json
  {
    "message": "Promo code removed successfully.",
    "newTotal": 100.00
  }
  ```
