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
        menuToggle.classList.toggle('open');
        menuOpen.classList.toggle('active');
        document.body.classList.toggle('staticmenu');
    });
    let IframePage=document.querySelector('.pagecontainer'),
    navi=document.querySelector('.navbar');
    $('.pannelbutton,.closer').click(function(){
        IframePage.classList.toggle('active');
        document.body.classList.toggle('static');
        navi.classList.toggle('active');
    })
    let logframe=document.querySelector('.changelogframe'),
    home=document.getElementById('home'),
    log=document.getElementById('log');
    $('#log,#backcloser,.logcloser').click(function(){
        home.classList.toggle('active');
        log.classList.toggle('active');
        logframe.classList.toggle('active');
        $('#backcloser').fadeToggle();
        document.body.classList.toggle('static');
    })
    notifs=document.getElementById('notifbar');
    $('#home').click(function(){
        notifs.classList.add('active');
        log.classList.remove('active');
        logframe.classList.remove('active');
        $('#backcloser').fadeOut();
        document.body.classList.remove('static');
        navi.classList.remove('active');
        IframePage.classList.remove('active');
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
        $('.img').each(function(i){
            var bottom_of_object=$(this).position().top+$(this).outerHeight()-150,
            bottom_of_window=$(window).scrollTop()+$(window).height();
            if(bottom_of_window>bottom_of_object){$(this).css({'opacity':'1','transform':'scale(1)'});}
            else{$(this).css({'opacity':'0','transform':'scale(0.8)'});}
        });
    });
    function averageColor(imageElement) {
        for(let j=0;j<imageElement.length;j++){
            var canvas=document.createElement('canvas'),
            context=canvas.getContext && canvas.getContext('2d'),
            imgData,width,height,length,rgb={r:0,g:0,b:0},count=0;
            height=canvas.height=imageElement[j].naturalHeight||imageElement[j].offsetHeight||imageElement[j].height;
            width=canvas.width=imageElement[j].naturalWidth||imageElement[j].offsetWidth||imageElement[j].width;
            context.drawImage(imageElement[j],0,0);
            imgData=context.getImageData(0,0,width,height);
            length=imgData.data.length;
            for(var i=0;i<length;i+=4){
                rgb.r+=imgData.data[i];
                rgb.g+=imgData.data[i+1];
                rgb.b+=imgData.data[i+2];
                count++;
            }
            rgb.r=Math.floor(rgb.r/count);
            rgb.g=Math.floor(rgb.g/count);
            rgb.b=Math.floor(rgb.b/count);
            imageElement[j].style.backgroundColor='rgba('+rgb.r+','+rgb.g+','+rgb.b+',0.7)';
            imageElement[j].style.boxShadow='0px 0px 20px rgba('+rgb.r+','+rgb.g+','+rgb.b+',0.7)';
        }
    };
    var imagesLoaded=0,totalImages=$("img").length,images=0;
    $("img").on("load",function(event){
        images++;
        if(images==totalImages){
            setTimeout(function(){
                averageColor(document.querySelectorAll('img'));
            },1000);
        }
    });
    var load_handler=function(){
        imagesLoaded++;
        if(imagesLoaded==totalImages){
            averageColor(document.querySelectorAll('img'));
        }
    }
    $("img").on("load",function(event){
        return this.complete;
    }).each(load_handler).end().load(load_handler);
});
