import { Router } from "express";
import productRouter from "./products.mjs";
import shoppingListRouter from "./shoppingList.mjs";
import promocodeRouter from "./promocodes.mjs";
import { loggingMiddleware } from "../middleware/logging.mjs";

const router = Router();

router.use(loggingMiddleware);
router.use(productRouter);
router.use(shoppingListRouter);
router.use(promocodeRouter);

export default router;