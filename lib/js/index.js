/* main variables */

var time, slideshowContainer, interval, 
slideIndex = 1,
elem = document.getElementById("progress-bar"),
width = 1,
buttons = document.getElementsByClassName('navbutton');


/* banner system */

window.addEventListener("load", function() {
    showSlides(slideIndex),time = setInterval(function() {
        plusSlides(1)
    }, 1e4), slideshowContainer = document.getElementsByClassName("banner-button");
    for (let e = 0; e < slideshowContainer.length; e++) slideshowContainer[e].addEventListener("mouseenter", pause), 
    slideshowContainer[e].addEventListener("mouseleave", resume)
}), pause = () => {
    clearInterval(time), resetProgressBar()
}, resume = () => {
    clearInterval(time), time = setInterval(function() {
        plusSlides(slideIndex)
    }, 1e4), progressBar()
}

function plusSlides(e) {
    clearInterval(time), e < 0 ? showSlides(slideIndex -= 1) : showSlides(slideIndex += 1), time = -1 === e ? setInterval(function() {
        plusSlides(e + 2)
    }, 1e4) : setInterval(function() {
        plusSlides(e + 1)
    }, 1e4)
}

function currentSlide(e) {
    clearInterval(time), time = setInterval(function() {
        plusSlides(e + 1)
    }, 1e4), showSlides(slideIndex = e)
}

function showSlides(e) {
    var t, n = document.getElementsByClassName("banner-bg"),
        i = document.getElementsByClassName("thumb");
    for (e > n.length && (slideIndex = 1), e < 1 && (slideIndex = n.length), t = 0; t < n.length; t++) n[t].style.display = "none";
    for (t = 0; t < i.length; t++) i[t].classList.remove("active");
    n[slideIndex - 1].style.display = "flex", $(".banner-fg").css({
        opacity: "1",
        transform: "translateY(0px)"
    }), i[slideIndex - 1].classList.add("active"), resetProgressBar(), progressBar()
}

function progressBar() {
    elem.style.transition = "0.1s linear", interval = setInterval(function e() {
        width >= 100 ? clearInterval(interval) : (width++, elem.style.width = width + "%"), 95 == width && $(".banner-fg").css({
            opacity: "0",
            transform: "translateY(-60px)"
        })
    }, 100)
}

function resetProgressBar() {
    elem.style.transition = "0s", width = 0, clearInterval(interval), elem.style.width = width + "%"
}


/* notification system */

function remove(e) {
    sfx('delete')
    let t = e;
    t.style.transform = "translateX(80%)", t.style.opacity = "0", setTimeout(() => {
        t.style.height = "0", t.style.margin = "0"
        2 >= document.getElementById("notifbar").childElementCount && 
        (document.getElementById("notifbar").classList.add("active"), 
        document.getElementById("notifmenu").classList.remove("active"))
        setTimeout(() => {
            t.remove();
        },300)
    }, 290)
}

function removeall() {
    $(".notif").css({
        opacity: "0",
        transform: "translateX(80%)"
    }), setTimeout(() => {
        $(".notif").remove(), document.getElementById("notifbar").classList.add("active"), document.getElementById("notifmenu").classList.remove("active")
    }, 290)
}

function notiftbaroggle() {
    document.getElementById("notifbar").classList.toggle("active")
}

function notifcomplete(e) {
    notifopener();
    let t = document.getElementById("notifbar").appendChild(document.createElement("div")),
        n = t.appendChild(document.createElement("div")),
        i = t.appendChild(document.createElement("p")),
        a = t.appendChild(document.createElement("button")),
        l = a.appendChild(document.createElement("ion-icon")),
        s = n.appendChild(document.createElement("ion-icon"));
    t.className = "notif", n.className = "alert green", i.className = "notifinfo", i.innerText = e, a.className = "notifclose", a.onclick = function() {
        remove(this.parentNode)
    }, l.name = "close", s.name = "alert", notifcloser()
}

