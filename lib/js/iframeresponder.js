var frameloader=document.getElementById('bibcontainer'),frametxt=document.getElementById('bibtext'),hoverable=document.getElementsByClassName('sourcer'),frametitle=document.getElementById('header');
for(let i=0;i<hoverable.length;i++){
    hoverable[i].addEventListener('mouseenter',function(e){
        getTitle(hoverable[i].href)
        frametxt.innerHTML=hoverable[i].name;
        let left=e.pageX,top=e.pageY;
        frameloader.style.left=left+'px';
        frameloader.style.display='block';
        frameloader.style.top=top+'px';
        
    });
    hoverable[i].addEventListener('mouseleave',function(){
        frametxt.innerHTML='';
        frameloader.style.left='0px';
        frameloader.style.display='none';
        frameloader.style.top='0px';
    });
};

const getTitle = (url) => {  
    return fetch(`https://crossorigin.me/${url}`)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll('title')[0];
        return title.innerText;
      });
  };
