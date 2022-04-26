let cart = { products: [], totalPrice: 0 };

module.exports=class Cart {

    static save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        if (product.type=="pizza")
        {
            const existingProductIndex = cart.products.findIndex(p => ((p.nom == product.nom) &&(p.taille==product.taille))); // to check product is existing in cart
            if (existingProductIndex >= 0) 
            { // exist in cart already
                const exsitingProduct = cart.products[existingProductIndex];
                exsitingProduct.qty += 1;
           
            } 
            else 
            {   //not exist
                product.qty = 1;
                cart.products.push(product);
            }
            
            if ((product.taille=='M'))
            {   
                product.prix +=2;
            }
            if ((product.taille=='L'))
            {   
                product.prix +=4;
            }
            cart.totalPrice += product.prix;
        }
        if(product.type=="entree")
        {
            const existingProductIndex = cart.products.findIndex(p => p.nom == product.nom); // to check product is existing in cart
            if (existingProductIndex >= 0) { // exist in cart already
                const exsitingProduct = cart.products[existingProductIndex];
                exsitingProduct.qty += 1;
           
            } 
            else 
            { //not exist
                product.qty = 1;
                cart.products.push(product);
            }
            cart.totalPrice += product.prix;
        }
        if(product.type=="boisson")
        {
            const existingProductIndex = cart.products.findIndex(p => ((p.nom == product.nom) &&(p.taille==product.taille))); // to check product is existing in cart
            if (existingProductIndex >= 0) { // exist in cart already
                const exsitingProduct = cart.products[existingProductIndex];
                exsitingProduct.qty += 1;
           
            } 
            else 
            {   //not exist
                product.qty = 1;
                cart.products.push(product);
            }

            if ((product.taille=='33Cl'))
            {   
                product.prix +=0;
            }
            if ((product.taille=='1L'))
            {   
                product.prix +=1.4;
            }
            if ((product.taille=='2L'))
            {   
                product.prix +=1.8;
            }
            cart.totalPrice += product.prix;
        }
        if (product.type=="sauce gratuit") 
        {
            const existingProductIndex = cart.products.findIndex(p => p.nom == product.nom); // to check product is existing in cart
            if (existingProductIndex >= 0) { // exist in cart already
                const exsitingProduct = cart.products[existingProductIndex];
                exsitingProduct.qty += 1;
               
            } 
            else 
            { //not exist
                product.qty = 1;
                cart.products.push(product);
            }
            
        }
        if(product.type=="pizza perso")
        {
            console.log(product)
        }
    

    
    }

    static getCart() {
        return cart;
    }

    static delete(productNom) {
        const isExisting = cart.products.findIndex(p => p.nom == productNom);
        if (isExisting >= 0) {
            if(cart.products[isExisting].type!="sauce gratuit")
            {
                cart.totalPrice=cart.totalPrice-cart.products[isExisting].prix

            }
            if(cart.products[isExisting].qty==1)
            {
                cart.products.splice(isExisting, 1);
            }
            else
            {
                cart.products[isExisting].qty--
            }
            
            
        }
    }

    static deleteT(productNom,taille) {
        const isExisting = cart.products.findIndex(p => ((p.nom == productNom)&&(p.taille==taille)));
        if (isExisting >= 0) {
            if(cart.products[isExisting].type!="sauce gratuit")
            {
                cart.totalPrice=cart.totalPrice-cart.products[isExisting].prix

            }
            if(cart.products[isExisting].qty==1)
            {
                cart.products.splice(isExisting, 1);
            }
            else
            {
                cart.products[isExisting].qty--
            }
            
            
        }
    }

    static reset(){
        cart={products: [],totalPrice:0}
    }

}