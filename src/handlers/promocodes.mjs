import { promoCodes } from "../models/models.mjs";
import { validationResult } from "express-validator";
import { shoppingList } from "../models/models.mjs";
export const getPromocodesHandler = (req, res) => {
   return res.json(promoCodes);
};

export const createPromoCodeHandler = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json(result.array());
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
   return res.json(addedPromoCode);
};

export const deletePromoCodeHandler = (req, res) => {
    const { body } = req;
    if(!body.promoCodeName){
        return res.status(400).send('must include promoCodeName');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (!promoCode) { 
        return res.status(404).send('Promo code not found');
    }
    const promoCodeIndex = promoCodes.findIndex((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if(shoppingList.promoCodes[0] === promoCode.promoCodeName){
        shoppingList.totalPrice = shoppingList.totalPrice / (1 - (promoCode.promoCodePercentage / 100));
        shoppingList.promoCodes=[];
    }
    promoCodes.splice(promoCodeIndex, 1);
   return res.json(promoCodes);
}

export const applyPromoCodeHandler = (req, res) => {
    const { body } = req;
    if(!body.promoCodeName){
        return res.status(400).send('must include promoCodeName');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === body.promoCodeName);
    if (!promoCode) { 
        return res.status(404).send('Promo code not found');
    }
    if(shoppingList.promoCodes.length > 0){
        return res.status(400).send('Promo code already applied');
    }
    if(shoppingList.totalPrice == 0)
    {
        return res.status(400).send('Shopping list is empty');
    }
    shoppingList.totalPrice = shoppingList.totalPrice - (shoppingList.totalPrice * promoCode.promoCodePercentage / 100);
    shoppingList.promoCodes.push(promoCode.promoCodeName);
   return res.json(shoppingList);
}

export const removePromoCodeFromShoppingListHandler =  (req, res) => {
    if (shoppingList.promoCodes.length === 0) { 
        return res.status(404).send('Promo Not Applied');
    }
    const promoCode = promoCodes.find((promoCode) => promoCode.promoCodeName === shoppingList.promoCodes[0]);
    shoppingList.totalPrice = shoppingList.totalPrice / (1 - (promoCode.promoCodePercentage / 100));
    shoppingList.promoCodes=[];
   return res.json(shoppingList);
}

