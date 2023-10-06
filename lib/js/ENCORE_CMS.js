/*!
 * ENCORE CONTEXT MENU SYSTEN
 * Author: NATSKI
 * MIT License
 */

function CMSdeviceCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function CMSopenMenu(e) {
    CMSresetMenu()
    let menu = document.getElementById('CMScontextMenu');
    menu.style.top = `${e.clientY + 5}px`
    menu.style.left = `${e.clientX + 5}px`
    menu.style.height = `${menu.children[0].offsetHeight}px`
    menu.classList.add('active')
    if (menu.children[0].offsetHeight + menu.offsetTop >= window.innerHeight - 20) {
        menu.style.top = `${window.innerHeight - menu.children[0].offsetHeight - 20}px`
    }
    if(menu.offsetWidth + menu.offsetLeft >= window.innerWidth - 20){
        menu.style.left = `${window.innerWidth - menu.children[0].offsetWidth - 20}px`
    }
}

function CMScloseMenu(e) {
    let menu = document.getElementById('CMScontextMenu')
    if (!e.target.classList.contains('CMSclickable')){
        menu.classList.remove('active')
        CMSresetMenu()
    }
}

function CMSchangeMenu(e) {
    let tiles = document.getElementsByClassName('CMScontext'),
    menu = document.getElementById('CMScontextMenu');


    

    if(menu.children[0].offsetHeight <= 184) {
        menu.style.maxHeight = '184px'
    }else{
        menu.style.maxHeight = `${menu.offsetHeight}px`
    }

    scrollCMS(menu.children[0].offsetHeight,menu, e)
    
    for(let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove('active')
    }
    document.getElementById(e).classList.add('active')
    document.getElementById('CMS4500b5').classList.add('active')
    console.log(document.getElementById(e).offsetHeight)
    menu.style.height = `${document.getElementById(e).offsetHeight}px`
}

function scrollCMS(x, element, r) { //scrollCMS(menu.children[0].offsetHeight,menu, e)
    let page = document.getElementById(r)
    if (page.offsetHeight > x) {
        if(x >= 184) {
            page.style.height = `${x}px`
            page.style.overflowY = 'scroll'
        }else{
            page.style.height = '184px'
            page.style.overflowY = 'scroll'
        }
    }else{
        page.style.overflowY = 'hidden'
        page.style.height = `${page.offsetHeight}px`
    }
}


function CMSresetMenu() {
    let tiles = document.getElementsByClassName('CMScontext'),
    menu = document.getElementById('CMScontextMenu');
    for(let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove('active')
    }
    menu.style.height = `${menu.children[0].offsetHeight}px`
}

function loadCMS(settings) {
    let menu = document.getElementById('CMScontextMenu');
    menu.style.maxHeight = `${menu.children[0].offsetHeight}px`
    if(!CMSdeviceCheck()){
        document.addEventListener('contextmenu', function(e){
            e.preventDefault()
            CMSopenMenu(e)
        })
        
        document.addEventListener('click', function(e){
            CMScloseMenu(e)
        })
    }
}

function CMSstyleCall(url, settings, load) {
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

function checkLoadedCMS() {
    return document.readyState === "complete";
}

if(checkLoadedCMS() == true) {
        CMSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/CMS/${CMS_settings.style}CMS.css`, CMS_settings, loadCMS)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        CMSstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/CMS/${CMS_settings.style}CMS.css`, CMS_settings, loadCMS)
    },300)
})