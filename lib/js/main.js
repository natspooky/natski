$(document).ready(function(){
    setTimeout(function(){
        $('.loaderback').fadeToggle();
    },1500);
    const d = new Date();
    document.getElementById("footerdate").innerHTML='©'+d.getFullYear()+' NATSKI';
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
    $(window).scroll(function(){
        $('.img').each(function(i){
            var bottom_of_object=$(this).position().top+$(this).outerHeight();
            var bottom_of_window=$(window).scrollTop()+$(window).height();
            if(bottom_of_window>bottom_of_object){$(this).css({'opacity':'1','transform':'scale(1)'});}
            else{$(this).css({'opacity':'0','transform':'scale(0.8)'});} 
        }); 
    });
});
