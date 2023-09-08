/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */

let systemCount = 0;

function loadCLS(settings){
    let intersectloader = document.createElement('section'),
    loaderIcon = document.createElement('div'),
    CLS = document.getElementById('CLS'),
    observesettings = {
        root: settings.container,
        rootMargin: "0px"
    },
    info = document.createElement('a');
    info.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M425.2,0C190.37,0,0,190.37,0,425.2s190.37,425.19,425.2,425.19,425.19-190.36,425.19-425.19S660.03,0,425.2,0Zm67.2,651.37c0,37.11-30.09,67.2-67.2,67.2s-67.2-30.09-67.2-67.2V393.64c0-37.11,30.08-67.2,67.2-67.2,18.56,0,35.36,7.52,47.52,19.68,12.16,12.16,19.68,28.96,19.68,47.52v257.73Zm-19.68-404.82c-12.16,12.16-28.96,19.68-47.52,19.68-37.12,0-67.2-30.09-67.2-67.2,0-18.56,7.52-35.36,19.68-47.52s28.96-19.68,47.52-19.68,35.36,7.52,47.52,19.68c12.16,12.16,19.68,28.96,19.68,47.52s-7.52,35.35-19.68,47.52Z"/></svg>'
    info.className = 'infoButton'
    info.href = 'https://natski.netlify.app/ENCORE%20V1.html#CLS'
    info.target = '_blank'
    info.ariaLabel = 'information'
    CLS.appendChild(info)
    intersectloader.id = 'CLSloader'
    loaderIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1118.94 1118.94"><path d="M1118.94,559.47c0,308.99-250.48,559.47-559.47,559.47C250.73,1118.94,0,868.21,0,559.47,0,250.48,250.48,0,559.47,0c67.59,0,132.38,11.99,192.36,33.96,31.61,11.58,52.71,41.56,52.71,75.22h0c0,55.73-55.47,94.18-107.81,75.03-41.87-15.32-87.01-23.83-134.1-24.2-221.74-1.72-401.71,176.02-402.63,397.77-.92,221.96,179.2,402.08,401.16,401.16,221.74-.92,399.48-180.89,397.77-402.63-.37-47.08-8.88-92.23-24.2-134.1-19.15-52.34,19.3-107.81,75.03-107.81h0c33.66,0,63.64,21.1,75.22,52.71,21.97,59.98,33.96,124.77,33.96,192.36Z"/></svg>'
    intersectloader.appendChild(loaderIcon)
    CLS.appendChild(intersectloader)
    CLScreateObserver()
    const observerIntCLS = new IntersectionObserver(() => {

        CLSreCheck(settings, intersectloader)

    }, observesettings)
    observerIntCLS.observe(intersectloader)
}


function CLScreateObserver(){
    const observerMutLCS = new MutationObserver(CLSimageLoader);
    const observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observerMutLCS.observe(document.getElementById('CLS'), observerConfig);
}


function CLSimageLoader(mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (typeof node.getElementsByTagName !== 'function') {
                return
            }
            let imgs = node.getElementsByTagName('img');
            Array.prototype.forEach.call(imgs, img => {
                if(img.complete && img.naturalHeight !== 0){
                    img.style.opacity = '1'
                }else{
                    img.onload = function(){
                       img.style.opacity = '1'
                    }
                }
            })
        })
    })
}


function CLSreCheck(settings, intersectloader) {
    if(systemCount == 0) {
        if(settings.fileCount <= 1) {
            intersectloader.remove()
        }
        systemCount = 1
        logCall(settings.path+settings.fileCount+'.ntsk',settings)
    }
}


const logger = function() {
    let article = document.createElement('article'),
    CLS = document.getElementById('CLS'),
    CLSloader = document.getElementById('CLSloader');
    article.className = 'CLSlog'
    article.innerHTML = atob(CLScall.responseText);
    CLS.appendChild(article)
    if(CLSloader){
        CLS.insertBefore(article, CLSloader)
    }
    setTimeout(() => {
        systemCount = 0
        if((CLS.scrollHeight + CLS.getBoundingClientRect().top < window.innerHeight) && (CLS_settings.fileCount > 0)) {
            CLSreCheck(CLS_settings, CLSloader)
        }
    },200)
}


const CLScall = new XMLHttpRequest();
function logCall(url,settings) {
    settings.fileCount--
    CLScall.open('GET', url);
    CLScall.onloadend = logger;
    CLScall.send();
}


function CLSstyleCall(url, settings, load) {
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


function checkLoadedCLS() {
    return document.readyState === "complete";
}


if(checkLoadedCLS() == true) {
    CLSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/CLS/'+CLS_settings.style+'.css', CLS_settings, loadCLS)
}


window.addEventListener("load", function() {
    CLSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/CLS/'+CLS_settings.style+'.css', CLS_settings, loadCLS)
})