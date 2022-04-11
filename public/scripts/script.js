//if we use an arrow function $(this) will return the window object always that's why we define the function with function so we can get the obj we already targeted with this func
const show_more =function(){
    $("#show-more").click(function(e){
        $(this).text("show less")
        $(this).prop("id","show-less")
        $("#sub-menu").css({"overflow-y":"","height":"fit-content"})
        show_less()
    })
}
const show_less=function(){
    $("#show-less").click(function(e){
        $(this).text("show more")
        $(this).prop("id","show-more")
        $("#sub-menu").css({"height":""})
        show_more()
    })

}

const toggle_hide_menu=function(active,hidden)
{
    $(active).toggleClass("active-menu hidden")
    $(hidden).toggleClass("active-menu hidden")
}

$(document).ready(()=>{
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
    $('#cart').click((e)=>{
        console.log(51515)
        $(".cart-sec").toggleClass("hidden")

    })
    $('#close-cart').click((e)=>{
        console.log(51515)
        $(".cart-sec").toggleClass("hidden")

    })



    show_more()

    $('.add_pizza_form').submit(function (e) { 
        e.preventDefault();
        url = $(this).attr( "action" );
        value=($('.add_pizza_form input').val())
        $.post(url, {nom_produit:value});
        
    });
    
    $('.add_entree_form').submit(function (e) { 
        e.preventDefault();
        url = $(this).attr( "action" );
        value1=($('.add_entree_form input').val())
        value2=($(".add_entree_form select").val())
        $.post(url, {nom_produit:value1,sauce:value2});
        
    });
   
    $('.add_boisson_form').submit(function (e) { 
        e.preventDefault();
        url = $(this).attr( "action" );
        value=($('.add_boisson_form input').val())
        $.post(url, {nom_produit:value});
        
    });
   

    
})
