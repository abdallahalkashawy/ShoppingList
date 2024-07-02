import { Router } from "express";
import productRouter from "./products.mjs";
import shoppingListRouter from "./shoppingList.mjs";
import promocodeRouter from "./promocodes.mjs";
import { loggingMiddleware } from "../middleware/logging.mjs";

const router = Router();

router.use(loggingMiddleware);
router.use("/api/v1/products",productRouter);
router.use("/api/v1/shoppingList",shoppingListRouter);
router.use("/api/v1/promocodes",promocodeRouter);

export default router;