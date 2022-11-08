$(document).ready(function(){
    if(window.location!==window.parent.location){
        $('.navbar,#linker').css('display','none');
        $('.backpage,#linkershort').css('display','flex');
    }else{
        $('.navbar').css('display','block');
        $('.backpage,#linkershort').css('display','none');
        $('#linker').css('display','flex');
    };
    setTimeout(function(){
        $('.loaderback').fadeToggle();
    },200);
    const d = new Date();
    if(d.getFullYear() > 2022){document.getElementById("footerdate").innerHTML='© NATSKI'+' 2022-'+d.getFullYear();}
    else{document.getElementById("footerdate").innerHTML='© NATSKI'+' '+d.getFullYear();}
    let menuToggle=document.querySelector('.toggle'),
    menuOpen=document.querySelector('.slidemenu');
    $(menuToggle).click(function(){
        menuToggle.classList.toggle('active');
        menuOpen.classList.toggle('active');
        document.body.classList.toggle('staticmenu');
    });
    let IframePage=document.querySelector('.pagecontainer'),
    navi=document.querySelector('.navbar');
    $('.pannelbutton,.closer').click(function(){
        IframePage.classList.toggle('active');
        document.body.classList.toggle('static');
        navi.classList.toggle('active');
    });
    $('.pannelbutton').hover(function(){
        if(screen.availHeight<screen.availWidth){
            $('.pannelbutton').css({'border':'4px solid #729ef6','background-color':'transparent'});
            $('.pannelinfo').css({'background-color':'#e9e9e9e0','color':'#0a0a0a'});
            $('.panneltext').css({'height':'45%','opacity':'1'});
            $('.panneltitle').css({'transform':'translateY(-12vw)'});
            $('.pannelsubtext').css({'transform':'translateY(-13.2vw)'});
        }
    },function(){
        $('.pannelbutton').css({'border':'','background-color':''});
        $('.pannelinfo').css({'background-color':'','color':''});
        $('.panneltext').css({'height':'','opacity':''});
        $('.panneltitle').css({'transform':''});
        $('.pannelsubtext').css({'transform':''});
    });
    $(window).scroll(function(){
        $('.img,.top').each(function(i){
            var bottom_of_object=$(this).position().top+$(this).outerHeight(),
            bottom_of_window=$(window).scrollTop()+$(window).height();
            if(bottom_of_window>bottom_of_object){$(this).css({'opacity':'1','transform':'scale(1)'});}
            else{$(this).css({'opacity':'0','transform':'scale(0.8)'});}
        });
    });
    /*
    var rgb = getAverageRGB(document.getElementById('i'));
    document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';

    function getAverageRGB(imgEl) {
        
        var blockSize = 5,
            defaultRGB = {r:0,g:0,b:0},
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
        if (!context) {
            return defaultRGB;
        }
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        context.drawImage(imgEl, 0, 0);
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            alert('x');
            return defaultRGB;
        }
        length = data.data.length;
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        return rgb;
    }
    */
});