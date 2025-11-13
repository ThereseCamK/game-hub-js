import { productModel } from "../models/productModel.js";

export const controller = {
   
        products: [],
        cart: [],
        inCartMap: new Map(),
        shipping: null,
        payment: null,
        
   
    async init(){
        
        console.log("AppController is installed");
        try{
            this.products = await productModel.getAll();
            this.updateCartCount();
        }
        catch (error){
            console.error("Could not load products", error);
        }
     
    },
 

    async getProducts(){
        return await productModel.getAll();
    },

    async getProduct(id){
        return await productModel.getByID(id);
    },


    addToCart(product){
           console.log(this.products)
        const exisiting = this.cart.find(item => item.id === product.id);
        
        if(exisiting){
  
            exisiting.quantity ++;
        }
        else{
            this.cart.push({...product, quantity: 1});
        }
        this.inCartMap.set(product.id, true);
        const found = this.products.find(p => p.id === product.id);
        if(found) found.inCart= true;
        this.updateCartCount();
        
    },

    removeFromCart(id){
        
        this.cart = this.cart.filter(item => item.id !== id);
        this.inCartMap.delete(id);
        this.updateCartCount();
    },
    isInCart(id){
        return this.inCartMap.has(id);
    },

    increaseQuantity(id){

        const exisiting = this.cart.find(item => item.id === id);
        if(exisiting){

            exisiting.quantity ++;
        }
        this.updateCartCount();
    },

    decreaseQuantity(id){
        const item = this.cart.find(p => p.id === id);
        if(item){
            item.quantity --;
            if(item.quantity <= 0){
                this.removeFromCart(id);
            }
            else{
                this.updateCartCount();
            }
        }
    },

    getCartTotal(){
        return this.cart
            .reduce((sum, item) => {
                const price = item.onSale ? item.discountedPrice : item.price;
                return sum + price * item.quantity}
            , 0)
            .toFixed(2);
    }, 

    updateCartCount(){
        const cartTotal = document.querySelector("#cart-count");
        const count = this.cart.reduce((sum, item) => sum += item.quantity, 0);
        cartTotal.textContent = count;
       
    },

    saveShipping(data){
        this.shipping = data;
    },

    savePaymentData(data){
        this.payment = data;
    },

    clearCart() {
        this.cart.forEach(item => {
            const prod = this.products.find(p => p.id === item.id);
            if(prod) prod.inCart = false;
        })
        this.cart = [];
        this.updateCartCount();
    },

    resetAll() {
        this.cart = [];
        this.shipping = null;
        this.payment = null;
        this.updateCartCount();
    },

   
}