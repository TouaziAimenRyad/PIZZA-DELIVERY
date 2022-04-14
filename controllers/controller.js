const pool=require('../db_pool/pool')
const Cart=require('../models/cart')

let cart;
const get_all_menu_items=async(req,res)=> //this will be in a middle ware that runs in the begening of each req
{
    Cart.reset()
    try
    {
        const pizza = await pool.query('SELECT * FROM pizza')
        const entree= await pool.query('SELECT * FROM entree')
        const boisson= await pool.query('SELECT * FROM boisson')
        const sauce= await pool.query('SELECT * FROM sauce')
        res.render('menu',{entree:entree.rows,pizza:pizza.rows,boisson:boisson.rows,sauce:sauce.rows})
    }
    catch (err)
    {
        console.log(err)
        res.send("error data base ")
    }
    
    
}
const get_cart=(req,res)=>
{
    cart=Cart.getCart()
    res.json(cart)
    res.end()

}

//you can get rid of all this and remove the forms from the partials and add it to the cart html then with jequery you fill the cart with input and lable containing data then to finish you send via post req  
const add_pizza_to_cart=async(req,res,next)=>
{
    try
    {
        const pizza = await pool.query('SELECT * FROM pizza WHERE pizza.nom=\''+req.body.nom_produit+'\'')
        let produit =pizza.rows[0]
        produit.type='pizza'
        Cart.save(produit)
       
        

    }
    catch(err)
    {
        console.log(err)
        res.send("error data base ")
    }
    res.end()
    //console.log(Cart.getCart())

}


const add_entree_to_cart=async(req,res,next)=>
{
    try
    {
        const entree = await pool.query('SELECT * FROM entree WHERE entree.nom=\''+req.body.nom_produit+'\'')
        const sauce= await pool.query('SELECT * FROM sauce WHERE sauce.nom=\''+req.body.sauce+'\'')
        let produit =entree.rows[0]
        produit.type='entree'
        Cart.save(produit)
        if(sauce.rows.length>0)
        {
            let produit_gratuit=sauce.rows[0]
            produit_gratuit.type='sauce gratuit'
            Cart.save(produit_gratuit)
        }
        
        

    }
    catch(err)
    {
        console.log(err)
        res.send("error data base ")
    }
    res.end()
    //console.log(Cart.getCart())

}


const add_boisson_to_cart=async(req,res,next)=>
{
    try
    {
        const boisson = await pool.query('SELECT * FROM boisson WHERE boisson.nom=\''+req.body.nom_produit+'\'')
        let produit =boisson.rows[0]
        //console.log(produit)
        produit.type='boisson'
        Cart.save(produit)
        

    }
    catch(err)
    {
        console.log(err)
        res.send("error data base ")
    }
    res.end()
}



const delete_from_cart=(req,res,next)=>
{
    console.log(req.body)

}

const item_detaill=(req,res,next)=>
{   
    console.log(req.body)

    
}
module.exports={
    get_all_menu_items,
    get_cart,
    add_boisson_to_cart,
    add_entree_to_cart,
    add_pizza_to_cart,
    delete_from_cart,
    item_detaill
}