//if we use an arrow function $(this) will return the window object always that's why we define the function with function so we can get the obj we already targeted with this func
const show_more =function(){
    $("#show-more").click(function(e){
        $(this).text("show less")
        $(this).prop("id","show-less")
        $("#sub-menu").css({"overflow-y":"","height":"fit-content"})
        show_less()
    })
}
//////////////////////////
const show_less=function(){
    $("#show-less").click(function(e){
        $(this).text("show more")
        $(this).prop("id","show-more")
        $("#sub-menu").css({"height":""})
        show_more()
    })

}


/////////////////////////////////////////////
const toggle_hide_menu=function(active,hidden)
{
    $(active).toggleClass("active-menu hidden")
    $(hidden).toggleClass("active-menu hidden")
}


////////////////////////////
const navigate=function()
{
    $('#pizza-btn').click((e)=>{
        toggle_hide_menu('.active-menu','#pizza')
    })

    $('#entree-btn').click((e)=>{
        toggle_hide_menu('.active-menu','#entree')


    })

    $('#boisson-btn').click((e)=>{
        toggle_hide_menu('.active-menu','#boisson')

    })

    $('#pre-menu-btn').click((e)=>{
        toggle_hide_menu('.active-menu','#pre-menu')


    })

    $('#perso-btn').click((e)=>{
        toggle_hide_menu('.active-menu','#perso')


    })

}


///////////////////////////
const close_cart=function()
{
    $('#close-cart').click((e)=>{
        $(".cart-sec").toggleClass("hidden")

    })
    
}

////////////////////////////////////////////

const select_limit=function()
{
    const limit=function(limit,target,id)
    {
        
        let input=target.find("input[name="+id+"]");
        input.change(function (e) { 
            if (target.find("input:checked").length==limit)
            {
                target.find("input:checkbox:not(:checked)").attr("disabled", true);
            }
            else
            {   
                target.find("input:checkbox:not(:checked)").attr("disabled", false);
            }
            
        });
      
    }
    
    $.each($(".menu_selection"),function(index,elem){
        let id=elem.id
        let input=$("#"+id)
        switch (id) {
            case 'mega_entree':
                limit(1,input,id)
            break;
            case 'mega_sauce':
                limit(1,input,id)
            break;
            case 'mega_pizza':
                limit(1,input,id)
            break;
            case 'mega_boisson':
                limit(1,input,id)
            break;
            case 'giga_entree':
                limit(2,input,id)
            break;
            case 'giga_sauce':
                limit(2,input,id)
            break;
            case 'giga_pizza':
                limit(2,input,id)
            break;
            case 'giga_boisson':
                limit(1,input,id)
            break;
            case 'extra_entree':
                limit(4,input,id)
            break;
            case 'extra_sauce':
                limit(4,input,id)
            break;
            case 'extra_pizza':
                limit(2,input,id)
            break;
            case 'extra_boisson':
                limit(1,input,id)
            break;
        
            default:
                break;
        }

    })
    


    
}

////////////////////////////////////////////
const delete_item_from_cart=function(nb_elem)
{
    $(".delete-from-cart").click(function()
    {
        let parent=$(this).parent().parent()
        let product_name=parent.attr("id")
        let qt_elem=parent.find(".qty")
        let qt=parseInt(qt_elem.html().match(/(\d+)/)[0])
        let prix_tot=parseFloat($("#cart-form #prix_tot").html().match(/(\d+)/)[0])
        let prix_prod
        if(parent.find(".prix_prod").html()!="gratuit")
        {
            prix_prod=parseFloat(parent.find(".prix_prod").html().match(/(\d+)/)[0])
        }else
        {
            prix_prod=0
        }
       
       
        if(qt==1)
        {
            parent.remove()
        }
        else
        {
            qt_elem.html("quantité: "+(qt-1))
        }
        let tl_elem=(parent.find(".tl").html())
        let tl 
        if(tl_elem!=undefined)
        {
            tl=(tl_elem .split(' '))[2]
        }
        else
        {
            tl=undefined
        }
       
        $.post("/menu/delete_from_cart",{nom_produit:product_name,taille:tl});
        if(prix_prod!=undefined)
        {
            prix_tot-=prix_prod
            $("#cart-form #prix_tot").html("Prix Total "+prix_tot+"$")
        }
       
        nb_elem--
        $("#cart p").html(nb_elem)
        
    })   
}


