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


/////////////////////////
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
const delete_item_from_cart=function(nb_elem)
{
    $(".delete-from-cart").click(function()
    {
        let parent=$(this).parent()
        let product_name=parent.attr("id")
        let qt_elem=parent.find(".qty")
        let qt=parseInt(qt_elem.html().match(/(\d+)/)[0])
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
       
        nb_elem--
        $("#cart p").html(nb_elem)
        $.post("/menu/delete_from_cart",{nom_produit:product_name,taille:tl});

    })   
}


///////////////////////////////////////
const add_produit=function(nb_elem_cart)
{
    //using this gave me the possibilité to keep the cart filled even after reloading however i added a reset function that triggers every time we reload the menu add loading animation to wait for the cart to be ready
    $('.add_pizza_form').submit(function (e) { 
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value=($('#'+form_id+' input').val())
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value,taille:value2});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        
    });
    
    $('.add_entree_form').submit(function (e) { 
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value1=($('#'+form_id+' input').val())
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value1,sauce:value2});
        nb_elem_cart++
        if(value2!="Choisir une sauce gratuite")
        {
            nb_elem_cart++
        }
        $("#cart p").html(nb_elem_cart)
        
    });
   
    $('.add_boisson_form').submit(function (e) { 
        e.preventDefault();
        let url = $(this).attr( "action" );
        let form_id=($(this).attr("id"))
        let value=($('#'+form_id+' input').val())
        let value2=($('#'+form_id+' select').val())
        $.post(url, {nom_produit:value,taille:value2});
        nb_elem_cart++
        $("#cart p").html(nb_elem_cart)
        
    });
}



//////////////////////////////////////
const open_cart=function(nb_elem_cart)
{
    $('#cart').click((e)=>{
        $.get("/menu/get-cart","json").done(function(data){
            let layout=""
            data.products.forEach(element => {
                if(element.type=='pizza')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem p\"> <h3><span>"+element.nom+"</span><span>"+element.prix+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><h4 class=\"tl\"> taille: "+element.taille+"</h4><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div>"
                }
                if(element.type=='boisson')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem b\"> <h3><span>"+element.nom+"</span><span>"+element.prix+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><h4 class=\"tl\"> taille: "+element.taille+"</h4><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div>"
                }
                if(element.type=='entree')
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem e\"> <h3><span>"+element.nom+"</span><span>"+element.prix+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div>"
                }
                if(element.type=="sauce gratuit")
                {
                    layout=layout+"<div id=\""+element.nom+"\" class=\"cart-elem\"> <h3><span>"+element.nom+"</span><span>"+"gratuit"+"</span></h3><h4 class=\"qty\"> quantité: "+element.qty+"</h4><a class=\"delete-from-cart\"><img src=\"/assets/recycle-bin.png\"></a></div>"
                }
               
                
            });
            layout=layout+"<button type=\"submit\">commander</button><a id=\"close-cart\"><img src=\"/assets/icons8-close-64.png\" ></a>"
            layout=layout+"<label for=\"nom\">Nom:</label>"
            layout=layout+"<input type=\"text\" id=\"nom-client\" name=\"nom\" required>"
            layout=layout+"<label for=\"prenom\">Prenom:</label>"
            layout=layout+"<input type=\"text\" id=\"prenom-client\" name=\"prenom\" required>"
            layout=layout+"<div id=\"pac-container\"><input id=\"pac-input\" type=\"text\" placeholder=\"Enter a location\" ></div>"
            layout=layout+"<div id=\"infowindow-content\"><span id=\"place-name\" class=\"title\"></span><br /><span id=\"place-address\"></span></div>"
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
    let nb_elem_cart=0;
  
    navigate()
    show_more()

    add_produit(nb_elem_cart)

    open_cart(nb_elem_cart)

    
    update_prix()

    
   

    
})
