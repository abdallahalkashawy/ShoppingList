import { products , shoppingList} from "../models/models.mjs";
import { validationResult } from "express-validator";

export const getShoppingListHandler = (req, res) => {
   return res.json(shoppingList);
}

export const addProductToShoppingListHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json(result.array());
    }
    const { body } = req;
    // const product = products.find((product) => product.productName === body.productName);
    const product = products.find((product) => product.id === body.productId);
    if (!product) { 
        return res.status(404).send('Product not found');
    }
    if(product.quantityAvailable === 0){
        return res.status(400).send('Product out of stock');
    }
    
    const productInShoppingList = shoppingList.products.find((product) => product.product.productId === body.productId);
    if (productInShoppingList) {
        const productIndexInShoppingList = shoppingList.products.findIndex((product) => product.product.productId === body.productId);
        shoppingList.products[productIndexInShoppingList] = {
            product :{
                productId: shoppingList.products[productIndexInShoppingList].product.productId,
                productName: shoppingList.products[productIndexInShoppingList].product.productName,
                price: shoppingList.products[productIndexInShoppingList].product.price,
                quantityAvailable: shoppingList.products[productIndexInShoppingList].product.quantityAvailable - 1
            },
            count: (shoppingList.products[productIndexInShoppingList]).count + 1
        };
    } else {
        shoppingList.products.push({
            product: {
                productId: product.id,
                productName: product.productName,
                price: product.price,
                quantityAvailable: product.quantityAvailable - 1 
            },
            count: 1
        });
    }
    const productIndex = products.findIndex((product) => product.id === body.productId);
    products[productIndex] = {
        ...products[productIndex],
        quantityAvailable: products[productIndex].quantityAvailable  - 1
    };
    if(shoppingList.promoCodes.length > 0){
        shoppingList.totalPrice += product.price * (shoppingList.promoCodes[0].promoCodePercentage / 100);
    }
    else{
        shoppingList.totalPrice += product.price;
    }
    shoppingList.count += 1;
   return res.json(shoppingList);
}

export const removeProductFromShoppingListHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json(result.array());
    }
    const { body } = req;
    const product = products.find((product) => product.id === body.productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    const productIndexInShoppingListIndex = shoppingList.products.findIndex((product) => product.product.productId === body.productId);
    if (productIndexInShoppingListIndex === -1) {
        return res.status(404).send('Product not found in shopping list');
    }
    const productIndex = products.findIndex((product) => product.id === body.productId);
    products[productIndex] = {
        ...products[productIndex],
        quantityAvailable: product.quantityAvailable + shoppingList.products[productIndexInShoppingListIndex].count
    };
    shoppingList.count -= shoppingList.products[productIndexInShoppingListIndex].count;
    shoppingList.totalPrice -= product.price * shoppingList.products[productIndexInShoppingListIndex].count;
    shoppingList.products.splice(productIndexInShoppingListIndex, 1);
   return res.json(shoppingList);
}