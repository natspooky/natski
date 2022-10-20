$(document).ready(function(){
    setTimeout(function(){
        $('.loaderback').fadeToggle();
    },1500);
    let navbar=document.querySelector('.navbar');
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            navbar.classList.remove('active')
        } else {
            navbar.classList.add('active')
        }
    };
    let menuToggle=document.querySelector('.toggle');
    let menuOpen=document.querySelector('.slidemenu');
    $(menuToggle).click(function(){
        menuToggle.classList.toggle('active')
        menuOpen.classList.toggle('active')
        document.body.classList.toggle('staticmenu')
    });
    let IframePage=document.querySelector('.pagecontainer');
    $('.pannelbutton,.closer').click(function(){
        IframePage.classList.toggle('active')
        document.body.classList.toggle('static')
    });
    $('.pannelbutton').hover(function(){
        $('.pannelbutton').css({'border':'4px solid #729ef6','background-color':'transparent'});
        $('.pannelinfo').css({'background-color':'#efefefe0','color':'#000'})
        $('.panneltext').css({'height':'45%','opacity':'1'})
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    },function(){
        $('.pannelbutton').css({'border':'','background-color':''});
        $('.pannelinfo').css({'background-color':'','color':''});
        $('.panneltext').css({'height':'','opacity':''}); 
    });
});
