/*!
 * ENCORE JS
 * Author: NATSKI
 * MIT License
 */

if(window.location !== window.parent.location){
    
}

function n(e) {
    if(localStorage.getItem("performance")!=='true') {
        for (let t = 0; t < e.length; t++) {
            var a, o, c, s, l = document.createElement("canvas"),
                r = l.getContext && l.getContext("2d"),
                n = {
                    r: 0,
                    g: 0,
                    b: 0
                },
                i = 0;
            c = l.height = e[t].naturalHeight || e[t].offsetHeight || e[t].height, o = l.width = e[t].naturalWidth || e[t].offsetWidth || e[t].width, r.drawImage(e[t], 0, 0), s = (a = r.getImageData(0, 0, o, c)).data.length;
            for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], n.b += a.data[g + 2], i++;
            n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i), e[t].style.backgroundColor = "rgba(" + n.r + "," + n.g + "," + n.b + ",0.7)", e[t].style.boxShadow = "0px 0px 20px rgba(" + n.r + "," + n.g + "," + n.b + ",0.7)"
        }
    }
};

$(window).scroll(function() {
    $(".img").each(function(e) {
        var t = $(this).position().top + $(this).outerHeight() - 150;
        $(window).scrollTop() + $(window).height() > t ? $(this).css({
            opacity: "1",
            transform: "scale(1)"
        }) : $(this).css({
            opacity: "0",
            transform: "scale(0.8)"
        })
    })
});
var images = $('img');
images.imagesLoaded()
    .done(function() {
        setTimeout(() => {
            n(images);
        }, 500);
    });