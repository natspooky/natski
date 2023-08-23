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
    displaySSC(1)
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
            SSCbarWidth += 0.01
            progBar.style.transform = 'scaleX(' + SSCbarWidth + ')'
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
    let pages = document.getElementsByClassName('banner-bg'),
    pageLen = pages.length;
    SSCTime()
    if(e < 1) {
        SSCIndex = pageLen
    }
    else if(e > pageLen) {
        SSCIndex = 1
    }
    for (let i = 0; i < pageLen; i++) {
        pages[i].style.display = "none";  
    }
    if(SSC_settings.thumbs) {
        let thumbs = document.getElementsByClassName('thumb'),
        thumbsLen = thumbs.length;
        for (let i = 0; i < thumbsLen; i++) {
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
    let SSC = document.getElementById('SSC'),
    SSClength = document.getElementsByClassName('banner-bg').length,
    SSCbanner = document.getElementsByClassName('banner-bg'),
    SSCicon = document.createElement('svg');
    SSCicon.setAttribute('xmlns','http://www.w3.org/2000/svg')
    SSCicon.setAttribute('viewBox','0 0 850.39 850.39')
    SSCicon.innerHTML = '<path d="M802.6,56.19H47.8C21.4,56.19,0,77.59,0,103.99V746.41c0,26.39,21.4,47.79,47.8,47.79H802.6c26.39,0,47.79-21.4,47.79-47.79V103.99c0-26.4-21.4-47.8-47.79-47.8Zm-36.6,595.9c0,9.22-7.48,16.7-16.7,16.7H101.1c-9.23,0-16.71-7.48-16.71-16.7V192c0-5.74,4.66-10.4,10.4-10.4H749.3c9.22,0,16.7,7.48,16.7,16.71v453.78Z"></path><rect x="193.2" y="603.88" width="463.99" height="38.8" rx="18.3" ry="18.3"></rect>'
    SSCicon.className = 'SSCsvg'
    //SSC.appendChild(SSCicon)
    SSC.insertBefore(SSCicon, SSCbanner[0]);
    for(let i = 0; i < SSClength; i++){
        SSCbanner[i].children[0].loading = 'eager'
        SSCbanner[i].children[0].draggable = false
    }
    createSSCElements(settings)
    currentSSC(1)
    SSC.style.display = 'flex'
    SSC.style.opacity = '1'
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



