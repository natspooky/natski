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
        $('.img,.top').each(function(i){
            var bottom_of_object=$(this).position().top+$(this).outerHeight()-150,
            bottom_of_window=$(window).scrollTop()+$(window).height();
            if(bottom_of_window>bottom_of_object){$(this).css({'opacity':'1','transform':'scale(1)'});}
            else{$(this).css({'opacity':'0','transform':'scale(0.8)'});}
        });
    });
});
function averageColor(imageElement) {
 
    // Create the canvas element
    var canvas
        = document.createElement('canvas'),

        // Get the 2D context of the canvas
        context
            = canvas.getContext &&
            canvas.getContext('2d'),
        imgData, width, height, length,

        // Define variables for storing
        // the individual red, blue and
        // green colors
        rgb = { r: 0, g: 0, b: 0 },

        // Define variable for the
        // total number of colors
        count = 0;

    // Set the height and width equal
    // to that of the canvas and the image
    height = canvas.height =
        imageElement.naturalHeight ||
        imageElement.offsetHeight ||
        imageElement.height;
    width = canvas.width =
        imageElement.naturalWidth ||
        imageElement.offsetWidth ||
        imageElement.width;

    // Draw the image to the canvas
    context.drawImage(imageElement, 0, 0);

    // Get the data of the image
    imgData = context.getImageData(0, 0, width, height);

    // Get the length of image data object
    length = imgData.data.length;

    for (var i = 0; i < length; i += 4) {

        // Sum all values of red colour
        rgb.r += imgData.data[i];

        // Sum all values of green colour
        rgb.g += imgData.data[i + 1];

        // Sum all values of blue colour
        rgb.b += imgData.data[i + 2];

        // Increment the total number of
        // values of rgb colours
        count++;
    }

    // Find the average of red
    rgb.r= Math.floor(rgb.r / count);

    // Find the average of green
    rgb.g= Math.floor(rgb.g / count);

    // Find the average of blue
    rgb.b= Math.floor(rgb.b / count);

    imageElement.style.backgroundColor ='rgb(' + rgb.r + ','+ rgb.g + ','+ rgb.b + ', 80 )';
}