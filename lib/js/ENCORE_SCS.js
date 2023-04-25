/*!
 * ENCORE SPECIFIC COLOUR SYSTEM
 * Author: NATSKI
 * MIT License
 */
console.log('loading ENCORE_SCS')

let preference = localStorage.getItem("performance");

function themeSystem(e){
    document.getElementById('colourpanelback').style.opacity = '1'
    document.getElementById('colourpanelback').style.backgroundImage = "linear-gradient(to bottom,"+e+" 0.7),transparent)"
    parent.changeBar(e+' 1)')
}

function colourSystemBeta(e) {  
    for (let t = 0; t < e.length; t++) {
        var a, o, c, s, l = document.createElement("canvas"), r = l.getContext && l.getContext("2d"), n = {r: 0, g: 0, b: 0}, i = 0;
        c = l.height = e[t].naturalHeight || e[t].offsetHeight || e[t].height, o = l.width = e[t].naturalWidth || e[t].offsetWidth || e[t].width, r.drawImage(e[t], 0, 0), s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i), e[t].style.boxShadow = '0 0 40px '+"rgba(" + n.r + "," + n.g + "," + n.b + ", 0.7)", e[t].style.backgroundColor = "rgba(" + n.r + "," + n.g + "," + n.b + ", 0.7)"
    }
}

function colourSystemAlpha(e) {  
    for (let t = 0; t < e.length; t++) {
        var a, o, c, s, l = document.createElement("canvas"), r = l.getContext && l.getContext("2d"), n = {r: 0, g: 0, b: 0}, i = 0;
        c = l.height = e[t].naturalHeight || e[t].offsetHeight || e[t].height, o = l.width = e[t].naturalWidth || e[t].offsetWidth || e[t].width, r.drawImage(e[t], 0, 0), s = (a = r.getImageData(0, 0, o, c)).data.length;
        for (var g = 0; g < s; g += 4) n.r += a.data[g], n.g += a.data[g + 1], n.b += a.data[g + 2], i++;
        n.r = Math.floor(n.r / i), n.g = Math.floor(n.g / i), n.b = Math.floor(n.b / i)
    }
    return "rgba(" + n.r + "," + n.g + "," + n.b + ","
}

$('#headerimage').imagesLoaded()
.done(function() {
    if(preference!=='true'){
        console.log('ENCORE_SCS loaded')
        setTimeout(() => {
            themeSystem(colourSystemAlpha($('#headerimage')));
        }, 100);
    }else{
        console.log('ENCORE_SCS disabled due to preference settings')
    }
}).then(function() {
    setTimeout(() => {
        swipeSystem(preference)
        $('body').css({'position':'unset','overflow':'unset'})
        $('.colourimage').imagesLoaded().done(function() {
            if(preference!=='true'){
                colourSystemBeta($('.colourimage'));
            }
        })
    }, 605);
})
