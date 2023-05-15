/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_CLS')

var systemCount = 0;


function loadCLS(){
    let settings = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };
    const observer = new IntersectionObserver(() => {
        if(systemCount == 0){
            if(filecount == 1){
                observer.unobserve(document.getElementById('scrollloader'))
                document.getElementById('scrollloader').remove()
            }
            systemCount = 1
            httpRequest(path+filecount+'.txt')
            filecount--
        }
    }, settings)
        observer.observe(document.getElementById('scrollloader'))
        console.log('ENCORE_DES loaded')
}

const http = new XMLHttpRequest();
const httpResult = function() {
    article = document.createElement('article')
    article.style = 'animation: slide 0.6s;'
    article.innerHTML = http.responseText;
    document.querySelector('main').appendChild(article)
    setTimeout(() => {
        systemCount = 0
    },100)
}

function httpRequest(_url) {
    http.open('GET', _url);
    http.onloadend = httpResult;
    http.send();
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
    loadCLS()
})
