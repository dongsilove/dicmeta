
// Shorthand for $( document ).ready()
$(function() {

    

    //console.log( "ready!" );
	$(".account .user_name").on("click",function(){
        $(".account ul").slideToggle(300); 
        $(this).addClass("on");
    })//account
    
    /*btn_bars*/
    $('.btn_bars').on("click",function(){
        $('.sidebar').toggleClass("_hide");
        $('.container').toggleClass("_hide");
        $('.header').toggleClass("_hide");
    })//
    $(".btn_mobile_menu").on("click",function(){
        $('.bg').bind('touchmove', function(e){e.preventDefault()});
        $('body').addClass('search-active');
        $(".sidebar").addClass("on");
        $(".bg").addClass("on");
    })
    $(".bg").on("click",function(){
        $('.container').unbind('touchmove');
        $('body').removeClass('search-active');
        $(".sidebar").removeClass("on");
        $(".bg").removeClass("on");
    })

});//js