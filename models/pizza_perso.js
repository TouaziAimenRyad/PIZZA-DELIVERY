let counter=1
const create_pizza=(sauce ,viande , fromage , legume,taille)=>
{
    let nom ='PERSO'+counter
    counter++
    let prix=5
    let x=[sauce,...viande,...fromage,...legume]
    x==undefined||x==[] ? x.map(y=>{prix+=y.prix}) : prix=5
    let pizza={type:'pizza perso',nom:nom,ing:{},taille:taille,prix:prix} // generate nom 
    sauce==undefined ? (pizza.ing.sauce={ nom: 'sauce barbecue', type: 'sauce', prix: 0.4 }) : (pizza.ing.sauce=sauce)
    fromage==undefined || fromage==[] ? pizza.ing.fromage=[{nom:'mozzarella', type: 'fromage', prix: 0.4}] : pizza.ing.fromage=fromage
    viande==undefined || viande==[] ? pizza.ing.viande=[] : pizza.ing.viande=viande
    legume==undefined || legume==[] ? pizza.ing.legume=[] : pizza.ing.legume=legume

    return pizza

}
module.exports={
    create_pizza
}