/*!
 * ENCORE DYNAMIC SCALE SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_DSS')

const colourbg = document.querySelector("#colourpanelback"),
  imagebox = document.querySelector(".imagebox"),
  colourlessbg = document.querySelector("#colourlesspanelback");

function swipeSystem(pref){
  if(pref!=='true'){
    colourbg.style.transition = '0s'
    createObserver({root: null,rootMargin: "-90px 0px 0px 0px",threshold: buildThresholdList()}, DSS, $('.observe'))
    console.log('ENCORE_DSS loaded')
  }else{
    console.log('ENCORE_DSS disabled due to preference settings')
  }
}


function createObserver(options, observerFunc, intersector) {
  let observer = new IntersectionObserver(observerFunc, options);
  for(let i = 0; i < intersector.length; i++){
    observer.observe(intersector[i]);
  }
}


function buildThresholdList() {
  let thresholds = [],
  numSteps = 50;
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}


function DSS(entries) {
  entries.forEach((entry) => {
    if(entry.intersectionRatio <= 0.7) {
      imagebox.style.transform = 'scale(0.7)'
    }else {
      imagebox.style.transform = 'scale('+entry.intersectionRatio+')'
    }
    colourbg.style.opacity = entry.intersectionRatio
    colourlessbg.style.opacity = 1 - entry.intersectionRatio
    imagebox.style.opacity = entry.intersectionRatio
  });
}