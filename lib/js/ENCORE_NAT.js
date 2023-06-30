/*!
 * ENCORE NAT
 * Author: NATSKI
 * MIT License
 */

/* MAIN VARIABLES USED IN ALL PAGES */
const colourbg = document.querySelector("#colourpanelback");
let preference = localStorage.getItem("performance");

/* CORE INITIAL LOADER */
if(preference!=='true') {
    let pageimg = document.getElementById('headerimage')
    if(pageimg.complete && pageimg.naturalHeight !== 0){
        setTimeout(() => {
            themeSystem(colourSystem(document.getElementById('headerimage')));
        }, 50);
        document.getElementById('headerimage').style.opacity = '1'
        setTimeout(() => {
            DSSloader()
            document.body.style.position ='unset'
            document.body.style.overflow ='unset'
        }, 605);
    }else{
        pageimg.onload = function(){
            setTimeout(() => {
                themeSystem(colourSystem(document.getElementById('headerimage')));
            }, 50);
            document.getElementById('headerimage').style.opacity = '1'
            setTimeout(() => {
                DSSloader()
                document.body.style.position ='unset'
                document.body.style.overflow ='unset'
            }, 605);
        }
    }
}else{
    document.getElementById('headerimage').style.opacity = '1'
    document.body.style.position ='unset'
    document.body.style.overflow ='unset'
}


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
    let colourlessbg = document.querySelector("#colourlesspanelback"),
    imagebox = document.querySelector(".imagebox");
    entries.forEach((entry) => {
      if(entry.intersectionRatio <= 0.7) {
        imagebox.style.transform = 'scale(0.7)'
      }else{
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
      createObserver({root: null,rootMargin: "-90px 0px 0px 0px",threshold: buildThresholdList()}, DSS, document.getElementsByClassName('observe'))
}


function themeSystem(e){
    colourbg.style.backgroundImage = "linear-gradient(to bottom,"+e+" 0.7),transparent)"
    colourbg.style.opacity = '1'
    parent.changeBar(e+' 1)')
    parent.unloader();
}


function colourSystem(e) { 
    if(preference!=='true') {
        let a, o, c, s, l = document.createElement("canvas"), 
        r = l.getContext && l.getContext("2d"), 
        n = {r: 0, g: 0, b: 0}, 
        i = 0;
        c = l.height = e.naturalHeight || e.offsetHeight || e.height, 
        o = l.width = e.naturalWidth || e.offsetWidth || e.width, 
        r.drawImage(e, 0, 0), 
        s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (let g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], 
        n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), 
        n.g = Math.floor(n.g / i), 
        n.b = Math.floor(n.b / i)
        return "rgba(" + n.r + "," + n.g + "," + n.b + ","
    }
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
        let slide = document.createElement('img')
        slide.className = classes
        slide.id = 'slidenumber'+i
        slide.draggable = false
        slide.src = path+(i+1)+'.png'
        slide.onload = function(){
            let tint = colourSystem(this)
            this.style.boxShadow = '0 0 45px '+ tint + " 0.7)"
            this.style.backgroundColor = tint + " 0.7)"
        }
        if(i<2) {
            slide.style.animation = "slide calc("+(i+1)+"*0.2s + 0.4s)";
        }
        document.querySelector('main').appendChild(slide)
    }
    createObserver({root: null,rootMargin: "-50px 0px 0px 0px"}, SDS, document.getElementsByClassName('scroller'))
}

function createSelector(slidenumber,path){
    for(let i = 0; i < slidenumber; i++){
        let selector = document.createElement('img')
        selector.src = path+(i+1)+'.png'
        selector.draggable = false
        selector.onclick=function(){
            scrollslide(i)
        }
        if(i<10) {
            selector.style.animation = "slide calc("+(i+1)+"*0.2s + 0.4s)";
        }
        document.querySelector('.slidecontainer').appendChild(selector) 
    }
}

function deviceCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

if(!deviceCheck()) {
    document.addEventListener('contextmenu', function(e){
        e.preventDefault()
        parent.openMenu(e)
    })
    
    document.addEventListener('click', function(e){
        parent.closeMenu(e)
    })
}