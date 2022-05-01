const { v4: uuidv4 } = require('uuid');
const pool=require('../db_pool/pool')
const Cart=require('../models/cart')
const pizza_perso=require('../models/pizza_perso')


const get_all_menu_items=async(req,res)=> //this will be in a middle ware that runs in the begening of each req
{
    Cart.reset()
    try
    {
        const pizza = await pool.query('SELECT * FROM pizza')
        const entree= await pool.query('SELECT * FROM entree')
        const boisson= await pool.query('SELECT * FROM boisson')
        const sauce= await pool.query('SELECT * FROM sauce')
        const ingrediant_sauce=await pool.query('SELECT * FROM ingrediant WHERE type=\'sauce\'')
        const ingrediant_fromage=await pool.query('SELECT * FROM ingrediant WHERE type=\'fromage\'')
        const ingrediant_viande=await pool.query('SELECT * FROM ingrediant WHERE type=\'viande\'')
        const ingrediant_legume=await pool.query('SELECT * FROM ingrediant WHERE type=\'legume\'')
        const ingrediant={sauce:ingrediant_sauce.rows,viande:ingrediant_viande.rows,fromage:ingrediant_fromage.rows,legume:ingrediant_legume.rows}
        res.render('menu',{entree:entree.rows,pizza:pizza.rows,boisson:boisson.rows,sauce:sauce.rows,ingrediant:ingrediant,nb_cart:0})
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
    //console.log(cart.products[0].ing)
    res.json(cart)
    res.end()

}

//you can get rid of all this and remove the forms from the partials and add it to the cart html then with jequery you fill the cart with input and lable containing data then to finish you send via post req  
const add_pizza_to_cart=async(req,res,next)=>
{
    try
    {
        const pizza = await pool.query('SELECT nom ,prix FROM pizza WHERE pizza.nom=\''+req.body.nom_produit+'\'')
        let produit =pizza.rows[0]
        produit.ing={}
        produit.ing.sauce=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+produit.nom+'\' and ingrediant.type=\'sauce\'')).rows[0]
        produit.ing.fromage=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+produit.nom+'\' and ingrediant.type=\'fromage\'')).rows
        produit.ing.viande=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+produit.nom+'\' and ingrediant.type=\'viande\'')).rows
        produit.ing.legume=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+produit.nom+'\' and ingrediant.type=\'legume\'')).rows
        produit.type='pizza'
        produit.taille=req.body.taille
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
        const entree = await pool.query('SELECT nom ,prix FROM entree WHERE entree.nom=\''+req.body.nom_produit+'\'')
        const sauce= await pool.query('SELECT nom ,prix FROM sauce WHERE sauce.nom=\''+req.body.sauce+'\'')
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

}


const add_boisson_to_cart=async(req,res,next)=>
{
    try
    {
        const boisson = await pool.query('SELECT nom ,prix FROM boisson WHERE boisson.nom=\''+req.body.nom_produit+'\'')
        let produit =boisson.rows[0]
        produit.type='boisson'
        produit.taille=req.body.taille
        Cart.save(produit)
        

    }
    catch(err)
    {
        console.log(err)
        res.send("error data base ")
    }
    res.end()
}

const add_perso_pizza_to_cart=async(req,res,next)=>
{   
    
    let sauce
    let fromage=[]
    let viande=[]
    let legume=[]
    if(req.body.ingrediants!=undefined)
    {
        await Promise.all(req.body.ingrediants.map(async (x)=>
        {  
            let y
            try
            {   
                y= (await pool.query('select * from ingrediant where nom=\''+x+'\'')).rows[0]
            }
            catch(e)
            {
                console.log(e)
                res.send('data base errr')
            }
            if(y!=undefined)
            {
                switch (y.type) {
                    case 'sauce':
                        sauce=(y)
                    break;
                    case 'fromage':
                        fromage.push(y)
                    break;
                    case 'viande':
                        viande.push(y)
                    break;
                    case 'legume':
                        legume.push(y)
                    break;
                
                }
            }
            
        }))
    }
    let new_pizza=await pizza_perso.create_pizza(sauce,viande,fromage,legume,req.body.taille)
    Cart.save(new_pizza)
    res.end()
}



const delete_from_cart=(req,res,next)=>
{
    if(req.body.taille==undefined)
    {
        Cart.delete(req.body.nom_produit)
    }
    else
    {
        Cart.deleteT(req.body.nom_produit,req.body.taille) //fot taille search
    }
    res.end()

}

const item_detaill=(req,res,next)=>
{   
    console.log(req.body)

    
}

const commander=(req,res,next)=>
{
    const nom=req.body.nom
    const prenom=req.body.prenom
    const adresse=req.body.adresse
    const command_id =uuidv4()
    const cart=Cart.getCart()
    console.log(cart)//insert to database after doing modifs
    res.render('checked_out',{id:command_id,nom:nom,prenom:prenom})
}
module.exports={
    get_all_menu_items,
    get_cart,
    add_boisson_to_cart,
    add_entree_to_cart,
    add_pizza_to_cart,
    add_perso_pizza_to_cart,
    delete_from_cart,
    item_detaill,
    commander
}