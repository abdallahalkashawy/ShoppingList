import { Router } from "express";
import { body} from 'express-validator';
import { addProductToShoppingListHandler, getShoppingListHandler, removeProductFromShoppingListHandler } from "../handlers/shoppingList.mjs";
const router = Router();

// get shopping list

router.get("/api/v1/shoppingList", getShoppingListHandler);

// add product to the shopping list

router.post("/api/v1/shoppingList", addProductToShoppingListHandler);

// remove product from the shopping list

router.delete("/api/v1/shoppingList", 
    body("productName").notEmpty().withMessage("must include productName")
    ,removeProductFromShoppingListHandler
);
export default router;