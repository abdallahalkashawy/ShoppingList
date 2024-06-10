import { json } from 'express';
import { createProductHandler, deleteProductHandler, getProductByIdHandler, getProductsHandler, patchUpdateProductHandler, putUpdateProductHandler } from '../handlers/products.mjs';
import { products } from '../models/models.mjs';
import { validationResult, matchedData } from 'express-validator';
import validator from 'express-validator';
jest.mock('express-validator', () => ({
  validationResult: jest.fn(()=>({
    isEmpty: jest.fn(()=> (false)),
    array: jest.fn(() => [{msg: 'error'}]),
    isNaN: jest.fn(() => {return true})
  })),
  matchedData: jest.fn()
}));

describe("get product by ID" , ()=>{
    it("should return specific product",  () => {
        const mockRequest = {
            params: {
                id: 1
            }
        };
        const mockResponse = {
            json: jest.fn()
        };
        getProductByIdHandler(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 });
    });

    it("should return 404 if product not found",  () => {
        const mockRequest = {
            params: {
                id: 4
            }
        };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn()
        };
        getProductByIdHandler(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
    }
    );
})

describe("get all products" , ()=>{
  it("should return all products",  () => {
      const mockRequest = {
          query: {}
      };
      const mockResponse = {
          json: jest.fn()
      };
      getProductsHandler(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([
        { id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 },
        { id: 2, productName: 'product 2', quantityAvailable: 200, price: 400 },
        { id: 3, productName: 'product 3', quantityAvailable: 300, price: 500 },
      ]);
  }
  );
  it("should return filtered products",  () => {
    const mockRequest = {
        query: {
            filter: 'productName',
            value: 'product 1'
        }
    };
    const mockResponse = {
        json: jest.fn()
    };
    getProductsHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([{ id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 }]);
}
);
it("should return all products if no filter",  () => {
    const mockRequest = {
        query: {
            filter: '',
            value: ''
        }
    };
    const mockResponse = {
        json: jest.fn()
    };
    getProductsHandler(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 },
      { id: 2, productName: 'product 2', quantityAvailable: 200, price: 400 },
      { id: 3, productName: 'product 3', quantityAvailable: 300, price: 500 },
    ]);
}
);
});

describe("create product" , ()=>{
  it("should return 400 if missing product information",  () => {
      const mockRequest = {
          body: {
              productName: 'product 1',
              quantityAvailable: 4,
          }
      }; 
      const mockResponse = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn()
      };
      createProductHandler(mockRequest, mockResponse);
      expect(validator.validationResult).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith([{msg: 'error'}]);
  }
  );

  it("should return 400 if product already exist",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true)
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
  };  
    const mockMatchedData = {
        productName: 'product 1',
        quantityAvailable: 4,
        price: 300
    };
    matchedData.mockReturnValue(mockMatchedData);
    createProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Product already exists');
  });

  it("shoudl return 200 if product created successfully",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true)
    }));
    const mockRequest = {
        body: {
            productName: 'product 4',
            quantityAvailable: 4,
            price: 300
        }
    }; 
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
  };
    const mockMatchedData = {
        productName: 'product 4',
        quantityAvailable: 4,
        price: 300
    };
    matchedData.mockReturnValue(mockMatchedData);
    createProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 },
      { id: 2, productName: 'product 2', quantityAvailable: 200, price: 400 },
      { id: 3, productName: 'product 3', quantityAvailable: 300, price: 500 },
      { id: 4, productName: 'product 4', quantityAvailable: 4, price: 300 }
    ]);
  });
});

describe("put update product" , ()=>{
  it("should return 400 if missing product information",  () => {
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
        },
        params: {
            id: 1
        }
    }; 
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    putUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith([{msg: 'error'}]);
}
);

  it("shoudl return 400 if invalid product id",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true)
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: "abc"
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  }; 
    putUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Invalid ID');
  });

  it("should return 404 if product not found",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: 6
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    putUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
  });

  it("should return 200 if product updated successfully",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: 1
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    putUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});

describe("patch update product" , ()=>{
  it("should return 400 if missing product information",  () => {
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
        },
        params: {
            id: 1
        }
    }; 
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    patchUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith([{msg: 'error'}]);
}
);

  it("should return 400 if invalid product id",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true)
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: "abc"
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  }; 
    patchUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Invalid ID');
  });

  it("should return 404 if product not found",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: 6
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    patchUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
  });

  it("should return 200 if product updated successfully",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            price: 1300
        },
        params: {
            id: 1
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    patchUpdateProductHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});

describe("delete product" , ()=>{
  it("should return 400 if invalid product id",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true)
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: "abc"
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  }; 
    deleteProductHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Invalid ID');
  });

  it("should retunr 404 if product not found",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: 6
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    deleteProductHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
  });
  it("should return 200 if product deleted successfully",  () => {
    jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
      isNaN: jest.fn(() => {return false})
    }));
    const mockRequest = {
        body: {
            productName: 'product 1',
            quantityAvailable: 4,
            price: 300
        },
        params: {
            id: 1
        }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
  };
    deleteProductHandler(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});