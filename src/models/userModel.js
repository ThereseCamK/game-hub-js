export const orderModel = {
    transformOrder(cart, shipping, payment){
        return {
            items: cart.map(i =>({
                id: i.id,
                quantity: i.quantity,
                price: i.onSale? i.onSale : i.price
            })),
            shipping,
            payment,
            total: cart.reduce((s,i) => s + (i.onSale? parseFloat(i.discountedPrice) : parseFloat(i.price)) * i.quantity,0)
        };
    }
};

export const userModel = {
    
}