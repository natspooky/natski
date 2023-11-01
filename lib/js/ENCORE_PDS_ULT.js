/*!
 * ENCORE PICTURE DISPLAY SYSTEM ULT
 * Author: NATSKI
 * MIT License
 */


let PDSUimageIndex = 0,
PDSUscale,
PDSUrotate,
PDSUtransformY,
PDSUtransformX,
PDSUisDown = false,
PDSUstartX,
PDSUstartY,
PDSUtouchStart,
PDSUscrollLock;


function deviceCheckPDSU() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


function iOSspecificPDSU() {
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


let PDSUdevice = deviceCheckPDSU() || iOSspecificPDSU();


function reloadPDSU(settings) {
    document.getElementById('PDSUinspectPanel').remove()
    loadPDSU(settings)
}


function imageTintPDSU(e) {
    let a, o, c, s, l = document.createElement("canvas"), 
    r = l.getContext && l.getContext("2d"), 
    n = {r: 0, g: 0, b: 0}, 
    i = 0;
    c = l.height = e.naturalHeight || e.offsetHeight || e.height, o = l.width = e.naturalWidth || e.offsetWidth || e.width, 
    r.drawImage(e, 0, 0), 
    s = (a = r.getImageData(0, 0, o, c)).data.length;
    for (let g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], 
    n.b += a.data[g + 2], i++;
    n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i)
    return `rgba(${n.r},${n.g},${n.b},`
}


function inspectTargetAniPDSU(settings, indicator, specificimage) {
    document.getElementById('PDSUinspectPanel').classList.add('active')
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
    PDSUimageIndex = indicator
    inspectLoadInitialPDSU(settings, specificimage)
}

function inspectTargetPDSU(settings, indicator) {
    document.getElementById('PDSUinspectPanel').classList.add('active')
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
    PDSUimageIndex = indicator
    inspectLoadPDSU(settings)
}


function imageScalePDSU(loader, inspectimage, inspectPanel) {
    loader.style.display = 'none'
    if(inspectimage.clientWidth + 40 > inspectPanel.offsetWidth){
        inspectimage.classList.add('active')
    }
}


function resetAniPDSU(loader, inspectimage) {
    loader.style.display = 'block'
    inspectimage.style.transformOrigin = 'top left'
    inspectimage.style.transition = '0s'
    inspectimage.style.transitionDelay = '0s'
    inspectimage.style.opacity = '0'
    inspectimage.classList.remove('active')
}

function imageAttachErrorPDSU(loader, inspectimage, inspectPanel) {
    inspectimage.onerror = function() {
        inspectPanel.classList.remove('active')
        loader.style.display = 'none'
        inspectimage.classList.remove('active')
    }
}


function inspectLoadPDSU(settings) {
    let inspectimage = document.getElementById('PDSUinspectImage'),
    inspectPanel = document.getElementById('PDSUinspectPanel'),
    loader = document.getElementById('PDSUloader'),
    PDSUimages = document.getElementsByClassName(settings.imageClass);
    
    
    imageAttachErrorPDSU(loader, inspectimage, inspectPanel)

    resetAniPDSU(loader, inspectimage)

    inspectimage.onload = function() {
        
        imageScalePDSU(loader, inspectimage, inspectPanel)

        PDSUtransformY = (inspectPanel.offsetHeight / 2) - inspectimage.offsetHeight / 2,
        PDSUtransformX = (inspectPanel.offsetWidth / 2) - inspectimage.offsetWidth / 2

        inspectimage.style.transform = `translate(${PDSUtransformX}px,${PDSUtransformY}px) scale(1) rotate(0deg)`

        inspectimage.style.transition = '0.4s, background-color 0.1s, opacity 0.4s, transform 0s'
        inspectimage.style.opacity = '1'
        if(settings.colourSystem){
            inspectimage.style.backgroundColor = `${imageTintPDSU(inspectimage)}0.8)`
        }
    }
    inspectimage.src = PDSUimages[PDSUimageIndex-1].src;
}

