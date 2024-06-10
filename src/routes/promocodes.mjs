import { Router } from "express";
import { checkSchema , validationResult} from 'express-validator';
import {createPromoCodeValidationSchema } from '../utils/validationSchema.mjs';
import { applyPromoCodeHandler, createPromoCodeHandler, deletePromoCodeHandler, getPromocodesHandler, removePromoCodeFromShoppingListHandler } from "../handlers/promocodes.mjs";
const router = Router();

// get promo codes list

router.get("/api/v1/promocodes", getPromocodesHandler);

// add promo code to the promo codes list
router.post("/api/v1/promocodes",checkSchema(createPromoCodeValidationSchema),createPromoCodeHandler);

// remove promo code from the promo codes list
router.delete("/api/v1/promocodes", deletePromoCodeHandler);

// apply promo code to the shopping list

router.post("/api/v1/promocodes/apply", applyPromoCodeHandler);

// remove promo code from the shopping list

router.delete("/api/v1/promocodes/remove",removePromoCodeFromShoppingListHandler);
export default router;