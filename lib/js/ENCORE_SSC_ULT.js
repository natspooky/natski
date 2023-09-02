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
    let banners = document.getElementsByClassName('banner-bg-u').length,
    banner = document.getElementsByClassName('banner-bg-u');
    if(SSCUswapTimer){
        return
    }
    clearInterval(SSCUbarTimer)
    clearInterval(SSCUTimer)
    let len = document.getElementById('SSCU').childElementCount - banners - 1 // 1 is for the SSCU icon
    console.log(document.getElementById('SSCU').childElementCount - banners - 1, banners)
    for(let i = 0; i < len; i++){
        console.log(document.getElementById('SSCU').children[document.getElementById('SSCU').childElementCount -1])
        document.getElementById('SSCU').children[document.getElementById('SSCU').childElementCount -1].remove()
    }
    for(let i = 0; i < banners; i++){
        banner[i].style.display = 'none'
    }
    loadSSCU(settings)
}


function pauseSSCU() {
    clearInterval(SSCUTimer)
    if(SSCU_settings.thumbs) {
        let progBar = document.getElementsByClassName("progress-u");
        clearInterval(SSCUbarTimer)
        progBar[SSCUIndex-1].style.transform = 'scaleX(0)'
    }
    
}


function playSSCU() {
    let settings = SSCU_settings;
    clearInterval(SSCUTimer)
    if(settings.thumbs) {
        clearInterval(SSCUbarTimer)
        progressBarSSCU()
    }
    SSCUTimer = setInterval(function() {
        changeSSCU(1)
    }, settings.timer)
}


function SSCUTime() {
    let settings = SSCU_settings;
    clearInterval(SSCUTimer)
    SSCUTimer = setInterval(function() {
        changeSSCU(1)
    }, settings.timer)
}


function displaySSCU(e) {
    let pages = document.getElementsByClassName('banner-bg-u'),
    pageLen = pages.length,
    loopStorage = 1,
    invertStorage = false,
    settings = SSCU_settings;
    SSCUTime()
    if(e < 1) {
        SSCUIndex = pageLen
        invertStorage = true
    }
    else if(e > pageLen) {
        SSCUIndex = 1
        invertStorage = true
    }
    for (let i = 0; i < pageLen; i++) {
        if(pages[i].style.display == 'flex'){
            loopStorage = i
        }
    }
    if(settings.thumbs) {
        let thumbs = document.getElementsByClassName('thumb-u'),
        thumbLen = thumbs.length,
        progBar = document.getElementsByClassName("progress-u");
        clearInterval(SSCUbarTimer)
        for (let i = 0; i < thumbLen; i++) {
            thumbs[i].classList.remove('active')
            progBar[i].style.transform = 'scaleX(0)'
        }
        progressBarSSCU()
        thumbs[SSCUIndex-1].classList.add('active')
    }
    if(invertStorage){
        if(SSCUIndex > SSCUprevIndex){
            pages[SSCUIndex-1].style.transform = 'translateX(-100%)'
            pages[loopStorage].style.transform = 'translateX(0%)'
        }else{
            pages[SSCUIndex-1].style.transform = 'translateX(100%)'
            pages[loopStorage].style.transform = 'translateX(0%)'
        }
    }else{
        if(SSCUIndex < SSCUprevIndex){
            pages[SSCUIndex-1].style.transform = 'translateX(-100%)'
            pages[loopStorage].style.transform = 'translateX(0%)'
        }else{
            pages[SSCUIndex-1].style.transform = 'translateX(100%)'
            pages[loopStorage].style.transform = 'translateX(0%)'
        }
    }
    pages[SSCUIndex-1].style.display = 'flex'
    setTimeout(() => {
        pages[SSCUIndex-1].style.transform = 'translateX(0%)'
        if(invertStorage){
            if(SSCUIndex > SSCUprevIndex){
                pages[loopStorage].style.transform = 'translateX(100%)'
            }else{
                pages[loopStorage].style.transform = 'translateX(-100%)'
            }
        }else{
            if(SSCUIndex < SSCUprevIndex){
                pages[loopStorage].style.transform = 'translateX(100%)'
            }else{
                pages[loopStorage].style.transform = 'translateX(-100%)'
            }
        }
        SSCUswapTimer = setTimeout(() => {
            pages[loopStorage].style.display = 'none'
            SSCUswapTimer = undefined
        }, settings.slideSpeed)
    },20);
}

function changeSSCU(e) {
    if(SSCUswapTimer){
        return
    }
    SSCUprevIndex = SSCUIndex
    displaySSCU(SSCUIndex += e)
}



function progressBarSSCU(){
    let progBar = document.getElementsByClassName("progress-u"),
    settings = SSCU_settings;
    SSCUbarWidth = 0;
    SSCUbarTimer = setInterval(function() {
        SSCUbarWidth += 0.01
        progBar[SSCUIndex-1].style.transform = `scaleX(${SSCUbarWidth})`
    }, (settings.timer / 100))
}

function currentSSCU(e) {
    if(SSCUswapTimer){
        return
    }
    SSCUprevIndex = SSCUIndex
    displaySSCU(SSCUIndex = e);
}


function loadSSCU(settings) {
    let SSCU = document.getElementById('SSCU'),
    SSCUlength = document.getElementsByClassName('banner-bg-u').length,
    SSCUbanner = document.getElementsByClassName('banner-bg-u'),
    SSCUicon = document.createElement('div');
    SSCUicon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M802.6,56.19H47.8C21.4,56.19,0,77.59,0,103.99V746.41c0,26.39,21.4,47.79,47.8,47.79H802.6c26.39,0,47.79-21.4,47.79-47.79V103.99c0-26.4-21.4-47.8-47.79-47.8Zm-36.6,595.9c0,9.22-7.48,16.7-16.7,16.7H101.1c-9.23,0-16.71-7.48-16.71-16.7V192c0-5.74,4.66-10.4,10.4-10.4H749.3c9.22,0,16.7,7.48,16.7,16.71v453.78Z"></path><rect x="193.2" y="603.88" width="463.99" height="38.8" rx="18.3" ry="18.3"></rect></svg>'
    SSCUicon.className = 'SSCUsvg'
    SSCU.insertBefore(SSCUicon, SSCUbanner[0]);
    for(let i = 0; i < SSCUlength; i++){
        SSCUbanner[i].children[0].loading = 'eager'
        SSCUbanner[i].children[0].draggable = false
        SSCUbanner[i].style.transition = `${settings.slideSpeed}ms ease-in-out`
    }
    if(settings.timer < 5000) {
        settings.timer = 5000
    }
    if(settings.slideSpeed < 500 || settings.slideSpeed > 1000) {
        settings.slideSpeed = 500
    }
    if(SSCUlength < 2) {
        SSCUbanner[0].style.display = 'flex'
    }else{
        createSSCUElements(settings)
        currentSSCU(1)
    }
    SSCU.style.display = 'flex'
    SSCU.style.opacity = '1'
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
            pagebuttons.ariaLabel = 'SSCU Button'
            pagebuttons.onclick = function(){changeSSCU(page[i])}
            slideshowcontainer.appendChild(pagebuttons)
        }
    }
    let info = document.createElement('a');
    info.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>'
    info.className = 'infoButton'
    info.href = 'https://natski.netlify.app/ENCORE%20V1.html#SSC'
    info.target = '_blank'
    info.ariaLabel = 'information'
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
