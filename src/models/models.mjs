
export const products = [
    { id: 1, productName: 'product 1', quantityAvailable: 4, price: 300 },
    { id: 2, productName: 'product 2', quantityAvailable: 200, price: 400 },
    { id: 3, productName: 'product 3', quantityAvailable: 0, price: 500 },
];

export const shoppingList = {
    products : [],
    totalPrice : 0,
    count : 0,
    promoCodes : []
};

export const promoCodes = [
    { promoCodeID : 1 , promoCodeName : '50PERCENTOFF' , promoCodePercentage : 50 },
    { promoCodeID : 2 , promoCodeName : '20PERCENTOFF' , promoCodePercentage : 20 }]