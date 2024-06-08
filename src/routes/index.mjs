import { Router } from "express";
import productRouter from "./products.mjs";
import shoppingListRouter from "./shoppingList.mjs";
import promocodeRouter from "./promocodes.mjs";

const router = Router();

router.use(productRouter);
router.use(shoppingListRouter);
router.use(promocodeRouter);

export default router;