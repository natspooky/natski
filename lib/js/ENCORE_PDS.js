/*!
 * ENCORE PICTURE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

let PDSimageIndex = 0,
PDSscale,
PDSrotate,
PDStransformY,
PDStransformX,
PDSisDown = false,
PDSstartX,
PDSstartY,
PDStouchStart,
PDSscrollLock;


function PDSdeviceCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


function iOSspecificPDS() {
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


let PDSdevice = PDSdeviceCheck() || iOSspecificPDS();


function reloadPDS(settings) {
    let PDS = document.getElementById('PDS')
    let len = PDS.childElementCount
    for(let i = 0; i < len; i++) {
        PDS.children[PDS.childElementCount - 1].remove()
    }
    document.getElementById('PDSinspectPanel').remove()
    loadPDS(settings)
}


function imageTintPDS(e) {
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


function createGalleryPDS(settings, PDS){
    displayImagesPDS(settings, createImagesPDS(settings), createTemplatePDS(PDS))
}


function createTemplatePDS(PDS) {
    let rowNum, colNum;
    if(PDSdevice) {
        rowNum = 1
        colNum = 2
    }else{
        rowNum = 2
        colNum = 2
    }
    for(let x = 0; x < rowNum; x++){
        let row = document.createElement('div')
        row.className = 'PDSrow'
        for(let i = 0; i < colNum; i++) {
            let column = document.createElement('div')
            column.className = 'PDScolumn'
            row.appendChild(column)
        }
        PDS.appendChild(row)
    }
    return colNum * rowNum
}


function createImagesPDS(settings) {
    let values = [];
    for(let i = 0; i < settings.fileCount; i++){
        let display = document.createElement('img')
        display.className = `PDSimages ${settings.classes}`
        display.draggable = false
        display.alt = 'PDS image'
        display.setAttribute('height','200')
        display.setAttribute('width','200')
        display.style.opacity = '0'
        display.style.transition = 'opacity 1s, box-shadow 1s, background-color 1s, transform 0.2s'
        display.onerror = function(){
            this.src = `${this.src.slice(0,this.src.length - 4)}.jpg`
            this.onerror = function(){
                this.remove()
            }
        }
        if(settings.animations) {
            display.onclick = function() {inspectTargetAniPDS(settings, (i+1), this);loadMiniMenuPDS(settings)}
        }else {
            display.onclick = function() {inspectTargetPDS(settings, (i+1));loadMiniMenuPDS(settings)}
        }
        display.onload = function() {imageloadPDS(this, settings)}
        observePDS({root: null,rootMargin: "0px"}, loadPDSimage, display, settings, i)
        values.push(display)
    }
    return values
}


function displayImagesPDS(settings,values, columnNum) {
    let avgimage = Math.ceil(settings.fileCount / columnNum),
    column = document.getElementsByClassName('PDScolumn');
    for(let z = 0; z < avgimage; z++){
        let y = Math.min(columnNum,settings.fileCount - (columnNum*z));
        for(let x = 0; x < y; x++){
            column[x].appendChild(values[x + columnNum*z])
        }
    }
}


function imageloadPDS(image, settings) {
    setTimeout(() => {
        image.style.opacity = '1';
        if(settings.colourSystem) {
            let tint = imageTintPDS(image)
            image.style.boxShadow = `0 0 45px ${tint} 0.7)`
            image.style.backgroundColor = `${tint} 0.7)`
        }
    },100)
}


function inspectTargetAniPDS(settings, indicator, speificimage) {
    document.getElementById('PDSinspectPanel').classList.add('active')
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
    PDSimageIndex = indicator
    inspectLoadInitialPDS(settings, speificimage)
}


function inspectTargetPDS(settings, indicator) {
    document.getElementById('PDSinspectPanel').classList.add('active')
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
    PDSimageIndex = indicator
    inspectLoadPDS(settings)
}


function imageScalePDS(loader, inspectimage, inspectPanel) {
    loader.style.display = 'none'
    if(inspectimage.clientWidth + 40 > inspectPanel.offsetWidth){
        inspectimage.classList.add('active')
    }
}


function resetAniPDS(loader, inspectimage) {
    loader.style.display = 'block'
    inspectimage.style.transformOrigin = 'top left'
    inspectimage.style.transition = '0s'
    inspectimage.style.transitionDelay = '0s'
    inspectimage.style.opacity = '0'
    inspectimage.classList.remove('active')
}


function inspectLoadPDS(settings) {
    let inspectimage = document.getElementById('PDSinspectImage'),
    inspectPanel = document.getElementById('PDSinspectPanel'),
    loader = document.getElementById('PDSloader');

    resetAniPDS(loader, inspectimage)

    inspectimage.onload = function() {
        imageScalePDS(loader, inspectimage, inspectPanel)

        PDStransformY = (inspectPanel.offsetHeight / 2) - inspectimage.offsetHeight / 2,
        PDStransformX = (inspectPanel.offsetWidth / 2) - inspectimage.offsetWidth / 2


        inspectimage.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(1) rotate(0deg)`

        inspectimage.style.transition = '0.4s, background-color 0.1s, opacity 0.4s, transform 0s'
        inspectimage.style.opacity = '1'
        if(settings.colourSystem){
            inspectimage.style.backgroundColor = `${imageTintPDS(inspectimage)}0.8)`
        }
    }
    
    inspectimage.src = `${settings.path + PDSimageIndex}.png`;
}


function inspectLoadInitialPDS(settings, speificimage) {
    let inspectimage = document.getElementById('PDSinspectImage'),
    inspectPanel = document.getElementById('PDSinspectPanel'),
    loader = document.getElementById('PDSloader'),
    imagePos = speificimage.getBoundingClientRect(),
    top = imagePos.top,
    left = imagePos.left;

    resetAniPDS(loader, inspectimage)

    inspectimage.onload = function() {
        
        imageScalePDS(loader, inspectimage, inspectPanel)

        animationStartPDS(inspectimage, speificimage, left, top, playAnimationPDS)
        if(settings.colourSystem){
            inspectimage.style.backgroundColor = `${imageTintPDS(inspectimage)}0.8)`
        }
    }
    inspectimage.src = `${settings.path + PDSimageIndex}.png`
}


function animationStartPDS(inspectimage, speificimage, left, top, playAnimationPDS){

    inspectimage.style.transform = `translate(${left}px,${top}px) scale(${speificimage.offsetHeight / inspectimage.offsetHeight}) rotate(0deg)`

    PDStransformY = (window.innerHeight / 2) - inspectimage.offsetHeight / 2,
    PDStransformX = (window.innerWidth / 2) - inspectimage.offsetWidth / 2

    playAnimationPDS(inspectimage, PDStransformX, PDStransformY)
}


function playAnimationPDS(inspectimage, windowLeft, windowTop){
    inspectimage.style.transition = '0.5s cubic-bezier(.33,.7,.42,.99), background-color 0s, opacity 0.2s'
    inspectimage.style.transitionDelay = '0.2s'
    inspectimage.style.opacity = '1'
    inspectimage.style.transform = `translate(${windowLeft}px,${windowTop}px) scale(1) rotate(0deg)`
}

function inspectChangePDS(settings, indicator) {
    let length = document.getElementsByClassName('PDSimages').length;
    if(PDSimageIndex + indicator < 1){
        PDSimageIndex = length
    }else if(PDSimageIndex + indicator > length){
        PDSimageIndex = 1
    }else{
        PDSimageIndex += indicator
    }
    loadMiniMenuPDS(settings)
    inspectLoadPDS(settings)
}


function loadPDS(settings) {
    let PDS = document.getElementById('PDS'),
    closer = document.createElement('button'),
    mover = document.createElement('section'),
    mainimage = document.createElement('img'),
    container = document.createElement('div'),
    miniviewer = document.createElement('div'),
    counter = document.createElement('span'),
    scaler = document.createElement('span'),
    loader = document.createElement('span'),
    page = [-1,1,-0.25,0.25],
    titles = ['Previous','Next','Zoom Out','Zoom In','Flip']
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M368.49,808.11L16.51,456.13c-22.01-22.01-22.01-57.69,0-79.7L368.49,24.44c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118L212.65,416.28l273.84,273.83c32.59,32.58,32.59,85.42,0,118h0c-32.59,32.59-85.42,32.59-118,0h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M142.44,24.44L494.42,376.42c22.01,22.01,22.01,57.69,0,79.7L142.44,808.11c-32.58,32.59-85.42,32.59-118,0h0c-32.59-32.59-32.59-85.42,0-118L298.28,416.27,24.44,142.44C-8.15,109.86-8.15,57.02,24.44,24.44h0c32.59-32.59,85.42-32.59,118,0h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M825.87,707.49l-91.79-91.79c40.44-62.39,63.92-136.8,63.92-216.68C798,178.66,619.36,.02,399,.02S0,178.66,0,399.02s178.64,399,399,399c79.88,0,154.29-23.48,216.68-63.92l91.79,91.79c32.7,32.7,85.71,32.7,118.4,0,16.35-16.35,24.53-37.77,24.53-59.2s-8.18-42.85-24.53-59.2Zm-617.08-118.26c-50.81-50.81-78.79-118.36-78.79-190.21s27.98-139.4,78.79-190.21,118.36-78.79,190.21-78.79,139.4,27.98,190.21,78.79,78.79,118.36,78.79,190.21-27.98,139.4-78.79,190.21-118.36,78.79-190.21,78.79-139.4-27.98-190.21-78.79Z"/><rect x="188" y="347.07" width="422" height="103.91" rx="51.95" ry="51.95"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M825.87,707.49l-91.79-91.79c40.44-62.39,63.92-136.8,63.92-216.68C798,178.66,619.36,.02,399,.02S0,178.66,0,399.02s178.64,399,399,399c79.88,0,154.29-23.48,216.68-63.92l91.79,91.79c32.7,32.7,85.71,32.7,118.4,0,16.35-16.35,24.53-37.77,24.53-59.2s-8.18-42.85-24.53-59.2Zm-617.08-118.26c-50.81-50.81-78.79-118.36-78.79-190.21s27.98-139.4,78.79-190.21,118.36-78.79,190.21-78.79,139.4,27.98,190.21,78.79,78.79,118.36,78.79,190.21-27.98,139.4-78.79,190.21-118.36,78.79-190.21,78.79-139.4-27.98-190.21-78.79Z"/><path d="M399.03,610.02c-14.36,0-27.37-5.81-36.78-15.22-9.41-9.41-15.21-22.38-15.22-36.72l.03-107.07-107.07-.03c-28.7,.01-51.98-23.24-51.99-51.94-.01-14.36,5.81-27.36,15.22-36.77,9.4-9.41,22.38-15.22,36.72-15.22l107.07,.03,.03-107.06c-.01-28.7,23.24-51.98,51.94-52.01,14.36,0,27.36,5.81,36.77,15.22,9.41,9.41,15.22,22.38,15.23,36.72l-.03,107.06,107.06,.03c28.7-.01,51.98,23.24,51.99,51.94,0,14.36-5.81,27.37-15.22,36.78-9.41,9.41-22.38,15.21-36.72,15.22l-107.07-.03-.03,107.07c.02,28.7-23.23,51.98-51.94,51.99h0Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.41"><path d="M801.41,524.98c-27.05,0-48.98-21.93-48.98-48.98v-83.54c0-162.37-132.1-294.47-294.47-294.47h-114.86c-27.05,0-48.98-21.93-48.98-48.98S316.04,.02,343.09,.02h114.86c104.82,0,203.37,40.82,277.5,114.94,74.12,74.12,114.94,172.67,114.94,277.49v83.54c0,27.05-21.93,48.98-48.98,48.98Z"/><rect x="0" y="262.2" width="588.22" height="588.22" rx="140.47" ry="140.47"/></svg>']
    closer.onclick = function() {
        document.getElementById('PDSinspectPanel').classList.remove('active');
        document.getElementById('PDSloader').style.display = 'none';
        document.body.style.overflow = 'unset'
        document.body.style.position = 'unset'
    }
    mainimage.id = 'PDSinspectImage'
    mainimage.draggable = false
    mainimage.onerror = function(){
        setErrorPDS(this)
    }
    container.id = 'PDSinspectPanel'
    loader.id = 'PDSloader'
    closer.id = 'PDScloser'
    closer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 616.14"><path d="M593.94,593.61c-14.82,14.84-34.25,22.26-53.68,22.26s-38.81-7.4-53.62-22.2l-178.51-178.3-178.3,178.51c-29.62,29.65-77.66,29.68-107.31,.06-14.84-14.81-22.25-34.25-22.25-53.68s7.39-38.81,22.19-53.62l178.3-178.51L22.25,129.83c-29.64-29.62-29.67-77.66-.06-107.31C37.01,7.68,56.44,.27,75.87,.27s38.82,7.39,53.63,22.19l178.51,178.3L486.31,22.25c29.61-29.64,77.65-29.67,107.3-.06,14.84,14.82,22.26,34.25,22.26,53.69s-7.4,38.81-22.2,53.62l-178.3,178.51,178.51,178.3c29.65,29.61,29.68,77.65,.06,107.3Z"/></svg>'
    container.appendChild(mover)
    container.appendChild(loader)
    container.appendChild(mainimage)
    container.appendChild(closer)

    if(settings.controls) {
        scaler.id = 'PDSscaler'
        scaler.innerHTML = '100%'
        counter.id = 'PDScounter'
        miniviewer.id = 'PDSminiview'
        for(let i = 0; i < 2; i++){

            let minipagebuttons = document.createElement('button');
            minipagebuttons.onclick = function(){inspectChangePDS(settings,page[i])}
            if(settings.fileCount < 2){
                minipagebuttons.disabled = true
                minipagebuttons.style.cursor = 'not-allowed'
            }
            minipagebuttons.innerHTML = icons[i + 2]
            minipagebuttons.name = titles[i]
            if(i == 1) {
                miniviewer.appendChild(counter)
            }
            miniviewer.appendChild(minipagebuttons)
        }
        if(!PDSdevice){
            for(let i = 0; i < 2; i++){
                let pagebuttons = document.createElement('button')
                pagebuttons.innerHTML = icons[i + 4]
                pagebuttons.name = titles[i + 2]
                pagebuttons.onclick = function(){changeScalePDS(page[i + 2])}
    
                if(i == 1) {
                    miniviewer.appendChild(scaler)
                }
                miniviewer.appendChild(pagebuttons)

                let pagebutton = document.createElement('button')
                pagebutton.innerHTML = icons[i]
                pagebutton.onclick = function(){inspectChangePDS(settings,page[i])}
                if(settings.fileCount < 2){
                    pagebutton.disabled = true
                    pagebutton.style.cursor = 'not-allowed'
                }
                pagebutton.className = 'PDSbuttons'
                container.appendChild(pagebutton)
            }
            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[icons.length - 1]
            pagebuttons.name = titles[titles.length - 1]
            pagebuttons.onclick = function(){changeRotationPDS()}
            miniviewer.appendChild(pagebuttons)

            mover.style.cursor = 'grab'
            mover.addEventListener('mousedown', (e) => {
                PDSisDown = true;
                PDSstartX = e.pageX - PDStransformX;
                PDSstartY = e.pageY - PDStransformY;
                mainimage.style.transition = '0s'
                mover.style.cursor = 'grabbing'
            })
            
            mover.addEventListener('mouseleave', () => {
                PDSisDown = false;
                mover.style.cursor = 'grab'
            })
            
            mover.addEventListener('mouseup', () => {
                PDSisDown = false;
                mover.style.cursor = 'grab'
            })
            
            mover.addEventListener('mousemove', (e) => {
                if(!PDSisDown) return;
                e.preventDefault();
                PDStransformX = (e.pageX - PDSstartX)
                PDStransformY = (e.pageY - PDSstartY)
                mainimage.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(${PDSscale}) rotate(${PDSrotate}deg)`;
            })

            mover.addEventListener("wheel", function(e) {
                e.preventDefault()
                
                changeScalePDS(-(parseInt(e.deltaY) / 2000))
            
                return false;
                
            }, true);
            
        }else if(settings.fileCount > 2){
            container.addEventListener("touchstart", function(e){
                PDStouchStart = e.touches[0].clientX;
            })
            container.addEventListener("touchmove", function(e){
                let PDStouchMove = e.changedTouches[0].clientX;
                if(Math.abs(PDStouchMove - PDStouchStart) > 15 && e.cancelable){
                    e.preventDefault()
                    PDSscrollLock = true
                }else{
                    PDSscrollLock = false
                }
            })
            container.addEventListener("touchend", function(e){
                let PDStouchEnd = e.changedTouches[0].clientX,
                PDSwidth = container.offsetWidth / 4.5;
                if(PDSscrollLock){
                    if(PDStouchEnd - PDStouchStart > PDSwidth){
                        inspectChangePDS(settings,-1)
                    }else if(PDStouchEnd - PDStouchStart < -(PDSwidth)){
                        inspectChangePDS(settings,1)
                    }
                }
            })
        }

        container.appendChild(miniviewer)
    }
    createGalleryPDS(settings,PDS)

    document.body.appendChild(container)
}


function setErrorPDS(e) {
    e.src = `${e.src.slice(0,e.src.length - 4)}.jpg`
}


function loadMiniMenuPDS(settings) {
    if(settings.controls) {
        let miniviewer = document.getElementById('PDSminiview');
        PDSscale = 1
        PDSrotate = 0
        miniviewer.children[1].innerHTML = `${PDSimageIndex} / ${settings.fileCount}`
        if(!PDSdevice){
            miniviewer.children[4].innerHTML = '100%'
        }
    }
}


function changeScalePDS(e) {
    let image = document.getElementById('PDSinspectImage'),
    scaler = document.getElementById('PDSscaler')
    PDSscale += e
    PDSscale = Math.min(Math.max(PDSscale,0.25),3)
    scaler.innerHTML = `${(PDSscale * 100).toFixed(0)}%`
    image.style.transition = '0s, transform 0.08s'
    image.style.transformOrigin = 'center center'
    image.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(${PDSscale}) rotate(${PDSrotate}deg)`
}


function changeRotationPDS() {
    let image = document.getElementById('PDSinspectImage')
    PDSrotate -= 90
    image.style.transition = '0s, transform 0.15s'
    image.style.transformOrigin = 'center center'
    image.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(${PDSscale}) rotate(${PDSrotate}deg)`
}


function observePDS(options, observerFunc, intersector, settings, index) {
    let observer = new IntersectionObserver(function(e){
        observerFunc(e, observer, settings, index)
    }, options);    
        observer.observe(intersector);
}


function loadPDSimage(entries, observe, settings, index) {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.src = `${settings.path+(index+1)}.png`
            observe.unobserve(entry.target)
        }
    })
}


function PDSstyleCall(url, settings, load) {
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


function checkLoadedPDS() {
    return document.readyState === "complete";
}


function PDScssLoader() {
    if(PDSdevice){
        PDSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/PDS/${PDS_settings.style}PDSmobile.css`, PDS_settings, loadPDS)
    }else{
        PDSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/PDS/${PDS_settings.style}PDS.css`, PDS_settings, loadPDS)
    }
}

/*
if(checkLoadedPDS() == true) {
    PDScssLoader()
}


window.addEventListener("load", function() {
    setTimeout(() => {
        PDScssLoader()
    },300)
})
*/
PDScssLoader()