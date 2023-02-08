/*!
 * basic functions called by every page
 * Author: Natski
 * MIT License
 */
$(document).ready(function() {
    window.location !== window.parent.location ? (setTimeout(()=>{parent.loaderdeactivate()},500),$("#linker").css("display", "none"), $("#linkershort").css("display", "flex"), $(".backpage").css("display", "flex")) : ($(".navbar").css("display", "block"), $(".backpage,#linkershort").css("display", "none"), $("#linker,.loaderback").css("display", "flex")), setTimeout(() => {
        $(".loaderback").fadeOut()
    }, 500);
    window.onerror = function(error) {window.location !== window.parent.location ? (parent.notiferror(error)) : (notiferror(error))};
    let e = new Date;
    e.getFullYear() > 2022 ? document.getElementById("footerdate").innerHTML = "\xa9 NATSKI 2022 - " + e.getFullYear() : document.getElementById("footerdate").innerHTML = "\xa9 NATSKI " + e.getFullYear();
    let t = document.querySelector(".toggle"),
        a = document.querySelector(".slidemenu");
    $(t).click(function() {
        t.classList.toggle("open"), a.classList.toggle("active"), document.body.classList.toggle("staticmenu")
    });

    function n(e) {
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




    $(".banner-button").hover(function() {
        window.innerHeight < window.innerWidth && ($(".banner-button").css({
            border: "4px solid var(--themecol)",
            "background-color": "transparent"
        }), $(".banner-fg").css({
            "background-color": "#e9e9e9e0"
        }), $(".banner-info").css({
            height: "45%",
            opacity: "1"
        }), $(".banner-bar").css({
            opacity: "0.1"
        }), $(".banner-title").css({
            opacity: "1",
            transform: "translateY(0)",
            top: "42px",
            color: "var(--accentcol)"
        }))
    }, function() {
        $(".banner-button").css({
            border: "",
            "background-color": ""
        }), $(".banner-fg").css({
            "background-color": ""
        }), $(".banner-info").css({
            height: "",
            opacity: ""
        }), $(".banner-bar").css({
            opacity: ""
        }), $(".banner-title").css({
            opacity: "",
            transform: "",
            top: "",
            color: ""
        })
    }), $(window).scroll(function() {
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
});