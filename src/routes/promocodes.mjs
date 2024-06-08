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


// remove promo code from the promo codes list
router.delete("/api/v1/promocodes", (req, res) => {
    const { body } = req;
    if(!body.promoCodeName){
        return res.status(400).send('must include promoCodeName');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (!promoCode) { 
        return res.status(404).send('Promo code not found');
    }
    const promoCodeIndex = promoCodes.findIndex((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    promoCodes.splice(promoCodeIndex, 1);
    res.json(promoCodes);
});

// apply promo code to the shopping list

router.post("/api/v1/promocodes/apply", (req, res) => {
    const { body } = req;
    if(!body.promoCodeName){
        return res.status(400).send('must include promoCodeName');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (!promoCode) { 
        return res.status(404).send('Promo code not found');
    }
    if(shoppingList.promoCodes.includes(promoCode.promoCodeName)){
        return res.status(400).send('Promo code already applied');
    }
    if(shoppingList.totalPrice == 0)
    {
        return res.status(400).send('Shopping list is empty');
    }
    shoppingList.totalPrice = shoppingList.totalPrice - (shoppingList.totalPrice * promoCode.promoCodePercentage / 100);
    shoppingList.promoCodes.push(promoCode.promoCodeName);
    res.json(shoppingList);
});

// remove promo code from the shopping list

router.delete("/api/v1/promocodes/remove", (req, res) => {
    const { body } = req;
    if(!body.promoCodeName){
        return res.status(400).send('must include promoCodeName');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (!promoCode) { 
        return res.status(404).send('Promo code not found');
    }
    if(!shoppingList.promoCodes.includes(promoCode.promoCodeName)){
        return res.status(400).send('Promo code not applied');
    }
    let totalPrice = 0 ;
    shoppingList.products.forEach((product) => {
        totalPrice += product.product.price * product.count;
    });
    shoppingList.totalPrice = totalPrice;
    const promoCodeIndex = shoppingList.promoCodes.findIndex((promoCode) => promoCode === body.promoCodeName);
    shoppingList.promoCodes.splice(promoCodeIndex, 1);
    res.json(shoppingList);
});
export default router;