function inspectLoadInitialPDSU(settings, specificimage) {
    let inspectimage = document.getElementById('PDSUinspectImage'),
    inspectPanel = document.getElementById('PDSUinspectPanel'),
    PDSUimages = document.getElementsByClassName(settings.imageClass),
    loader = document.getElementById('PDSUloader'),
    imagePos = specificimage.getBoundingClientRect(),
    top = imagePos.top,
    left = imagePos.left;
    
    
    imageAttachErrorPDSU(loader, inspectimage, inspectPanel)
    resetAniPDSU(loader, inspectimage)

    inspectimage.onload = function() {

        imageScalePDSU(loader, inspectimage, inspectPanel)

        animationStartPDSU(inspectimage, specificimage, left, top, playAnimationPDSU)

        if(settings.colourSystem){
            inspectimage.style.backgroundColor = `${imageTintPDSU(inspectimage)}0.8)`
        }
    }
    inspectimage.src = PDSUimages[PDSUimageIndex-1].src;
}


function animationStartPDSU(inspectimage, specificimage, left, top, playAnimationPDSU){
    inspectimage.style.transform = `translate(${left}px,${top}px) scale(${specificimage.offsetHeight / inspectimage.offsetHeight}) rotate(0deg)`

    PDSUtransformY = (window.innerHeight / 2) - inspectimage.offsetHeight / 2,
    PDSUtransformX = (window.innerWidth / 2) - inspectimage.offsetWidth / 2

    playAnimationPDSU(inspectimage, PDSUtransformX, PDSUtransformY)
}


function playAnimationPDSU(inspectimage, windowLeft, windowTop){
    inspectimage.style.transition = '0.5s cubic-bezier(.33,.7,.42,.99), background-color 0s, opacity 0.2s'
    inspectimage.style.transitionDelay = '0.2s'
    inspectimage.style.opacity = '1'
    inspectimage.style.transform = `translate(${windowLeft}px,${windowTop}px) scale(1) rotate(0deg)`
}


function inspectChangePDSU(settings, indicator) {
    let length = document.getElementsByClassName(settings.imageClass).length;
    if(PDSUimageIndex + indicator < 1){
        PDSUimageIndex = length
    }else if(PDSUimageIndex + indicator > length){
        PDSUimageIndex = 1
    }else{
        PDSUimageIndex += indicator
    }
    LoadMiniMenuPDSU(settings)
    inspectLoadPDSU(settings)
}

