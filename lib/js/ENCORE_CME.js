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
    nameText = createTextGIS(),
    functionText = createTextGIS(),
    imageLink = createTextGIS(),
    GISlink = createButtonGIS(),
    addButton = document.createElement('button');

    GISlink.classList.add('imageLink')
    item.className = 'item'
    removeButton.className = 'remove'
    removeButton.name = 'remove'
    removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.91 850.91"><path d="M838.33,779.56c11.76,11.76,11.76,30.84,0,42.6l-16.65,16.65c-11.76,11.76-30.84,11.76-42.6,0l-342.55-342.55c-6.24-6.24-16.37-6.24-22.61,0L71.36,838.81c-11.77,11.76-30.84,11.76-42.61,0l-16.64-16.65c-11.77-11.76-11.77-30.84,0-42.6l342.55-342.55c6.24-6.24,6.24-16.37,0-22.61L12.11,71.84C.34,60.07.34,41,12.11,29.23L28.75,12.59c11.77-11.77,30.84-11.77,42.61,0l342.55,342.55c6.24,6.24,16.37,6.24,22.61,0L779.08,12.59c11.76-11.77,30.84-11.77,42.6,0l16.65,16.64c11.76,11.77,11.76,30.84,0,42.61l-342.55,342.55c-6.24,6.24-6.24,16.37,0,22.61l342.55,342.55Z"/></svg>'
    checkbox.type = 'checkbox'
    checkbox.name = 'toggle sub menu'
    checkbox.onchange = function() {addSub(this)}

    nameText.innerHTML = 'button name'
    nameText.classList.add('buttonName')
    functionText.innerHTML = 'function or link'
    functionText.classList.add('function')
    imageLink.classList.add('imageLink')
    imageLink.innerHTML = 'img / SVG URL'
    imageLink.style.display = 'none'
    addButton.className = 'add'
    addButton.name = 'add below'
    addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.91 850.91"><path d="M850.41,414.23v22.92c0,16.81-13.63,30.43-30.43,30.43h-342.82c-5.55,0-10.04,4.5-10.04,10.04v342.82c0,16.81-13.63,30.43-30.43,30.43h-22.93c-16.81,0-30.43-13.63-30.43-30.43v-342.82c0-5.55-4.5-10.04-10.04-10.04H30.45C13.64,467.59.02,453.96.02,437.16v-22.92c0-16.81,13.63-30.43,30.43-30.43h342.82c5.55,0,10.04-4.5,10.04-10.04V30.93c0-16.81,13.63-30.43,30.43-30.43h22.93c16.81,0,30.43,13.63,30.43,30.43v342.82c0,5.55,4.5,10.04,10.04,10.04h342.82c16.81,0,30.43,13.63,30.43,30.43Z"/></svg>'
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
    item.appendChild(GISlink)
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
            document.getElementById('editContainer').appendChild(containerMain)
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
    let format = '<div style="display: none; --CMScolour: ' + document.getElementById('CMScolour').value + '80;" class="CMS">' + generateMain() + generateSub() + '</div>'
    switch(e){
        case 'prev':
            document.getElementById('preview').children[0].innerHTML = format
            document.getElementsByClassName('CMS')[0].style.display = 'block'
            document.getElementsByClassName('CMS')[0].style.position = 'relative'
            document.getElementsByClassName('CMS')[0].style.top = 'unset'
            document.getElementsByClassName('CMS')[0].style.left = 'unset'
            CMSresetMenu()
            document.getElementsByClassName('CMS')[0].classList.add('active')
            document.getElementsByClassName('CMS')[0].style.height = document.getElementsByClassName('CMS')[0].children[0].offsetHeight + 'px'
            break;
        case 'copy':
            navigator.clipboard.writeText(format)
            break;
    }
}

function generateParent(e,x){
    return '<button class="CMSclickable" CMSreturnPage="CMS'+ (getComputedStyle(x).getPropertyValue('--colour')).substring(1,7) +'">'+ generateImage(e.children[0]) +'<span>'+ e.children[0].children[5].getAttribute('value') +'</span><svg class="CMSsubpage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.35"><path d="M816.99,312.17l-351.98,351.98c-22.01,22.01-57.69,22.01-79.7,0L33.32,312.17c-32.59-32.58-32.59-85.42,0-118h0c32.59-32.59,85.42-32.59,118,0L425.16,468.01,698.99,194.17c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118Z"></path></svg></button>'
}

function generateLink(e) {
    return '<button onclick="window.location=`'+ e.children[6].getAttribute('value') +'`">'+ generateImage(e) +'<span>'+ e.children[5].getAttribute('value') +'</span></button>'
}

function generateFuntion(e) {
    return '<button onclick="'+ e.children[6].getAttribute('value') +'">'+ generateImage(e) +'<span>'+ e.children[5].getAttribute('value') +'</span></button>'
}

function generateBack(e,x) {
    if(x){
        return '<button class="CMSclickable CMSback" CMSreturnPage="CMS4500b5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.9 850.9"><path d="M367.73,771.63c-12.6,12.6-33.02,12.6-45.62,0L35.42,484.95l-18.57-18.57c-22.46-22.47-22.46-58.89,0-81.35l18.57-18.57L322.1,79.76c12.6-12.6,33.03-12.6,45.62,0l13.63,13.63c12.6,12.6,12.6,33.03,0,45.62l-231.7,231.7c-4.83,4.83-1.41,13.09,5.42,13.09h663.05c17.82,0,32.26,14.45,32.26,32.26v19.27c0,17.82-14.44,32.26-32.26,32.26H155.07c-6.83,0-10.25,8.26-5.42,13.09l231.71,231.7c12.6,12.6,12.6,33.03,0,45.62l-13.63,13.63Z"/></svg><span>Back</span></button>'
    }else{
        return '<button class="CMSclickable CMSback" CMSreturnPage="'+ e +'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.9 850.9"><path d="M367.73,771.63c-12.6,12.6-33.02,12.6-45.62,0L35.42,484.95l-18.57-18.57c-22.46-22.47-22.46-58.89,0-81.35l18.57-18.57L322.1,79.76c12.6-12.6,33.03-12.6,45.62,0l13.63,13.63c12.6,12.6,12.6,33.03,0,45.62l-231.7,231.7c-4.83,4.83-1.41,13.09,5.42,13.09h663.05c17.82,0,32.26,14.45,32.26,32.26v19.27c0,17.82-14.44,32.26-32.26,32.26H155.07c-6.83,0-10.25,8.26-5.42,13.09l231.71,231.7c12.6,12.6,12.6,33.03,0,45.62l-13.63,13.63Z"/></svg><span>Back</span></button>'
    }
}

function generateContainer(e,x) {
    return '<div id="'+ x +'" class="CMScontext">'+ e +'</div>'
}

function generateImage(e) {
    //let x = e.children[2].getAttribute('value') // this is the OG img input

    let selection = e.children[2].children[0].children[0].getAttribute('info');

    if(selection == 'img'){
        let x = e.children[4].getAttribute('value');
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

        }else if(!isValidUrl(mainItems[i].children[0].children[6].getAttribute('value'))){

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

            }else if(!isValidUrl(subItems[i].parentNode.children[z].children[0].children[6].getAttribute('value'))){

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



function CMSchangeMenu(e) {
    let tiles = document.getElementsByClassName('CMScontext'),
    menu = document.getElementsByClassName('CMS')[0],
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
    menu = document.getElementsByClassName('CMS')[0];
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