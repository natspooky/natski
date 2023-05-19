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
}



let imageIndex = 0;


function inspectTarget(path, indicator) {
    document.getElementById('inspectPanel').classList.add('active')
    imageIndex = indicator
    document.getElementById('inspectImage').src = path + indicator + '.png';
    inspectLoad()
}


function inspectLoad() {
    inspectimage = document.getElementById('inspectImage')
    console.log(checkImage(inspectimage))
    if(checkImage(inspectimage)) {
        if(window.innerHeight > window.innerWidth){
            document.getElementById('inspectContainer').style.height = 'unset'
            document.getElementById('inspectContainer').style.width = '95vw'
        }else{
            document.getElementById('inspectContainer').style.height = '80vh'
            document.getElementById('inspectContainer').style.width = 'unset'
        }
    }else{
        if(window.innerHeight > window.innerWidth){
            document.getElementById('inspectContainer').style.height = 'unset'
            document.getElementById('inspectContainer').style.width = '90vw'
        }else{
            document.getElementById('inspectContainer').style.height = '70vh'
            document.getElementById('inspectContainer').style.width = 'unset'
        }
    }
    inspectimage.style.transition = '0s'
    inspectimage.onerror = function() {
        document.getElementById('inspectContainer').style.height = '200px'
        document.getElementById('inspectContainer').style.width = '200px'
    }
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



function checkImage(img) {
    let w = img.naturalWidth || img.width,
        h = img.naturalHeight || img.height;
    return (h > w);
}


function createViewer() {

}

window.addEventListener("orientationchange", function() {
    inspectLoad()
});