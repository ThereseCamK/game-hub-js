const API_URL = "https://v2.api.noroff.dev/gamehub";

export const productModel ={
    products: [],
    lastFetch: null,
    isLoading: false,
    apiUrl: "https://v2.api.noroff.dev/gamehub",
    controller: null,

    async getAllProducts(force = false){
        if (!force && this.products.length > 0) {
            return this.products;
        }

        try{
            this.isLoading = true;

              const response = await fetch(API_URL);
                const data = await response.json();
                return data.data;
        }
        catch(err){
             if (err.name === "AbortError") {
            console.warn("Fetch request aborted");
            return [];
        }

        console.error("Failed to fetch products:", err);
        throw err;

        } 
        
        
    },

    async getProductById(id){
    try {
      this.isLoading = true;

      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new Error("Product not found");

       return await response.json();

    }   catch (error){
            console.log(error);
            return null;
    }
  },

  searchProducts(term) {
    if (!this.products.length) return [];

    const t = term.toLowerCase();

    return this.products.filter((p) =>
      p.title.toLowerCase().includes(t) ||
      p.genre.toLowerCase().includes(t)
    );
  },


  filterByGenre(genre) {
    if (genre === "default") return this.products;
    return this.products.filter(
      (p) => p.genre.toLowerCase() === genre.toLowerCase()
    );
  },


  

};