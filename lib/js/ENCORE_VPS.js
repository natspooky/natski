/*!
 * ENCORE VIDEO PLAYER SYSTEM
 * Author: NATSKI
 * MIT License
 */


function loadVPS(settings) {
    
}


const VPScall = new XMLHttpRequest();
function VPSstyler(settings) {
    let style = document.createElement('style');
    style.innerHTML = VPScall.responseText;
    document.getElementById('VPS').appendChild(style) // might need to make into body
    loadVPS(settings)
}


function VPSstyleCall(url, settings) {
    VPScall.open('GET', url);
    VPScall.onloadend = function(){VPSstyler(settings)};
    VPScall.send();
}


function checkLoadedVPS() {
    return document.readyState === "complete";
}


if(checkLoadedVPS() == true) {
    VPSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/VPS/'+VPS_settings.style+'.txt', VPS_settings)
}


window.addEventListener("load", function() {
    setTimeout(() => {
        VPSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/VPS/'+VPS_settings.style+'.txt', VPS_settings)
    },300)
})


