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
    for (let g = 0; g < s; g += 12) n.r += a.data[g], n.g += a.data[g + 1], 
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
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M648.08,808.74c0,10.6-4,21.19-12.01,29.33-16.27,16.52-43.5,16.11-59.9-.28L229.58,491.2c-36.36-36.36-36.36-95.32,0-131.68L576.69,12.41c8.17-8.17,18.87-12.25,29.57-12.25s21.4,4.08,29.57,12.25c16.33,16.33,16.33,42.8,0,59.13L304.32,403.06c-12.31,12.31-12.31,32.28,0,44.59l331.52,331.52c8.17,8.17,12.25,18.87,12.25,29.57Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M202.31,41.69c0-10.6,4-21.19,12.01-29.33,16.27-16.52,43.5-16.11,59.9,.28l346.59,346.59c36.36,36.36,36.36,95.32,0,131.68l-347.11,347.11c-8.17,8.17-18.87,12.25-29.57,12.25s-21.4-4.08-29.57-12.25c-16.33-16.33-16.33-42.8,0-59.13l331.52-331.52c12.31-12.31,12.31-32.28,0-44.59L214.56,71.26c-8.17-8.17-12.25-18.87-12.25-29.57Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M838.15,779.03l-177.53-177.52c50.49-63.33,80.66-143.56,80.66-230.85C741.28,165.96,575.34,.02,370.64,.02S0,165.96,0,370.66s165.94,370.64,370.64,370.64c87.29,0,167.52-30.17,230.85-80.66l177.52,177.53c16.33,16.33,42.81,16.33,59.14,0s16.33-42.81,0-59.14Zm-203.02-296.68c-14.45,34.17-35.15,64.87-61.54,91.26s-57.09,47.09-91.26,61.54c-35.33,14.95-72.91,22.53-111.69,22.53s-76.36-7.58-111.7-22.53c-34.16-14.45-64.87-35.15-91.25-61.54-26.39-26.39-47.1-57.09-61.55-91.26-14.94-35.33-22.52-72.91-22.52-111.69s7.58-76.36,22.52-111.7c14.45-34.16,35.16-64.87,61.55-91.25,26.38-26.39,57.09-47.1,91.25-61.55,35.34-14.94,72.91-22.52,111.7-22.52s76.36,7.58,111.69,22.52c34.17,14.45,64.87,35.16,91.26,61.55,26.39,26.38,47.09,57.09,61.54,91.25,14.95,35.34,22.53,72.91,22.53,111.7s-7.58,76.36-22.53,111.69Z"/><rect x="153.54" y="328.84" width="434.19" height="83.63" rx="41.81" ry="41.81"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M838.15,779.03l-177.53-177.52c50.49-63.33,80.66-143.56,80.66-230.85C741.28,165.96,575.34,.02,370.64,.02S0,165.96,0,370.66s165.94,370.64,370.64,370.64c87.29,0,167.52-30.17,230.85-80.66l177.52,177.53c16.33,16.33,42.81,16.33,59.14,0s16.33-42.81,0-59.14Zm-203.02-296.68c-14.45,34.17-35.15,64.87-61.54,91.26s-57.09,47.09-91.26,61.54c-35.33,14.95-72.91,22.53-111.69,22.53s-76.36-7.58-111.7-22.53c-34.16-14.45-64.87-35.15-91.25-61.54-26.39-26.39-47.1-57.09-61.55-91.26-14.94-35.33-22.52-72.91-22.52-111.69s7.58-76.36,22.52-111.7c14.45-34.16,35.16-64.87,61.55-91.25,26.38-26.39,57.09-47.1,91.25-61.55,35.34-14.94,72.91-22.52,111.7-22.52s76.36,7.58,111.69,22.52c34.17,14.45,64.87,35.16,91.26,61.55,26.39,26.38,47.09,57.09,61.54,91.25,14.95,35.34,22.53,72.91,22.53,111.7s-7.58,76.36-22.53,111.69Z"/><path d="M587.73,370.66c0,23.09-18.72,41.81-41.81,41.81h-133.47v133.47c0,23.09-18.72,41.81-41.81,41.81s-41.82-18.72-41.82-41.81v-133.47H195.36c-23.1,0-41.82-18.72-41.82-41.81,0-11.55,4.68-22,12.25-29.57s18.02-12.25,29.57-12.25h133.46V195.38c0-23.1,18.72-41.82,41.82-41.82,11.54,0,22,4.68,29.56,12.25,7.57,7.57,12.25,18.02,12.25,29.57v133.46h133.47c23.09,0,41.81,18.72,41.81,41.82Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M588.5,169.23H261.9c-51.19,0-92.69,41.49-92.69,92.68v326.61c0,51.19,41.5,92.69,92.69,92.69h326.61c51.19,0,92.68-41.5,92.68-92.69V261.91c0-51.19-41.49-92.68-92.68-92.68Zm9.05,388.29c0,22.08-17.9,39.97-39.98,39.97H292.82c-22.08,0-39.98-17.89-39.98-39.97V292.92c0-22.08,17.9-39.98,39.98-39.98h264.76c22.08,0,39.98,17.9,39.98,39.98v264.6Z"/><path d="M397.83,850.41h-140.81C115.07,850.41,0,735.34,0,593.4v-140.81C0,437.47,12.25,425.22,27.36,425.22h28.99c15.11,0,27.36,12.25,27.36,27.36v127.37c0,103.14,83.61,186.75,186.75,186.75h127.37c15.11,0,27.36,12.25,27.36,27.36v28.99c0,15.11-12.25,27.36-27.36,27.36Z"/><path d="M452.56,.02h140.81C735.32,.02,850.39,115.09,850.39,257.04v140.81c0,15.11-12.25,27.36-27.36,27.36h-28.99c-15.11,0-27.36-12.25-27.36-27.36v-127.37c0-103.14-83.61-186.75-186.75-186.75h-127.37c-15.11,0-27.36-12.25-27.36-27.36V27.38C425.2,12.27,437.45,.02,452.56,.02Z"/></svg>']
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
    closer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.91 850.91"><path d="M838.33,779.56c11.76,11.76,11.76,30.84,0,42.6l-16.65,16.65c-11.76,11.76-30.84,11.76-42.6,0l-342.55-342.55c-6.24-6.24-16.37-6.24-22.61,0L71.36,838.81c-11.77,11.76-30.84,11.76-42.61,0l-16.64-16.65c-11.77-11.76-11.77-30.84,0-42.6l342.55-342.55c6.24-6.24,6.24-16.37,0-22.61L12.11,71.84C.34,60.07.34,41,12.11,29.23L28.75,12.59c11.77-11.77,30.84-11.77,42.61,0l342.55,342.55c6.24,6.24,16.37,6.24,22.61,0L779.08,12.59c11.76-11.77,30.84-11.77,42.6,0l16.65,16.64c11.76,11.77,11.76,30.84,0,42.61l-342.55,342.55c-6.24,6.24-6.24,16.37,0,22.61l342.55,342.55Z"/></svg>'
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


if(checkLoadedPDS() == true) {
    PDScssLoader()
}


window.addEventListener("load", function() {
    setTimeout(() => {
        PDScssLoader()
    },300)
})
