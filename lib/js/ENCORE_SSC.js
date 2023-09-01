/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */

let SSCIndex=1,SSCbarWidth=0,SSCTimer,SSCbarTimer;function reloadSSC(e){let t=document.getElementById("SSC").childElementCount-document.getElementsByClassName("banner-bg").length;for(let l=0;l<t;l++)document.getElementById("SSC").children[document.getElementById("SSC").childElementCount-1].remove();createSSCElements(e),displaySSC(1)}function pauseSSC(){if(clearInterval(SSCTimer),SSC_settings.progressBar){let e=document.getElementById("progressBar");clearInterval(SSCbarTimer),e.style.transform="scaleX(0)"}}function playSSC(){let e=SSC_settings;clearInterval(SSCTimer),e.progressBar&&progressBarSet(),setTimeout(()=>{SSCTimer=setInterval(function(){changeSSC(1)},e.timer)})}function progressBarSet(){let e=document.getElementById("progressBar");clearInterval(SSCbarTimer),SSCbarWidth=0,e.style.transform="scaleX(0)",setTimeout(()=>{SSCbarTimer=setInterval(function(){SSCbarWidth+=.01,e.style.transform=`scaleX(${SSCbarWidth})`},SSC_settings.timer/100)})}function SSCTime(){let e=SSC_settings;clearInterval(SSCTimer),e.progressBar&&progressBarSet(),setTimeout(()=>{SSCTimer=setInterval(function(){changeSSC(1)},e.timer)})}function displaySSC(e){let t=document.getElementsByClassName("banner-bg"),l=t.length;SSCTime(),e<1?SSCIndex=l:e>l&&(SSCIndex=1);for(let n=0;n<l;n++)t[n].style.display="none";if(SSC_settings.thumbs){let a=document.getElementsByClassName("thumb"),s=a.length;for(let S=0;S<s;S++)a[S].classList.remove("active");a[SSCIndex-1].classList.add("active")}t[SSCIndex-1].style.display="flex"}function changeSSC(e){displaySSC(SSCIndex+=e)}function currentSSC(e){displaySSC(SSCIndex=e)}function loadSSC(e){let t=document.getElementById("SSC"),l=document.getElementsByClassName("banner-bg").length,n=document.getElementsByClassName("banner-bg");for(let a=0;a<l;a++)n[a].children[0].loading="eager",n[a].children[0].draggable=!1;e.timer<5e3&&(e.timer=5e3),createSSCElements(e),currentSSC(1),t.style.display="flex",t.style.opacity="1"}function createSSCElements(e){let t=document.getElementById("SSC");if(e.thumbs){let l=document.createElement("div"),n=document.getElementsByClassName("banner-bg").length;l.className="thumbs";for(let a=0;a<n;a++){let s=document.createElement("div");s.className="thumb",s.onclick=function(){currentSSC(a+1)},l.appendChild(s)}t.appendChild(l)}if(e.progressBar){let S=document.createElement("div"),r=document.createElement("div");S.className="progress",r.className="progress-bar",r.id="progressBar",S.appendChild(r),t.appendChild(S)}if(e.sideButtons){let i=[-1,1],_=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>'];for(let $=0;$<2;$++){let C=document.createElement("button");C.innerHTML=_[$],C.className="pagebutton",C.ariaLabel="SSC Button",C.onclick=function(){changeSSC(i[$])},t.appendChild(C)}}let c=document.createElement("a");c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>',c.className="infoButton",c.href="https://natski.netlify.app/ENCORE%20V1.html#SSC",c.target="_blank",c.ariaLabel="information",t.appendChild(c),t.style.transition="0.5s",t.style.display="flex",t.style.opacity="1"}function SSCstyleCall(e,t,l){let n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=e,document.getElementsByTagName("head")[0].appendChild(n);let a=document.createElement("img");a.onerror=function(){l&&l(t)},a.src=e}function checkLoadedSSC(){return"complete"===document.readyState}checkLoadedSSC()&&SSCstyleCall("https://natski.netlify.app/lib/ENCORE_DB/SSC/"+SSC_settings.style+"SSC.css",SSC_settings,loadSSC),window.addEventListener("load",function(){setTimeout(()=>{SSCstyleCall("https://natski.netlify.app/lib/ENCORE_DB/SSC/"+SSC_settings.style+"SSC.css",SSC_settings,loadSSC)},300)});


/*
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
    let settings = SSC_settings;
    clearInterval(SSCTimer)
    if(settings.progressBar) {
        progressBarSet()
    }
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, settings.timer)
    })
}


function progressBarSet() {
    let progBar = document.getElementById("progressBar");
    clearInterval(SSCbarTimer)
    SSCbarWidth = 0;
    progBar.style.transform = 'scaleX(0)'
    setTimeout(() => {
        SSCbarTimer = setInterval(function() {
            SSCbarWidth += 0.01
            progBar.style.transform = `scaleX(${SSCbarWidth})`
        }, (SSC_settings.timer / 100))
    })
}


function SSCTime() {
    let settings = SSC_settings;
    clearInterval(SSCTimer)
    if(settings.progressBar) {
        progressBarSet()
    }
    setTimeout(() => {
        SSCTimer = setInterval(function() {
            changeSSC(1)
        }, settings.timer)
    })
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
    SSCbanner = document.getElementsByClassName('banner-bg');
    for(let i = 0; i < SSClength; i++){
        SSCbanner[i].children[0].loading = 'eager'
        SSCbanner[i].children[0].draggable = false
    }
    if(settings.timer < 5000) {
        settings.timer = 5000
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
            pagebuttons.ariaLabel = 'SSC Button'
            pagebuttons.onclick = function(){changeSSC(page[i])}
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

*/