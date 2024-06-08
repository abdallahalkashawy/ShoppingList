import { Router } from "express";
import { checkSchema , validationResult} from 'express-validator';
import {createPromoCodeValidationSchema } from '../utils/validationSchema.mjs';
import { promoCodes , shoppingList } from "../models/models.mjs";
const router = Router();

// get shopping list

router.get("/api/v1/promocodes", (req, res) => {
    res.json(promoCodes);
});

// add promo code to the promo codes list
router.post("/api/v1/promocodes",checkSchema(createPromoCodeValidationSchema),(req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
            return res.status(400).json({errors : result.array()});
    }
    const { body } = req;
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (promoCode) { 
        return res.status(400).send('Promo code already exists');
    }
    const addedPromoCode = {
        promoCodeID : promoCodes.length + 1,
        ...body
    }
    promoCodes.push(addedPromoCode);
    res.json(promoCodes);
});

export default router;