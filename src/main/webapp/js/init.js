
// Shorthand for $( document ).ready()
$(function() {
    console.log( "ready!" );
    $(".account .user_name").on("click",function(){
       $(".account ul").slideToggle(300)
       $(this).addClass("on")
   })//account
   

   $(".btn_mobile_menu").on("click",function(){
       $('body').bind('touchmove', function(e){e.preventDefault()});
       $('body').addClass('search-active');
       $(".sidebar").addClass("on");
       $(".bg").addClass("on");
   })
   $(".bg").on("click",function(){
       //$(".sidebar").addClass("on")
       $('body').unbind('touchmove');
   $('body').removeClass('search-active');
       $(".sidebar").removeClass("on");
       $(".bg").removeClass("on");
   })

});//js