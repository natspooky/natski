/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */

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

let SSCstore = [],
SSCicons = {
    'leftArrow': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>',
    'rightArrow': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>',
    'play':'<svg class="SSCplay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756.99 850.4"><path d="M718.32,358.21c51.56,29.77,51.56,104.2,0,133.97l-301.15,173.87L116.02,839.92c-51.56,29.77-116.02-7.44-116.02-66.98V77.46C0,17.92,64.46-19.29,116.02,10.48L417.17,184.35l301.15,173.87h0Z"/></svg>',
    'pause':'<svg class="SSCpause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.4 850.4"><rect x="46.77" y=".17" width="239.38" height="850.07" rx="90.18" ry="90.18"/><rect x="564.25" y=".17" width="239.38" height="850.07" rx="93.7" ry="93.7"/></svg>'
},
SSCdeviceCheck = iOSspecificSSC() || deviceCheckSSC()

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

function reloadSSC(settings) {
    let sscVersions = document.getElementsByClassName('SSC')
    for(let i = 0; i < SSCstore.length; i++) {
        SSCstore[i].pause()
    }
    SSCstore = []
    for(let i = 0; i < sscVersions.length; i++) {
        if(sscVersions[i].getElementsByClassName('banner-bg').length > 1){
            if(sscVersions[i].getElementsByClassName('SSCthumbs')[0]) {
                sscVersions[i].getElementsByClassName('SSCthumbs')[0].remove()
            }
            if(sscVersions[i].getElementsByClassName('SSCprogress')[0]) {
                sscVersions[i].getElementsByClassName('SSCprogress')[0].remove()
            }
            if(sscVersions[i].getElementsByClassName('SSCpauseButton')[0]) {
                sscVersions[i].getElementsByClassName('SSCpauseButton')[0].remove()
            }
            if(sscVersions[i].getElementsByClassName('SSCpageButton')[0]) {
                for(let y = 0; y < 2; y++) {
                    sscVersions[i].getElementsByClassName('SSCpageButton')[1 - y].remove()
                }
            }
        }
    }
    loadSSC(settings)
}

function pauseSSC(index) {
    if(SSCstore[index].checkPages()) return
    SSCstore[index].pause()
}

function playSSC(index) {
    if(SSCstore[index].checkPages()) return
    SSCstore[index].play()
}

function pauseAllSSC() {
    for(let i = 0; i < SSCstore.length; i++) {
        pauseSSC(i)
    }
}

function playAllSSC() {
    for(let i = 0; i < SSCstore.length; i++) {
        playSSC(i)
    }
}

function nextSlideSSC(index) {
    if(SSCstore[index].checkPages()) return
    SSCstore[index].changePage(1)
}

function previousSlideSSC(index) {
    if(SSCstore[index].checkPages()) return
    SSCstore[index].changePage(-1)
}

class SSC {
    constructor(element, settings, device) {
        this.SSC = element
        this.pages = this.SSC.getElementsByClassName('banner-bg')
        this.progressBar = undefined
        this.thumbs = undefined
        this.thumbOffset = undefined
        this.pauseButton = undefined
        this.settings = settings
        this.index = 1
        this.barWidth = 0
        this.timerFunc = undefined
        this.barTimerFunc = undefined
        this.timer = Math.max(this.settings.timer, 5000)
        this.touch = undefined
        this.scrollLock = undefined
        this.device = device
        this.paused = false
    }

    directPage(index) {
        this.index = index
        this.displayPage()
    }

    changePage(index) {
        this.index += index
        this.displayPage()
    }

    displayPage() {
        let pageLen = this.pages.length
        if(!this.paused) {
            this.startTimers()
        }
        if(this.index < 1) {
            this.index = pageLen
        }else if(this.index > pageLen) {
            this.index = 1
        }
        for(let i = 0; i < pageLen; i++) {
            this.pages[i].style.display = 'none'
        }
        if(this.settings.thumbs) {
            this.thumbMinifier()
            for(let i = 0; i < this.thumbs.length; i++) {
                this.thumbs[i].classList.remove('SSCselected')
            }
            this.thumbs[this.index-1].classList.add('SSCselected')
        }
        this.pages[this.index-1].style.display = 'flex'
    }

    startTimers() {
        if(!this.paused) {
            Promise.resolve(clearInterval(this.timerFunc)).then(() => {
                this.timerFunc = setInterval(() => {
                    this.changePage(1)
                }, this.timer);
            })
            if(this.settings.progressBar) {
                this.barWidth = 0
                Promise.resolve(clearInterval(this.barTimerFunc)).then(() => {
                    this.barTimerFunc = setInterval(() => {
                        this.progressBar.style.transform = `scaleX(${this.barWidth += 0.001})`
                    }, this.timer / 1000);
                })
            }
        }
    }

    togglePlay() {
        if(this.paused) {
            this.play()
        }else {
            this.pause()
        }
    }

    pause() {
        this.paused = true
        clearInterval(this.timerFunc)
        if(this.settings.progressBar) {
            clearInterval(this.barTimerFunc)
            this.progressBar.style.transform = 'scaleX(0)'
        }
        if(this.settings.pauseButton) {this.pauseButton.classList.add('SSCpaused')}
    }

    play() {
        this.paused = false
        this.startTimers()
        if(this.settings.pauseButton) {this.pauseButton.classList.remove('SSCpaused')}
    }

    checkPages() {
        return this.pages.length <= 1
    }

    elementCreator(elementType, elementClass, ariaLabel, eventType, eventFunction, functionVariable) {
        let element = document.createElement(elementType)
        element.className = elementClass
        element.ariaLabel = ariaLabel
        if(eventType != null) {
            element.addEventListener(
                eventType, 
                (functionVariable != null) ? () => eventFunction(functionVariable) : () => eventFunction()
                )
        }
        return element
    }
    
