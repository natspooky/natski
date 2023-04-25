/*!
 * ENCORE DYNAMIC SCALE SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_DSS')
const numSteps = 20.0;
let box, prevRatio = 0.0;

function swipeSystem(pref){
  if(pref!=='true'){
    box = document.querySelector(".observe");
    colourbg = document.querySelector("#colourpanelback");
    imagebox = document.querySelector(".imagebox");
    colourlessbg = document.querySelector("#colourlesspanelback");
    colourbg.style.transition = '0s'
    createObserver();
    console.log('ENCORE_DSS loaded')
  }else{
    console.log('ENCORE_DSS disabled due to preference settings')
  }
}


function createObserver() {
  let observer, options = {
    root: null,
    rootMargin: "-90px 0px 0px 0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(box);
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

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if(entry.intersectionRatio <= 0.7){
      imagebox.style.transform = 'scale(0.7)'
    }else{
      imagebox.style.transform = 'scale('+entry.intersectionRatio+')'
    }
    colourbg.style.opacity = entry.intersectionRatio
    colourlessbg.style.opacity = 1 - entry.intersectionRatio
    imagebox.style.opacity = entry.intersectionRatio
    

    prevRatio = entry.intersectionRatio;
  });
}