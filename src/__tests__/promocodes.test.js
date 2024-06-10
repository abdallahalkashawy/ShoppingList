const { getPromocodesHandler, createPromoCodeHandler, deletePromoCodeHandler, applyPromoCodeHandler, removePromoCodeFromShoppingListHandler } = require("../handlers/promocodes.mjs");
import validator from 'express-validator';
import { shoppingList } from '../models/models.mjs';


jest.mock('express-validator', () => ({
    validationResult: jest.fn(()=>({
      isEmpty: jest.fn(()=> (false)),
      array: jest.fn(() => [{msg: 'error'}]),
    })),
    matchedData: jest.fn()
  }));
describe("get Promo codes", () => {
    it("should return the promo codes", () => {
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn()
    };
    getPromocodesHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
        { promoCodeID : 1 , promoCodeName : '50PERCENTOFF' , promoCodePercentage : 50 },
        { promoCodeID : 2 , promoCodeName : '20PERCENTOFF' , promoCodePercentage : 20 }]);
});
});

describe("create Promo code", () => {
    it("should return 400 if missing promo code information", () => {
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    createPromoCodeHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith([{msg: 'error'}]);
    });

    it("should return 400 if promo code already exists", () => {
    jest.spyOn(validator, 'validationResult').mockImplementation(() => ({
        isEmpty: jest.fn(()=> (true)),
        array: jest.fn(() => []),
    }));
    const mockRequest = {
        body: {
            promoCodeName: "50PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    createPromoCodeHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith("Promo code already exists");
    });
    it("should return 200 if promo code added", () => {
    jest.spyOn(validator, 'validationResult').mockImplementation(() => ({
        isEmpty: jest.fn(()=> (true)),
        array: jest.fn(() => []),
    }));
    const mockRequest = {
        body: {
            promoCodeName: "30PERCENTOFF",
            promoCodePercentage: 30
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    createPromoCodeHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith([
        { promoCodeID : 1 , promoCodeName : '50PERCENTOFF' , promoCodePercentage : 50 },
        { promoCodeID : 2 , promoCodeName : '20PERCENTOFF' , promoCodePercentage : 20 },
        { promoCodeID : 3 , promoCodeName : '30PERCENTOFF' , promoCodePercentage : 30 }]);
    });
});

describe("delete Promo code", () => {
    it("should return 400 if missing promo code information", () => {
    const mockRequest = {
        body: {}
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    deletePromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('must include promoCodeName');
    });
    it("should return 404 if promo code not found", () => {
    const mockRequest = {
        body: {
            promoCodeName: "60PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    deletePromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Promo code not found');
    });
    it("should return 200 if promo code deleted", () => {
    const mockRequest = {
        body: {
            promoCodeName: "50PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    deletePromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
        { promoCodeID : 2 , promoCodeName : '20PERCENTOFF' , promoCodePercentage : 20 },
        { promoCodeID : 3 , promoCodeName : '30PERCENTOFF' , promoCodePercentage : 30 }]);
    });
});

describe("apply Promo code", () => {
    it("should return 400 if missing promo code information", () => {
    const mockRequest = {
        body: {}
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    applyPromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('must include promoCodeName');
    });
    it("should return 404 if promo code not found", () => {
    const mockRequest = {
        body: {
            promoCodeName: "60PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    applyPromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Promo code not found');
    });
    it("should return 400 if promo code already applied", () => {
    shoppingList.promoCodes.push("20PERCENTOFF");
    const mockRequest = {
        body: {
            promoCodeName: "20PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    applyPromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Promo code already applied');
    });
    it("should return 400 if shopping list is empty", () => {
    shoppingList.promoCodes = [];
    shoppingList.totalPrice = 0;
    const mockRequest = {
        body: {
            promoCodeName: "20PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    applyPromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Shopping list is empty');
    });
    it("should return 200 if promo code applied", () => {
    shoppingList.promoCodes = [];
    shoppingList.totalPrice = 100;
    const mockRequest = {
        body: {
            promoCodeName: "20PERCENTOFF"
        }
    };
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    applyPromoCodeHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
        products : [],
        totalPrice : 80,
        count : 0,
        promoCodes : ["20PERCENTOFF"]
    });
    }
);
});

describe("remove Promo code", () => {
    it("should return 404 if promo code not found", () => {
    shoppingList.promoCodes = [];
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    removePromoCodeFromShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Promo code not found');
    });
    it("should return 200 if promo code removed", () => {
    shoppingList.promoCodes = ["20PERCENTOFF"];
    shoppingList.totalPrice = 80;
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    removePromoCodeFromShoppingListHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
        products : [],
        totalPrice : 100,
        count : 0,
        promoCodes : []
    });
    });
});
