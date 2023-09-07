/*!
 * ENCORE PICTURE DISPLAY SYSTEM ULT
 * Author: NATSKI
 * MIT License
 */


let PDSUimageIndex=0;function deviceCheckPDSU(){var e;let t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}function iOSspecificPDSU(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}let PDSUdevice=deviceCheckPDSU()||iOSspecificPDSU();function reloadPDSU(e){document.getElementById("PDSUinspectPanel").remove(),loadPDSU(e)}function imageTintPDSU(e){let t,i,a,n,l=document.createElement("canvas"),s=l.getContext&&l.getContext("2d"),o={r:0,g:0,b:0},c=0;a=l.height=e.naturalHeight||e.offsetHeight||e.height,i=l.width=e.naturalWidth||e.offsetWidth||e.width,s.drawImage(e,0,0),n=(t=s.getImageData(0,0,i,a)).data.length;for(let r=0;r<n;r+=4)o.r+=t.data[r],o.g+=t.data[r+1],o.b+=t.data[r+2],c++;return o.r=Math.floor(o.r/c),o.g=Math.floor(o.g/c),o.b=Math.floor(o.b/c),"rgba("+o.r+","+o.g+","+o.b+","}function inspectTargetAniPDSU(e,t,i){document.getElementById("PDSUinspectPanel").classList.add("active"),PDSUimageIndex=t,inspectLoadInitialPDSU(e,i)}function inspectTargetPDSU(e,t){document.getElementById("PDSUinspectPanel").classList.add("active"),PDSUimageIndex=t,inspectLoadPDSU(e)}function imageScalePDS(e,t,i){e.style.display="none",t.clientWidth+40>i.offsetWidth&&t.classList.add("active")}function resetAniPDS(e,t){e.style.display="block",t.style.transition="0s",t.style.opacity="0",t.classList.remove("active")}function imageAttachErrorPDS(e,t,i){t.onerror=function(){i.classList.remove("active"),e.style.display="none",t.classList.remove("active")}}function inspectLoadPDSU(e){let t=document.getElementById("PDSUinspectImage"),i=document.getElementById("PDSUinspectPanel"),a=document.getElementById("PDSUloader"),n=document.getElementsByClassName(e.imageClass);resetAniPDS(a,t),t.style.top="50%",t.style.left="50%",imageAttachErrorPDS(a,t,i),t.onload=function(){imageScalePDS(a,t,i),t.style.transition="0.4s, background-color 0.1s, opacity 0.4s",t.style.opacity="1",t.style.backgroundColor=imageTintPDSU(t)+"0.8)"},t.src=n[PDSUimageIndex-1].src}function inspectLoadInitialPDSU(e,t){let i=document.getElementById("PDSUinspectImage"),a=document.getElementById("PDSUinspectPanel"),n=document.getElementsByClassName(e.imageClass),l=document.getElementById("PDSUloader"),s=t.getBoundingClientRect(),o=s.top,c=s.left;resetAniPDS(l,i),i.style.top=`${o+t.offsetHeight/2}px`,i.style.left=`${c+t.offsetWidth/2}px`,imageAttachErrorPDS(l,i,a),i.onload=function(){imageScalePDS(l,i,a),i.style.height=`${t.offsetHeight}px`,i.style.width=`${t.offsetWidth}px`,setTimeout(()=>{i.style.opacity="1",i.style.transition="0.6s cubic-bezier(.45,.13,.16,1.4), background-color 0s, opacity 0.1s",i.style.top="50%",i.style.left="50%",i.style.height=null,i.style.width=null},10),i.style.backgroundColor=imageTintPDSU(i)+"0.8)"},i.src=n[PDSUimageIndex-1].src}function inspectChangePDSU(e,t){let i=document.getElementsByClassName(e.imageClass).length;PDSUimageIndex+t<1?PDSUimageIndex=i:PDSUimageIndex+t>i?PDSUimageIndex=1:PDSUimageIndex+=t,loadMiniImagesPDSU(e,PDSUimageIndex),inspectLoadPDSU(e)}function loadPDSU(e){let t=document.createElement("section"),i=document.createElement("img"),a=document.createElement("div"),n=document.createElement("div"),l=document.createElement("a"),s=document.createElement("span"),o=document.createElement("span"),c=[-1,1],r=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>'];if(t.onclick=function(){document.getElementById("PDSUinspectPanel").classList.remove("active"),document.getElementById("PDSUloader").style.display="none"},i.id="PDSUinspectImage",i.draggable=!1,a.id="PDSUinspectPanel",o.id="PDSUloader",a.appendChild(t),a.appendChild(o),a.appendChild(i),e.controls){s.id="PDSUcounter",n.id="PDSUminiview",a.appendChild(s),a.appendChild(n);for(let d=0;d<2;d++){let m=document.createElement("button");m.innerHTML=r[d],m.onclick=function(){inspectChangePDSU(e,c[d])},m.className="PDSUbuttons",a.appendChild(m)}}l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>',l.className="PDSUinfoButton",l.href="https://natski.netlify.app/ENCORE%20V1.html#PDS",l.target="_blank",l.ariaLabel="information",a.appendChild(l),document.body.appendChild(a),connectPDSU(e),createObserverPDSU()}function loadMiniImagesPDSU(e,t){let i=document.getElementById("PDSUminiview"),a=document.getElementsByClassName(e.imageClass);if(e.controls&&(document.getElementById("PDSUcounter").innerHTML=PDSUimageIndex+" / "+a.length,i.innerHTML="",a.length>1))for(let n=t-1;n<=t+1;n++){let l=document.createElement("img");l.className="PDSUimageTile",l.draggable=!1,n>a.length?(l.src=a[n-a.length-1].src,l.dataset.tileNumber=n-a.length):n<=0?(l.src=a[a.length+n-1].src,l.dataset.tileNumber=a.length+n):(l.src=a[n-1].src,l.dataset.tileNumber=n);let s=parseInt(l.dataset.tileNumber);l.onclick=function(){inspectTargetPDSU(e,s),loadMiniImagesPDSU(e,s)},i.appendChild(l)}}function createObserverPDSU(){let e=new MutationObserver(dataAddedPDSU);e.observe(document,{attributes:!1,childList:!0,characterData:!1,subtree:!0})}function dataAddedPDSU(e){e.forEach(function(e){e.addedNodes.forEach(function(e){if("function"!=typeof e.getElementsByTagName)return;let t=e.getElementsByTagName("img");Array.prototype.forEach.call(t,e=>{connectPDSU(PDSU_settings)})})})}function connectPDSU(e){let t=document.getElementsByClassName(e.imageClass),i=t.length;for(let a=0;a<i;a++)e.animations?t[a].onclick=function(){inspectTargetAniPDSU(e,a+1,this),loadMiniImagesPDSU(e,a+1)}:t[a].onclick=function(){inspectTargetPDSU(e,a+1),loadMiniImagesPDSU(e,a+1)},t[a].style.cursor="pointer"}function PDSUstyleCall(e,t,i){let a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.href=e,document.getElementsByTagName("head")[0].appendChild(a);let n=document.createElement("img");n.onerror=function(){i&&i(t)},n.src=e}function checkLoadedPDSU(){return"complete"===document.readyState}function PDSUcssLoader(){PDSUdevice?PDSUstyleCall("https://natski.netlify.app/lib/ENCORE_DB/PDS/"+PDSU_settings.style+"PDSUmobile.css",PDSU_settings,loadPDSU):PDSUstyleCall("https://natski.netlify.app/lib/ENCORE_DB/PDS/"+PDSU_settings.style+"PDSU.css",PDSU_settings,loadPDSU)}!0==checkLoadedPDSU()&&PDSUcssLoader(),window.addEventListener("load",function(){setTimeout(()=>{PDSUcssLoader()},300)});