    createElements() {
        if(this.settings.thumbs) {
            (() => {
                let thumbcont = this.elementCreator('div', 'SSCthumbs', null, null, null, null);
                for(let i = 0; i < this.pages.length; i++) {
                    thumbcont.appendChild(
                            this.elementCreator('div', 'SSCthumb', null, 'click', this.directPage.bind(this), (i + 1))
                        )
                }
                this.SSC.appendChild(thumbcont)
                return Promise.resolve(0)
            })()
            .then(() => {
                this.thumbs = this.SSC.getElementsByClassName('SSCthumb')
            })
        }
        if(this.settings.progressBar) {
            (() => {
                let progcont = this.elementCreator('div', 'SSCprogress', null, null, null, null),
                prog = this.elementCreator('div', 'SSCprogressBar', null, null, null, null)
                progcont.appendChild(prog)
                this.SSC.appendChild(progcont)
                return Promise.resolve(0)
            })()
            .then(() => {
                this.progressBar = this.SSC.getElementsByClassName('SSCprogressBar')[0]
            })
        }
        if(this.settings.pauseButton) {
            (() => {
                let play = this.elementCreator('button', 'SSCpauseButton', 'Play / Pause', 'click', this.togglePlay.bind(this), null)
                play.innerHTML = `${SSCicons['pause']} ${SSCicons['play']}`
                this.SSC.appendChild(play)
                return Promise.resolve(0)
            })()
            .then(() => {
                this.pauseButton = this.SSC.getElementsByClassName('SSCpauseButton')[0]
            })
        }
        if(this.settings.sideButtons && !this.device) {
            let left = this.elementCreator('button', 'SSCpageButton', 'Previous Page', 'click', this.changePage.bind(this), -1),
            right = this.elementCreator('button', 'SSCpageButton', 'Next Page', 'click', this.changePage.bind(this), 1)
            left.innerHTML = SSCicons['leftArrow']
            right.innerHTML = SSCicons['rightArrow']
            this.SSC.appendChild(left)
            this.SSC.appendChild(right)
        }
        return Promise.resolve(0)
    }

    checkBGimages() {
        for(let i = 0; i < this.pages.length; i++) {
            let images = this.pages[i].getElementsByTagName('img')
            for(let i = 0; i < images.length; i++) {
                images[i].loading = 'eager'
                images[i].draggable = false
            }
        }
    }

    thumbMinifier() {
        if(this.thumbs[this.index-1].parentNode.offsetWidth > this.SSC.offsetWidth / 2 && !this.thumbOffset) {
            this.thumbOffset = Math.min(Math.floor((this.SSC.offsetWidth / 2) / (this.thumbs[this.index-1].offsetWidth + 30)), 5)
            for(let i = 0; i < this.thumbs.length; i++) {
                this.thumbs[i].classList.add('SSChidden')
            }
            for(let i = Math.min(Math.max(this.index - this.thumbOffset, 0), this.thumbs.length - (this.thumbOffset * 2) + 1); i < Math.max(Math.min(this.index-1 + this.thumbOffset, this.thumbs.length), (this.thumbOffset * 2) - 1); i++) {
                this.thumbs[i].classList.remove('SSChidden')
            }
        }else if(this.thumbOffset) {
            for(let i = 0; i < this.thumbs.length; i++) {
                this.thumbs[i].classList.add('SSChidden')
            }
            for(let i = Math.min(Math.max(this.index - this.thumbOffset, 0), this.thumbs.length - (this.thumbOffset * 2) + 1); i < Math.max(Math.min(this.index-1 + this.thumbOffset, this.thumbs.length), (this.thumbOffset * 2) - 1); i++) {
                this.thumbs[i].classList.remove('SSChidden')
            }
        }
    }

    swipeSystem() {
        if(this.device) {
            this.SSC.addEventListener("touchstart", (e) => {
                this.touch = e.touches[0].clientX;
            })
            this.SSC.addEventListener("touchmove", (e) => {
                let SSCtouchMove = e.changedTouches[0].clientX;
                this.pages[this.index-1].style.opacity = `${1 - (Math.min(Math.abs(this.touch - SSCtouchMove), 120) / 160)}`
                if(Math.abs(SSCtouchMove - this.touch) > 15 && e.cancelable){
                    e.preventDefault()
                    this.scrollLock = true
                }else{
                    this.scrollLock = false
                }
            })
            this.SSC.addEventListener("touchend", (e) => {
                let SSCtouchEnd = e.changedTouches[0].clientX,
                SSCwidth = this.SSC.offsetWidth / 4.5;
                if(this.scrollLock){
                    if(SSCtouchEnd - this.touch > SSCwidth){
                        this.changePage(-1)
                    }else if(SSCtouchEnd - this.touch < -(SSCwidth)){
                        this.changePage(1)
                    }
                }
                for(let i = 0; i < this.pages.length; i++) {
                    this.pages[i].style.opacity = '1'
                }
            })
        }
    }
    
    loadSlideshow() {
        if(!this.checkPages()) {
            this.checkBGimages()
            this.swipeSystem()
            this.createElements().then(() => {
                this.directPage(1)
            })
        }else {
            this.pages[0].style.display = 'flex'
        }
        this.SSC.style.transition = 'opacity 0.5s, height 0.5s'
        this.SSC.style.display = 'flex'
        this.SSC.style.opacity = '1'
    }

}

function loadSSC(settings){
    let count = document.getElementsByClassName('SSC')
    for(let i = 0; i < count.length; i++){
        SSCstore.push(new SSC(count[i], settings, SSCdeviceCheck))
    }
    for(let i = 0; i < count.length; i++){
        SSCstore[i].loadSlideshow()
    }
}