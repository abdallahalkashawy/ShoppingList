import { Router } from "express";
import { body} from 'express-validator';
import { addProductToShoppingListHandler, getShoppingListHandler, removeProductFromShoppingListHandler } from "../handlers/shoppingList.mjs";
const router = Router();

// get shopping list

router.get("/getShoppingList", getShoppingListHandler);

// add product to the shopping list

router.post("/addProductToShoppingList", addProductToShoppingListHandler);

// remove product from the shopping list

router.delete("/removeProductFromShoppingList", 
    body("productName").notEmpty().withMessage("must include productName")
    ,removeProductFromShoppingListHandler
);
export default router;