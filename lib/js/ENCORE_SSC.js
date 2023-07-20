/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */

let SSCIndex = 1,
SSCbarWidth = 0,
SSCTimer,
SSCbarTimer;


function reloadSSC(settings) {
    let len = document.getElementById('SSC').childElementCount - document.getElementsByClassName('banner-bg').length
    for(let i = 0; i < len; i++){
        document.getElementById('SSC').children[document.getElementById('SSC').childElementCount -1].remove()
    }
    createSSCElements(settings)
    playSSC()
}


function pauseSSC() {
    clearInterval(SSCTimer)
    if(SSC_settings.progressBar) {
        let progBar = document.getElementById("progressBar");
        clearInterval(SSCbarTimer)
        progBar.style.transform = 'scaleX(0)'
    }
}


function playSSC() {
    clearInterval(SSCTimer)
    if(SSC_settings.progressBar) {
        progressBarSet()
    }
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, 10000)
    },50)
}


function progressBarSet() {
    let progBar = document.getElementById("progressBar");
    clearInterval(SSCbarTimer)
    SSCbarWidth = 0;
    progBar.style.transform = 'scaleX(0)'
    setTimeout(() => {
        SSCbarTimer = setInterval(function() {
            SSCbarWidth++
            progBar.style.transform = 'scaleX(' + SSCbarWidth / 100 + ')'
        }, 100)
    },50)
}


function SSCTime() {
    clearInterval(SSCTimer)
    if(SSC_settings.progressBar) {
        progressBarSet()
    }
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, 10000)
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
    if(SSC_settings.thumbs) {
        let thumbs = document.getElementsByClassName('thumb');
        for (let i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.remove('active')
        }
        thumbs[SSCIndex-1].classList.add('active')
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
    if(settings.thumbs) {
        let thumbcont = document.createElement('div'),
        pages = document.getElementsByClassName('banner-bg').length;
        thumbcont.className = 'thumbs'
        for(let i = 0; i < pages; i++){
            let thumb = document.createElement('div')
            thumb.className = 'thumb'
            thumb.onclick = function(){currentSSC(i+1)}
            thumbcont.appendChild(thumb)
        }
        slideshowcontainer.appendChild(thumbcont)
    }
    if(settings.progressBar) {
        let progresscont = document.createElement('div'),
        progressbar = document.createElement('div');
        progresscont.className = 'progress'
        progressbar.className = 'progress-bar'
        progressbar.id = 'progressBar'
        progresscont.appendChild(progressbar)
        slideshowcontainer.appendChild(progresscont)
    }
    if(settings.sideButtons){
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
    let info = document.createElement('a');
    info.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>'
    info.className = 'infoButton'
    info.href = 'https://natski.netlify.app/encore%20v1.html#SSC'
    slideshowcontainer.appendChild(info)
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

if(checkLoadedSSC()) {
    SSCstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSC_settings.style+'SSC.css', SSC_settings, loadSSC)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSC_settings.style+'SSC.css', SSC_settings, loadSSC)
    },300)
})