function notiferror(e) {
    notifopener();
    let t = document.getElementById("notifbar").appendChild(document.createElement("div")),
        n = t.appendChild(document.createElement("div")),
        i = t.appendChild(document.createElement("p")),
        a = t.appendChild(document.createElement("button")),
        l = a.appendChild(document.createElement("ion-icon")),
        s = n.appendChild(document.createElement("ion-icon"));
    t.className = "notif", n.className = "alert red", i.className = "notifinfo", i.innerText = e, a.className = "notifclose", a.onclick = function() {
        remove(this.parentNode)
    }, l.name = "close", s.name = "alert", notifcloser()
}
function notifcloser() {
    setTimeout(() => {
        document.getElementById("notifbar").classList.add("active")
    }, 1500)
}

function notifopener() {
    sfx('appear')
    document.getElementById("notifbar").classList.remove("active"), document.getElementById("notifmenu").classList.add("active")
}


/* misc */

function scrolltop() {
    setTimeout(() => {
        document.body.scrollTop = 0, document.documentElement.scrollTop = 0
    }, 200)
}

function homeactive() {
    for(let i = 0; i<buttons.length; i++){
        buttons[i].classList.remove('active')
    }
    unloadframe('','Home','logframe')
    unloadframe('','Home','ifr')
    document.getElementById('home').classList.add('active')
    document.getElementById("notifbar").classList.add('active')
    loaderdeactivate();
}

function pageactive(e,x,y) {
    for(let i = 0; i<buttons.length; i++){
        buttons[i].classList.remove('active')
    }
    document.getElementById(e).classList.add('active')
    loadframe(e,x,y)
}

function sfx(e) {
    if(window.innerWidth > window.innerHeight && localStorage.getItem("sfx")==='true'){
        let r = document.getElementById(e);
        r.currentTime = 0
        r.play();
    }
}


$(".banner-button").hover(function() {
window.innerHeight < window.innerWidth && ($(".banner-button").css({
border: "4px solid var(--themecol)",
"background-color": "var(--themecol)",
'color':'var(--accentcol)'
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
"background-color": "",
'color':''
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
})})


/* embedded system functions */

function unloadframe(e,x,y) {
    if(y=='logframe'){
        document.querySelector(".changelogframe").classList.remove("active"),
        $("#backcloser").fadeOut()
    }else{
        document.querySelector(".pagecontainer").classList.remove("active")}
        document.querySelector(".navbar").classList.remove("active")
        document.body.classList.remove("static")
        document.getElementById(y).src=e; 
        document.title="Natski | "+x;
        for(let i = 0; i<buttons.length; i++){
            buttons[i].classList.remove('active')
        }
        document.getElementById('home').classList.add('active')
}

function loadframe(e,x,y) {
    if(localStorage.getItem("performance")==='true'){
        window.location.href=e+'.html';
    }else{
        if(y=='logframe'){
            $("#backcloser").fadeIn(),
            document.querySelector(".changelogframe").classList.add("active")
        }else{
            document.querySelector(".pagecontainer").classList.add("active")
        }
        document.querySelector(".navbar").classList.add("active")
        document.body.classList.add("static")
        document.getElementById(y).src=e+'.html';
        document.title="Natski | "+x+'.html';
    }
}


/* cross site to index functions */

let percentComplete = 0, indeximage = $('img');
resetstatus(indeximage.length)
indeximage.each(function(e) {
    $(this).imagesLoaded().done(function() {
        currentstatus(indeximage.length)
    })
})

function resetstatus(e) {
    percentComplete = 0
    $('#loaded').fadeIn()
    if(e == 0) {
        document.getElementById('loaded').innerHTML = ' 0/0 loaded'
        $('#loaded').fadeOut()
        loaderdeactivate()
    }
}

function currentstatus(e) {
    percentComplete++
    document.getElementById('loaded').innerHTML = percentComplete + '/' + e + ' loaded'
    if(percentComplete == e) {
        $('#loaded').fadeOut()
        loaderdeactivate()
    }
}

function changetheme(e) {
    $(':root').css({'--themecol':e,'--themecoltrans':e+"50"});
}

function pagename(x){
    document.title="Natski | "+x;document.getElementById('pagename').innerHTML=x;
}
    
function loaderactivate() {
    $(".loaderback").fadeIn()
}

function loaderdeactivate() {
    $(".loaderback").fadeOut()
}