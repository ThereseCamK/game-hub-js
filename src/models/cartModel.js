export const cartModel = {
  createItem(product) {
    return { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        discountedPrice: product.discountedPrice, 
        onSale: product.onSale, 
        image: product.image, 
        qty: 1 };
  }
};

