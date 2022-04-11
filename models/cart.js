let cart =null 

module.exports=class Cart {

    static save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        const existingProductIndex = cart.products.findIndex(p => p.nom == product.nom); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.qty += 1;
        } else { //not exist
            product.qty = 1;
            cart.products.push(product);
        }

        cart.totalPrice += product.prix;
    }

    static getCart() {
        return cart;
    }

    static delete(productNom) {
        const isExisting = cart.products.findIndex(p => p.nom == productNom);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1);
        }
    }

}