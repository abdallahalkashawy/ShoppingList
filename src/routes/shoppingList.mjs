import { Router } from "express";
import { body, checkSchema} from 'express-validator';
import { addProductToShoppingListHandler, getShoppingListHandler, removeProductFromShoppingListHandler } from "../handlers/shoppingList.mjs";
import { removeProductFromShoppingListSchema,addProductToShoppingListSchema } from "../utils/validationSchema.mjs";
const router = Router();

// get shopping list

router.get("/getShoppingList", getShoppingListHandler);

// add product to the shopping list

router.post("/addProductToShoppingList",
    checkSchema(addProductToShoppingListSchema)
    ,addProductToShoppingListHandler);

// remove product from the shopping list

router.delete("/removeProductFromShoppingList", 
    // body("productId").notEmpty().withMessage("must include productName")
    checkSchema(removeProductFromShoppingListSchema)
    ,removeProductFromShoppingListHandler
);
export default router;