function loadPDSU(settings) {
    let closer = document.createElement('section'),
    mainimage = document.createElement('img'),
    container = document.createElement('div'),
    miniviewer = document.createElement('div'),
    counter = document.createElement('span'),
    loader = document.createElement('span'),
    scaler = document.createElement('span'),
    page = [-1,1,-0.25,0.25],
    titles = ['Previous','Next','Zoom Out','Zoom In','Flip']
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M368.49,808.11L16.51,456.13c-22.01-22.01-22.01-57.69,0-79.7L368.49,24.44c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118L212.65,416.28l273.84,273.83c32.59,32.58,32.59,85.42,0,118h0c-32.59,32.59-85.42,32.59-118,0h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M142.44,24.44L494.42,376.42c22.01,22.01,22.01,57.69,0,79.7L142.44,808.11c-32.58,32.59-85.42,32.59-118,0h0c-32.59-32.59-32.59-85.42,0-118L298.28,416.27,24.44,142.44C-8.15,109.86-8.15,57.02,24.44,24.44h0c32.59-32.59,85.42-32.59,118,0h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M825.87,707.49l-91.79-91.79c40.44-62.39,63.92-136.8,63.92-216.68C798,178.66,619.36,.02,399,.02S0,178.66,0,399.02s178.64,399,399,399c79.88,0,154.29-23.48,216.68-63.92l91.79,91.79c32.7,32.7,85.71,32.7,118.4,0,16.35-16.35,24.53-37.77,24.53-59.2s-8.18-42.85-24.53-59.2Zm-617.08-118.26c-50.81-50.81-78.79-118.36-78.79-190.21s27.98-139.4,78.79-190.21,118.36-78.79,190.21-78.79,139.4,27.98,190.21,78.79,78.79,118.36,78.79,190.21-27.98,139.4-78.79,190.21-118.36,78.79-190.21,78.79-139.4-27.98-190.21-78.79Z"/><rect x="188" y="347.07" width="422" height="103.91" rx="51.95" ry="51.95"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M825.87,707.49l-91.79-91.79c40.44-62.39,63.92-136.8,63.92-216.68C798,178.66,619.36,.02,399,.02S0,178.66,0,399.02s178.64,399,399,399c79.88,0,154.29-23.48,216.68-63.92l91.79,91.79c32.7,32.7,85.71,32.7,118.4,0,16.35-16.35,24.53-37.77,24.53-59.2s-8.18-42.85-24.53-59.2Zm-617.08-118.26c-50.81-50.81-78.79-118.36-78.79-190.21s27.98-139.4,78.79-190.21,118.36-78.79,190.21-78.79,139.4,27.98,190.21,78.79,78.79,118.36,78.79,190.21-27.98,139.4-78.79,190.21-118.36,78.79-190.21,78.79-139.4-27.98-190.21-78.79Z"/><path d="M399.03,610.02c-14.36,0-27.37-5.81-36.78-15.22-9.41-9.41-15.21-22.38-15.22-36.72l.03-107.07-107.07-.03c-28.7,.01-51.98-23.24-51.99-51.94-.01-14.36,5.81-27.36,15.22-36.77,9.4-9.41,22.38-15.22,36.72-15.22l107.07,.03,.03-107.06c-.01-28.7,23.24-51.98,51.94-52.01,14.36,0,27.36,5.81,36.77,15.22,9.41,9.41,15.22,22.38,15.23,36.72l-.03,107.06,107.06,.03c28.7-.01,51.98,23.24,51.99,51.94,0,14.36-5.81,27.37-15.22,36.78-9.41,9.41-22.38,15.21-36.72,15.22l-107.07-.03-.03,107.07c.02,28.7-23.23,51.98-51.94,51.99h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.41"><path d="M801.41,524.98c-27.05,0-48.98-21.93-48.98-48.98v-83.54c0-162.37-132.1-294.47-294.47-294.47h-114.86c-27.05,0-48.98-21.93-48.98-48.98S316.04,.02,343.09,.02h114.86c104.82,0,203.37,40.82,277.5,114.94,74.12,74.12,114.94,172.67,114.94,277.49v83.54c0,27.05-21.93,48.98-48.98,48.98Z"/><rect x="0" y="262.2" width="588.22" height="588.22" rx="140.47" ry="140.47"/></svg>']
    closer.onclick = function() {
        document.getElementById('PDSUinspectPanel').classList.remove('active');
        document.getElementById('PDSUloader').style.display = 'none';
        document.body.style.overflow = 'unset'
        document.body.style.position = 'unset'
    }
    mainimage.id = 'PDSUinspectImage'
    mainimage.draggable = false
    container.id = 'PDSUinspectPanel'
    loader.id = 'PDSUloader'
    container.appendChild(closer)
    container.appendChild(loader)
    container.appendChild(mainimage)

    if(settings.controls) {
        scaler.id = 'PDSUscaler'
        scaler.innerHTML = '100%'
        counter.id = 'PDSUcounter'
        miniviewer.id = 'PDSUminiview'
        for(let i = 0; i < 2; i++){

            let minipagebuttons = document.createElement('button');
            minipagebuttons.onclick = function(){inspectChangePDSU(settings,page[i])}
            minipagebuttons.innerHTML = icons[i + 2]
            minipagebuttons.name = titles[i]
            if(i == 1) {
                miniviewer.appendChild(counter)
            }
            miniviewer.appendChild(minipagebuttons)
        }
        if(!PDSUdevice){
            for(let i = 0; i < 2; i++){
                let pagebuttons = document.createElement('button')
                pagebuttons.innerHTML = icons[i + 4]
                pagebuttons.name = titles[i + 2]
                pagebuttons.onclick = function(){changeScalePDSU(page[i + 2])}
    
                if(i == 1) {
                    miniviewer.appendChild(scaler)
                }
                miniviewer.appendChild(pagebuttons)

                let pagebutton = document.createElement('button')
                pagebutton.innerHTML = icons[i]
                pagebutton.onclick = function(){inspectChangePDSU(settings,page[i])}
                pagebutton.className = 'PDSUbuttons'
                container.appendChild(pagebutton)
            }

            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[icons.length - 1]
            pagebuttons.name = titles[titles.length - 1]
            pagebuttons.onclick = function(){changeRotationPDSU()}
            miniviewer.appendChild(pagebuttons)

            mainimage.style.cursor = 'grab'
            mainimage.addEventListener('mousedown', (e) => {
                PDSUisDown = true;
                PDSUstartX = e.pageX - PDSUtransformX;
                PDSUstartY = e.pageY - PDSUtransformY;
                mainimage.style.transition = '0s'
                mainimage.style.cursor = 'grabbing'
            });
            
            container.addEventListener('mouseleave', () => {
                PDSUisDown = false;
                mainimage.style.cursor = 'grab'
            });
            
            mainimage.addEventListener('mouseup', () => {
                PDSUisDown = false;
                mainimage.style.cursor = 'grab'
            });
            
            mainimage.addEventListener('mousemove', (e) => {
                if(!PDSUisDown) return;
                e.preventDefault();
                PDSUtransformX = (e.pageX - PDSUstartX)
                PDSUtransformY = (e.pageY - PDSUstartY)
                mainimage.style.transform = `translate(${PDSUtransformX}px,${PDSUtransformY}px) scale(${PDSUscale}) rotate(${PDSUrotate}deg)`;
            });

            mainimage.addEventListener("wheel", function(e) {

                let variation = -(parseInt(e.deltaY) / 2000);
                
                changeScalePDSU(variation)
            
                return false;
                
            }, true);

        }else{
            container.addEventListener("touchstart", function(e){
                PDSUtouchStart = e.touches[0].clientX;
            })
            container.addEventListener("touchmove", function(e){
                let PDSUtouchMove = e.changedTouches[0].clientX;
                if(Math.abs(PDSUtouchMove - PDSUtouchStart) > 30 && e.cancelable){
                    e.preventDefault()
                    PDSUscrollLock = true
                }else{
                    PDSUscrollLock = false
                }
            })
            container.addEventListener("touchend", function(e){
                let PDSUtouchEnd = e.changedTouches[0].clientX,
                PDSUwidth = container.offsetWidth / 4.5;
                if(PDSUscrollLock){
                    if(PDSUtouchEnd - PDSUtouchStart > PDSUwidth){
                        inspectChangePDSU(settings,-1)
                    }else if(PDSUtouchEnd - PDSUtouchStart < -(PDSUwidth)){
                        inspectChangePDSU(settings,1)
                    }
                }
            })
        }

        container.appendChild(miniviewer)
    }
    document.body.appendChild(container)
    connectPDSU(settings)
    createObserverPDSU()

}


