/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */



function loadGIS(){
    let icons = document.getElementsByTagName('GIS-icon');
    for(let i = 0; i < icons.length; i++) {
        icons[i].style.mask = 'url("https://natski.netlify.app/icon/svg/ENCORE_GIS/' + icons[i].title + '.svg") no-repeat center'
        icons[i].style.webkitMask = 'url("https://natski.netlify.app/icon/svg/ENCORE_GIS/' + icons[i].title + '.svg") no-repeat center'
    }
    GIScreateObserver()
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
            let icons = node.getElementsByTagName('gis-icon');
            console.log(node)
            console.log(icons)
            Array.prototype.forEach.call(icons, icon => {
                icon.style.mask = 'url("https://natski.netlify.app/icon/svg/ENCORE_GIS/' + icon.title + '.svg") no-repeat center'
                icon.style.webkitMask = 'url("https://natski.netlify.app/icon/svg/ENCORE_GIS/' + icon.title + '.svg") no-repeat center'
            })
        })
    })
}


GISstyleCall('https://natski.netlify.app/lib/ENCORE_DB/GIS/GIS.css', loadGIS)


function checkLoadedGIS() {
    return document.readyState === "complete";
}


if(checkLoadedGIS() == true) {
    GISstyleCall('https://natski.netlify.app/lib/ENCORE_DB/GIS/GIS.css', loadGIS)
}


window.addEventListener("load", function() {
    GISstyleCall('https://natski.netlify.app/lib/ENCORE_DB/GIS/GIS.css', loadGIS)
})