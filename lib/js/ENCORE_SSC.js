/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */


let SSCIndex = 1,
SSCbarWidth = 0,
SSCTimer,
SSCbarTimer,
SSCtouchStart,
SSCscrollLock;


function reloadSSC(settings) {
    let len = document.getElementsByClassName('SSC')[0].childElementCount - document.getElementsByClassName('banner-bg').length,
    device = iOSspecificSSC() || deviceCheckSSC();
    for(let i = 0; i < len; i++){
        document.getElementsByClassName('SSC')[0].children[document.getElementsByClassName('SSC')[0].childElementCount -1].remove()
    }
    if(checkBannerSSC()){
        return
    }
    createSSCElements(settings, device)
    displaySSC(1)
}

function checkBannerSSC(){
    let banner = document.getElementsByClassName('banner-bg');
    if(banner.length <= 1) {
        banner[0].style.display = 'flex'
        return true
    }
}

function deviceCheckSSC() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function iOSspecificSSC() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function pauseSSC() {
    if(checkBannerSSC()) {
        return
    }
    clearInterval(SSCTimer)
    if(SSC_settings.progressBar) {
        let progBar = document.getElementById("SSCprogressBar");
        clearInterval(SSCbarTimer)
        progBar.style.transform = 'scaleX(0)'
    }
}


function playSSC() {
    if(checkBannerSSC()) {
        return
    }
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


function nextSlideSSC() {
    if(checkBannerSSC()) {
        return
    }
    changeSSC(1)
}


function previousSlideSSC() {
    if(checkBannerSSC()) {
        return
    }
    changeSSC(-1)
}


function progressBarSet() {
    let progBar = document.getElementById("SSCprogressBar");
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
    let SSC = document.getElementsByClassName('SSC')[0],
    SSClength = document.getElementsByClassName('banner-bg').length,
    SSCbanner = document.getElementsByClassName('banner-bg'),
    device = iOSspecificSSC() || deviceCheckSSC();
    if(checkBannerSSC()) {
        SSC.style.display = 'flex'
        SSC.style.opacity = '1'
        return
    }
    for(let i = 0; i < SSClength; i++){
        let count = SSCbanner[i].childElementCount
        for(let x = 0; x < count; x++){
            if(SSCbanner[i].children[x].tagName == 'IMG'){
                SSCbanner[i].children[x].loading = 'eager'
                SSCbanner[i].children[x].draggable = false
            }
        }
    }
    if(settings.timer < 5000) {
        settings.timer = 5000
    }
    createSSCElements(settings, device)
    currentSSC(1)

    if(device){
        SSC.addEventListener("touchstart", function(e){
            SSCtouchStart = e.touches[0].clientX;
        })
        SSC.addEventListener("touchmove", function(e){
            let SSCtouchMove = e.changedTouches[0].clientX;
            if(Math.abs(SSCtouchMove - SSCtouchStart) > 15 && e.cancelable){
                e.preventDefault()
                SSCscrollLock = true
            }else{
                SSCscrollLock = false
            }
        })
        SSC.addEventListener("touchend", function(e){
            let SSCtouchEnd = e.changedTouches[0].clientX,
            SSCwidth = SSC.offsetWidth / 4.5;
            if(SSCscrollLock){
                if(SSCtouchEnd - SSCtouchStart > SSCwidth){
                    changeSSC(-1)
                }else if(SSCtouchEnd - SSCtouchStart < -(SSCwidth)){
                    changeSSC(1)
                }
            }
        })
    }
    SSC.style.display = 'flex'
    SSC.style.opacity = '1'
}


function createSSCElements(settings, device) {
    let slideshowcontainer = document.getElementsByClassName('SSC')[0];
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
        progressbar.id = 'SSCprogressBar'
        progresscont.appendChild(progressbar)
        slideshowcontainer.appendChild(progresscont)
    }
    if(settings.sideButtons && !device){
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
    slideshowcontainer.style.transition = 'opacity 0.5s'
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
    SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
    },300)
})



/*
//NEW STUFF HERE


let SSC = [];

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
    SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
    },300)
})






class SSC {
    constructor(element, settings) {

    }
}

function loadSSC(){



}






*/