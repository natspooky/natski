/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */


let systemCount = 0;

function loadCLS(settings){
    let observesettings = {
    root: settings.container,
    rootMargin: "0px",
    threshold: buildThresholdList()
    },
    intersectloader = document.getElementById('CLSloader');
    const observer = new IntersectionObserver(() => {
        if(systemCount == 0) {
            if(settings.fileCount == 1) {
                observer.unobserve(intersectloader)
                intersectloader.remove()
            }
            systemCount = 1
            logCall(settings.path+settings.fileCount+'.txt')
            settings.fileCount--
        }
    }, observesettings)
        observer.observe(intersectloader)
}

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

function CLSstyleCall(url, settings) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementById('CLS').appendChild(style)
    loadCLS(settings)
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