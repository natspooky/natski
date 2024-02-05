/*!
 * ENCORE VIDEO PLAYER SYSTEM
 * Author: NATSKI
 * MIT License
 */



let VPStimer;


function deviceCheckVPS() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function iOSspecificVPS() {
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

function mobileBarVPS(e) {
    let play = document.getElementsByClassName('VPSplay')[e];
    play.style.opacity = '0'
    document.getElementsByClassName('VPSplay')[e].style.opacity = '0'
}

function overlayDisplayVPS(e) {
    let video = document.getElementsByClassName('VPS')[e];
    showContVPS(e)
    if(!video.paused){
        clearTimeout(VPStimer)
        VPStimer = setTimeout(() => {
            hideContVPS(e)
        },2000);
    }else{
        clearTimeout(VPStimer)
    }
}

function reloadVPS(settings){
    let video = document.getElementsByClassName('VPS'),
    length = video.length,
    containers = document.getElementsByClassName('VPScontainer');
    for(let i = 0; i < length; i++){
        video[length - i - 1].style.display = 'none'
        video[length - i - 1].parentNode.parentNode.insertBefore(video[length - i - 1], video[length - i - 1].parentNode)
        containers[length - i - 1].remove()
    }
    loadVPS(settings)
}

function muteVPS(e) {
    let video = document.getElementsByClassName('VPS')[e];
    if(video.volume != 0){
        adjustVolumeVPS(e, 0)
    }else{
        adjustVolumeVPS(e, 100)
    }
}

function volumeSVGdeactiveVPS(e) {
    let svg = document.getElementsByClassName('VPSsound')[e].children[0].children,
    len = svg.length;
    for(let i = 0; i < len; i++) {
        svg[i].setAttribute('height','177.24')
        svg[i].setAttribute('y','330')
    } 
}

function volumeSVGactiveVPS(e) {
    let svg = document.getElementsByClassName('VPSsound')[e].children[0].children,
    len = svg.length,
    height = ['197.47','197.47','596.18','294.77','426.42'],
    y = ['326.96','326.96','127.61','278.31','212.49'];
    if(svg[3].getAttribute('y') != '0'){
        for(let i = 0; i < len; i++) {
            svg[i].setAttribute('height',height[i])
            svg[i].setAttribute('y',y[i])
        } 
    }
}

function loopVPS(e){
    let video = document.getElementsByClassName('VPS')[e];
    if(video.loop){
        video.removeAttribute('loop')
    }else{
        video.setAttribute('loop', '')
    }
    document.getElementsByClassName('VPSloop')[e].classList.toggle('loop')
}

function adjustBarVPS(x,e) {
    document.getElementsByClassName('VPSbarChange')[x].style.width = e + '%'
}

function adjustInputbarVPS(x,e) {
    document.getElementsByClassName('VPSinput')[x].value = e
}

function adjustVolumeVPS(x,e) {
    let video = document.getElementsByClassName('VPS')[x];
    document.getElementsByClassName('volumeVisible')[x].style.width = e + '%'
    video.volume = e / 100
    if(video.volume == 0){
        volumeSVGdeactiveVPS(x)
        video.setAttribute('muted','')
    }else{
        volumeSVGactiveVPS(x)
        video.removeAttribute('muted')
    }
}

function closeVolumeVPS(e) {
    document.getElementsByClassName('volumeContainer')[e].classList.remove('active')
    document.getElementsByClassName('VPStime')[e].classList.remove('active')
}

function openVolumeVPS(e) {
    document.getElementsByClassName('volumeContainer')[e].classList.add('active')
    document.getElementsByClassName('VPStime')[e].classList.add('active')
}

function toggleSettingsVPS(e) {
    let vpsSetting = document.getElementsByClassName('VPSsettings')[e];
    if(vpsSetting.classList.contains('setting') && !document.getElementsByClassName('VPS')[e].paused){
        setTimeout(() => {
            hideContVPS(e)
        }, 300);
    }
    document.getElementsByClassName('settingsPanel')[e].classList.toggle('active')
    vpsSetting.classList.toggle('setting')
}

function videoTimeVPS(x,e) {
    document.getElementsByClassName('VPS')[x].currentTime = (document.getElementsByClassName('VPS')[x].duration * (e / 100))
}

function currentVideoTimeVPS(e) {
    let video = document.getElementsByClassName('VPS')[e],
    [min,sec] = formatTimeVPS(video.currentTime);
    document.getElementsByClassName('timeCurrent')[e].innerText = `${min}:${sec}`
}

function currentVideoTimeCompleteVPS(e) {
    currentVideoTimeVPS(e)
    let video = document.getElementsByClassName('VPS')[e],
    [min,sec] = formatTimeVPS(video.duration);
    document.getElementsByClassName('timeEnd')[e].innerText = `/${min}:${sec}`
}

function formatTimeVPS(e) {
    let temp = e % (60 * 60),
    minutes = Math.floor(temp / 60),
    secd = temp % 60,
    seconds = Math.floor(secd).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})
    return [minutes, seconds]
}

function setPlaybackVPS(e,x) {
    document.getElementsByClassName('VPS')[e].playbackRate = x.innerText
    document.getElementsByClassName('VPSplayback')[e].innerText = 'playback: ' + x.innerText
}

