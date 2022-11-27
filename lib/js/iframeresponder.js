var frameloader=document.getElementById('bibcontainer'),frame=document.getElementById('bib'),frametxt=document.getElementById('bibtext'),hoverable=document.getElementsByClassName('sourcer');
for(let i=0;i<hoverable.length;i++){
    hoverable[i].addEventListener('mouseenter',function(e){
        frame.src=hoverable[i].href;
        frametxt.innerHTML=hoverable[i].name;
        let left=e.pageX,top=e.pageY;
        frameloader.style.left=left+'px';
        frameloader.style.display='block';
        frameloader.style.top=top+'px';
    });
    hoverable[i].addEventListener('mouseleave',function(){
        frametxt.innerHTML='';
        frame.src='';
        frameloader.style.left='0px';
        frameloader.style.display='none';
        frameloader.style.top='0px';
    });
};
function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}
setUserAgent(document.querySelector('#bib').contentWindow, 'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36');