/*
let PDSUimageIndex = 0;


function deviceCheckPDSU() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


function iOSspecificPDSU() {
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


let PDSUdevice = deviceCheckPDSU() || iOSspecificPDSU();


function reloadPDSU(settings) {
    document.getElementById('PDSUinspectPanel').remove()
    loadPDSU(settings)
}


function imageTintPDSU(e) {
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


function inspectTargetAniPDSU(settings, indicator, speificimage) {
    document.getElementById('PDSUinspectPanel').classList.add('active')
    PDSUimageIndex = indicator
    inspectLoadInitialPDSU(settings, speificimage)
}

function inspectTargetPDSU(settings, indicator) {
    document.getElementById('PDSUinspectPanel').classList.add('active')
    PDSUimageIndex = indicator
    inspectLoadPDSU(settings)
}


function imageScalePDS(loader, inspectimage, inspectPanel) {
    loader.style.display = 'none'
    if(inspectimage.clientWidth + 40 > inspectPanel.offsetWidth){
        inspectimage.classList.add('active')
    }
}


function resetAniPDS(loader, inspectimage) {
    loader.style.display = 'block'
    inspectimage.style.transition = '0s'
    inspectimage.style.opacity = '0'
    inspectimage.classList.remove('active')
}

function imageAttachErrorPDS(loader, inspectimage, inspectPanel) {
    inspectimage.onerror = function() {
        inspectPanel.classList.remove('active')
        loader.style.display = 'none'
        inspectimage.classList.remove('active')
    }
}


function inspectLoadPDSU(settings) {
    let inspectimage = document.getElementById('PDSUinspectImage'),
    inspectPanel = document.getElementById('PDSUinspectPanel'),
    loader = document.getElementById('PDSUloader'),
    PDSUimages = document.getElementsByClassName(settings.imageClass);
    
    resetAniPDS(loader, inspectimage)

    inspectimage.style.top = '50%'
    inspectimage.style.left = '50%'
    
    imageAttachErrorPDS(loader, inspectimage, inspectPanel)

    inspectimage.onload = function() {
        
        imageScalePDS(loader, inspectimage, inspectPanel)

        inspectimage.style.transition = '0.4s, background-color 0.1s, opacity 0.4s'
        inspectimage.style.opacity = '1'
        inspectimage.style.backgroundColor = imageTintPDSU(inspectimage) + "0.8)"
    }
    inspectimage.src = PDSUimages[PDSUimageIndex-1].src;
}

function inspectLoadInitialPDSU(settings, speificimage) {
    let inspectimage = document.getElementById('PDSUinspectImage'),
    inspectPanel = document.getElementById('PDSUinspectPanel'),
    PDSUimages = document.getElementsByClassName(settings.imageClass),
    loader = document.getElementById('PDSUloader'),
    imagePos = speificimage.getBoundingClientRect(),
    top = imagePos.top,
    left = imagePos.left;
    
    resetAniPDS(loader, inspectimage)

    inspectimage.style.top = `${top + (speificimage.offsetHeight / 2)}px`
    inspectimage.style.left = `${left + (speificimage.offsetWidth / 2)}px`
    
    imageAttachErrorPDS(loader, inspectimage, inspectPanel)

    inspectimage.onload = function() {

        imageScalePDS(loader, inspectimage, inspectPanel)

        inspectimage.style.height = `${speificimage.offsetHeight}px`
        inspectimage.style.width = `${speificimage.offsetWidth}px`
        setTimeout(() => {
            inspectimage.style.opacity = '1'
            inspectimage.style.transition = '0.6s cubic-bezier(.45,.13,.16,1.4), background-color 0s, opacity 0.1s'
            inspectimage.style.top = '50%'
            inspectimage.style.left = '50%'
            inspectimage.style.height = null
            inspectimage.style.width = null
        },10)
        inspectimage.style.backgroundColor = imageTintPDSU(inspectimage) + "0.8)"
    }
    inspectimage.src = PDSUimages[PDSUimageIndex-1].src;
}

function inspectChangePDSU(settings, indicator) {
    let length = document.getElementsByClassName(settings.imageClass).length;
    if(PDSUimageIndex + indicator < 1){
        PDSUimageIndex = length//potential error
    }else if(PDSUimageIndex + indicator > length){
        PDSUimageIndex = 1
    }else{
        PDSUimageIndex += indicator
    }
    loadMiniImagesPDSU(settings,PDSUimageIndex)
    inspectLoadPDSU(settings)
}

function loadPDSU(settings) {
    let closer = document.createElement('section'),
    mainimage = document.createElement('img'),
    container = document.createElement('div'),
    miniviewer = document.createElement('div'),
    info = document.createElement('a'),
    counter = document.createElement('span'),
    loader = document.createElement('span'),
    page = [-1,1],
    icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>']
    closer.onclick = function() {document.getElementById('PDSUinspectPanel').classList.remove('active');document.getElementById('PDSUloader').style.display = 'none'}
    mainimage.id = 'PDSUinspectImage'
    mainimage.draggable = false
    container.id = 'PDSUinspectPanel'
    loader.id = 'PDSUloader'
    container.appendChild(closer)
    container.appendChild(loader)
    container.appendChild(mainimage)
    if(settings.controls) {
        counter.id = 'PDSUcounter'
        miniviewer.id = 'PDSUminiview'
        container.appendChild(counter)
        container.appendChild(miniviewer)
        for(let i = 0; i < 2; i++){
            let pagebuttons = document.createElement('button')
            pagebuttons.innerHTML = icons[i]
            pagebuttons.onclick = function(){inspectChangePDSU(settings,page[i])}
            pagebuttons.className = 'PDSUbuttons'
            container.appendChild(pagebuttons)
        }
    }
    info.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>'
    info.className = 'PDSUinfoButton'
    info.href = 'https://natski.netlify.app/ENCORE%20V1.html#PDS'
    info.target = '_blank'
    info.ariaLabel = 'information'
    container.appendChild(info)
    document.body.appendChild(container)
    connectPDSU(settings)
    createObserverPDSU()
}


function loadMiniImagesPDSU(settings,currentimage) {
    let miniviewer = document.getElementById('PDSUminiview'),
    PDSUimages = document.getElementsByClassName(settings.imageClass);
    if(settings.controls) {
        document.getElementById('PDSUcounter').innerHTML = PDSUimageIndex + ' / ' + PDSUimages.length
        miniviewer.innerHTML = ''
        if(PDSUimages.length > 1) {//change here!
            for(let i = (currentimage - 1); i <= (currentimage + 1); i++) {
                let imageTile = document.createElement('img');
                imageTile.className = 'PDSUimageTile'
                imageTile.draggable = false
                if(i > PDSUimages.length) {
                    imageTile.src = PDSUimages[i - PDSUimages.length-1].src
                    imageTile.dataset.tileNumber = i - PDSUimages.length
                }else if(i <= 0) {
                    imageTile.src = PDSUimages[PDSUimages.length + i-1].src
                    imageTile.dataset.tileNumber = PDSUimages.length + i
                }else {
                    imageTile.src = PDSUimages[i-1].src
                    imageTile.dataset.tileNumber = i
                }
                let img = parseInt(imageTile.dataset.tileNumber)
                imageTile.onclick = function(){inspectTargetPDSU(settings,img);loadMiniImagesPDSU(settings,img)}
                miniviewer.appendChild(imageTile)
            }
        }
    }
}

function createObserverPDSU(){
    const observer = new MutationObserver(dataAddedPDSU);
    const observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observer.observe(document, observerConfig);
    
}

function dataAddedPDSU(mutations) {
    mutations.forEach(function (mutation) {

        mutation.addedNodes.forEach(function (node) {

            if (typeof node.getElementsByTagName !== 'function') {
                return
            }

            let imgs = node.getElementsByTagName('img');
            
            Array.prototype.forEach.call(imgs, img => {
                connectPDSU(PDSU_settings)
            })
        })
    })
}

function connectPDSU(settings) {
    let PDSUimages = document.getElementsByClassName(settings.imageClass),
    PDSlen = PDSUimages.length;
    for(let i = 0; i < PDSlen; i++){
        if(settings.animations) {
            PDSUimages[i].onclick = function() {inspectTargetAniPDSU(settings, (i+1), this);loadMiniImagesPDSU(settings,(i+1))}
        }else {
            PDSUimages[i].onclick = function() {inspectTargetPDSU(settings, (i+1));loadMiniImagesPDSU(settings,(i+1))}
        }
        PDSUimages[i].style.cursor = 'pointer'
    }
}

function PDSUstyleCall(url, settings, load) {
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

function checkLoadedPDSU() {
    return document.readyState === "complete";
}

function PDSUcssLoader() {
    if(PDSUdevice){
        PDSUstyleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+PDSU_settings.style+'PDSUmobile.css', PDSU_settings, loadPDSU)
    }else{
        PDSUstyleCall('https://natski.netlify.app/lib/ENCORE_DB/PDS/'+PDSU_settings.style+'PDSU.css', PDSU_settings, loadPDSU)
    }
}

if(checkLoadedPDSU() == true) {
    PDSUcssLoader()
}

window.addEventListener("load", function() {
    setTimeout(() => {
        PDSUcssLoader()
    },300)
})
*/