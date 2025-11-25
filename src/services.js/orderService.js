export const orderService = {
    async createOrder(payload){
        await new Promise(r=> setTimeout(r,700));
        return { orderId: `ORD-${Date.now()}`, ...payload };
    }
};