function LoadMiniMenuPDSU(settings) {
    if(settings.controls) {
        let miniviewer = document.getElementById('PDSUminiview');
        PDSUscale = 1
        PDSUrotate = 0
        miniviewer.children[1].innerHTML = `${PDSUimageIndex} / ${document.getElementsByClassName(settings.imageClass).length}`
        if(!PDSUdevice){
            miniviewer.children[4].innerHTML = '100%'
        }
    }
}


function changeScalePDSU(e){
    let image = document.getElementById('PDSUinspectImage'),
    scaler = document.getElementById('PDSUscaler')
    PDSUscale += e
    PDSUscale = Math.min(Math.max(PDSUscale,0.25),3)
    scaler.innerHTML = `${(PDSUscale * 100).toFixed(0)}%`
    image.style.transition = '0s, transform 0.08s'
    image.style.transformOrigin = 'center center'
    image.style.transform = `translate(${PDSUtransformX}px,${PDSUtransformY}px) scale(${PDSUscale}) rotate(${PDSUrotate}deg)`
}


function changeRotationPDSU(){
    let image = document.getElementById('PDSUinspectImage')
    PDSUrotate -= 90
    image.style.transition = '0s, transform 0.15s'
    image.style.transformOrigin = 'center center'
    image.style.transform = `translate(${PDSUtransformX}px,${PDSUtransformY}px) scale(${PDSUscale}) rotate(${PDSUrotate}deg)`
}


