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

$(document).ready(()=>{
    $('#pizza-btn').click((e)=>{
        $('.active-menu').toggleClass("active-menu hidden-menu")
        $('#pizza').toggleClass("active-menu hidden-menu")

    })

    $('#entree-btn').click((e)=>{
        $('.active-menu').toggleClass("active-menu hidden-menu")
        $('#entree').toggleClass("active-menu hidden-menu")

    })

    $('#boisson-btn').click((e)=>{
        $('.active-menu').toggleClass("active-menu hidden-menu")
        $('#boisson').toggleClass("active-menu hidden-menu")

    })

    $('#pre-menu-btn').click((e)=>{
        $('.active-menu').toggleClass("active-menu hidden-menu")
        $('#pre-menu').toggleClass("active-menu hidden-menu")

    })

    $('#perso-btn').click((e)=>{
        $('.active-menu').toggleClass("active-menu hidden-menu")
        $('#perso').toggleClass("active-menu hidden-menu")

    })
    show_more()

    
    

    

    
   

    
})