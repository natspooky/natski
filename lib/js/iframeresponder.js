var frameloader=document.getElementById('bibcontainer'),frametxt=document.getElementById('bibtext'),hoverable=document.getElementsByClassName('sourcer');
for(let i=0;i<hoverable.length;i++){
    hoverable[i].addEventListener('mouseenter',function(e){
        frametxt.innerHTML=hoverable[i].name;
        icon=frametxt.appendChild(document.createElement('ion-icon'));
        icon.name='open-outline';
        let left=e.pageX,top=e.pageY;
        frameloader.style.left=left+'px';
        frameloader.style.top=top+'px'; 
        frameloader.style.display='block';
    });
    hoverable[i].addEventListener('mouseleave',function(){
        frametxt.innerHTML='';
        frameloader.style.left='0px';
        frameloader.style.top='0px';
        frameloader.style.display='none';
    });
};