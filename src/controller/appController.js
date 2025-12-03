import { productModel } from "../models/productModel.js";
import { loadState, saveState} from "../utils/storage.js";
import { renderPrivacyModal, initPrivacyModal } from "../components/privacyConsent.js";


export const controller = {
   
        products: [],
        cart: [],
        shipping: null,
        payment: null,
        
   
    async init(){
        document.body.insertAdjacentHTML("beforeend", renderPrivacyModal());
        initPrivacyModal();
       
        const saved = loadState();
        if (saved) {
        this.cart = saved.cart || [];
        this.shipping = saved.shipping || null;
        this.payment = saved.payment || null;
        }
       this.products = await productModel.getAllProducts();
       this.syncCartWithProducts();
    },

    syncCartWithProducts(){
        if(!this.cart.length) return;
        this.cart = this.cart.map(item => {
            const product = this.products.find(p => p.id === item.id) || {};
            return {...product, quantity: item.quantity, onSale: product.onSale ?? item.onSale, discountedPrice: product.discountedPrice ?? item.discountedPrice}; 
        });
        saveState({cart: this.cart, shipping: this.shipping, payment: this.payment});
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
        const found = this.products.find(p => p.id === product.id);
        if(found) found.inCart= true;
        this.updateCartCount();
        
    },

    removeFromCart(id){
        this.cart = this.cart.filter(item => item.id !== id);
        this.updateCartCount();
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
        
        if(count > 0 ){
            cartTotal.classList.remove("empty");
        }
        else {
           cartTotal.classList.add("empty");
        }
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