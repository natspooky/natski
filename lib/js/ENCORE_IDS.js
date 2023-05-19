/*!
 * ENCORE IMAGE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */


function imageTint(e) {  
        var a, o, c, s, l = document.createElement("canvas"), 
        r = l.getContext && l.getContext("2d"), 
        n = {r: 0, g: 0, b: 0}, 
        i = 0;
        c = l.height = e.naturalHeight || e.offsetHeight || e.height, o = l.width = e.naturalWidth || e.offsetWidth || e.width, 
        r.drawImage(e, 0, 0), 
        s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], 
        n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i)

    return "rgba(" + n.r + "," + n.g + "," + n.b + ","
}



function createGrid(slidenumber,path,classes,type){
    let values = [], y = 0, firstlength = (slidenumber - slidenumber % 4) / 4
    switch(type) {
        
        case 'video':
            for(let i = 0; i < slidenumber; i++){
                source = document.createElement('source')
                source.src = path+(i+1)+'.mp4'
                source.type = "video/mp4"
                display = document.createElement('video')
                display.preload = 'none'
                display.controls = true
                display.poster = path+(i+1)+'thumb.png'
                display.className = classes
                display.appendChild(source)
                values.push(display)
            }
            for(let z = 0; z < 4; z++){
                for(let x = 0; x < firstlength; x++){
                    document.getElementById('col'+ (3 - z)).appendChild(values[x + firstlength*z])
                }
            }
            for(let z = 0; z < slidenumber % 4; z++){
                document.getElementById('col'+(3 - z)).appendChild(values[z + firstlength*4])
            }  
            break;

        case 'image':
            for(let i = 0; i < slidenumber; i++){
                display = document.createElement('img')
                display.className = classes
                display.draggable = false
                display.onclick = function() {inspectTarget(path, (i+1))}
                display.src = path+(i+1)+'.png'
                values.push(display)
            }
            for(let z = 0; z < 4; z++){
                for(let x = 0; x < firstlength; x++){
                    document.getElementById('col'+ z).appendChild(values[x + firstlength*z])
                }
            }
            for(let z = 0; z < slidenumber % 4; z++){
                document.getElementById('col'+z).appendChild(values[z + firstlength*4])
            }
            break;
    }
    createObserver({root: null,rootMargin: "-50px 0px 0px 0px"}, SDS, $('.scroller'))
}

function SDS(entries) {
    entries.forEach(entry => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
        entry.target.style.transform = entry.isIntersecting ? "scale(1)" : "scale(0.85)"
    })
}


let imageIndex = 0;


function inspectTarget(path) {
    document.getElementById('inspectPanel').classList.add('active')
    imageIndex = indicator
    document.getElementById('inspectImage').src = path;
    inspectLoad()
}


function inspectLoad() {
    inspectimage = document.getElementById('inspectImage')
    if(1 == 1) {

    }
    inspectimage.style.transition = '0s'
    inspectimage.style.opacity = '0'
    inspectimage.onload = function() {
        setTimeout(() => {
            theme = imageTint(inspectimage)
            inspectimage.style.transition = '0.4s'
            inspectimage.style.opacity = '1'
            document.getElementById('inspectPanel').style.backgroundColor = theme + "0.4)"
            document.getElementById('inspectContainer').style.backgroundColor = theme + "0.9)"
        }, 100);
    }
}


function inspectChange(path, indicator) {
    if(imageIndex + indicator < 1 || imageIndex + indicator > document.getElementsByTagName('img').length -2){
        return
    }else{
        imageIndex += indicator
        document.getElementById('inspectImage').src = path + imageIndex + '.png';
        inspectLoad()
    }
}


if(window.innerHeight > window.innerWidth){}


function getAverageColor(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = img.naturalWidth;
    var height = canvas.height = img.naturalHeight;
  
    ctx.drawImage(img, 0, 0);
  
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    var r = 0;
    var g = 0;
    var b = 0;
  
    for (var i = 0, l = data.length; i < l; i += 4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }
  
    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));
  
    return { r: r, g: g, b: b };
  }
  