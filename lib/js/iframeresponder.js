var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var frameloader = document.querySelector('.bibcont');
var hoverable = document.querySelector('.sourcer');


hoverable.addEventListener('mouseenter', function(e) {
    isDown = true;
    offset = [
        frameloader.offsetLeft - e.clientX,
        frameloader.offsetTop - e.clientY
    ];
    if (isDown) {
        mousePosition = {
    
            x : e.clientX,
            y : e.clientY
    
        };
        frameloader.style.left = (mousePosition.x + offset[0]) + 'px';
        frameloader.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

document.addEventListener('mouseleave', function() {
    isDown = false;
}, true);
