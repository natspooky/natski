/*!
 * ENCORE SLIDE SHOW CONTAINER JS
 * Author: NATSKI
 * MIT License
 */

var time, slideshowContainer, interval, 
slideIndex = 1, 
elem = document.getElementById("progress-bar"), 
width = 0;

console.log('loading ENCORE_SSC')
window.addEventListener("load", function() {

    loadSSC(SSC_settings)
    console.log('ENCORE_SSC loaded')
    slideshowContainer = document.getElementsByClassName("banner-button");
    for (let e = 0; e < slideshowContainer.length; e++) slideshowContainer[e].addEventListener("mouseenter", pause), 
    slideshowContainer[e].addEventListener("mouseleave", play)
})

function plusSlides(e) {
    clearInterval(time), e < 0 ? showSlides(slideIndex -= 1) : showSlides(slideIndex += 1), 
    time = -1 === e ? setInterval(function() {
        plusSlides(e + 2)
    }, SSC_settings.timer) : setInterval(function() {
        plusSlides(e + 1)
    }, SSC_settings.timer)
}

function currentSlide(e) {
    clearInterval(time), time = setInterval(function() {
        plusSlides(e + 1)
    }, SSC_settings.timer), showSlides(slideIndex = e)
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
    document.getElementById("progress-bar").style.transition = "0.1s linear", 
    interval = setInterval(function() {
        if(width >= 100){
            clearInterval(interval)
        }else{ 
            (width++, document.getElementById("progress-bar").style.width = width + "%")
        }
    }, (SSC_settings.timer / 100))
}

function resetProgressBar() {
    document.getElementById("progress-bar").style.transition = "0s", 
    width = 0, 
    clearInterval(interval), 
    document.getElementById("progress-bar").style.width = width + "%"
}

function pause(){
    resetProgressBar()
    clearInterval(time)
}

function play(){
    progressBar()
    clearInterval(time),time = setInterval(function() {
        plusSlides(slideIndex)
    }, SSC_settings.timer)
}


function loadSSC(settings){
    len = document.getElementById('SSC').childElementCount - document.getElementsByClassName('banner-bg').length
    if(document.getElementById('SSC').childElementCount > document.getElementsByClassName('banner-bg').length){
        for(let i = 0; i < len; i++){
            document.getElementById('SSC').children[document.getElementById('SSC').childElementCount -1].remove()
        }
    }
    slideShowElements(settings)
    clearInterval(time)
    showSlides(slideIndex),time = setInterval(function() {
        plusSlides(1)
    }, settings.timer)
}

function slideShowElements(settings) {
    slideshowcontainer = document.getElementById('SSC')
    thumbcont = document.createElement('div'),
    pages = document.getElementsByClassName('banner-bg');
    for(let i = 0; i < pages.length; i++){
        thumb = document.createElement('button')
        thumb.className = 'thumb'
        thumb.onclick = function(){currentSlide(i+1)}
        if(settings.thumbs != true){
            thumbcont.className = 'thumbs hidden'
        }else{
            thumbcont.className = 'thumbs'
        }
        thumbcont.appendChild(thumb)
    }
    slideshowcontainer.appendChild(thumbcont)
    progresscont = document.createElement('div'),
    progressbar = document.createElement('div');
    progresscont.className = 'progress'
    progressbar.className = 'progress-bar'
    progressbar.id = 'progress-bar'
    if(settings.progressBar != true){
        progresscont.className = 'progress hidden'
    }else{
        progresscont.className = 'progress'
    }
    progresscont.appendChild(progressbar)
    slideshowcontainer.appendChild(progresscont)
    
    if(settings.sideButtons == true){
        page = ['-1','1']
        icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>']
        for(let i = 0; i < 2; i++){
            pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[i]
            pagebuttons.className = 'pagebutton'
            pagebuttons.onclick = function(){plusSlides(page[i])}
            slideshowcontainer.appendChild(pagebuttons)
        }
    }
}