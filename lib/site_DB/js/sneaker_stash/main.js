$(document).ready(function(){
    setTimeout(function(){
        $('.loaderback').fadeToggle();
    },100);
    const d = new Date();
    document.getElementById("footerdate").innerHTML='©'+d.getFullYear()+' NATSKI';
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
});