//////////////////////////////////////////
const add_produit=function()
{
    //using this gave me the possibilité to keep the cart filled even after reloading however i added a reset function that triggers every time we reload the menu add loading animation to wait for the cart to be ready
    $('.add_pizza_form').submit(function (e) { 
        let nb_elem_cart=parseInt($("#cart p").html())
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value=($('#'+form_id+' input').val()) // replace using ids with this.find() cleaner
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value,taille:value2});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        
    });
    
    $('.add_entree_form').submit(function (e) { 
        let nb_elem_cart=parseInt($("#cart p").html())
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value1=($('#'+form_id+' input').val())
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value1,sauce:value2});
        nb_elem_cart++
        if(value2!=null)
        {
            nb_elem_cart++
        }
       
        $("#cart p").html(nb_elem_cart)
        
    });
   
    $('.add_boisson_form').submit(function (e) { 
        let nb_elem_cart=parseInt($("#cart p").html())
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value=($('#'+form_id+' input').val())
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value,taille:value2});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        
    });

    $('#add_pizza_perso_form').submit(function (e) { 
        let nb_elem_cart=parseInt($("#cart p").html())
        e.preventDefault();
        let url = $(this).attr( "action" );
        const sauce= $(this).find('input[name="sauce"]:checked').val()// turn it into radio btn
        let fromage=[]
        $(this).find('input[name="fromage"]:checked').each(function(){fromage.push(this.value)})
        let viande=[]
        $(this).find('input[name="viande"]:checked').each(function(){viande.push(this.value)})
        let legume=[]
        $(this).find('input[name="legume"]:checked').each(function(){legume.push(this.value)})
        let taille =$(this).find('select').val()
        let ingrediants=[sauce,...fromage,...viande,...legume]
        $.post(url, {ingrediants:ingrediants,taille:taille});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        $(this).find("input").prop('checked',false)
        
        // in the backk end get the price ig it's too much in the front
        
    });


    $('.add_menu_form').submit(function (e) { 
        let nb_elem_cart=parseInt($("#cart p").html())
        e.preventDefault()
        let id =$(this).attr('id')
        let type=id
        let url=$(this).attr('action')
        let entree=[] 
        let sauce=[]
        let pizza=[]
        let boisson=[]
        let inputs=$(this).find("input:checked")
        $.each(inputs, function (indexInArray, valueOfElement) { 
            let name=valueOfElement.name
            switch (name) {
                case id+"_entree":
                    entree.push(inputs[indexInArray].value)
                break;
                case id+"_sauce":
                    sauce.push(inputs[indexInArray].value)
                break;
                case id+"_pizza":
                    pizza.push(inputs[indexInArray].value)
                break;
                case id+"_boisson":
                    boisson.push(inputs[indexInArray].value)
                break;
            
            }
             
        });
        $.post(url, {type,entree,sauce,boisson,pizza});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        $(this).find("input").prop('checked',false)
      
        console.log(type)
       
    
    })
}



