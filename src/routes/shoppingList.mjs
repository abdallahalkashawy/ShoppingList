import { Router } from "express";
import { createProductValidationSchema , updateProductValidationSchema } from '../utils/validationSchema.mjs';
import { validationResult , matchedData , checkSchema} from 'express-validator';
import { products } from "../models/models.mjs";
import { shoppingList } from "../models/models.mjs";
const router = Router();



router.get("/api/v1/shoppingList", (req, res) => {
    res.json(shoppingList);
});

// add product to the shopping list

router.post("/api/v1/shoppingList", (req, res) => {
    const { body } = req;
    const product = products.find((product) => product.productName === body.productName);
    if (!product) { 
        return res.status(404).send('Product not found');
    }
    if(product.quantityAvailable === 0){
        return res.status(400).send('Product out of stock');
    }
    
    const productInShoppingList = shoppingList.products.find((product) => product.product.productName === body.productName);
    if (productInShoppingList) {
        const productIndexInShoppingList = shoppingList.products.findIndex((product) => product.product.productName === body.productName);
        shoppingList.products[productIndexInShoppingList] = {
            product :{
                productName: shoppingList.products[productIndexInShoppingList].product.productName,
                price: shoppingList.products[productIndexInShoppingList].product.price,
                quantityAvailable: shoppingList.products[productIndexInShoppingList].product.quantityAvailable - 1
            },
            count: (shoppingList.products[productIndexInShoppingList]).count + 1
        };
    } else {
        shoppingList.products.push({
            product: {
                productName: product.productName,
                price: product.price,
                quantityAvailable: product.quantityAvailable - 1 
            },
            count: 1
        });
    }
    const productIndex = products.findIndex((product) => product.productName === body.productName);
    products[productIndex] = {
        ...products[productIndex],
        quantityAvailable: products[productIndex].quantityAvailable  - 1
    };
    shoppingList.totalPrice += product.price;
    shoppingList.count += 1;
    res.json(shoppingList);
}
);


router.delete("/api/v1/shoppingList", (req, res) => {
    const { body } = req;
    const product = products.find((product) => product.productName === body.productName);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    const productIndex = products.findIndex((product) => product.productName === body.productName);
    products[productIndex] = {
        ...products[productIndex],
        quantityAvailable: product.quantityAvailable + 1
    };
    const productIndexInShoppingList = shoppingList.products.findIndex((product) => product.productName === body.productName);
    shoppingList.products.splice(productIndexInShoppingList, 1);
    shoppingList.totalPrice -= product.price;
    res.json(shoppingList);
}
);
export default router;