function createObserverPDSU(){
    const observer = new MutationObserver(checkImagePDSU);
    const observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observer.observe(document, observerConfig);
    
}


function checkImagePDSU(mutations) {
    let settings = PDSU_settings
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (typeof node.getElementsByTagName !== 'function') {
                return
            }
            if(node.tagName == 'IMG' && node.classList.contains(settings.imageClass)) {
                let index = document.getElementsByClassName(settings.imageClass),
                indexValue = Array.prototype.indexOf.call(index, node)
                if(settings.animations) {
                    node.onclick = function() {inspectTargetAniPDSU(settings, indexValue + 1, this);LoadMiniMenuPDSU(settings)}
                }else{
                    node.onclick = function() {inspectTargetPDSU(settings, indexValue + 1);LoadMiniMenuPDSU(settings)}
                }
                node.style.cursor = 'zoom-in'
            }
            else if(node.childNodes.length > 0) {

                checkChildrenPDSU(node,settings)
            }
        })
    })
}


function checkChildrenPDSU(element,settings){
    element.childNodes.forEach(function(node){
        if(node.tagName == 'IMG' && node.classList.contains(settings.imageClass)) {
            let index = document.getElementsByClassName(settings.imageClass),
            indexValue = Array.prototype.indexOf.call(index, node)
            if(settings.animations) {
                node.onclick = function() {inspectTargetAniPDSU(settings, indexValue + 1, this);LoadMiniMenuPDSU(settings)}
            }else{
                node.onclick = function() {inspectTargetPDSU(settings, indexValue + 1);LoadMiniMenuPDSU(settings)}
            }
            node.style.cursor = 'zoom-in'
        }
        else if(node.childNodes.length > 0) {
            checkChildrenPDSU(node,settings)
        }
    })
}


function connectPDSU(settings) {
    let PDSUimages = document.getElementsByClassName(settings.imageClass),
    PDSlen = PDSUimages.length;
    for(let i = 0; i < PDSlen; i++){
        if(settings.animations) {
            PDSUimages[i].onclick = function() {inspectTargetAniPDSU(settings, (i+1), this);LoadMiniMenuPDSU(settings)}
        }else {
            PDSUimages[i].onclick = function() {inspectTargetPDSU(settings, (i+1));LoadMiniMenuPDSU(settings)}
        }
        PDSUimages[i].style.cursor = 'zoom-in'
    }
}

function PDSUstyleCall(url, settings, load) {
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

function checkLoadedPDSU() {
    return document.readyState === "complete";
}

function PDSUcssLoader() {
    if(PDSUdevice){
        PDSUstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/PDS/${PDSU_settings.style}PDSUmobile.css`, PDSU_settings, loadPDSU)
    }else{
        PDSUstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/PDS/${PDSU_settings.style}PDSU.css`, PDSU_settings, loadPDSU)
    }
}

if(checkLoadedPDSU() == true) {
    PDSUcssLoader()
}

window.addEventListener("load", function() {
    setTimeout(() => {
        PDSUcssLoader()
    },300)
})
