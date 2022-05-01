const pool=require('../db_pool/pool')


let counter=1

const compare_ing=(prod1,prod2)=>
{
    let a=[prod1.sauce,...prod1.fromage,...prod1.viande,...prod1.legume]
    let b=[prod2.sauce,...prod2.fromage,...prod2.viande,...prod2.legume]
    
    if(a.length!=b.length)
    {
        return false
    }
    else
    {
        let v=true
        a.map((x)=>
        {
            if (b.findIndex(y=> y.nom==x.nom)!=-1)
            {
                v=v&&true
            }
            else
            {
                v=v&&false
            }
        })
        b.map((x)=>
        {
            if (a.findIndex(y=>y.nom==x.nom)!=-1)
            {
                v=v&&true
            }
            else
            {
                v=v&&false
            }
        })

        return v
    }
}

const create_pizza=async(sauce ,viande , fromage , legume,taille)=>
{
    let nom ='PERSO '+counter
    counter++
    let prix=5
    let x=[sauce,...viande,...fromage,...legume]
    x==undefined||x==[] ? prix=5 : x.map(y=>{prix+=y.prix})
    let pizza={type:'pizza perso',nom:nom,ing:{},taille:taille,prix:prix} // generate nom 
    sauce==undefined ? (pizza.ing.sauce={ nom: 'sauce barbecue', type: 'sauce', prix: 0.4 }) : (pizza.ing.sauce=sauce)
    fromage.length==0 ? pizza.ing.fromage=[{nom:'mozzarella', type: 'fromage', prix: 0.4}] : pizza.ing.fromage=fromage
    viande.length==0 ? pizza.ing.viande=[] : pizza.ing.viande=viande
    legume.length==0 ? pizza.ing.legume=[] : pizza.ing.legume=legume

    //check if it already exists in database
    let pizza_list=[]
    const pizza_db = await pool.query('SELECT nom ,prix FROM pizza')
    await Promise.all((pizza_db.rows).map(async (x)=>{
        let produit={}
        produit.nom=x.nom
        produit.prix=x.prix
        produit.ing={}
        produit.ing.sauce=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+x.nom+'\' and ingrediant.type=\'sauce\'')).rows[0]
        produit.ing.fromage=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+x.nom+'\' and ingrediant.type=\'fromage\'')).rows
        produit.ing.viande=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+x.nom+'\' and ingrediant.type=\'viande\'')).rows
        produit.ing.legume=(await pool.query('select ingrediant.nom,ingrediant.prix,ingrediant.type  from (pizza join pizza_ing on pizza.nom=pizza_ing.pizza_nom) join ingrediant on pizza_ing.ing_nom=ingrediant.nom where pizza.nom=\''+x.nom+'\' and ingrediant.type=\'legume\'')).rows
        pizza_list.push(produit)
    }))

    let index=pizza_list.findIndex(x=>compare_ing(x.ing,pizza.ing))
    if(index>=0)
    {
        pizza.nom+=" ("+pizza_list[index].nom+")"
        pizza.prix=pizza_list[index].prix
    }

    return pizza

}
module.exports={
    create_pizza
}