function pauseVPS(e) {
    let video = document.getElementsByClassName('VPS')[e],
    player = document.getElementsByClassName('VPSplay')[e];
    video.pause()
    showContVPS(e)
    player.classList.remove('active')
    player.name = 'play'
}

function playPauseVPS(e) {
    let video = document.getElementsByClassName('VPS')[e],
    player = document.getElementsByClassName('VPSplay')[e];
    if(video.paused){
        player.classList.add('active')
        player.name = 'Pause'
        video.play()
        hideContVPS(e)
        document.getElementsByClassName('settingsPanel')[e].classList.remove('active')
        document.getElementsByClassName('VPSsettings')[e].classList.remove('setting')
    }else{
        player.classList.remove('active')
        video.pause()
        player.name = 'Play'
        showContVPS(e)
    }
}

function hideContVPS(e) {
    document.getElementsByClassName('VPScontrolBox')[e].classList.add('VPShidden')
}

function showContVPS(e) {
    clearTimeout(VPStimer)
    document.getElementsByClassName('VPScontrolBox')[e].classList.remove('VPShidden')
}


function toggleCont(e) {
    let overlay = document.getElementsByClassName('VPScontrolBox')[e];
    if(!overlay.classList.contains('VPShidden')) {
        clearTimeout(VPStimer)
        overlay.classList.add('VPShidden')
    }else {
        clearTimeout(VPStimer)
        overlay.classList.remove('VPShidden')
        VPStimer = setTimeout(() => {
            hideContVPS(e)
        },4000);
    }
}


function bufferVPS(e) {
    document.getElementsByClassName('buffer')[e].classList.add('active')
}

function bufferClearVPS(e) {
    document.getElementsByClassName('buffer')[e].classList.remove('active')
}

function checkLoadedVPS(x,e) {
    let bar = document.getElementsByClassName('VPSbarChange')[x];
    bar.style.width = e + '%'
}

function fullScreenVPS(e) {
    let video = document.getElementsByClassName('VPScontainer')[e],
    change = document.getElementsByClassName('VPS')[e],
    icon = document.getElementsByClassName('VPSscreen')[e],
    isIOS = iOSspecificVPS();

    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement){
        if(isIOS){
            return
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        change.classList.remove('full')
        icon.classList.remove('active')
        icon.name = 'Fullscreen'
    }else{
        if(isIOS){
            video.children[0].webkitEnterFullscreen();
        }else{
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
            else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } 
            else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }
            else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
            change.classList.add('full')
            icon.classList.add('active')
            icon.name = 'Exit Fullscreen'
        }
    }
}


function closePipVPS(e) {
    let icon = document.getElementsByClassName('VPSpip')[e];
    icon.name = 'Picture In Picture'
    icon.classList.remove('active')
}

function pipVPS(e) {
    let video = document.getElementsByClassName('VPS')[e],
    icon = document.getElementsByClassName('VPSpip')[e],
    isIOS = iOSspecificVPS();
    if(document.pictureInPictureElement){
        document.exitPictureInPicture()
        closePipVPS(e)
    }else{
        if(isIOS){
            return
        }else if(navigator.userAgent.indexOf("Firefox") > -1){
            if(!document.getElementById('VPSpopup')){
                let popup = document.createElement('div'),
                popuptxt = document.createElement('p');
                popup.id = 'VPSpopup'
                popuptxt.innerHTML = "FireFox doesn't support Picture In Picture"
                popup.appendChild(popuptxt)
                document.body.appendChild(popup)
                setTimeout(() => {
                    popup.classList.add('active')
                }, 20);
                setTimeout(() => {
                    popup.classList.remove('active')
                    setTimeout(() => {
                        popup.remove()
                    },850)
                }, 4000);
            }
        }else{
            video.requestPictureInPicture()
            icon.classList.add('active')
            icon.name = 'Exit Picture In Picture'
        }
    }
}


function createVPSelements(e, device, settings) {
    let video = document.getElementsByClassName('VPS')[e];

    wrapVPSvideo(e)
    createVPScontrols(e, device)
    addVPSfuntions(e, device, settings)
    checkVPSsettings(e)

    let container = document.getElementsByClassName('VPScontainer')[e];

    videoTest = document.createElement('video');
    videoTest.addEventListener('error', function(event){
        document.getElementsByClassName('VPScontrolBox')[e].remove()
        container.onmousemove = function(){return}
        container.onmouseleave = function(){return}
        video.style.opacity = '0'
        let div = document.createElement('div');
        div.className = 'VPSerror'
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.89 850.9" fill="#f0f0f0"><path d="M425.2,123.88c18.87,0,37.74,9.34,48.53,28.02l141.9,245.78,141.9,245.78c21.57,37.36-5.39,84.05-48.53,84.05H141.39c-43.14,0-70.1-46.7-48.53-84.05l141.9-245.78,141.9-245.78c10.78-18.68,29.66-28.02,48.53-28.02M425.2,38.61c-24.02,0-47.75,6.12-68.64,17.69-22.29,12.35-40.87,30.67-53.74,52.96l-141.9,245.78L19.02,600.82C6.14,623.12-.42,648.37.02,673.85c.42,23.88,6.99,47.49,18.99,68.29,12.01,20.8,29.17,38.29,49.64,50.59,21.84,13.12,46.99,20.06,72.74,20.06h567.61c25.74,0,50.89-6.94,72.74-20.06,20.47-12.3,37.63-29.79,49.64-50.59,12.01-20.8,18.58-44.41,18.99-68.29.45-25.48-6.12-50.73-18.99-73.02l-141.9-245.78-141.9-245.78c-12.87-22.29-31.46-40.61-53.74-52.96-20.89-11.58-44.62-17.69-68.64-17.69h0Z"/><g><rect x="382.67" y="231.17" width="85.06" height="287.8" rx="31.36" ry="31.36"/><rect x="382.67" y="581.92" width="85.06" height="84.94" rx="31.36" ry="31.36" transform="translate(-199.19 1049.58) rotate(-90)"/> </g></svg><p>this video cannot be played</p>'
        container.appendChild(div)

    })
    videoTest.src = video.children[0].src

    setTimeout(() => {
        video.style.display = 'block'
        container.style.opacity = '1'
        if(settings.bokeh && !device) {
            createCanvasVPS(e)
        }
    }, 200);
}


