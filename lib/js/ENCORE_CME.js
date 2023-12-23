/*!
 * ENCORE CONTEXT MENU EDITOR
 * Author: NATSKI
 * MIT License
 */


let COLOUR = ['#4500b5']


function addSub(e) {
    if(e.checked) {
        addItem(e,'parent')
        e.parentNode.classList.add('subMenu')
    }else{
        let x = e.parentNode.parentNode.childElementCount - 1
        for(let i = 0; i < x; i++) {
            removeItemUncheck(e.parentNode.parentNode)
        }
        e.parentNode.classList.remove('subMenu')
    }
}


function removeItemSub(e) {
        if(e.parentNode.parentNode.parentNode.childElementCount <= 2){
            e.parentNode.parentNode.parentNode.children[0].children[1].checked = false        
        }
        e.parentNode.parentNode.remove() 
}


function removeItemMain(e) {
        e.parentNode.parentNode.remove() 
}


function removeItemUncheck(e) {
    e.children[1].remove()
}


function asignColour(){
    let colour = '#'
    for(let y = 0; y < 3; y++) {
        colour += Math.floor(Math.random()*89) + 10
    }
    if(COLOUR.includes(colour)){
        return asignColour()
    }else{
        COLOUR.push(colour)
        return colour
    }
}


function addItem(e,z) {
    let containerMain = document.createElement('div'),
    containerSub = document.createElement('section'),
    item = document.createElement('div'),
    select = document.createElement('div'),
    selectSub = document.createElement('div'),
    selectHead = document.createElement('span'),
    removeButton = document.createElement('button'),
    checkbox = document.createElement('input'),
    nameText = document.createElement('input'),
    functionText = document.createElement('input'),
    imageLink = document.createElement('input'),
    addButton = document.createElement('button');

    item.className = 'item'
    removeButton.className = 'remove'
    removeButton.name = 'remove'
    removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 616.14"><path d="M593.94,593.61c-14.82,14.84-34.25,22.26-53.68,22.26s-38.81-7.4-53.62-22.2l-178.51-178.3-178.3,178.51c-29.62,29.65-77.66,29.68-107.31,.06-14.84-14.81-22.25-34.25-22.25-53.68s7.39-38.81,22.19-53.62l178.3-178.51L22.25,129.83c-29.64-29.62-29.67-77.66-.06-107.31C37.01,7.68,56.44,.27,75.87,.27s38.82,7.39,53.63,22.19l178.51,178.3L486.31,22.25c29.61-29.64,77.65-29.67,107.3-.06,14.84,14.82,22.26,34.25,22.26,53.69s-7.4,38.81-22.2,53.62l-178.3,178.51,178.51,178.3c29.65,29.61,29.68,77.65,.06,107.3Z"></path></svg>'
    checkbox.type = 'checkbox'
    checkbox.name = 'toggle sub menu'
    checkbox.onchange = function() {addSub(this)}
    nameText.type = 'text'
    nameText.className = 'buttonName'
    nameText.placeholder = 'button name'
    nameText.spellcheck = false
    functionText.type = 'text'
    functionText.placeholder = 'function or link'
    functionText.className = 'function'
    functionText.spellcheck = false
    imageLink.className = 'imageLink'
    imageLink.type = 'text'
    imageLink.spellcheck = false
    imageLink.placeholder = 'img / SVG URL'
    imageLink.style.display = 'none'
    addButton.className = 'add'
    addButton.name = 'add below'
    addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.73 609.73"><path d="M305.04,609.73c-15.82,.01-30.15-6.4-40.52-16.76-10.37-10.37-16.76-24.65-16.76-40.45l-.11-190.37-190.37,.11C25.66,362.28,.02,336.66,0,305.04c-.02-15.82,6.4-30.14,16.77-40.51s24.65-16.76,40.45-16.77l190.37-.11-.11-190.37C247.46,25.67,273.07,.02,304.69,0c15.82-.01,30.14,6.4,40.51,16.77s16.77,24.65,16.77,40.45l.11,190.37,190.37-.11c31.61-.02,57.26,25.6,57.28,57.21,.01,15.82-6.4,30.15-16.77,40.52-10.37,10.37-24.65,16.76-40.45,16.76l-190.37,.11,.11,190.37c.02,31.62-25.59,57.26-57.21,57.28Z"></path></svg>'
    select.className = 'selection'
    selectHead.className = 'header'
    selectHead.innerHTML = 'GIS icons'
    selectSub.appendChild(selectHead)
    for(let i = 0; i < 2; i++){
        let x = document.createElement('span')
        x.className = 'listItem'
        x.addEventListener('click', function(){
            checkGISactive(this)
            this.parentNode.children[0].setAttribute('info',this.value)
            this.parentNode.children[0].innerText = this.innerText
        })
        if(i == 0){
            x.value = 'img'
            x.innerHTML = 'img/svg'
        }else{
            x.value = 'GIS'
            x.innerHTML = 'GIS icons'
        }
        selectSub.appendChild(x)
    }
    select.addEventListener('click', function(){
        this.classList.toggle('active')
    })
    select.addEventListener('mouseleave', function(){
        this.classList.remove('active')
    })
    select.appendChild(selectSub)
    item.appendChild(removeButton)
    item.appendChild(checkbox)
    item.appendChild(select)
    item.appendChild(createButtonGIS())
    item.appendChild(imageLink)
    item.appendChild(nameText)
    item.appendChild(functionText)
    item.appendChild(addButton)
    
    switch(z){
        case 'main':
            containerMain.className = 'mainitem'
            containerMain.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            item.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            addButton.onclick = function() {addItem(this,'main')}
            removeButton.onclick = function() {removeItemMain(this)}
            containerMain.appendChild(item)
            e.parentNode.parentNode.parentNode.appendChild(containerMain)
            e.parentNode.parentNode.parentNode.insertBefore(containerMain,e.parentNode.parentNode.nextSibling)
            break;

        case 'sub':
            containerSub.className = 'subitem'
            containerSub.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            item.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            addButton.onclick = function() {addItem(this,'sub')}
            removeButton.onclick = function() {removeItemSub(this)}
            containerSub.appendChild(item)
            e.parentNode.parentNode.parentNode.appendChild(containerSub)
            e.parentNode.parentNode.parentNode.insertBefore(containerSub,e.parentNode.parentNode.nextSibling)
            break;

        case 'parent':
            let colour = asignColour()
            e.style.setProperty('--colour',colour)
            containerSub.className = 'subitem'
            containerSub.style = '--colour:'+ colour +';'
            item.style = '--colour:'+ colour +';'
            addButton.onclick = function() {addItem(this,'sub')}
            removeButton.onclick = function() {removeItemSub(this)}
            containerSub.appendChild(item)
            e.parentNode.parentNode.appendChild(containerSub)
            e.parentNode.parentNode.insertBefore(containerSub,e.parentNode.nextSibling)
            break;
        
        case 'container':
            containerMain.className = 'mainitem'
            containerMain.style = '--colour: #4500b5;'
            item.style = '--colour: #4500b5;'
            addButton.onclick = function() {addItem(this,'main')}
            removeButton.onclick = function() {removeItemMain(this)}
            containerMain.appendChild(item)
            document.getElementById('CMScontainer').appendChild(containerMain)
            break;
    }
}


