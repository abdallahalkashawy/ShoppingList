import { addProductToShoppingListHandler, getShoppingListHandler, removeProductFromShoppingListHandler } from "../handlers/shoppingList.mjs";

describe("get shopping list", () => {
    it("should return the shopping list", () => {
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn()
    };
    getShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
        products : [],
        totalPrice : 0,
        count : 0,
        promoCodes : []
    });
});
});

describe("add product to shopping list", () => {
    it("should return 404 if product not found", () => {
    const mockRequest = {
        body: {
            productName: "product 11"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    addProductToShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
});
    it("should return 400 if product out of stock", () => {
   
    const mockRequest = {
        body: {
            productName: "product 3"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    addProductToShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Product out of stock');
    });
    it("should return 200 if product add to shopping list", () => {
    const mockRequest = {
        body: {
            productName: "product 1"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    addProductToShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
        products : [{ product: { productName: 'product 1', quantityAvailable: 3, price: 300 }, count: 1 }],
        totalPrice : 300,
        count : 1,
        promoCodes : []
    });
    });
});

describe("remove product from shopping list", () => {
    it("should return 404 if product not found", () => {
    const mockRequest = {
        body: {
            productName: "product 11"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    removeProductFromShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
    });
    it("should return 404 if product not found in shopping list", () => {
    const mockRequest = {
        body: {
            productName: "product 2"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    removeProductFromShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found in shopping list');
    });
    it("should return 200 if product remove from shopping list", () => {
    const mockRequest = {
        body: {
            productName: "product 1"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    removeProductFromShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
        products : [],
        totalPrice : 0,
        count : 0,
        promoCodes : []
    });
    });
});