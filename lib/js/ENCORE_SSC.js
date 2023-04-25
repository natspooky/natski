/*!
 * ENCORE SLIDE SHOW CONTAINER JS
 * Author: NATSKI
 * MIT License
 */

var time, slideshowContainer, interval, slideIndex = 1, elem = document.getElementById("progress-bar"), width = 0;
console.log('loading ENCORE_SSC')
window.addEventListener("load", function() {
    console.log('ENCORE_SSC loaded')
    document.body.style.position = 'unset'
    document.body.style.overflow = 'unset'
    showSlides(slideIndex),time = setInterval(function() {
        plusSlides(1)
    }, 1e4)
    slideshowContainer = document.getElementsByClassName("banner-button");
    for (let e = 0; e < slideshowContainer.length; e++) slideshowContainer[e].addEventListener("mouseenter", pause), 
    slideshowContainer[e].addEventListener("mouseleave", play)
})

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
    n[slideIndex - 1].style.display = "flex"; 
    i[slideIndex - 1].classList.add("active"), resetProgressBar(), progressBar()
}

function progressBar() {
    document.getElementById("progress-bar").style.transition = "0.1s linear", interval = setInterval(function e() {
        width >= 100 ? clearInterval(interval) : (width++, document.getElementById("progress-bar").style.width = width + "%"), 95 == width 
    }, 100)
}

function resetProgressBar() {
    document.getElementById("progress-bar").style.transition = "0s", width = 0, clearInterval(interval), document.getElementById("progress-bar").style.width = width + "%"
}
function pause(){
    resetProgressBar()
    clearInterval(time)
}
function play(){
    progressBar()
    clearInterval(time),time = setInterval(function() {
        plusSlides(slideIndex)
    }, 1e4)
}