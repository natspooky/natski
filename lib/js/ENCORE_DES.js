/*!
 * ENCORE DYNAMIC ESSAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_DES')

var frameloader = document.getElementById("popout"),
    hoverable = document.getElementsByClassName("sourcer");
for (let i = 0; i < hoverable.length; i++) hoverable[i].addEventListener("mouseenter", function(e) {
    frameloader.innerHTML = hoverable[i].name;
    let r = e.pageX,
        t = e.pageY;
    frameloader.style.left = r + "px", 
    frameloader.style.top = t + "px", 
    frameloader.style.display = "block"
}),hoverable[i].addEventListener("mousemove", function(e) {
    let r = e.pageX,
        t = e.pageY;
    frameloader.style.left = r + "px", 
    frameloader.style.top = t + "px", 
    frameloader.style.display = "block"
}), hoverable[i].addEventListener("mouseleave", function() {
    frameloader.innerHTML = "", 
    frameloader.style.left = "0px", 
    frameloader.style.top = "0px", 
    frameloader.style.display = "none"
});

function wordCount(e) {
    console.log('ENCORE_DES loaded')
    let removewords = 0, 
    nullwords = document.getElementsByClassName('codewindow');
    for(let i = 0; i < nullwords.length; i++){
        removewords += nullwords[i].textContent.split(/\s+[^0-9]/).length
    }
    return e.textContent.split(/\s+[^0-9]/).length - removewords
}
document.getElementById("wordcount").innerHTML = "Word Count: " + wordCount(document.querySelector("article"));