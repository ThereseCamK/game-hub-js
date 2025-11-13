const API_URL = "https://v2.api.noroff.dev/gamehub";

export const productModel ={
    async getAll(){
        try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.data;
        } catch(error){
            console.log("Wrong fetching data ")
            return [];
        }
    },

    async getByID(id){
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if(!response.ok) throw new Error("Product not found");
            return await response.json();
        }
        catch (error){
            console.log(error);
            return null;
        }
    },

}