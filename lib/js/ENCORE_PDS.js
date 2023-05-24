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
    let values = [], firstlength = ((settings.fileCount - settings.fileCount % 4) / 4)
    for(let x = 0; x < 2; x++){
        row = document.createElement('div')
        row.className = 'row'
        for(let i = 0; i < 2; i++) {
            column = document.createElement('div')
            column.id = 'col'+ (i + 2*x)
            column.className = 'column'
            row.appendChild(column)
        }
        PDS.appendChild(row)
    }
    for(let i = 0; i < settings.fileCount; i++){
        display = document.createElement('img')
        display.className = settings.classes+ ' PDSimages'
        display.draggable = false
        display.style.opacity = '0'
        display.style.transition = 'opacity 1s, box-shadow 1s, background-color 1s, transform 0.2s'
        display.onclick = function() {inspectTarget(settings.path, (i+1))}
        display.onload = function() {imageload(this, settings)}
        display.src = settings.path+(i+1)+'.png'
        values.push(display)
    }
    for(let z = 0; z < Math.ceil(settings.fileCount / 4); z++){
        y = Math.min(4,settings.fileCount - (4*z))
        for(let x = 0; x < y; x++){
            document.getElementById('col'+ x).appendChild(values[x + 4*z])
        }
    }
}


function imageload(e, settings) {
    setTimeout(() => {
    e.style.opacity = '1'; 
    if(settings.colourSystem == true){
        tint = imageTint(e); 
        e.style.boxShadow = '0 0 40px '+ tint + " 0.7)"; 
        e.style.backgroundColor = tint + " 0.7)"
    }    
    },500)
    
}

function inspectTarget(path, indicator) {
    document.getElementById('inspectPanel').classList.add('active')
    imageIndex = indicator
    document.getElementById('inspectImage').src = path + indicator + '.png';
    inspectLoad(path)
}


function inspectLoad(path) {
    document.getElementById('inspectImage').src = path + imageIndex + '.png';
    inspectimage = document.getElementById('inspectImage')
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
        setTimeout(() => {
            theme = imageTint(inspectimage)
            inspectimage.style.transition = '0.4s'
            inspectimage.style.opacity = '1'
            document.getElementById('inspectPanel').style.backgroundColor = theme + "0.6)"
            inspectimage.style.backgroundColor = theme + "0.8)"
        }, 100);
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
    styleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+settings.style+'.txt')
    PDS = document.getElementById('PDS')
    createGallery(settings,PDS)
    closer = document.createElement('section')
    mainimage = document.createElement('img')
    container = document.createElement('div')
    closer.onclick = function() {document.getElementById('inspectPanel').classList.remove('active')}
    mainimage.id = 'inspectImage'
    mainimage.draggable = false
    container.id = 'inspectPanel'
    container.style.display = 'none'
    container.appendChild(closer)
    container.appendChild(mainimage)
    page = [-1,1]
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>']
    for(let i = 0; i < 2; i++){
        pagebuttons = document.createElement('button')
        pagebuttons.innerHTML = icons[i]
        pagebuttons.onclick = function(){inspectChange(settings.path,page[i])}
        pagebuttons.className = 'PDSbuttons'
        container.appendChild(pagebuttons)
    }
    document.body.appendChild(container)
}


const PDScall = new XMLHttpRequest();
const styler = function() {
    style = document.createElement('style')
    style.innerHTML = PDScall.responseText;
    document.getElementById('PDS').appendChild(style)
    document.getElementById('inspectPanel').style.display = 'flex'
}


function styleCall(url) {
    PDScall.open('GET', url);
    PDScall.onloadend = styler;
    PDScall.send();
}


window.addEventListener("load", function() {
    loadPDS(PDS_settings)
    console.log('ENCORE_PDS loaded')
})