function checkGISactive(e){
    if(e.value != 'img'){
        e.parentNode.parentNode.parentNode.children[3].style.display = 'inline-flex'
        e.parentNode.parentNode.parentNode.children[4].style.display = 'none'
    }else{
        e.parentNode.parentNode.parentNode.children[4].style.display = 'inline-flex'
        e.parentNode.parentNode.parentNode.children[3].style.display = 'none'
    }
}


function generatePages(e){
    let format = '<div style="display: none; --CMScolour: ' + document.getElementById('CMScolour').value + '80;" id="CMScontextMenu">' + generateMain() + generateSub() + '</div>'
    switch(e){
        case 'prev':
            document.getElementById('preview').innerHTML = format
            document.getElementById('CMScontextMenu').style.display = 'block'
            document.getElementById('CMScontextMenu').style.position = 'relative'
            document.getElementById('CMScontextMenu').style.top = 'unset'
            document.getElementById('CMScontextMenu').style.left = 'unset'
            CMSresetMenu()
            document.getElementById('CMScontextMenu').classList.add('active')
            document.getElementById('CMScontextMenu').style.height = document.getElementById('CMScontextMenu').children[0].offsetHeight + 'px'
            break;
        case 'copy':
            navigator.clipboard.writeText(format)
            break;
    }
}

