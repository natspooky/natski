/*!
 * ENCORE TEST SYSTEM
 * Author: NATSKI
 * MIT License
 */

/*
let SSCIndex = 1,
barWidth = 0,
SSCTimer,
barTimer;


function reloadSSC(settings) {
    let len = document.getElementById('SSC').childElementCount - document.getElementsByClassName('banner-bg').length - 1
    for(let i = 0; i < len; i++){
        document.getElementById('SSC').children[document.getElementById('SSC').childElementCount -1].remove()
    }
    createSSCElements(settings)
    currentSSC(1)
}


function pauseSSC() {
    clearInterval(SSCTimer)
    if(SSC_settings.progressBar == true) {
        let progBar = document.getElementById("progressBar");
        clearInterval(barTimer)
        progBar.style.transform = 'scaleX(0)'
    }
}


function playSSC() {
    clearInterval(SSCTimer)
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, SSC_settings.timer)
    },50)
}


function progressBarSet(e,thumbs) {
    let progBar = thumbs[e].children[0]
    for(let i = 0; i < thumbs.length; i++){
        thumbs[i].children[0].style.transform = 'scaleX(0)'
    }
    clearInterval(barTimer)
    barWidth = 0;
    progBar.style.transform = 'scaleX(0)'
    setTimeout(() => {
        barTimer = setInterval(function() {
            barWidth++
            progBar.style.transform = 'scaleX(' + barWidth / 100 + ')'
        }, (SSC_settings.timer / 100))
    },50)
}


function SSCTime() {
    clearInterval(SSCTimer)
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, SSC_settings.timer)
    },50)
}


function displaySSC(e) {
    let pages = document.getElementsByClassName('banner-bg');
    SSCTime()
    if(e < 1) {
        SSCIndex = pages.length
    }
    else if(e > pages.length) {
        SSCIndex = 1
    }
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";  
    }
    if(SSC_settings.thumbs == true) {
        let thumbs = document.getElementsByClassName('thumb');
        for (let i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.remove('active')
        }
        thumbs[SSCIndex-1].classList.add('active')
        progressBarSet(SSCIndex-1,thumbs)
    }
    pages[SSCIndex-1].style.display = 'flex'
}


function changeSSC(e) {
    displaySSC(SSCIndex += e)
}


function currentSSC(e) {
    displaySSC(SSCIndex = e);
}


function loadSSC(settings) {
    let SSC = document.getElementById('SSC');
    SSC.style.display = 'flex'
    SSC.style.opacity = '1'
    createSSCElements(settings)
    currentSSC(1)
}


function createSSCElements(settings) {
    let slideshowcontainer = document.getElementById('SSC');
    if(settings.thumbs == true) {
        let thumbcont = document.createElement('div'),
        pages = document.getElementsByClassName('banner-bg').length;
        thumbcont.className = 'thumbs'
        for(let i = 0; i < pages; i++){
            let thumb = document.createElement('div'),
            thumbprog = document.createElement('div');
            thumb.className = 'thumb'
            thumbprog.className = 'thumbProgress'
            thumb.appendChild(thumbprog)
            thumb.onclick = function(){currentSSC(i+1)}
            thumbcont.appendChild(thumb)
        }
        slideshowcontainer.appendChild(thumbcont)
    }
    if(settings.progressBar == true) {
        let progresscont = document.createElement('div'),
        progressbar = document.createElement('div');
        progresscont.className = 'progress'
        progressbar.className = 'progress-bar'
        progressbar.id = 'progressBar'
        progresscont.appendChild(progressbar)
        slideshowcontainer.appendChild(progresscont)
    }
    if(settings.sideButtons == true){
        let page = [-1,1],
        icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>'];
        for(let i = 0; i < 2; i++){
            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[i]
            pagebuttons.className = 'pagebutton'
            pagebuttons.onclick = function(){changeSSC(page[i])}
            slideshowcontainer.appendChild(pagebuttons)
        }
    }
    slideshowcontainer.style.transition = '0.5s'
    slideshowcontainer.style.display = 'flex'
    slideshowcontainer.style.opacity = '1'
}


function SSCstyleCall(url, settings, load) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementsByTagName('head')[0].appendChild(style);
    let linkloaded = document.createElement('img');
        linkloaded.onerror = function(){
            if(load) load(settings);
        }
        linkloaded.src = url;
}





function checkLoadedSSC() {
    return document.readyState === "complete";
}

if(checkLoadedSSC() == true) {
    SSCstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSC_settings.style+'.css', SSC_settings, loadSSC)
}
//make have thumb progress bars
window.addEventListener("load", function() {
    setTimeout(() => {
        SSCstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSC_settings.style+'.css', SSC_settings, loadSSC)
    },300)
})



*/



