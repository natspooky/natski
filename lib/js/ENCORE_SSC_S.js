/*!
 * ENCORE SLIDE SHOW CONTAINER S
 * Author: NATSKI
 * MIT License
 */


let SSCSIndex = 1,
SSCSprevIndex,
SSCSbarWidth = 0,
SSCSTimer,
SSCSswapTimer,
SSCSbarTimer,
SSCStouchStart,
SSCSscrollLock;


function reloadSSCS(settings) {
    let banners = document.getElementsByClassName('banner-bg-s').length,
    banner = document.getElementsByClassName('banner-bg-s');
    if(SSCSswapTimer){
        return
    }
    clearInterval(SSCSbarTimer)
    clearInterval(SSCSTimer)
    if(checkBannerSSCS()) {
        return
    }
    let len = document.getElementById('SSCS').childElementCount - banners - 1 // 1 is for the SSCS icon
    for(let i = 0; i < len; i++){
        document.getElementById('SSCS').children[document.getElementById('SSCS').childElementCount -1].remove()
    }
    document.getElementsByClassName('SSCSsvg')[0].remove()
    for(let i = 0; i < banners; i++){
        banner[i].style.display = 'none'
        banner[i].classList.remove('active')
    }
    loadSSCS(settings)
}



function deviceCheckSSCS() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function iOSspecificSSCS() {
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


function checkBannerSSCS(){
    let banner = document.getElementsByClassName('banner-bg-s');
    if(banner.length <= 1) {
        banner[0].style.display = 'flex'
        banner[0].classList.add('active')
        return true
    }
}


function pauseSSCS() {
    if(checkBannerSSCS()) {
        return
    }
    clearInterval(SSCSTimer)
    if(SSCS_settings.thumbs) {
        let progBar = document.getElementsByClassName("progress-s");
        clearInterval(SSCSbarTimer)
        progBar[SSCSIndex-1].style.transform = 'scaleY(0)'
    }
    
}


function playSSCS() {
    if(checkBannerSSCS()) {
        return
    }
    let settings = SSCS_settings;
    clearInterval(SSCSTimer)
    if(settings.thumbs) {
        clearInterval(SSCSbarTimer)
        progressBarSSCS()
    }
    SSCSTimer = setInterval(function() {
        changeSSCS(1)
    }, settings.timer)
}



function nextSlideSSCS() {
    changeSSCS(1)
}


function previousSlideSSCS() {
    changeSSCS(-1)
}



function SSCSTime() {
    let settings = SSCS_settings;
    clearInterval(SSCSTimer)
    SSCSTimer = setInterval(function() {
        changeSSCS(1)
    }, settings.timer)
}


function displaySSCS(e) {
    let pages = document.getElementsByClassName('banner-bg-s'),
    pageLen = pages.length,
    loopStorage = 1,
    invertStorage = false,
    settings = SSCS_settings;
    SSCSTime()
    if(e < 1) {
        SSCSIndex = pageLen
        invertStorage = true
    }
    else if(e > pageLen) {
        SSCSIndex = 1
        invertStorage = true
    }
    for (let i = 0; i < pageLen; i++) {
        if(pages[i].style.display == 'flex'){
            loopStorage = i
        }
    }
    if(settings.thumbs) {
        let thumbs = document.getElementsByClassName('thumb-s'),
        thumbLen = thumbs.length,
        progBar = document.getElementsByClassName("progress-s");
        clearInterval(SSCSbarTimer)
        for (let i = 0; i < thumbLen; i++) {
            thumbs[i].classList.remove('active')
            progBar[i].style.transform = 'scaleY(0)'
        }
        progressBarSSCS()
        thumbs[SSCSIndex-1].classList.add('active')
    }
    if(invertStorage){
        if(SSCSIndex > SSCSprevIndex){
            pages[SSCSIndex-1].style.transform = 'translateY(-100%)'
            pages[loopStorage].style.transform = 'translateY(0%)'
        }else{
            pages[SSCSIndex-1].style.transform = 'translateY(100%)'
            pages[loopStorage].style.transform = 'translateY(0%)'
        }
    }else{
        if(SSCSIndex < SSCSprevIndex){
            pages[SSCSIndex-1].style.transform = 'translateY(-100%)'
            pages[loopStorage].style.transform = 'translateY(0%)'
        }else{
            pages[SSCSIndex-1].style.transform = 'translateY(100%)'
            pages[loopStorage].style.transform = 'translateY(0%)'
        }
    }
    pages[SSCSIndex-1].style.display = 'flex'
    setTimeout(() => {
        pages[SSCSIndex-1].style.transform = 'translateY(0%)'
        pages[SSCSIndex-1].classList.add('active')
        pages[loopStorage].classList.remove('active')
        if(invertStorage){
            if(SSCSIndex > SSCSprevIndex){
                pages[loopStorage].style.transform = 'translateY(100%)'
            }else{
                pages[loopStorage].style.transform = 'translateY(-100%)'
            }
        }else{
            if(SSCSIndex < SSCSprevIndex){
                pages[loopStorage].style.transform = 'translateY(100%)'
            }else{
                pages[loopStorage].style.transform = 'translateY(-100%)'
            }
        }
        SSCSswapTimer = setTimeout(() => {
            pages[loopStorage].style.display = 'none'
            SSCSswapTimer = undefined
        }, settings.slideSpeed)
    },20);
}

function changeSSCS(e) {
    if(SSCSswapTimer){
        return
    }
    SSCSprevIndex = SSCSIndex
    displaySSCS(SSCSIndex += e)
}



function progressBarSSCS(){
    let progBar = document.getElementsByClassName("progress-s"),
    settings = SSCS_settings;
    SSCSbarWidth = 0;
    SSCSbarTimer = setInterval(function() {
        SSCSbarWidth += 0.01
        progBar[SSCSIndex-1].style.transform = `scaleY(${SSCSbarWidth})`
    }, (settings.timer / 100))
}

function currentSSCS(e) {
    if(SSCSswapTimer){
        return
    }
    SSCSprevIndex = SSCSIndex
    displaySSCS(SSCSIndex = e);
}





function loadSSCS(settings) {
    let SSCS = document.getElementById('SSCS'),
    SSCSlength = document.getElementsByClassName('banner-bg-s').length,
    SSCSbanner = document.getElementsByClassName('banner-bg-s');
    for(let i = 0; i < SSCSlength; i++){
        SSCSbanner[i].style.transition = `${settings.slideSpeed}ms ease`
    }
    if(settings.timer < 5000) {
        settings.timer = 5000
    }
    if(settings.slideSpeed < 300 || settings.slideSpeed > 1000) {
        settings.slideSpeed = 300
    }
    if(SSCSlength < 2) {
        SSCSbanner[0].style.display = 'flex'
        SSCSbanner[0].classList.add('active')
    }else{
        createSSCSElements(settings)
        currentSSCS(1)
    }
    if(iOSspecificSSCS() || deviceCheckSSCS()){
        SSCS.addEventListener("touchstart", function(e){
            SSCStouchStart = e.touches[0].clientX;
        })
        SSCS.addEventListener("touchmove", function(e){
            let SSCStouchMove = e.changedTouches[0].clientX;
            if(Math.abs(SSCStouchMove - SSCStouchStart) > 30 && e.cancelable){
                e.preventDefault()
                SSCSscrollLock = true
            }else{
                SSCSscrollLock = false
            }
        })
        SSCS.addEventListener("touchend", function(e){
            let SSCStouchEnd = e.changedTouches[0].clientX,
            SSCSwidth = SSCS.offsetWidth / 4.5;
            if(SSCSscrollLock){
                if(SSCStouchEnd - SSCStouchStart > SSCSwidth){
                    changeSSCS(-1)
                }else if(SSCStouchEnd - SSCStouchStart < -(SSCSwidth)){
                    changeSSCS(1)
                }
            }
        })
    }
    SSCS.style.display = 'flex'
    SSCS.style.opacity = '1'
}


function createSSCSElements(settings) {
    let slideshowcontainer = document.getElementById('SSCS');
    if(settings.thumbs) {
        let thumbcont = document.createElement('div'),
        pages = document.getElementsByClassName('banner-bg-s').length;
        thumbcont.className = 'thumbs'
        for(let i = 0; i < pages; i++) {
            let thumb = document.createElement('div'),
            progressBar = document.createElement('div');
            thumb.className = 'thumb-s'
            thumb.onclick = function(){currentSSCS(i+1)}
            progressBar.className = 'progress-s'
            thumb.appendChild(progressBar)
            thumbcont.appendChild(thumb)
        }
        slideshowcontainer.appendChild(thumbcont)
    }
    slideshowcontainer.style.transition = '0.5s'
    slideshowcontainer.style.display = 'flex'
    slideshowcontainer.style.opacity = '1'
}


function SSCSstyleCall(url, settings, load) {
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


function checkLoadedSSCS() {
    return document.readyState === "complete";
}

if(checkLoadedSSCS()) {
    SSCSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSCS_settings.style+'SSCS.css', SSCS_settings, loadSSCS)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        SSCSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/SSC/'+SSCS_settings.style+'SSCS.css', SSCS_settings, loadSSCS)
    },300)
})
