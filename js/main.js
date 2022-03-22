let navBar = $('#nav');
let overLay = $(".overLay");
let slider = $("#slider");
let popup = $('.popup');
let close = $('.close');
// Navbar
changeNaveStyle(0)
$(window).on("scroll resize" , _=> changeNaveStyle())
function changeNaveStyle(){
    if($(this).scrollTop() > 0 || $(this).width() <= 575){ shrink()}else{grow()}
}
function grow(){
    navBar.removeClass("bg-dark")
    navBar.addClass("py-3")
}
function shrink(){
    navBar.addClass("bg-dark")
    navBar.removeClass("py-3")
}
// Gallary

// open photo
$(".gallary .box").click((function(){
    let src = $(this).children('img').prop('src');
    popup.children('.popup-img').children('img').prop('src' , `${src}`);
    if($(window).width() > 767 && $(window).height() >= 600){
    overLay.css('display' , 'block')
    $('body').css('overflow' , 'hidden')
    window.scrollTo(0 , $('.gallary').offset().top - 200)
    popup.show(300)
    }
}))
// close photo
close.click(function(){
    overLay.css('display' , 'none')
    popup.hide(300 , _=>$('body').css('overflow' , 'auto'))
})