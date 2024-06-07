import express from 'express';
import { loggingMiddleware, logs } from './middleware/logging.mjs';

const app = express();

// middleware to parse json data
app.use(express.json());



const PORT = process.env.PORT || 3000;

app.get("/api/v1/logs", (req, res) => {
    res.json(logs);
});

// middleware to log requests
app.use(loggingMiddleware);

// products list
const products = [
    {id : 1 , productName : 'product 1' , quantityAvailable : 100 , price : 300},
    {id : 2 , productName : 'product 2' , quantityAvailable : 200 , price : 400},
    {id : 3 , productName : 'product 3' , quantityAvailable : 300 , price : 500},
];

//filter products by query parameters

app.get("/api/v1/products", (req, res) => {
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

app.get("/api/v1/products/:id" , (req, res) => {
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

app.post("/api/v1/products", (req, res) => {
    const {body} = req;
    const newProduct = {
        id : products[products.length - 1].id + 1,
        ...body
    }
    products.push(newProduct);
    res.json(products);
});

// update product by id parameter and body but must all fields be updated

app.put("/api/v1/products/:id", (req, res) => {
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

app.patch("/api/v1/products/:id", (req, res) => {
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

app.delete("/api/v1/products/:id", (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});