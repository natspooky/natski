/*!
 * ENCORE SLIDE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */
console.log('loading ENCORE_SDS')
console.log('ENCORE_SDS loaded')

function createSlides(slidenumber,path,classes){
    for(let i = 0; i < slidenumber; i++){
        slide = document.createElement('img')
        slide.className = classes
        slide.id = 'slidenumber'+i
        slide.src = path+(i+1)+'.png'
        if(i<2) {
            slide.style.animation = "slide calc("+(i+1)+"*0.2s + 0.4s)";
        }
        document.querySelector('main').appendChild(slide)
    }
    createObserver({root: null,rootMargin: "-50px 0px 0px 0px"}, SDS, $('.scroller'))
}

function createSelector(slidenumber,path){
    for(let i = 0; i < slidenumber; i++){
        selector = document.createElement('img')
        selector.src = path+(i+1)+'.png'
        selector.onclick=function(){
            scrollslide(i)
        }
        if(i<10) {
            selector.style.animation = "slide calc("+(i+1)+"*0.2s + 0.4s)";
        }
        document.querySelector('main').appendChild(slide)
        document.querySelector('.slidecontainer').appendChild(selector) 
    }
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
                display.onclick = function() {inspectTarget(path, (i+1), 'initial')}
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


function scrollslide(e) {
    document.getElementById('slidenumber'+e).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}


function SDS(entries) {
    entries.forEach(entry => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
        entry.target.style.transform = entry.isIntersecting ? "scale(1)" : "scale(0.85)"
    })
}

let imageIndex = 0;

function inspectTarget(path, indicator, type) {
    switch(type) {
        case 'initial':
            document.getElementById('targetContainer').classList.add('active')
            imageIndex = indicator
            document.getElementById('inspectImage').src = path + indicator;
            setTimeout(() => {
                document.getElementById('headerimage').style.opacity = '1'
            }, 100)
            
            break;
        case 'change':
            if(imageIndex + indicator < 1 || imageIndex + indicator > document.getElementsByClassName('colourimage')){
                return
            }else{
                imageIndex += indicator
                document.getElementById('inspectImage').src = path + imageIndex;
    
                setTimeout(() => {
                    document.getElementById('inspectImage').style.opacity = '1'
                }, 100)
                
            }
            break;
    }
}

function changeViewer(colour){
    document.getElementById('inspectImage').style.opacity = '1'
    document.getElementById('inspectPanel').style.backgroundColor = colour + "0.8)"
}