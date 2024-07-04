import { products , shoppingList} from "../models/models.mjs";
import { validationResult , matchedData } from "express-validator";
export const getProductByIdHandler = (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === parseInt(id));
    if(!product){
        res.status(404).send('Product not found');
    }
    else{
        res.json(product);
    }
};

export const getProductsHandler = (req, res) => {
    const {
        query: {
            filter,
            value
        }
    } = req;

    if(!filter & !value){
        return res.json(products);
    }
    if(filter && value){
        const filteredProducts = products.filter((product) => product[filter].includes(value));
        return res.json(filteredProducts);
    }
    return res.json(products);
};

export const createProductHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json(result.array());
    }
    const data = matchedData(req);
    // const {body} = req;
    const product = products.find((product) => product.id === data.id);
    if(product){
        return res.status(400).send('Product already exists');
    }
    const newProduct = {
        id : data.id ? data.id : products.length + 1,
        ...data
    }
    products.push(newProduct);
    return res.json(newProduct);
};

export const putUpdateProductHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
            return res.status(400).json(result.array());
    }
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        return res.status(400).send('Invalid ID');
    }

    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        return res.status(404).send('Product not found');
    }
    const isIdTaken = products.some(product => product.id === body.id);
    if (!isIdTaken) {
        products[findIndexProduct] = {
            id: body.id ? body.id : parsedID,
            ...body
        };
    } else {
        return res.status(400).send('ID already taken');
    }
    const updatedQuatiyAvailable = body.quantityAvailable;
    const updatedPrice = body.price;
    const updatedProduct = products[findIndexProduct];
    const productInShoppingListIndex = shoppingList.products.findIndex((product) => product.product.productId === updatedProduct.id);
    if(productInShoppingListIndex !== -1){
        if(updatedQuatiyAvailable < shoppingList.products[productInShoppingListIndex].count){
            const productPrice = shoppingList.products[productInShoppingListIndex].product.price * shoppingList.products[productInShoppingListIndex].count;
            shoppingList.totalPrice -= productPrice;
            shoppingList.count -= shoppingList.products[productInShoppingListIndex].count;
            shoppingList.products.splice(productInShoppingListIndex,1);
            products[findIndexProduct] = {
                ...products[findIndexProduct],
                ...body
            };
        }
        else{
            shoppingList.products[productInShoppingListIndex] = {
                product : {
                    productId : updatedProduct.id,
                    productName: updatedProduct.productName,
                    price: updatedPrice ? updatedPrice : updatedProduct.price,
                    quantityAvailable: updatedQuatiyAvailable ?  updatedQuatiyAvailable - shoppingList.products[productInShoppingListIndex].count : updatedProduct.quantityAvailable
                },
                count: shoppingList.products[productInShoppingListIndex].count
            };
            let updatedTotal = 0;
            shoppingList.products.forEach((product) => {
                updatedTotal += product.product.price * product.count;
            });
            shoppingList.totalPrice = updatedTotal;
            products[findIndexProduct] = {
                id : updatedProduct.id,
                productName: updatedProduct.productName,
                price: updatedProduct.price,
                quantityAvailable: updatedQuatiyAvailable ? updatedQuatiyAvailable - shoppingList.products[productInShoppingListIndex].count : updatedProduct.quantityAvailable
            };
            return res.status(201).send('Product updated in shopping list');
        }
    }
    else{
        products[findIndexProduct] = {
            ...products[findIndexProduct],
            ...body
        };
    }
    
    return res.sendStatus(200);
}

export const patchUpdateProductHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
            return res.status(400).json(result.array());
    }
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        return res.status(400).send('Invalid ID');
    }
    const isIdTaken = products.some(product => product.id === body.id);
    if (!isIdTaken) {
        products[findIndexProduct] = {
            id: body.id ? body.id : parsedID,
            ...body
        };
    } else {
        return res.status(400).send('ID already taken');
    }
    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        return res.status(404).send('Product not found');
    }
    
    const updatedQuatiyAvailable = body.quantityAvailable;
    const updatedPrice = body.price;
    const updatedProduct = products[findIndexProduct];
    const productInShoppingListIndex = shoppingList.products.findIndex((product) => product.product.productId === updatedProduct.id);
    if(productInShoppingListIndex !== -1){
        if(updatedQuatiyAvailable < shoppingList.products[productInShoppingListIndex].count){
            const productPrice = shoppingList.products[productInShoppingListIndex].product.price * shoppingList.products[productInShoppingListIndex].count;
            shoppingList.totalPrice -= productPrice;
            shoppingList.count -= shoppingList.products[productInShoppingListIndex].count;
            shoppingList.products.splice(productInShoppingListIndex,1);
            products[findIndexProduct] = {
                ...products[findIndexProduct],
                ...body
            };
        }
        else{
            shoppingList.products[productInShoppingListIndex] = {
                product : {
                    productId : updatedProduct.id,
                    productName: updatedProduct.productName,
                    price: updatedPrice ? updatedPrice : updatedProduct.price,
                    quantityAvailable: updatedQuatiyAvailable ?  updatedQuatiyAvailable - shoppingList.products[productInShoppingListIndex].count : updatedProduct.quantityAvailable
                },
                count: shoppingList.products[productInShoppingListIndex].count
            };
            let updatedTotal = 0;
            shoppingList.products.forEach((product) => {
                updatedTotal += product.product.price * product.count;
            });
            shoppingList.totalPrice = updatedTotal;
            products[findIndexProduct] = {
                id : updatedProduct.id,
                productName: updatedProduct.productName,
                price: updatedProduct.price,
                quantityAvailable: updatedQuatiyAvailable ? updatedQuatiyAvailable - shoppingList.products[productInShoppingListIndex].count : updatedProduct.quantityAvailable
            };
            return res.status(201).send('Product updated in shopping list');
        }
    }
    else{
        products[findIndexProduct] = {
            ...products[findIndexProduct],
            ...body
        };
    }
    
    return res.sendStatus(200);
}

export const deleteProductHandler = (req, res) => {
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        return res.status(400).send('Invalid ID');
    }

    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        return res.status(404).send('Product not found');
    }
    const foundProduct = products[findIndexProduct];
    products.splice(findIndexProduct,1);
    const productInShoppingListIndex = shoppingList.products.findIndex((product) => product.product.productId === foundProduct.id);
    if(productInShoppingListIndex !== -1){
        const productPrice = shoppingList.products[productInShoppingListIndex].product.price * shoppingList.products[productInShoppingListIndex].count;
        shoppingList.totalPrice -= productPrice;
        shoppingList.count -= shoppingList.products[productInShoppingListIndex].count;
        shoppingList.products.splice(productInShoppingListIndex,1);
        return res.status(204).send('Product deleted from shopping list');
    }
    return res.sendStatus(200);
}