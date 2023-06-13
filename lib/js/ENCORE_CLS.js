/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */


let systemCount = 0,
fileNum = CLS_settings.fileCount;


function reloadCLS(settings) {
    observer.unobserveobserve(document.getElementById('CLSloader'))
    fileNum = settings.fileCount
    systemCount = 0
    document.getElementById('CLS').innerHTML = ''
    loadCLS(settings)
}


function loadCLS(settings){
    let observesettings = {
    root: settings.container,
    rootMargin: "0px",
    threshold: buildThresholdList()
    },
    intersectloader = document.getElementById('CLSloader');
    const observer = new IntersectionObserver(() => {
        if(systemCount == 0) {
            if(fileNum == 1) {
                observer.unobserve(intersectloader)
                intersectloader.remove()
            }
            systemCount = 1
            logCall(settings.path+fileNum+'.txt')
            fileNum--
        }
    }, observesettings)
        observer.observe(intersectloader)
}


const CLScall = new XMLHttpRequest();
const logger = function() {
    let article = document.createElement('article');
    article.style = 'animation: slide 0.6s;'
    article.innerHTML = CLScall.responseText;
    document.getElementById('CLS').appendChild(article)
    setTimeout(() => {
        systemCount = 0
    },100)
}


function logCall(url) {
    CLScall.open('GET', url);
    CLScall.onloadend = logger;
    CLScall.send();
}


function buildThresholdList() {
    let thresholds = [],
    numSteps = 20;
    for (let i = 1.0; i <= numSteps; i++) {
        let ratio = i / numSteps;
        thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}


function CLSstyler(settings) {
    let style = document.createElement('style');
    style.innerHTML = CLScall.responseText;
    document.getElementById('CLS').appendChild(style)
    loadCLS(settings)
}


function CLSstyleCall(url, settings) {
    CLScall.open('GET', url);
    CLScall.onloadend = function(){CLSstyler(settings)};
    CLScall.send();
}


function checkLoadedCLS() {
    return document.readyState === "complete";
}


if(checkLoadedCLS() == true) {
    CLSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/CLS/'+CLS_settings.style+'.txt', CLS_settings)
}


window.addEventListener("load", function() {
    CLSstyleCall('https://natski.netlify.app/lib/ENCORE_DB/CLS/'+CLS_settings.style+'.txt', CLS_settings)
})
