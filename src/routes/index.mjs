import { Router } from "express";
import productRouter from "./products.mjs";
import shoppingListRouter from "./shoppingList.mjs";

const router = Router();

router.use(productRouter);
router.use(shoppingListRouter);

export default router;