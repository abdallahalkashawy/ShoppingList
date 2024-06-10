import { Router } from "express";
import { createProductValidationSchema , updateProductValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema} from 'express-validator';
import { createProductHandler, deleteProductHandler, getProductByIdHandler, getProductsHandler, patchUpdateProductHandler, putUpdateProductHandler} from "../handlers/products.mjs";
const router = Router();

// get all products
router.get("/api/v1/products", getProductsHandler);

// get specific product by id parameter

router.get("/api/v1/products/:id" , getProductByIdHandler);


// add product to the products list

router.post("/api/v1/products", checkSchema(createProductValidationSchema),createProductHandler);


// update product by id parameter and body but must all fields be updated

router.put("/api/v1/products/:id",checkSchema(createProductValidationSchema),putUpdateProductHandler);

// update specific product attribute by id parameter

router.patch("/api/v1/products/:id",checkSchema(updateProductValidationSchema),patchUpdateProductHandler);

// Delete product by id parameter

router.delete("/api/v1/products/:id", deleteProductHandler);


export default router;