//////////////////////////////////////
const open_cart=function()
{
    $('#cart').click((e)=>{
        $.get("/menu/get-cart","json").done(function(data){
            let nb_elem_cart=parseInt($("#cart p").html())
            
            let layout="<h2 id=\"prix_tot\">Prix Total "+data.totalPrice+"$</h2>"
            data.products.forEach(element => {
                if(element.type=='pizza'||element.type=='pizza perso')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem p\"> <h3 class=\"d-flex flex-row flex-wrap justify-content-between\"><span>"+element.nom+"</span><span class=\"prix_prod\">"+element.prix+"$"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><h4 class=\"tl\"> taille: "+element.taille+"</h4><div class=\"del_space\"><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div></div>"
                }
                if(element.type=='boisson')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem b\"> <h3 class=\"d-flex flex-row flex-wrap justify-content-between\"><span>"+element.nom+"</span><span class=\"prix_prod\">"+element.prix+"$"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><h4 class=\"tl\"> taille: "+element.taille+"</h4><div class=\"del_space\"><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div></div>"
                }
                if(element.type=='entree')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem e\"> <h3 class=\"d-flex flex-row flex-wrap justify-content-between\"><span>"+element.nom+"</span><span class=\"prix_prod\">"+element.prix+"$"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><div class=\"del_space\"><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div></div>"
                }
                if(element.type=="sauce gratuit")
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem\"> <h3 class=\"d-flex flex-row flex-wrap justify-content-between\"><span>"+element.nom+"</span><span class=\"prix_prod\">"+"gratuit"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><div class=\"del_space\"><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div></div>"
                }
                if(element.type=="menu")
                {
                    layout=layout+"<div class=\"cart-elem\"> <h3 class=\"d-flex flex-row flex-wrap justify-content-between\"><span>"+element.type+" "+element.subType+"</span><span class=\"prix_prod\">"+element.prix+"$"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4>"
                    let contenu=[...element.entree,...element.sauce,...element.pizza,...element.boisson]
                    layout=layout+"<div class=\"d-flex flex-nowrap flex-row justify-content-around menu_content\">"
                    contenu.map(x=>{
                        layout=layout+"<p>"+x+"</p>"
                    })
                    
                    layout=layout+"</div>"
                    layout=layout+"<div class=\"del_space\"><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div></div>"

                }
               
                
            });
            layout=layout+"<label for=\"nom\">Nom:</label>"
            layout=layout+"<input type=\"text\" id=\"nom-client\" name=\"nom\" placeholder=\"Enter your lastname\" required>"
            layout=layout+"<label for=\"prenom\">Prenom:</label>"
            layout=layout+"<input type=\"text\" id=\"prenom-client\" name=\"prenom\" placeholder=\"enter your firstname\" required>"
            layout=layout+"<label for=\"location\">Adresse:</label>"
            layout=layout+"<input id=\"location\" name=\"location\" type=\"text\" placeholder=\"Enter a location\" required >"
            layout=layout+"<button class=\"add\" type=\"submit\">commander</button><a id=\"close-cart\"><img src=\"/assets/icons8-close-64.png\" ></a>"
            $("#cart-form").html(layout)
            $(".cart-sec").toggleClass("hidden")

            //must be in the call back if we re creating the button here
            close_cart()

            delete_item_from_cart(nb_elem_cart)
            
        });

       
      

    })
}


////////////////////////////
const update_prix=function()
{   
    $(".add_pizza_form").find("select").on('change',function(){
        let taille=$(this).find(":selected").val()
        let prix_elem=$(this).parent().parent().find(".menu-item-price")
        const prix_base=parseFloat(prix_elem.attr("data"))
        let new_prix
        switch (taille) {
            case 'S':
                new_prix=prix_base
            break;
            case 'M':
                new_prix=prix_base+2
            break;
            case 'L':
                new_prix=prix_base+4
            break;
        
        }
        prix_elem.html(new_prix+'$')
        
    })

    $(".add_boisson_form").find("select").on('change',function(){
        let taille=$(this).find(":selected").val()
        let prix_elem=$(this).parent().parent().parent().find(".menu-item-price")
        const prix_base=parseFloat(prix_elem.attr("data"))
        let new_prix
        switch (taille) {
            case '33Cl':
                new_prix=prix_base
            break;
            case '1L':
                new_prix=prix_base+1.4
            break;
            case '2L':
                new_prix=prix_base+1.8
            break;
        
        }
        prix_elem.html(new_prix+'$')
        
    })
}




$(document).ready(()=>{
     let nb_elem_cart=parseInt($("#cart p").html())
  
    navigate()
    show_more()

    add_produit()

    open_cart()


    update_prix()

    select_limit()
    
   

    
})
