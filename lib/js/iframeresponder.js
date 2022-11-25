var frameloader=document.getElementById('bibcontainer'),frame=document.getElementById('bib'),frametxt=document.getElementById('bibtext'),hoverable=document.getElementsByClassName('sourcer'),loader=document.getElementById('bibloader');
for(let i=0;i<hoverable.length;i++){
    hoverable[i].addEventListener('mouseenter',function(e){
        frame.src=hoverable[i].href;
        setTimeout(()=>{
            loader.style.display='none';
            frametxt.innerHTML=hoverable[i].name;
        },1500);
        let left=e.pageX,top=e.pageY;
        frameloader.style.left=left+'px';
        frameloader.style.display='block';
        frameloader.style.top=top+'px';
    });
    hoverable[i].addEventListener('mouseleave',function(){
        loader.style.display='block';
        frametxt.innerHTML='';
        frame.src='';
        frameloader.style.left='0px';
        frameloader.style.display='none';
        frameloader.style.top='0px';
    });
};