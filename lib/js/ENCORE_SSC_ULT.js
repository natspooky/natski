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
SSCUbarTimer,
SSCUtouchStart,
SSCUscrollLock;


function reloadSSCU(settings) {
    let banners = document.getElementsByClassName('banner-bg-u').length,
    banner = document.getElementsByClassName('banner-bg-u');
    if(SSCUswapTimer){
        return
    }
    clearInterval(SSCUbarTimer)
    clearInterval(SSCUTimer)
    if(checkBannerSSCU()) {
        return
    }
    let len = document.getElementById('SSCU').childElementCount - banners - 1 // 1 is for the SSCU icon
    for(let i = 0; i < len; i++){
        document.getElementById('SSCU').children[document.getElementById('SSCU').childElementCount -1].remove()
    }
    document.getElementsByClassName('SSCUsvg')[0].remove()
    for(let i = 0; i < banners; i++){
        banner[i].style.display = 'none'
    }
    loadSSCU(settings)
}



function deviceCheckSSCU() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function iOSspecificSSCU() {
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


function checkBannerSSCU(){
    let banner = document.getElementsByClassName('banner-bg-u');
    if(banner.length <= 1) {
        banner[0].style.display = 'flex'
        return true
    }
}


function pauseSSCU() {
    if(checkBannerSSCU()) {
        return
    }
    clearInterval(SSCUTimer)
    if(SSCU_settings.thumbs) {
        let progBar = document.getElementsByClassName("progress-u");
        clearInterval(SSCUbarTimer)
        progBar[SSCUIndex-1].style.transform = 'scaleX(0)'
    }
    
}


function playSSCU() {
    if(checkBannerSSCU()) {
        return
    }
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



function nextSlideSSCU() {
    changeSSCU(1)
}


function previousSlideSSCU() {
    changeSSCU(-1)
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

    settings.slideSpeed = Math.min(Math.max(settings.slideSpeed,300),1000)

    settings.timer = Math.max(5000, settings.timer)

    for(let i = 0; i < SSCUlength; i++){
        SSCUbanner[i].children[0].loading = 'eager'
        SSCUbanner[i].children[0].draggable = false
        SSCUbanner[i].style.transition = `${settings.slideSpeed}ms ease`
    }
    
    if(SSCUlength < 2) {
        SSCUbanner[0].style.display = 'flex'
    }else{
        createSSCUElements(settings)
        currentSSCU(1)
    }
    if(iOSspecificSSCU() || deviceCheckSSCU()){
        SSCU.addEventListener("touchstart", function(e){
            SSCUtouchStart = e.touches[0].clientX;
        })
        SSCU.addEventListener("touchmove", function(e){
            let SSCUtouchMove = e.changedTouches[0].clientX;
            if(Math.abs(SSCUtouchMove - SSCUtouchStart) > 30 && e.cancelable){
                e.preventDefault()
                SSCUscrollLock = true
            }else{
                SSCUscrollLock = false
            }
        })
        SSCU.addEventListener("touchend", function(e){
            let SSCUtouchEnd = e.changedTouches[0].clientX,
            SSCUwidth = SSCU.offsetWidth / 4.5;
            if(SSCUscrollLock){
                if(SSCUtouchEnd - SSCUtouchStart > SSCUwidth){
                    changeSSCU(-1)
                }else if(SSCUtouchEnd - SSCUtouchStart < -(SSCUwidth)){
                    changeSSCU(1)
                }
            }
        })
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
    SSCUstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSCU_settings.style}SSCU.css`, SSCU_settings, loadSSCU)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCUstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSCU_settings.style}SSCU.css`, SSCU_settings, loadSSCU)
    },300)
})
