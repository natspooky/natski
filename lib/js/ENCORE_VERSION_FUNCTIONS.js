/*!
 * ENCORE VF
 * Author: NATSKI
 * MIT License
 */

for(let i = 0; i < document.getElementsByClassName('dropdownheader').length; i++) {
    document.getElementsByClassName('dropdownheader')[i].addEventListener('click', function(){
        this.parentNode.classList.toggle('active')
    })
}

for(let i = 0; i < document.getElementsByClassName('copybox').length; i++) {
    document.getElementsByClassName('copybox')[i].addEventListener('click', function(){
        navigator.clipboard.writeText(document.getElementsByClassName('codebox')[i].innerText)
        ENCOREalert(0,'copy')
    })
}


function changeValues(e) {
    e.classList.toggle('active')
    if(e.hasAttribute('active')) {
        e.removeAttribute('active');
    }else {
        e.setAttribute('active', '');
    }
}

let alertTimer;
function ENCOREalert(e,x) {
    clearTimeout(alertTimer)
    let alertbox = document.getElementById('ENCOREalert');
    switch(x){
        case 'settings':
        alertbox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 692.13 496.44"><path d="M692.13,75.84c0,21.49-9.08,42.85-26.74,57.86L259.79,478.38c-14.27,12.13-31.73,18.06-49.1,18.06-21.49,0-42.84-9.08-57.85-26.74L18.06,311.1c-27.14-31.94-23.25-79.82,8.68-106.96,14.28-12.13,31.73-18.06,49.1-18.06,21.5,0,42.85,9.09,57.86,26.75l85.64,100.77L567.12,18.06c31.94-27.13,79.82-23.25,106.96,8.69,12.12,14.27,18.05,31.72,18.05,49.09Z"/></svg><div></div><p>Updated ' + e.substring(0, e.length - 4) + ' settings</p>'
            break;
        case 'copy':
        alertbox.innerHTML = '<p>Copied code!</p>'
            break;
    }
    alertbox.classList.add('active')
    alertTimer = setTimeout(() => {
        alertbox.classList.remove('active')
    }, 2000);
}

function ENCobserveDesc(entries) {
    entries.forEach(entry => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
        entry.target.style.transform = entry.isIntersecting ? "translateX(0)" : "translateX(1em)"
    })
}

function ENCobserveCode(entries) {
    entries.forEach(entry => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
        entry.target.style.transform = entry.isIntersecting ? "translateX(0)" : "translateX(-0.5em)"
    })
}

window.addEventListener('load',function(){
    if(preference!=='true') {
        let img = document.getElementsByTagName('img');
        for(let i = 1; i < img.length; i++){
            let pageimg = img[i]
            if(pageimg.complete && pageimg.naturalHeight !== 0){
                setTimeout(() => {
                    pageimg.parentNode.style.backgroundColor = `${colourSystemE(pageimg)} 0.4)`
                }, 615);
            }else{
                pageimg.onload = function(){
                    setTimeout(() => {
                        pageimg.parentNode.style.backgroundColor = `${colourSystemE(pageimg)} 0.4)`
                    }, 615);
                }
            }
        }
    }
})