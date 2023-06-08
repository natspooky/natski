/*!
 * ENCORE PICTURE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_PDS')
let imageIndex = 0;


function imageTint(e) { 
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


function createGallery(settings,PDS){
    let values = [];
    for(let x = 0; x < 2; x++){
        let row = document.createElement('div')
        row.className = 'row'
        for(let i = 0; i < 2; i++) {
            let column = document.createElement('div')
            column.id = 'col'+ (i + 2*x)
            column.className = 'column'
            row.appendChild(column)
        }
        PDS.appendChild(row)
    }
    for(let i = 0; i < settings.fileCount; i++){
        let display = document.createElement('img')
        display.className = 'PDSimages '+settings.classes
        display.draggable = false
        display.style.opacity = '0'
        display.style.transition = 'opacity 1s, box-shadow 1s, background-color 1s, transform 0.2s'
        display.onclick = function() {inspectTarget(settings.path, (i+1), this)}
        display.onload = function() {imageload(this, settings)}
        display.src = settings.path+(i+1)+'.png'
        values.push(display)
    }
    for(let z = 0; z < Math.ceil(settings.fileCount / 4); z++){
        let y = Math.min(4,settings.fileCount - (4*z))
        for(let x = 0; x < y; x++){
            document.getElementById('col'+ x).appendChild(values[x + 4*z])
        }
    }
}


function imageload(e, settings) {
    setTimeout(() => {
        e.style.opacity = '1'; 
        if(settings.colourSystem == true) {
            let tint = imageTint(e)
            e.style.boxShadow = '0 0 45px '+ tint + " 0.7)"
            e.style.backgroundColor = tint + " 0.7)"
        }
    },500)
}


function inspectTarget(path, indicator, speificimage) {
    document.getElementById('inspectPanel').classList.add('active')
    imageIndex = indicator
    document.getElementById('inspectImage').src = path + indicator + '.png';
    inspectLoadInitial(path, speificimage)



}



function inspectLoad(path) {
    let inspectimage = document.getElementById('inspectImage')
    document.getElementById('inspectImage').src = path + imageIndex + '.png';
    inspectimage.style.transition = '0s'
    inspectimage.onerror = function() {
        document.getElementById('inspectPanel').classList.remove('active')
    }
    inspectimage.classList.remove('active')
    inspectimage.style.opacity = '0'
    inspectimage.onload = function() {
        if(inspectimage.clientWidth > window.innerWidth){
            inspectimage.classList.add('active')
        }
        let theme = imageTint(inspectimage)
        inspectimage.style.transition = '0.4s'
        inspectimage.style.opacity = '1'
        document.getElementById('inspectPanel').style.backgroundColor = theme + "0.6)"
        inspectimage.style.backgroundColor = theme + "0.8)"
    }
}


function inspectLoadInitial(path, speificimage) {
    let inspectimage = document.getElementById('inspectImage'),
    imagePos = speificimage.getBoundingClientRect(),
    top = imagePos.top,
    left = imagePos.left;
    document.getElementById('inspectImage').src = path + imageIndex + '.png';
    inspectimage.style.transition = '0s'
    inspectimage.style.top = top + speificimage.offsetHeight / 2 + 'px'
    inspectimage.style.left = left + speificimage.offsetWidth / 2 + 'px'
    inspectimage.onerror = function() {
        document.getElementById('inspectPanel').classList.remove('active')
    }
    inspectimage.classList.remove('active')
    inspectimage.style.opacity = '0'
    inspectimage.onload = function() {
        if(inspectimage.clientWidth > window.innerWidth){
            inspectimage.classList.add('active')
        }
        inspectimage.style.height = speificimage.offsetHeight + 'px'
        inspectimage.style.width = speificimage.offsetWidth + 'px'
        setTimeout(() => {
            inspectimage.style.opacity = '1'
            inspectimage.style.transition = '0.4s, opacity 0.1s'
            inspectimage.style.top = '50%'
            inspectimage.style.left = '50%'
            inspectimage.style.height = null
            inspectimage.style.width = null
        },10)

        let theme = imageTint(inspectimage)
        document.getElementById('inspectPanel').style.backgroundColor = theme + "0.6)"
        inspectimage.style.backgroundColor = theme + "0.8)"
    }
}




function inspectChange(path, indicator) {
    if(imageIndex + indicator < 1){
        imageIndex = document.getElementsByClassName('PDSimages').length
    }else if(imageIndex + indicator > document.getElementsByClassName('PDSimages').length){
        imageIndex = 1
    }else{
        imageIndex += indicator
    }
    inspectLoad(path)
}


function loadPDS(settings) {
    let PDS = document.getElementById('PDS'),
    closer = document.createElement('section'),
    mainimage = document.createElement('img'),
    container = document.createElement('div'),
    page = [-1,1],
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>']
    createGallery(settings,PDS)
    closer.onclick = function() {document.getElementById('inspectPanel').classList.remove('active')}
    mainimage.id = 'inspectImage'
    mainimage.draggable = false
    container.id = 'inspectPanel'
    container.appendChild(closer)
    container.appendChild(mainimage)
    for(let i = 0; i < 2; i++){
        let pagebuttons = document.createElement('button')
        pagebuttons.innerHTML = icons[i]
        pagebuttons.onclick = function(){inspectChange(settings.path,page[i])}
        pagebuttons.className = 'PDSbuttons'
        container.appendChild(pagebuttons)
    }
    document.body.appendChild(container)
}


const PDScall = new XMLHttpRequest();
function PDSstyler(settings) {
    let style = document.createElement('style');
    style.innerHTML = PDScall.responseText;
    document.getElementById('PDS').appendChild(style)
    loadPDS(settings)
}


function PDSstyleCall(url, settings) {
    PDScall.open('GET', url);
    PDScall.onloadend = function(){PDSstyler(settings)};
    PDScall.send();
}


window.addEventListener("load", function() {
    setTimeout(() => {
        PDSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+PDS_settings.style+'.txt', PDS_settings)
        console.log('ENCORE_PDS loaded')
    },300)
})


