import { Router } from "express";
import { checkSchema , validationResult} from 'express-validator';
import {createPromoCodeValidationSchema } from '../utils/validationSchema.mjs';
import { applyPromoCodeHandler, createPromoCodeHandler, deletePromoCodeHandler, getPromocodesHandler, removePromoCodeFromShoppingListHandler } from "../handlers/promocodes.mjs";
const router = Router();

// get promo codes list

router.get("/getPromocodes", getPromocodesHandler);

// add promo code to the promo codes list
router.post("/createPromoCode",checkSchema(createPromoCodeValidationSchema),createPromoCodeHandler);

// remove promo code from the promo codes list
router.delete("/deletePromoCode", deletePromoCodeHandler);

// apply promo code to the shopping list

router.post("/applyPromoCode", applyPromoCodeHandler);

// remove promo code from the shopping list

router.delete("/removePromoCodeFromShoppingList",removePromoCodeFromShoppingListHandler);
export default router;