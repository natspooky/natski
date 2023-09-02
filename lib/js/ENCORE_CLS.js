/*!
 * ENCORE CHANGELOG SYSTEM
 * Author: NATSKI
 * MIT License
 */

let systemCount = 0;

function loadCLS(settings){
    CLScreateObserver()
    let observesettings = {
    root: settings.container,
    rootMargin: "0px",
    threshold: buildThresholdList()
    },
    intersectloader = document.getElementById('CLSloader');
    const observerIntCLS = new IntersectionObserver(() => {

        CLSreCheck(settings, intersectloader)

    }, observesettings)
    observerIntCLS.observe(intersectloader)
}





function CLSreCheck(settings, intersectloader) {
    if(systemCount == 0) {
        if(settings.fileCount == 1) {
            intersectloader.remove()
        }
        systemCount = 1
        logCall(settings.path+settings.fileCount+'.txt',settings)
    }
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


const logger = function() {
    let article = document.createElement('article'),
    CLS = document.getElementById('CLS');
    article.className = 'CLSlog'
    article.style.animation = 'slide 0.6s'
    article.innerHTML = CLScall.responseText;
    CLS.appendChild(article)
    systemCount = 0
    if(article.offsetHeight < window.innerHeight && CLS_settings.fileCount > 0 && document.getElementsByClassName('CLSlog').length <= 1) {
        CLSreCheck(CLS_settings, document.getElementById('CLSloader'))
    }
}


const CLScall = new XMLHttpRequest();
function logCall(url,settings) {
    settings.fileCount--
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