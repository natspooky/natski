/*!
 * ENCORE SLIDE SHOW CONTAINER ULT
 * Author: NATSKI
 * MIT License
 */

let SSCUIndex = 1,
SSCUprevIndex,
SSCUbarWidth = 0,
SSCUTimer,
SSCUswapTimer,
SSCUbarTimer;


function reloadSSCU(settings) {
    let len = document.getElementById('SSCU').childElementCount - document.getElementsByClassName('banner-bg-u').length
    for(let i = 0; i < len; i++){
        document.getElementById('SSCU').children[document.getElementById('SSCU').childElementCount -1].remove()
    }
    createSSCUElements(settings)
    currentSSCU(1)
}


function pauseSSCU() {
    clearInterval(SSCUTimer)
    let progBar = document.getElementsByClassName("progress-u");
    clearInterval(SSCUbarTimer)
    progBar[SSCUIndex-1].style.transform = 'scaleX(0)'
    
}


function playSSCU() {
    clearInterval(SSCUTimer)
    if(SSCU_settings.thumbs) {
        progressBarSSCU()
    }
    SSCUTimer = setInterval(function() {
        changeSSCU(1)
    }, 10000)
}


function SSCUTime() {
    clearInterval(SSCUTimer)
    SSCUTimer = setInterval(function() {
        changeSSCU(1)
    }, 10000)
}


function displaySSCU(e) {
    let pages = document.getElementsByClassName('banner-bg-u'),
    iStorage = 1,
    invertStorage = false;
    SSCUTime()
    if(e < 1) {
        SSCUIndex = pages.length
        invertStorage = true
    }
    else if(e > pages.length) {
        SSCUIndex = 1
        invertStorage = true
    }
    for (let i = 0; i < pages.length; i++) {
        if(pages[i].style.display == 'flex'){
            iStorage = i
        }
    }
    if(SSCU_settings.thumbs) {
        let thumbs = document.getElementsByClassName('thumb-u'),
        progBar = document.getElementsByClassName("progress-u");
        clearInterval(SSCUbarTimer)
        for (let i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.remove('active')
            progBar[i].style.transform = 'scaleX(0)'
        }
        progressBarSSCU()
        thumbs[SSCUIndex-1].classList.add('active')
    }
    if(invertStorage){
        if(SSCUIndex > SSCUprevIndex){
            pages[SSCUIndex-1].style.transform = 'translateX(-100%)'
            pages[iStorage].style.transform = 'translateX(0%)'
        }else{
            pages[SSCUIndex-1].style.transform = 'translateX(100%)'
            pages[iStorage].style.transform = 'translateX(0%)'
        }
    }else{
        if(SSCUIndex < SSCUprevIndex){
            pages[SSCUIndex-1].style.transform = 'translateX(-100%)'
            pages[iStorage].style.transform = 'translateX(0%)'
        }else{
            pages[SSCUIndex-1].style.transform = 'translateX(100%)'
            pages[iStorage].style.transform = 'translateX(0%)'
        }
    }
    pages[SSCUIndex-1].style.display = 'flex'
    setTimeout(() => {
        pages[SSCUIndex-1].style.transform = 'translateX(0%)'
        if(invertStorage){
            if(SSCUIndex > SSCUprevIndex){
                pages[iStorage].style.transform = 'translateX(100%)'
            }else{
                pages[iStorage].style.transform = 'translateX(-100%)'
            }
        }else{
            if(SSCUIndex < SSCUprevIndex){
                pages[iStorage].style.transform = 'translateX(100%)'
            }else{
                pages[iStorage].style.transform = 'translateX(-100%)'
            }
        }
        SSCUswapTimer = setTimeout(() => {
            pages[iStorage].style.display = 'none'
            SSCUswapTimer = undefined
        }, 600);
    }, 10);
}

function changeSSCU(e) {
    if(SSCUswapTimer){
        return
    }
    SSCUprevIndex = SSCUIndex
    displaySSCU(SSCUIndex += e)
}



function progressBarSSCU(){
    let progBar = document.getElementsByClassName("progress-u");
    SSCUbarWidth = 0;
    SSCUbarTimer = setInterval(function() {
        SSCUbarWidth++
        progBar[SSCUIndex-1].style.transform = 'scaleX(' + SSCUbarWidth / 100 + ')'
    }, 100)
}

function currentSSCU(e) {
    if(SSCUswapTimer){
        return
    }
    SSCUprevIndex = SSCUIndex
    displaySSCU(SSCUIndex = e);
}


function loadSSCU(settings) {
    let SSCU = document.getElementById('SSCU');
    SSCU.style.display = 'flex'
    SSCU.style.opacity = '1'
    if(document.getElementsByClassName('banner-bg-u').length < 2) {
        document.getElementsByClassName('banner-bg-u')[0].style.display = 'flex'
    }else{
        createSSCUElements(settings)
        currentSSCU(1)
    }
    
}


function createSSCUElements(settings) {
    let slideshowcontainer = document.getElementById('SSCU');
    if(settings.thumbs) {
        let thumbcont = document.createElement('div'),
        pages = document.getElementsByClassName('banner-bg-u').length;
        thumbcont.className = 'thumbs'
        for(let i = 0; i < pages; i++){
            let thumb = document.createElement('div'),
            progressBar = document.createElement('div');
            thumb.className = 'thumb-u'
            thumb.onclick = function(){currentSSCU(i+1)}
            progressBar.className = 'progress-u'
            thumb.appendChild(progressBar)
            thumbcont.appendChild(thumb)
        }
        slideshowcontainer.appendChild(thumbcont)
    }
    if(settings.sideButtons){
        let page = [-1,1],
        icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>'];
        for(let i = 0; i < 2; i++){
            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[i]
            pagebuttons.className = 'pagebutton-u'
            pagebuttons.onclick = function(){changeSSCU(page[i])}
            slideshowcontainer.appendChild(pagebuttons)
        }
    }
    let info = document.createElement('a');
    info.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>'
    info.className = 'infoButton'
    info.href = 'https://natski.netlify.app/encore%20alpha.html#SSC'
    slideshowcontainer.appendChild(info)
    slideshowcontainer.style.transition = '0.5s'
    slideshowcontainer.style.display = 'flex'
    slideshowcontainer.style.opacity = '1'
}


function SSCUstyleCall(url, settings, load) {
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


function checkLoadedSSCU() {
    return document.readyState === "complete";
}

if(checkLoadedSSCU()) {
    SSCUstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSCU_settings.style+'SSCU.css', SSCU_settings, loadSSCU)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCUstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSCU_settings.style+'SSCU.css', SSCU_settings, loadSSCU)
    },300)
})