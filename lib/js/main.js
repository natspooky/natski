$(document).ready(function(){
    let menuToggle = document.querySelector('.toggle');
    let menuOpen = document.querySelector('.navigator');
    menuToggle.onclick = function(){
        menuToggle.classList.toggle('active')
        menuOpen.classList.toggle('active')
    };
    let list = document.querySelectorAll('.list');
    for(let i = 0; i<list.length; i++){
        list[i].onclick = function(){
            let j = 0;
            while(j < list.length){
                list[j++].className = 'list';
            }
            list[i].className = 'list active';
        }
    };
    $("#hexcol").on("input", function(){
        var hex = document.getElementById("hexcol").value;
        if (/^#([0-9A-F]{6})$/i.test(hex) == false || hex == '#ffffff'){
            hex = '#180947';
        }
        $(':root').css({'--themecol': hex,'--accentcol': hex+"90"});
    });
    $("a").click(function(){
        var value = $(this).attr('value');
        $('.tabs,.portfo,.code').css('display','none')
        $(value).css('display','flex')
    });
    particlesJS("particles-js", {
        "particles": {
            "number": {
            "value": 10,
            "density": {
                "enable": true,
                "value_area": 800
            }
            },
            "color": {
            "value": "#ffffff"
            },
            "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            },
            "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
            },
            "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
            },
            "move": {
            "enable": true,
            "speed": 6,
            "direction": "top",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
            },
            "line_linked": {
                "enable": false
            }
        } 
    });
    const scrollContainer=document.querySelector("#sys");
    scrollContainer.addEventListener("wheel",(evt)=>{
        evt.preventDefault();
        scrollContainer.scrollLeft+=evt.deltaY;
    });
});
