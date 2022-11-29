var frameloader=document.getElementById('bibcontainer'),frame=document.getElementById('bib'),frametxt=document.getElementById('bibtext'),hoverable=document.getElementsByClassName('sourcer'),faviconimg=document.getElementById('favi');
for(let i=0;i<hoverable.length;i++){
    hoverable[i].addEventListener('mouseenter',function(e){
        frame.src=hoverable[i].href;
        faviconimg.src='https://google.com/s2/favicons?domain_url='+hoverable[i].href;
        frametxt.innerHTML=hoverable[i].name;
        let left=e.pageX,top=e.pageY;
        frameloader.style.left=left+'px';
        frameloader.style.display='block';
        frameloader.style.top=top+'px';
        
    });
    hoverable[i].addEventListener('mouseleave',function(){
        frametxt.innerHTML='';
        faviconimg.src=''
        frame.src='';
        frameloader.style.left='0px';
        frameloader.style.display='none';
        frameloader.style.top='0px';
    });
};

