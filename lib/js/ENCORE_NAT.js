/*!
 * ENCORE NAT
 * Author: NATSKI
 * MIT License
 */

/* MAIN VARIABLES USED IN ALL PAGES */
const colourbg = document.querySelector("#colourpanelback"),
imagebox = document.querySelector(".imagebox"),
colourlessbg = document.querySelector("#colourlesspanelback");

let preference = localStorage.getItem("performance");


/* CORE INITIAL LOADER */
$('#headerimage').imagesLoaded()
.done(function() {
    if(preference!=='true') {
        setTimeout(() => {
            themeSystem(colourSystemAlpha($('#headerimage')));
            parent.unloader();
        }, 100);
    }
    document.getElementById('headerimage').style.opacity = '1'
}).then(function() {
    setTimeout(() => {
        DSSloader()
        $('body').css({'position':'unset','overflow':'unset'})
        $('.colourimage').imagesLoaded().done(function() {
            if(preference!=='true') {
                //colourSystemBeta($('.colourimage'));
            }
        })
    }, 605);
})


function createObserver(options, observerFunc, intersector) {
    if(preference!=='true') {
    let observer = new IntersectionObserver(observerFunc, options);
    for(let i = 0; i < intersector.length; i++){
      observer.observe(intersector[i]);
    }}
}


function buildThresholdList() {
    let thresholds = [],
    numSteps = 50;
    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}


/* DYNAMIC SCALE SYSTEM */
function DSS(entries) {
    entries.forEach((entry) => {
      if(entry.intersectionRatio <= 0.7) {
        imagebox.style.transform = 'scale(0.7)'
      }else {
        imagebox.style.transform = 'scale('+entry.intersectionRatio+')'
      }
      colourbg.style.opacity = entry.intersectionRatio
      colourlessbg.style.opacity = 1 - entry.intersectionRatio
      imagebox.style.opacity = entry.intersectionRatio
    });
}


/* SLIDE DISPLAY SYSTEM */
function SDS(entries) {
    entries.forEach(entry => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
        entry.target.style.transform = entry.isIntersecting ? "scale(1)" : "scale(0.85)"
    })
}


function DSSloader(){
      colourbg.style.transition = '0s'
      createObserver({root: null,rootMargin: "-90px 0px 0px 0px",threshold: buildThresholdList()}, DSS, $('.observe'))
}


function themeSystem(e){
    document.getElementById('colourpanelback').style.opacity = '1'
    document.getElementById('colourpanelback').style.backgroundImage = "linear-gradient(to bottom,"+e+" 0.7),transparent)"
    parent.changeBar(e+' 1)')
}


function colourSystemBeta(e) {  
    for (let t = 0; t < e.length; t++) {
        var a, o, c, s, l = document.createElement("canvas"), r = l.getContext && l.getContext("2d"), n = {r: 0, g: 0, b: 0}, i = 0;
        c = l.height = e[t].naturalHeight || e[t].offsetHeight || e[t].height, o = l.width = e[t].naturalWidth || e[t].offsetWidth || e[t].width, r.drawImage(e[t], 0, 0), s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i), e[t].style.boxShadow = '0 0 40px '+"rgba(" + n.r + "," + n.g + "," + n.b + ", 0.7)", e[t].style.backgroundColor = "rgba(" + n.r + "," + n.g + "," + n.b + ", 0.7)"
    }
}


function colourSystemAlpha(e) {  
    for (let t = 0; t < e.length; t++) {
        var a, o, c, s, l = document.createElement("canvas"), r = l.getContext && l.getContext("2d"), n = {r: 0, g: 0, b: 0}, i = 0;
        c = l.height = e[t].naturalHeight || e[t].offsetHeight || e[t].height, o = l.width = e[t].naturalWidth || e[t].offsetWidth || e[t].width, r.drawImage(e[t], 0, 0), s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i)
    }
    return "rgba(" + n.r + "," + n.g + "," + n.b + ","
}






/* make into its own package?*/
function scrollslide(e) {
    document.getElementById('slidenumber'+e).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function SDSloader(slidenumber,path,classes){
    for(let i = 0; i < slidenumber; i++){
        slide = document.createElement('img')
        slide.className = classes
        slide.id = 'slidenumber'+i
        slide.draggable = false
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
        selector.draggable = false
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