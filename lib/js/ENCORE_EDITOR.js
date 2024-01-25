let isDown = false,
startX,
startY,
transformX,
transformY,
scale = 1,
mainimage = document.getElementById('editContainer'),
edit = document.getElementById('editWindow');

window.onload = function(){
    if(NATdeviceCheck()){
        document.getElementById('menuBut').remove()
    }
}

function togglePreview(){
    document.getElementById('preview').classList.toggle('active')
    document.getElementById('editWindow').classList.toggle('active')
}

function resetEditor(){
    document.getElementById('preview').children[0].innerHTML = ''
}

function toggleEditor(){
    document.getElementById('containerWindow').classList.toggle('active')
    if(document.body.style.overflow == 'hidden') {
        document.body.style.overflow = 'unset'
        document.body.style.position = 'unset'
    }else {
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
    }
    setPosition()
}

edit.style.cursor = 'grab'
edit.addEventListener('mousedown', (e) => {
    if(e.target.tagName == 'INPUT' || e.target.tagName == 'BUTTON' || e.target.classList.contains('GIS-link')){
        isDown = false;
    }else{
        isDown = true;
        startX = e.pageX - transformX;
        startY = e.pageY - transformY;
    }
    edit.style.cursor = 'grabbing'
});

edit.addEventListener('mouseleave', () => {
    isDown = false;
    edit.style.cursor = 'grab'
});

edit.addEventListener('mouseup', () => {
    isDown = false;
    edit.style.cursor = 'grab'
    

});

edit.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    transformX = (e.pageX - startX)
    transformY = (e.pageY - startY)
    mainimage.style.margin = `${transformY}px 0px 0px ${transformX}px`
    mainimage.style.transform = `scale(${scale})`;
    edit.style.backgroundPosition = `${transformX + (mainimage.offsetWidth / 2)}px ${transformY + (mainimage.offsetHeight / 2)}px`
});



function setPosition(){
    transformX = ((edit.offsetWidth) / 2) - (mainimage.offsetWidth / 2)
    transformY = (edit.offsetHeight / 2) - (mainimage.offsetHeight / 2)
    mainimage.style.margin = `${transformY}px 0px 0px ${transformX}px`
    edit.style.backgroundPosition = `${transformX + (mainimage.offsetWidth / 2)}px ${transformY + (mainimage.offsetHeight / 2)}px`
}