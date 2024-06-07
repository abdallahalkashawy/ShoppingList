import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const products = [
    {id : 1 , productName : 'product 1' , quantityAvailable : 100 , price : 300},
    {id : 2 , productName : 'product 2' , quantityAvailable : 200 , price : 400},
    {id : 3 , productName : 'product 3' , quantityAvailable : 300 , price : 500},
];

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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});