function generateParent(e,x){
    return '<button class="CMSclickable" onclick="CMSchangeMenu(`CMS'+ (getComputedStyle(x).getPropertyValue('--colour')).substring(1,7) +'`)">'+ generateImage(e.children[0]) +'<span>'+ e.children[0].children[5].value +'</span><svg class="CMSsubpage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.35"><path d="M816.99,312.17l-351.98,351.98c-22.01,22.01-57.69,22.01-79.7,0L33.32,312.17c-32.59-32.58-32.59-85.42,0-118h0c32.59-32.59,85.42-32.59,118,0L425.16,468.01,698.99,194.17c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118Z"></path></svg></button>'
}

function generateLink(e) {
    return '<button onclick="window.location=`'+ e.children[6].value +'`">'+ generateImage(e) +'<span>'+ e.children[5].value +'</span></button>'
}

function generateFuntion(e) {
    return '<button onclick="'+ e.children[6].value +'">'+ generateImage(e) +'<span>'+ e.children[5].value +'</span></button>'
}

function generateBack(e,x) {
    if(x){
        return '<button class="CMSclickable CMSback" onclick="CMSresetMenu()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M648.08,808.74c0,10.6-4,21.19-12.01,29.33-16.27,16.52-43.5,16.11-59.9-.28L229.58,491.2c-36.36-36.36-36.36-95.32,0-131.68L576.69,12.41c8.17-8.17,18.87-12.25,29.57-12.25s21.4,4.08,29.57,12.25c16.33,16.33,16.33,42.8,0,59.13L304.32,403.06c-12.31,12.31-12.31,32.28,0,44.59l331.52,331.52c8.17,8.17,12.25,18.87,12.25,29.57Z"/></svg><span>Back</span></button>'
    }else{
        return '<button class="CMSclickable CMSback" onclick="CMSchangeMenu(`'+ e +'`)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.41 850.42"><path d="M648.08,808.74c0,10.6-4,21.19-12.01,29.33-16.27,16.52-43.5,16.11-59.9-.28L229.58,491.2c-36.36-36.36-36.36-95.32,0-131.68L576.69,12.41c8.17-8.17,18.87-12.25,29.57-12.25s21.4,4.08,29.57,12.25c16.33,16.33,16.33,42.8,0,59.13L304.32,403.06c-12.31,12.31-12.31,32.28,0,44.59l331.52,331.52c8.17,8.17,12.25,18.87,12.25,29.57Z"/></svg><span>Back</span></button>'
    }
}

function generateContainer(e,x) {
    return '<div id="'+ x +'" class="CMScontext">'+ e +'</div>'
}

function generateImage(e) {
    //let x = e.children[2].value // this is the OG img input

    let selection = e.children[2].children[0].children[0].getAttribute('info');

    if(selection == 'img'){
        let x = e.children[4].value;
        if(x != ''){
            return '<img src="'+ x +'" alt="icon" draggable="false">'
        }else{
            return ''
        }
    }else{
        let GIS = e.children[3].title;
        return '<GIS-icon title="'+ GIS +'"></GIS-icon>'
    }




}

function generateMain() {
    let mainItems = document.getElementsByClassName('mainitem'),
    mainItemLength = mainItems.length,
    page = '';
    for(let i = 0; i < mainItemLength; i++) {

        if(mainItems[i].children[0].children[1].checked) {

            page += generateParent(mainItems[i],mainItems[i].children[1])// this line makes me want to die

        }else if(!isValidUrl(mainItems[i].children[0].children[6].value)){

            page += generateFuntion(mainItems[i].children[0])

        }else {
            page += generateLink(mainItems[i].children[0])
        }
    }
    return generateContainer(page,'CMS4500b5')
}

function generateSub() {
    let subItems = document.getElementsByClassName('subMenu'),
    subItemLength = subItems.length,
    page,
    subPages = [];
    for(let i = 0; i < subItemLength; i++) {
        page = '';

        page += generateBack('CMS' + (getComputedStyle(subItems[i].parentNode).getPropertyValue('--colour')).substring(1,7), subItems[i].parentNode.classList.contains('mainitem'))

        for(let z = 1; z < subItems[i].parentNode.childElementCount; z++) {

            if(subItems[i].parentNode.children[z].children[0].children[1].checked) {

                page += generateParent(subItems[i].parentNode.children[z], subItems[i].parentNode.children[z].children[0].children[1])// fuck this whole line

            }else if(!isValidUrl(subItems[i].parentNode.children[z].children[0].children[6].value)){

                page += generateFuntion(subItems[i].parentNode.children[z].children[0])// use this

            }else {
                page += generateLink(subItems[i].parentNode.children[z].children[0])
            }
        }
        subPages.push(generateContainer(page, ('CMS' + (getComputedStyle(subItems[i].children[1]).getPropertyValue('--colour')).substring(1,7))))
    }

    let subLength = subPages.length,
    formatted = ''
    for(let x = 0; x < subLength; x++){
        formatted += subPages[x]
    }
    return formatted
}