function createVPSvideo(width, poster, title, src){
    let video = document.createElement('video'),
    source = document.createElement('source');
    video.className = 'VPS'
    video.setAttribute('VPSwidth', width)
    video.poster = poster
    video.title = title
    video.style.display = 'none'
    source.src = src
    video.appendChild(source)
    return Promise.resolve(video)
}


function createCanvasVPS(e) {
    let canvas = document.createElement('canvas'),
    container = document.getElementsByClassName('VPScontainer')[e],
    video = document.getElementsByClassName('VPS')[e];
    canvas.className = 'VPScanvas'
    container.insertBefore(canvas, video);
}






async function updateCanvasVPS(video, canvas, context) {
    let then = performance.now(),
    interval = 1000 / 30,
    delta = 0;
    while (!video.paused) {
        let now = await new Promise(requestAnimationFrame);
        if (now - then < interval - delta) {
            continue;
        }
        delta = Math.min(interval, delta + now - then - interval);
        then = now;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    canvas.classList.remove('active')
}









function toggleSettingsPageVPS(e,x) {
    let mainset = document.getElementsByClassName('VPSmainSettings')[e],
    settingscont = document.getElementsByClassName('settingsPanel')[e];
    if(mainset.classList.contains('active')){
        settingscont.style.height = mainset.offsetHeight + 'px'
    }else{
        settingscont.style.height = x.offsetHeight + 'px'
    }
    x.classList.toggle('active')
    mainset.classList.toggle('active')
}

function checkVPSsettings(e) {
    if(VPS_settings.loop) {
        loopVPS(e)
    }
}

function cinemaVPS(e) {
    let container = document.getElementsByClassName('VPScontainer')[e],
    icon = document.getElementsByClassName('VPScinema')[e];
    if(container.classList.contains('full')) {
        container.classList.remove('full')
        icon.classList.remove('active')
        icon.name = 'Cinema Mode'
        container.style.width = document.getElementsByClassName('VPS')[e].getAttribute('VPSwidth')
    }else{
        container.classList.add('full')
        icon.classList.add('active')
        icon.name = 'Normal Mode'
        container.style.width = '100vw'
        container.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
}


function wrapVPSvideo(e) {
    let video = document.getElementsByClassName('VPS')[e],
    container = document.createElement('VPS');

    container.className = 'VPScontainer'
    if(!video.getAttribute('VPSwidth') == undefined){
        container.style.width = video.getAttribute('VPSwidth')
    }else{
        container.style.width = video.getAttribute('vpswidth')
    }
    for(let i = 0; i < video.childElementCount; i++){
        let videoSrc = video.children[i].src;
        video.children[i].type = `video/${videoSrc.slice(videoSrc.indexOf('.') + 1, videoSrc.length)}`
    }
    video.setAttribute('playsinline','')
    video.parentNode.insertBefore(container, video);
    container.appendChild(video);
}



function createVPScontrols(e,device) {
    let icons = ['<svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.39"><path d="M764.98,358.21c51.56,29.77,51.56,104.2,0,133.97l-301.15,173.87-301.15,173.87c-51.56,29.77-116.02-7.44-116.02-66.98V77.46c0-59.54,64.46-96.75,116.02-66.98L463.83,184.35l301.15,173.87Z"/></svg><svg class="pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.4 850.4"><rect x="46.77" y=".17" width="239.38" height="850.07" rx="90.18" ry="90.18"/><rect x="564.25" y=".17" width="239.38" height="850.07" rx="93.7" ry="93.7"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.89 850.9"><rect x="1.35" y="326.96" width="83.63" height="197.47" rx="32.21" ry="32.21" transform="translate(86.32 851.39) rotate(180)"/><rect x="765.42" y="326.96" width="83.63" height="197.47" rx="32.21" ry="32.21" transform="translate(1614.47 851.39) rotate(180)"/><rect x="192.36" y="127.61" width="83.63" height="596.18" rx="32.21" ry="32.21" transform="translate(468.36 851.39) rotate(180)"/><rect x="383.38" y="278.31" width="83.63" height="294.77" rx="32.21" ry="32.21" transform="translate(850.39 851.39) rotate(180)"/><rect x="574.4" y="212.49" width="83.63" height="426.42" rx="32.21" ry="32.21" transform="translate(1232.43 851.39) rotate(180)"/></svg>',
    '<svg class="fullscreenSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M83.79,726.71v-144.71c0-15.8-12.81-28.61-28.61-28.61H28.77c-15.8,0-28.61,12.81-28.61,28.61v175.72c0,51.19,41.5,92.69,92.69,92.69h175.57c15.8,0,28.61-12.81,28.61-28.61v-26.5c0-15.8-12.81-28.61-28.61-28.61H123.77c-22.08,0-39.98-17.9-39.98-39.98ZM92.85,.02C41.66,.02,.16,41.52,.16,92.71v175.73c0,15.8,12.81,28.61,28.61,28.61h26.41c15.8,0,28.61-12.81,28.61-28.61V123.71c0-22.08,17.9-39.98,39.98-39.98h144.65c15.8,0,28.61-12.81,28.61-28.61V28.63C297.03,12.83,284.22,.02,268.42,.02H92.85ZM766.6,726.72c0,22.07-17.9,39.97-39.97,39.97h-144.65c-15.8,0-28.61,12.81-28.61,28.61v26.5c0,15.8,12.81,28.61,28.61,28.61h175.57c51.19,0,92.68-41.49,92.68-92.68v-175.73c0-15.8-12.81-28.61-28.61-28.61h-26.41c-15.8,0-28.61,12.81-28.61,28.61v144.72ZM757.55,.02h-175.57c-15.8,0-28.61,12.81-28.61,28.61v26.49c0,15.8,12.81,28.61,28.61,28.61h144.64c22.08,0,39.98,17.9,39.98,39.98v144.73c0,15.8,12.81,28.61,28.61,28.61h26.41c15.8,0,28.61-12.81,28.61-28.61V92.7C850.23,41.51,808.74,.02,757.55,.02Z"/></svg><svg class="minSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M213.4,677.09v144.71c0,15.8,12.81,28.61,28.61,28.61h26.41c15.8,0,28.61-12.81,28.61-28.61v-175.72c0-51.19-41.5-92.69-92.69-92.69H28.77c-15.8,0-28.61,12.81-28.61,28.61v26.5c0,15.8,12.81,28.61,28.61,28.61H173.42c22.08,0,39.98,17.9,39.98,39.98Zm-9.06-380.04c51.19,0,92.69-41.5,92.69-92.69V28.63C297.03,12.83,284.22,.02,268.42,.02h-26.41c-15.8,0-28.61,12.81-28.61,28.61V173.36c0,22.08-17.9,39.98-39.98,39.98H28.77c-15.8,0-28.61,12.81-28.61,28.61v26.49c0,15.8,12.81,28.61,28.61,28.61H204.34Zm432.66,380.03c0-22.07,17.9-39.97,39.97-39.97h144.65c15.8,0,28.61-12.81,28.61-28.61v-26.5c0-15.8-12.81-28.61-28.61-28.61h-175.57c-51.19,0-92.68,41.49-92.68,92.68v175.73c0,15.8,12.81,28.61,28.61,28.61h26.41c15.8,0,28.61-12.81,28.61-28.61v-144.72Zm9.05-380.03h175.57c15.8,0,28.61-12.81,28.61-28.61v-26.49c0-15.8-12.81-28.61-28.61-28.61h-144.64c-22.08,0-39.98-17.9-39.98-39.98V28.63c0-15.8-12.81-28.61-28.61-28.61h-26.41c-15.8,0-28.61,12.81-28.61,28.61V204.37c0,51.19,41.49,92.68,92.68,92.68Z"/></svg>',
    '<svg class="maxCinSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M757.55,91.73H92.85C41.66,91.73,.16,133.22,.16,184.41v481.61c0,51.19,41.5,92.69,92.69,92.69H757.55c51.19,0,92.68-41.5,92.68-92.69V184.41c0-51.19-41.49-92.68-92.68-92.68Zm9.05,543.29c0,22.08-17.9,39.97-39.98,39.97H123.77c-22.08,0-39.98-17.89-39.98-39.97V215.42c0-22.08,17.9-39.98,39.98-39.98H726.62c22.08,0,39.98,17.9,39.98,39.98v419.6Z"/></svg><svg class="minCinSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M757.55,158.66H92.85C41.66,158.66,.16,200.15,.16,251.34v347.75c0,51.19,41.5,92.69,92.69,92.69H757.55c51.19,0,92.68-41.5,92.68-92.69V251.34c0-51.19-41.49-92.68-92.68-92.68Zm9.05,409.43c0,22.08-17.9,39.97-39.98,39.97H123.77c-22.08,0-39.98-17.89-39.98-39.97V282.35c0-22.08,17.9-39.98,39.98-39.98H726.62c22.08,0,39.98,17.9,39.98,39.98v285.74Z"/></svg>',
    '<svg class="openPipSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path class="cls-1" d="M757.55,91.73H92.85C41.66,91.73,.16,133.22,.16,184.41v481.61c0,51.19,41.5,92.69,92.69,92.69H757.55c51.19,0,92.68-41.5,92.68-92.69V184.41c0-51.19-41.49-92.68-92.68-92.68Zm8.97,543.29c0,22.08-17.9,39.97-39.98,39.97H414.83c-22.08,0-39.97-17.89-39.97-39.97v-150.37c0-22.07,17.89-39.97,39.97-39.97h311.71c22.08,0,39.98,17.9,39.98,39.97v150.37Z"/></svg><svg class="closePipSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M757.55,91.73H92.85C41.66,91.73,.16,133.22,.16,184.41v481.61c0,51.19,41.5,92.69,92.69,92.69H757.55c51.19,0,92.68-41.5,92.68-92.69V184.41c0-51.19-41.49-92.68-92.68-92.68Zm9.05,543.29c0,22.08-17.9,39.97-39.98,39.97H123.77c-22.08,0-39.98-17.89-39.98-39.97V215.42c0-22.08,17.9-39.98,39.98-39.98H726.62c22.08,0,39.98,17.9,39.98,39.98v419.6Z"/><path d="M682.8,278.41v293.61c0,10.64-8.62,19.26-19.25,19.26H186.85c-10.64,0-19.26-8.62-19.26-19.26V278.41c0-10.63,8.62-19.26,19.26-19.26h476.7c10.63,0,19.25,8.63,19.25,19.26Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1032.47 1032.53"><path d="M952.08,620.24l-57.1-32.97c-25.19-14.54-40.47-41.49-40.43-70.58,0-.16,0-.31,0-.47s0-.31,0-.47c-.04-29.09,15.24-56.04,40.43-70.58l57.1-32.97c41.44-23.93,55.64-76.92,31.72-118.36l-41.28-71.49c-23.92-41.44-76.92-55.64-118.36-31.72l-57.05,32.94c-25.23,14.57-56.25,14.28-81.44-.34-.28-.16-.56-.33-.85-.49-25.16-14.5-40.81-41.2-40.81-70.24V86.64c0-47.85-38.79-86.64-86.65-86.64h-82.54c-47.86,0-86.65,38.79-86.65,86.64v65.87c0,29.04-15.65,55.74-40.81,70.24-.28,.16-.57,.33-.85,.49-25.2,14.62-56.22,14.9-81.44,.34l-57.05-32.94c-41.44-23.92-94.44-9.72-118.37,31.72l-41.27,71.49c-23.93,41.44-9.73,94.43,31.72,118.36l57.1,32.97c25.19,14.54,40.47,41.49,40.43,70.58,0,.16,0,.31,0,.47s0,.31,0,.47c.04,29.09-15.24,56.04-40.43,70.58l-57.1,32.97c-41.45,23.93-55.65,76.92-31.72,118.36l41.27,71.49c23.93,41.44,76.93,55.64,118.37,31.72l57.05-32.94c25.23-14.57,56.25-14.28,81.44,.34,.28,.16,.56,.33,.85,.49,25.16,14.5,40.81,41.2,40.81,70.24v65.86c0,47.86,38.79,86.65,86.65,86.65h82.54c47.86,0,86.65-38.79,86.65-86.65v-65.86c0-29.04,15.65-55.74,40.81-70.24,.28-.16,.57-.33,.85-.49,25.2-14.62,56.22-14.9,81.44-.34l57.05,32.94c41.44,23.92,94.44,9.72,118.36-31.72l41.28-71.49c23.92-41.44,9.72-94.43-31.72-118.36Zm-401.72,63.49c-11.07,2.25-22.53,3.43-34.27,3.43s-23.2-1.18-34.27-3.43c-36.94-7.52-69.55-26.96-93.65-54.11-15.14-17.08-26.91-37.2-34.28-59.33-5.66-16.99-8.73-35.17-8.73-54.06s3.07-37.07,8.73-54.06c7.37-22.13,19.14-42.25,34.28-59.33,24.1-27.15,56.71-46.59,93.65-54.11,11.07-2.25,22.53-3.43,34.27-3.43s23.2,1.18,34.27,3.43c36.94,7.52,69.55,26.96,93.65,54.11,15.14,17.08,26.91,37.2,34.28,59.33,5.66,16.99,8.73,35.17,8.73,54.06s-3.07,37.07-8.73,54.06c-7.37,22.13-19.14,42.25-34.28,59.33-24.1,27.15-56.71,46.59-93.65,54.11Z"/></svg>'],
    buttonClassses = ['VPSplay','VPSsound','VPSscreen','VPScinema','VPSpip','VPSsettings'],
    buttonTitle = ['Play','Volume','Fullscreen','Cinema Mode','Picture In Picture','Settings'],
    mainContainer = document.getElementsByClassName('VPScontainer')[e],
    controlbox = document.createElement('div'),
    title = document.createElement('span'),
    playcontainer = document.createElement('div'),
    controlbar = document.createElement('div'),
    progbarcont = document.createElement('div'),
    progbar = document.createElement('div'),
    progbarinput = document.createElement('input'),
    volume = document.createElement('div'),
    volumeSlider = document.createElement('div'),
    volumeback = document.createElement('div'),
    volumeInput = document.createElement('input'),
    settings = document.createElement('div'),
    settingsloop = document.createElement('button'),
    settingsplayback = document.createElement('button'),
    time = document.createElement('div'),
    timeDur = document.createElement('div'),
    timeEnd = document.createElement('div'),
    playbackmenu = document.createElement('div'),
    settingscontainer = document.createElement('div');
    //buffer = document.createRange().createContextualFragment('<svg class="buffer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1118.94 1118.94"><path d="M1118.94,559.47c0,308.99-250.48,559.47-559.47,559.47C250.73,1118.94,0,868.21,0,559.47,0,250.48,250.48,0,559.47,0c67.59,0,132.38,11.99,192.36,33.96,31.61,11.58,52.71,41.56,52.71,75.22h0c0,55.73-55.47,94.18-107.81,75.03-41.87-15.32-87.01-23.83-134.1-24.2-221.74-1.72-401.71,176.02-402.63,397.77-.92,221.96,179.2,402.08,401.16,401.16,221.74-.92,399.48-180.89,397.77-402.63-.37-47.08-8.88-92.23-24.2-134.1-19.15-52.34,19.3-107.81,75.03-107.81h0c33.66,0,63.64,21.1,75.22,52.71,21.97,59.98,33.96,124.77,33.96,192.36Z"/></svg>');
    controlbox.className = 'VPScontrolBox'
    title.className = 'VPStitle'
    title.innerText = document.getElementsByClassName('VPS')[e].title
    playcontainer.className = 'playField'
    settings.className = 'settingsPanel'
    controlbar.className = 'VPScontrolBar'
    progbarcont.className = 'VPSbar'
    progbar.className = 'VPSbarChange'
    progbarinput.className = 'VPSinput VPSrange'
    progbarinput.type = 'range'
    progbarinput.value = '0'
    progbarinput.min = 0
    progbarinput.step = '0.1'
    progbarinput.max = 100
    progbarcont.appendChild(progbar)
    progbarcont.appendChild(progbarinput)
    controlbar.appendChild(progbarcont)
    if(!device){
        volume.className = 'volumeContainer'
        volumeback.className = 'volumeBack'
        volumeSlider.className = 'volumeVisible'
        volumeInput.className = 'volumeInput VPSrange'
        volumeInput.type = 'range'
        volumeInput.value = '100'
        volumeInput.min = 0
        volumeInput.max = 100
        volumeback.appendChild(volumeSlider)
        volume.appendChild(volumeback)
        volume.appendChild(volumeInput)
    }
    time.className = 'VPStime'
    timeDur.className = 'timeCurrent'
    timeDur.innerText = '0:00'
    timeEnd.className = 'timeEnd'
    timeEnd.innerText = '/0:00'
    time.appendChild(timeDur)
    time.appendChild(timeEnd)
    settingsloop.className = 'VPSloop'
    settingsloop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1119.75 1119.76"><path d="M763.41,38.2c-6.65,5.04-12.87,10.77-18.57,17.12-23.55,26.24-35.47,60.08-33.58,95.29l.31,5.72c-161.39-60.46-350.65-20.21-472.54,115.59-131.06,146.04-143.89,357.6-44.87,516.32,4.83,7.75,9.91,15.36,15.28,22.83,4.83,6.73,9.86,13.33,15.11,19.82l-2.62-48.61c-1.5-27.72,19.83-51.49,47.55-52.99,13.44-.7,26.35,3.84,36.37,12.82l.02,.02c9.99,8.97,15.89,21.3,16.61,34.72l3.16,58.51,7.11,131.74c.72,13.42-3.82,26.33-12.8,36.34-8.99,10.01-21.34,15.93-34.77,16.65l-190.24,10.28h-.06c-13.41,.72-26.29-3.84-36.29-12.81-10.01-8.98-15.92-21.33-16.65-34.75-.72-13.42,3.82-26.34,12.81-36.33,8.99-10.02,21.34-15.94,34.76-16.66l47.78-2.58c-3.86-4.4-7.64-8.88-11.35-13.42-3.63-4.43-7.19-8.93-10.68-13.47-24.27-31.61-45.04-65.73-62.15-102.14C22.35,732.68,4.75,662.67,.84,590.07c-3.94-72.58,6.02-144.08,29.57-212.53,24.39-70.92,62.35-135.4,112.8-191.62,50.47-56.23,110.47-100.88,178.34-132.78C387.07,22.35,457.09,4.75,529.67,.83c72.58-3.93,144.08,6.03,212.53,29.59,7.13,2.45,14.21,5.04,21.21,7.78Z"/><path d="M1089.33,742.22c-24.39,70.93-62.34,135.4-112.79,191.62-50.47,56.22-110.47,100.89-178.35,132.78-65.51,30.78-135.53,48.38-208.11,52.3-10.28,.56-20.52,.84-30.74,.84-62.02,0-123.04-10.21-181.8-30.41-7.88-2.71-15.68-5.59-23.38-8.63,9.71-6.29,18.65-13.92,26.58-22.76,22.85-25.47,34.76-58.12,33.68-92.24,46.95,16.76,96.14,25.08,145.24,25.08,118.27,0,236.06-48.22,321.08-142.96,128.44-143.1,143.33-349.16,50.68-506.73-4.55-7.74-9.36-15.35-14.42-22.83-4.83-7.13-9.88-14.17-15.19-21.03l1.84,33.77c1.5,27.72-19.85,51.5-47.57,53-.92,.05-1.84,.07-2.75,.07-12.44,0-24.29-4.52-33.62-12.89,0,0-.01-.01-.02-.02-10-8.97-15.89-21.31-16.61-34.73l-2.44-45.16-2.56-47.38-5.29-97.7c-.72-13.42,3.83-26.33,12.81-36.35,8.98-10,21.34-15.91,34.78-16.65l15.96-.87,160.02-8.64,14.25-.77c.92-.04,1.84-.07,2.75-.07,26.52,0,48.81,20.83,50.25,47.63,1.49,27.73-19.84,51.5-47.58,53l-58.74,3.17c3.96,4.4,7.84,8.88,11.64,13.41,3.74,4.42,7.39,8.91,10.96,13.45,26.24,33.26,48.56,69.37,66.73,108.05,30.78,65.51,48.38,135.53,52.29,208.12,3.93,72.57-6.02,144.08-29.58,212.53Z"/></svg>'
    settingsplayback.className = 'VPSplayback'
    settingsplayback.innerHTML = 'playback: 1'
    playbackmenu.className = 'VPSplaybackMenu'

    settingscontainer.className = 'VPSmainSettings'
    settingscontainer.appendChild(settingsplayback)
    settingscontainer.appendChild(settingsloop)
    settings.appendChild(playbackmenu)
    settings.appendChild(settingscontainer)
    for(let x = 0; x < 6; x++){
        let controlButtons = document.createElement('button');
        if(x == 1 || x == 3 || x == 4 ){
            if(!device){
                controlButtons.className = buttonClassses[x]
                controlButtons.innerHTML = icons[x]
                controlButtons.name = buttonTitle[x]
                controlButtons.ariaLabel = buttonTitle[x]
                controlbar.appendChild(controlButtons)
                controlbar.appendChild(volume)
            }
            controlbar.appendChild(time)
        }else{
            controlButtons.className = buttonClassses[x]
            controlButtons.innerHTML = icons[x]
            controlButtons.name = buttonTitle[x]
            controlButtons.ariaLabel = buttonTitle[x]
            controlbar.appendChild(controlButtons) 
        } 
    }
    for(let x = 0; x < 8; x++){
        let playbackbut = document.createElement('button');
        playbackbut.innerText = (x+1)*0.25
        playbackbut.onclick = function(){setPlaybackVPS(e,this);toggleSettingsPageVPS(e,document.getElementsByClassName('VPSplaybackMenu')[e]);}
        playbackmenu.appendChild(playbackbut)
    }
    controlbox.appendChild(title)
    controlbox.appendChild(playcontainer)
    controlbox.appendChild(controlbar)
    controlbox.appendChild(settings)
    mainContainer.appendChild(controlbox)
    //mainContainer.appendChild(buffer)
}

function loadsettingsmenuVPS(e) {
    let settingsPanel = document.getElementsByClassName('settingsPanel')[e],
    settingscont = document.getElementsByClassName('VPSmainSettings')[e];
    settingsPanel.style.width = settingscont.offsetWidth + 'px'
    settingsPanel.style.height = settingscont.offsetHeight + 'px'
    document.getElementsByClassName('VPSplaybackMenu')[e].classList.remove('active')
    settingscont.classList.remove('active')
}

function addVPSfuntions(e, device, setting) {
    let video = document.getElementsByClassName('VPS')[e],
    container = document.getElementsByClassName('VPScontainer')[e],
    playframe = document.getElementsByClassName('playField')[e],
    proginput = document.getElementsByClassName('VPSinput')[e],
    player = document.getElementsByClassName('VPSplay')[e],
    fullsc = document.getElementsByClassName('VPSscreen')[e],
    cinema = document.getElementsByClassName('VPScinema')[e],
    pip = document.getElementsByClassName('VPSpip')[e],
    volume = document.getElementsByClassName('volumeInput')[e],
    volumecont = document.getElementsByClassName('VPSsound')[e],
    volumebox = document.getElementsByClassName('volumeContainer')[e],
    loop = document.getElementsByClassName('VPSloop')[e],
    playback = document.getElementsByClassName('VPSplayback')[e],
    contentbar = document.getElementsByClassName('VPScontrolBar')[e],
    settings = document.getElementsByClassName('VPSsettings')[e];
    video.ontimeupdate = function(){
        let percent = (video.currentTime / video.duration) * 100;
        adjustBarVPS(e, percent);
        adjustInputbarVPS(e, percent)
        currentVideoTimeVPS(e)
    }
    video.onended = function(){showContVPS(e);document.getElementsByClassName('VPSplay')[e].classList.remove('active')}
    //video.onwaiting = function(){bufferVPS(e)}
    //video.onplaying = function(){bufferClearVPS(e)}
    //video.onloadstart = function(){bufferVPS(e)}
    //video.onloadstart = function(){bufferVPS(e)}
    video.onplay = function(){
        currentVideoTimeCompleteVPS(e);
        document.getElementsByClassName('VPSbar')[e].style.display = 'block'
        if(setting.bokeh && !device){
            let canvas = document.getElementsByClassName('VPScanvas')[e],
            context = canvas.getContext('2d'),
            video = document.getElementsByClassName('VPS')[e];
            context.filter = "blur(20px)";
            updateCanvasVPS(video, canvas, context)
            canvas.classList.add('active')
        }
    }
    video.onpause = function(){pauseVPS(e)}
    player.onclick = function(){playPauseVPS(e)}
    fullsc.onclick = function(){fullScreenVPS(e)}
    if(!device){
        playframe.onclick = function(){playPauseVPS(e)}
        volume.oninput = function(){adjustVolumeVPS(e,volume.value);}
        volumecont.onclick = function(){muteVPS(e);showContVPS(e)}
        volumecont.onmouseenter = function(){openVolumeVPS(e)}
        contentbar.onmouseleave = function(){closeVolumeVPS(e)}
        volumebox.onmouseenter = function(){openVolumeVPS(e)}
        proginput.oninput = function(){
            adjustBarVPS(e,proginput.value);
            videoTimeVPS(e,proginput.value);
            currentVideoTimeVPS(e);
            showContVPS(e)
        }
        cinema.onclick = function(){cinemaVPS(e)}
        pip.onclick = function(){pipVPS(e)}
        container.onmousemove = function(){overlayDisplayVPS(e)}
        container.onmouseleave = function(){
            if(video.paused){
                showContVPS(e)
                clearTimeout(VPStimer)
            }else{
                hideContVPS(e)
                clearTimeout(VPStimer)
            }
        }

        container.addEventListener('fullscreenchange', function(){
            let change = document.getElementsByClassName('VPS')[e],
            icon = document.getElementsByClassName('VPSscreen')[e];
            if(!document.fullscreenElement){
                change.classList.remove('full')
                icon.classList.remove('active')
                icon.name = 'Fullscreen'
            }
        })

        video.addEventListener('leavepictureinpicture', function(){
            closePipVPS(e)
        });
    }else{
        playframe.ontouchend = function(){toggleCont(e)}
        proginput.ontouchstart = function(){
            showContVPS(e)
            pauseVPS(e)
            document.getElementsByClassName('VPSplay')[e].style.opacity = '0'
            document.getElementsByClassName('VPSsettings')[e].style.opacity = '0'
            document.getElementsByClassName('VPSscreen')[e].style.opacity = '0'
            document.getElementsByClassName('VPStitle')[e].style.opacity = '0'
        }
        proginput.oninput = function(){
            adjustBarVPS(e,proginput.value);
            videoTimeVPS(e,proginput.value);
            currentVideoTimeVPS(e);
        }
        
        proginput.ontouchend = function(){
            overlayDisplayVPS(e)
            document.getElementsByClassName('VPSplay')[e].style.opacity = '1'
            document.getElementsByClassName('VPSsettings')[e].style.opacity = '1'
            document.getElementsByClassName('VPSscreen')[e].style.opacity = '1'
            document.getElementsByClassName('VPStitle')[e].style.opacity = '1'
        }
    }
    settings.onclick = function(){toggleSettingsVPS(e);showContVPS(e);loadsettingsmenuVPS(e)}
    loop.onclick = function(){loopVPS(e);clearTimeout(VPStimer)}
    playback.onclick = function(){
        toggleSettingsPageVPS(e,document.getElementsByClassName('VPSplaybackMenu')[e]);
        clearTimeout(VPStimer)
    }
}

function loadVPS(settings) {
    let length = document.getElementsByClassName('VPS').length,
    device = (deviceCheckVPS())// || iOSspecificVPS());
    for(let i = 0; i < length; i++){
        createVPSelements(i, device, settings)
    }
    VPScreateObserver()
}

function VPSstyleCall(url,load) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementsByTagName('head')[0].appendChild(style);
    let linkloaded = document.createElement('img');
        linkloaded.onerror = function(){
            if(load) load(VPS_settings)
        }
        linkloaded.src = url
}

function checkLoadedVPS() {
    return document.readyState === "complete";
}

function VPScssLoader() {
    if(deviceCheckVPS() || iOSspecificVPS()){
        VPSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/VPS/${VPS_settings.style}VPSmobile.css`, loadVPS)
    }else{
        VPSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/VPS/${VPS_settings.style}VPS.css`, loadVPS)
    }
}


