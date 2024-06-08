import { Router } from "express";
import { createProductValidationSchema } from '../utils/validationSchema.mjs';
import { query , validationResult , body , matchedData , checkSchema} from 'express-validator';
import { products } from "../models/products.mjs";
const router = Router();
router.get("/api/v1/products", (req, res) => {
    console.log(req.query);
    const {
        query: {
            filter,
            value
        }
    } = req;

    if(!filter & !value){
        res.json(products);
    }
    if(filter && value){
        console.log("filter, value");
        const filteredProducts = products.filter((product) => product[filter].includes(value));
        res.json(filteredProducts);
    }
    res.json(products);
});

// get specific product by id parameter

router.get("/api/v1/products/:id" , (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === parseInt(id));
    if(!product){
        res.status(404).send('Product not found');
    }
    else{
        res.json(product);
    }
}
);


// add product to the products list

router.post("/api/v1/products", 
    checkSchema(createProductValidationSchema)
    ,(req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors : result.array()});
    }
    const data = matchedData(req);
    // const {body} = req;
    const newProduct = {
        id : products[products.length - 1].id + 1,
        ...data
    }
    products.push(newProduct);
    res.json(products);
});



// update product by id parameter and body but must all fields be updated

router.put("/api/v1/products/:id", (req, res) => {
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        res.status(400).send('Invalid ID');
    }

    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        res.status(404).send('Product not found');
    }
    products[findIndexProduct] = {
        id : parsedID,
        ...body
    };
    res.sendStatus(200);
});

// update specific product attribute by id parameter

router.patch("/api/v1/products/:id", (req, res) => {
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        res.status(400).send('Invalid ID');
    }

    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        res.status(404).send('Product not found');
    }
    products[findIndexProduct] = {
        ...products[findIndexProduct],
        ...body
    };
    res.sendStatus(200);
});

// Delete product by id parameter

router.delete("/api/v1/products/:id", (req, res) => {
    const {
        body,
        params: {id}
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)){
        res.status(400).send('Invalid ID');
    }

    const findIndexProduct = products.findIndex((product) => product.id === parsedID);
    if(findIndexProduct === -1){
        res.status(404).send('Product not found');
    }
    products.splice(findIndexProduct,1);
    res.sendStatus(200);
});


export default router;