function isValidUrl(str){
    return str.includes('https://') || str.includes('http://')
}





let isDown = false,
startX,
startY,
transformX,
transformY,
scale = 1,
mainimage = document.getElementById('CMScontainer'),
edit = document.getElementById('editWindow');


function openEdit() {
    document.getElementById('containerWindow').classList.add('active')
    transformX = ((edit.offsetWidth) / 2) - (mainimage.offsetWidth / 2)
    transformY = (edit.offsetHeight / 2) - (mainimage.offsetHeight / 2)
    if(mainimage.childElementCount > 0){
        scale = Math.min(edit.offsetHeight / mainimage.offsetHeight,(edit.offsetWidth) / mainimage.offsetWidth)
        mainimage.style.transition = '0s'
    }
    mainimage.style.margin = `${transformY}px 0px 0px ${transformX}px`
    mainimage.style.transform = `scale(${scale})`;
    edit.style.backgroundSize = `${scale * 50}px`
    edit.style.backgroundPosition = `${transformX + (mainimage.offsetWidth / 2)}px ${transformY + (mainimage.offsetHeight / 2)}px`
}


function changeScale(e){
    let tmpscale = scale,
    x = ((scale == 1.2) || (scale ==0.2) ? 0 : e)
    scale += e

    scale = Math.min(Math.max(scale,0.2),1.2)
    transformX = (transformX - (edit.offsetWidth / 2) + (mainimage.offsetWidth / 2)) * ((tmpscale/scale) * (1 + x*1.2)) + (edit.offsetWidth / 2) - (mainimage.offsetWidth / 2)
    transformY = (transformY - (edit.offsetHeight / 2) + (mainimage.offsetHeight / 2)) * ((tmpscale/scale) * (1 + x*1.2)) + (edit.offsetHeight / 2) - (mainimage.offsetHeight / 2)
    mainimage.style.margin = `${transformY}px 0px 0px ${transformX}px`
    mainimage.style.transform = `scale(${scale})`
    edit.style.backgroundSize = `${scale * 50}px`
    edit.style.backgroundPosition = `${transformX + (mainimage.offsetWidth / 2)}px ${transformY + (mainimage.offsetHeight / 2)}px`
}






edit.style.cursor = 'grab'
edit.addEventListener('mousedown', (e) => {
    if(e.target.tagName == 'INPUT' || e.target.tagName == 'BUTTON'){
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


edit.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if(detectTrackPad(e)) {
        changeScale(-(parseInt(e.deltaY) / 100))
    }else{
        changeScale(-(parseInt(e.deltaY) / 2000))
    }
},true);

function detectTrackPad(e) {
    var isTrackpad = false;
    if (e.wheelDeltaY) {
      if (e.wheelDeltaY === (e.deltaY * -3)) {
        isTrackpad = true;
      }
    }
    else if (e.deltaMode === 0) {
      isTrackpad = true;
    }
    return isTrackpad
}


function CMSchangeMenu(e) {
    let tiles = document.getElementsByClassName('CMScontext'),
    menu = document.getElementById('CMScontextMenu'),
    menuPage = document.getElementById(e)

    if(menuPage.scrollHeight > 230 || menuPage.offsetHeight > 230) {
        menuPage.style.overflow = 'scroll'
    }else{
        menuPage.style.overflow = 'hidden'
    }
    
    for(let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove('active')
    }
    menuPage.classList.add('active')
    document.getElementById('CMS4500b5').classList.add('active')
    menu.style.height = `${menuPage.offsetHeight}px`
}


function CMSresetMenu() {
    let tiles = document.getElementsByClassName('CMScontext'),
    menu = document.getElementById('CMScontextMenu');
    for(let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove('active')
    }
    if(menu.children[0].scrollHeight > 230 || menu.children[0].offsetHeight > 230) {
        menu.children[0].style.overflow = 'scroll'
    }else{
        menu.children[0].style.overflow = 'hidden'
    }
    menu.style.height = `${menu.children[0].offsetHeight}px`
}