function VPScreateObserver(){
    let observerMutCLS = new MutationObserver(checkVideosVPS),
    observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observerMutCLS.observe(document, observerConfig);
}


function checkVideosVPS(mutations) {
    let settings = VPS_settings
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (typeof node.getElementsByTagName !== 'function' || node.parentNode.classList.contains('VPScontainer')) {
                return
            }
            if(node.tagName == 'VIDEO' && node.classList.contains('VPS')) {
                let length = document.getElementsByClassName('VPS'),
                index = Array.prototype.indexOf.call(length, node),
                device = (deviceCheckVPS()) // || iOSspecificVPS());
                createVPSelements(index, device, settings)
            }
            else if(node.childNodes.length > 0 && !node.classList.contains('VPScontainer')) {

                checkChildrenVPS(node,settings)
            }
        })
    })
}


function checkChildrenVPS(element,settings){
    element.childNodes.forEach(function(node){
        if(node.tagName == 'VIDEO' && node.classList.contains('VPS')) {
            let length = document.getElementsByClassName('VPS'),
            index = Array.prototype.indexOf.call(length, node),
            device = (deviceCheckVPS())// || iOSspecificVPS());
            createVPSelements(index, device, settings)
        }
        else if(node.childNodes.length > 0 && !node.classList.contains('VPScontainer')) {
            checkChildrenVPS(node,settings)
        }
    })
}

if(checkLoadedVPS() == true) {
    VPScssLoader()
}

window.addEventListener("load", function() {
    setTimeout(() => {
        VPScssLoader()
    },300)
})

