/*!
 * ENCORE PICTURE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

let PDSimageIndex = 0,
PDSscale,
PDStransformY,
PDStransformX,
PDSisDown = false,
PDSstartX,
PDSstartY;


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
    return "rgba(" + n.r + "," + n.g + "," + n.b + ","
}


function createGalleryPDS(settings,PDS){
    createTemplatePDS(PDS)
    displayImagesPDS(settings, createImagesPDS(settings))
}


function createTemplatePDS(PDS) {
    let rowNum, colNum;
    if(PDSdevice) {
        rowNum = 1
        colNum = 4
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
            display.onclick = function() {inspectTargetAniPDS(settings.path, (i+1), this);loadMiniMenuPDS(settings)}
        }else {
            display.onclick = function() {inspectTargetPDS(settings.path, (i+1));loadMiniMenuPDS(settings)}
        }
        display.onload = function() {imageloadPDS(this, settings)}
        display.src = `${settings.path+(i+1)}.png`
        values.push(display)
    }
    return values
}

function displayImagesPDS(settings,values) {
    let avgimage = Math.ceil(settings.fileCount / 4),
    column = document.getElementsByClassName('PDScolumn');
    for(let z = 0; z < avgimage; z++){
        let y = Math.min(4,settings.fileCount - (4*z));
        for(let x = 0; x < y; x++){
            column[x].appendChild(values[x + 4*z])
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
    },500)
}

function inspectTargetAniPDS(path, indicator, speificimage) {
    document.getElementById('PDSinspectPanel').classList.add('active')
    PDSimageIndex = indicator
    inspectLoadInitialPDS(path, speificimage)
}

function inspectTargetPDS(path, indicator) {
    document.getElementById('PDSinspectPanel').classList.add('active')
    PDSimageIndex = indicator
    inspectLoadPDS(path)
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


function inspectLoadPDS(path) {
    let inspectimage = document.getElementById('PDSinspectImage'),
    inspectPanel = document.getElementById('PDSinspectPanel'),
    loader = document.getElementById('PDSloader');

    resetAniPDS(loader, inspectimage)

    inspectimage.onload = function() {
        imageScalePDS(loader, inspectimage, inspectPanel)

        PDStransformY = (inspectPanel.offsetHeight / 2) - inspectimage.offsetHeight / 2,
        PDStransformX = (inspectPanel.offsetWidth / 2) - inspectimage.offsetWidth / 2


        inspectimage.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(1)`

        inspectimage.style.transition = '0.4s, background-color 0.1s, opacity 0.4s, transform 0s'
        inspectimage.style.opacity = '1'
        inspectimage.style.backgroundColor = `${imageTintPDS(inspectimage)}0.8)`
    }
    
    inspectimage.src = path + PDSimageIndex + '.png';
}

function inspectLoadInitialPDS(path, speificimage) {
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

        inspectimage.style.backgroundColor = `${imageTintPDS(inspectimage)}0.8)`
    }

    inspectimage.src = `${path + PDSimageIndex}.png`
}


function animationStartPDS(inspectimage, speificimage, left, top, playAnimationPDS){

    inspectimage.style.transform = `translate(${left}px,${top}px) scale(${speificimage.offsetHeight / inspectimage.offsetHeight})`

    PDStransformY = (window.innerHeight / 2) - inspectimage.offsetHeight / 2,
    PDStransformX = (window.innerWidth / 2) - inspectimage.offsetWidth / 2

    playAnimationPDS(inspectimage, PDStransformX, PDStransformY)
}


function playAnimationPDS(inspectimage, windowLeft, windowTop){
    inspectimage.style.transition = '0.5s cubic-bezier(.33,.7,.42,.99), background-color 0s, opacity 0.2s'
    inspectimage.style.transitionDelay = '0.2s'
    inspectimage.style.opacity = '1'
    inspectimage.style.transform = `translate(${windowLeft}px,${windowTop}px) scale(1)`
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
    inspectLoadPDS(settings.path)
}


function loadPDS(settings) {
    let PDS = document.getElementById('PDS'),
    closer = document.createElement('section'),
    mainimage = document.createElement('img'),
    container = document.createElement('div'),
    miniviewer = document.createElement('div'),
    counter = document.createElement('span'),
    scaler = document.createElement('span'),
    loader = document.createElement('span'),
    page = [-1,1,-0.25,0.25],
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M368.49,808.11L16.51,456.13c-22.01-22.01-22.01-57.69,0-79.7L368.49,24.44c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118L212.65,416.28l273.84,273.83c32.59,32.58,32.59,85.42,0,118h0c-32.59,32.59-85.42,32.59-118,0h0Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.93 832.56"><path d="M142.44,24.44L494.42,376.42c22.01,22.01,22.01,57.69,0,79.7L142.44,808.11c-32.58,32.59-85.42,32.59-118,0h0c-32.59-32.59-32.59-85.42,0-118L298.28,416.27,24.44,142.44C-8.15,109.86-8.15,57.02,24.44,24.44h0c32.59-32.59,85.42-32.59,118,0h0Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 151.71"><rect y="0" width="616.14" height="151.71" rx="75.85" ry="75.85"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 616.14"><path d="M308.11,616.14c-20.97,.01-39.96-8.48-53.7-22.22-13.74-13.74-22.21-32.68-22.22-53.61l.04-156.32-156.32-.04C34.01,383.97,.02,350.02,0,308.11c-.02-20.97,8.49-39.95,22.22-53.69s32.67-22.22,53.61-22.22l156.32,.04,.04-156.31C232.17,34.02,266.12,.03,308.03,0c20.97-.01,39.95,8.49,53.69,22.22,13.74,13.74,22.22,32.68,22.23,53.61l-.04,156.31,156.32,.05c41.9-.02,75.89,33.93,75.91,75.83,.01,20.97-8.48,39.96-22.22,53.7s-32.68,22.21-53.61,22.22l-156.32-.05-.04,156.32c.03,41.9-33.92,75.89-75.83,75.91Z"/></svg>']
    closer.onclick = function() {document.getElementById('PDSinspectPanel').classList.remove('active');document.getElementById('PDSloader').style.display = 'none'}
    mainimage.id = 'PDSinspectImage'
    mainimage.draggable = false
    mainimage.onerror = function(){
        this.src = `${this.src.slice(0,this.src.length - 4)}.jpg`
    }
    container.id = 'PDSinspectPanel'
    loader.id = 'PDSloader'
    container.appendChild(closer)
    container.appendChild(loader)
    container.appendChild(mainimage)

    if(settings.controls) {
        if(!PDSdevice){
            mainimage.style.cursor = 'grab'
            mainimage.addEventListener('mousedown', (e) => {
                PDSisDown = true;
                PDSstartX = e.pageX - PDStransformX;
                PDSstartY = e.pageY - PDStransformY;
                mainimage.style.transition = '0s'
            });
            
            mainimage.addEventListener('mouseleave', () => {
                PDSisDown = false;
            });
            
            mainimage.addEventListener('mouseup', () => {
                PDSisDown = false;
            });
            
            mainimage.addEventListener('mousemove', (e) => {
                if(!PDSisDown) return;
                e.preventDefault();
                let x = e.pageX,
                y = e.pageY;
                PDStransformX = (x - PDSstartX)
                PDStransformY = (y - PDSstartY)
                mainimage.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(${PDSscale})`;
            });
        }
        scaler.id = 'PDSscaler'
        scaler.innerHTML = '100%'
        counter.id = 'PDScounter'
        miniviewer.id = 'PDSminiview'
        for(let i = 0; i < 2; i++){
            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[i]
            pagebuttons.onclick = function(){inspectChangePDS(settings,page[i])}
            pagebuttons.className = 'PDSbuttons'
            container.appendChild(pagebuttons)

            let minipagebuttons = document.createElement('button');
            minipagebuttons.onclick = function(){inspectChangePDS(settings,page[i])}
            minipagebuttons.innerHTML = icons[i + 2]
            if(i == 1) {
                miniviewer.appendChild(counter)
            }
            miniviewer.appendChild(minipagebuttons)
        }
        if(!PDSdevice){
            for(let i = 0; i < 2; i++){
                let pagebuttons = document.createElement('button')
                pagebuttons.innerHTML = icons[i + 4]
                pagebuttons.onclick = function(){changeScalePDS(page[i + 2])}
    
                if(i == 1) {
                    miniviewer.appendChild(scaler)
                }
                miniviewer.appendChild(pagebuttons)
            }
        }

        container.appendChild(miniviewer)
    }
    createGalleryPDS(settings,PDS)

    document.body.appendChild(container)
}


function loadMiniMenuPDS(settings) {
    if(settings.controls) {
        let miniviewer = document.getElementById('PDSminiview');
        PDSscale = 1
        miniviewer.children[1].innerHTML = `${PDSimageIndex} / ${settings.fileCount}`
        if(!PDSdevice){
            miniviewer.children[4].innerHTML = '100%'
        }
    }
}

function changeScalePDS(e){
    let image = document.getElementById('PDSinspectImage'),
    scaler = document.getElementById('PDSscaler')
    PDSscale += e
    if(PDSscale <= 0){
        PDSscale = 0.25
    }
    else if(PDSscale >= 3){
        PDSscale = 3
    }
    scaler.innerHTML = `${PDSscale * 100}%`
    image.style.transition = '0s'
    image.style.transformOrigin = 'center center'
    image.style.transform = `translate(${PDStransformX}px,${PDStransformY}px) scale(${PDSscale})`
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
        PDSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+PDS_settings.style+'PDSmobile.css', PDS_settings, loadPDS)
    }else{
        PDSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+PDS_settings.style+'PDS.css', PDS_settings, loadPDS)
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

