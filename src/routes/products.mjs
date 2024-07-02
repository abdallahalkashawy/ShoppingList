import { Router } from "express";
import { createProductValidationSchema , updateProductValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema} from 'express-validator';
import { createProductHandler, deleteProductHandler, getProductByIdHandler, getProductsHandler, patchUpdateProductHandler, putUpdateProductHandler} from "../handlers/products.mjs";
const router = Router();

// get all products
router.get("/getProducts", getProductsHandler);

// get specific product by id parameter

router.get("/getProductById/:id" , getProductByIdHandler);


// add product to the products list

router.post("/createProduct", checkSchema(createProductValidationSchema),createProductHandler);


// update product by id parameter and body but must all fields be updated

router.put("/putUpdateProduct/:id",checkSchema(createProductValidationSchema),putUpdateProductHandler);

// update specific product attribute by id parameter

router.patch("/patchUpdateProduct/:id",checkSchema(updateProductValidationSchema),patchUpdateProductHandler);

// Delete product by id parameter

router.delete("/deleteProduct/:id", deleteProductHandler);


export default router;