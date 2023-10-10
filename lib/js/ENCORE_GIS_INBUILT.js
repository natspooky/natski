/*!
 * ENCORE GENERAL ICON SYSTEM INBUILT
 * Author: NATSKI
 * MIT License
 */

let GISVALUES = ['home','terminal','avatar','gear','alert','browser','chain','bookshelf','cellar','rotate','maximise','minimise','pause','play','prev','next','audio','copy','information','loop','pip','screen','minus','plus','checkmark','cross','arrow_left','arrow_right','arrow_up','arrow_down','mini_arrow_left','mini_arrow_right','mini_arrow_up','mini_arrow_down','line_arrow_left','line_arrow_right','line_arrow_up','line_arrow_down','input','output','sparkle','config','ENCORE','SSC','PDS','CLS','CLSF','VPS','PSS','CMS','CMSF','CHANGE THIS ONE LATER COS I HAVENT MADE THE ICON','SSM','SSMF']

function loadGIS(){
    let container = document.createElement('div'),
    searchBar = document.createElement('input'),
    info = document.createElement('div'),
    infoIcon = document.createElement('GIS-icon'),
    length = GISVALUES.length;

    container.id = 'GIScontainer'
    container.className = 'GIS-item'
    searchBar.placeholder = 'Search GIS'
    searchBar.className = 'GIS-item'
    searchBar.spellcheck = false
    searchBar.oninput = function(){
        searchGIS(this)
    }
    container.appendChild(searchBar)
    infoIcon.title = 'information'
    info.appendChild(infoIcon)
    info.className = 'GIS-item'
    container.appendChild(info)
    for(let i = 0; i < length; i++){
        let button = document.createElement('button'),
        icon = document.createElement('GIS-icon')

        icon.title = GISVALUES[i]
        button.appendChild(icon)
        button.className = 'GISEicons GIS-item'
        button.onclick = function(){
            return 0
        }
        container.appendChild(button)
    }
    document.body.appendChild(container)
    addInitialIconsGIS()
    GIScreateObserver()
}


function openGIS(e){
    if(!e.target.classList.contains('GIS-item')){
        let container = document.getElementById('GIScontainer')

        container.classList.add('active')
        container.style.left = `${e.pageX}px`
        container.style.top =  `${e.pageY}px`
    }

}

function closeGIS(e){
    if(!e.target.classList.contains('GIS-item')){
        let container = document.getElementById('GIScontainer')
        container.classList.remove('active')
    }
}

function searchGIS(e){
    let buttons = document.getElementsByClassName('GISEicons'),
    length = GISVALUES.length;
    for(let i = 0; i < length; i++){
        if(!buttons[i].children[0].title.includes(e.value)){
            buttons[i].classList.add('hidden')
        }else{
            buttons[i].classList.remove('hidden')
        }
    }
}


function addInitialIconsGIS(){
    let icons = document.getElementsByTagName('GIS-icon');
    for(let i = 0; i < icons.length; i++) {
        icons[i].style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${icons[i].title}.svg) no-repeat center`
        icons[i].style.webkitMask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${icons[i].title}.svg) no-repeat center`
    }
}

function GIScreateObserver(){
    let observerMutGIS = new MutationObserver(checkIconsGIS),
    observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observerMutGIS.observe(document, observerConfig);
}



function checkIconsGIS(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (typeof node.getElementsByTagName !== 'function') {
                return
            }
            if(node.tagName == 'GIS-ICON') {
                node.style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${node.title}.svg) no-repeat center`
                node.style.webkitMask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${node.title}.svg) no-repeat center`
            }
            else if(node.childNodes.length > 0) {

                checkChildrenGIS(node)
            }
        })
    })
}


function checkChildrenGIS(element){
    element.childNodes.forEach(function(node){
        if(node.tagName == 'GIS-ICON') {
            node.style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${node.title}.svg) no-repeat center`
            node.style.webkitMask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${node.title}.svg) no-repeat center`
        }
        else if(node.childNodes.length > 0) {
            checkChildrenGIS(node)
        }
    })
}




function GISstyleCall(url, load) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementsByTagName('head')[0].appendChild(style);
    let linkloaded = document.createElement('img');
        linkloaded.onerror = function(){
            if(load) load();
        }
        linkloaded.src = url;
}


function checkLoadedGIS() {
    return document.readyState === "complete";
}

if(checkLoadedGIS()) {
    GISstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/GIS/GISE.css`, loadGIS)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        GISstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/GIS/GISE.css`, loadGIS)
    },300)
})

document.onclick = function(e){
    closeGIS(e)
}