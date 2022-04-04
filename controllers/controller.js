const pool=require('../db_pool/pool')

const get_all_menu_items=async(req,res)=> //this will be in a middle ware that runs in the begening of each req
{
    try
    {
        const pizza = await pool.query('SELECT * FROM pizza')
        console.log(pizza.rows)
        const entree= await pool.query('SELECT * FROM entree')
        console.log(entree.rows)
        const boisson= await pool.query('SELECT * FROM boisson')
        console.log(boisson.rows)
        const sauce= await pool.query('SELECT * FROM sauce')
        console.log(sauce.rows)
        res.render('menu',{pizza:pizza,entree:entree,boisson:boisson,sauce:sauce})
    }
    catch (err)
    {
        console.log(err)
        res.send("error data base ")
    }
    
    res.render('menu')
}

module.exports={
    get_menu,
}