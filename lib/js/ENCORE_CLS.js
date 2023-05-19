/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_CLS')

let systemCount = 0,
intersectloader = document.getElementById('CLSloader');


function loadCLS(settings){
    let observesettings = {
    root: settings.container,
    rootMargin: "0px",
    threshold: buildThresholdList()
    }
    const observer = new IntersectionObserver(() => {
        if(systemCount == 0){
            if(settings.fileCount == 1){
                observer.unobserve(intersectloader)
                intersectloader.remove()
            }
            systemCount = 1
            httpRequest(settings.path+settings.fileCount+'.txt')
            settings.fileCount--
        }
    }, observesettings)
        observer.observe(intersectloader)
}

const sysCall = new XMLHttpRequest();
const httpResult = function() {
    article = document.createElement('article')
    article.style = 'animation: slide 0.6s;'
    article.innerHTML = sysCall.responseText;
    document.getElementById('CLS').appendChild(article)
    setTimeout(() => {
        systemCount = 0
    },100)
}

function httpRequest(url) {
    sysCall.open('GET', url);
    sysCall.onloadend = httpResult;
    sysCall.send();
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
  

window.addEventListener("load", function() {
    loadCLS(CLS_settings)
    console.log('ENCORE_CLS loaded')
})
