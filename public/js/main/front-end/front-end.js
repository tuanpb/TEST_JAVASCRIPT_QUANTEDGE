$(document).ready(function() {
    $(".sort-list li").click(function(){
       $(".sort-list li").removeClass('active');
       $(this).addClass('active');
    })
})