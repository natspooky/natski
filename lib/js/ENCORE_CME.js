/*!
 * ENCORE CONTEXT MENU EDITOR
 * Author: NATSKI
 * MIT License
 */


let setColours = []

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


function asignColour(e) {
    let colour = '#'
    for(let y = 0; y < 3; y++) {
        colour += Math.floor(Math.random()*89) + 10
    }
    return colour
}


function addItem(e,z) {
    let containerMain = document.createElement('div'),
    containerSub = document.createElement('section'),
    item = document.createElement('div'),
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
    addButton.className = 'add'
    addButton.name = 'add below'
    addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.73 609.73"><path d="M305.04,609.73c-15.82,.01-30.15-6.4-40.52-16.76-10.37-10.37-16.76-24.65-16.76-40.45l-.11-190.37-190.37,.11C25.66,362.28,.02,336.66,0,305.04c-.02-15.82,6.4-30.14,16.77-40.51s24.65-16.76,40.45-16.77l190.37-.11-.11-190.37C247.46,25.67,273.07,.02,304.69,0c15.82-.01,30.14,6.4,40.51,16.77s16.77,24.65,16.77,40.45l.11,190.37,190.37-.11c31.61-.02,57.26,25.6,57.28,57.21,.01,15.82-6.4,30.15-16.77,40.52-10.37,10.37-24.65,16.76-40.45,16.76l-190.37,.11,.11,190.37c.02,31.62-25.59,57.26-57.21,57.28Z"></path></svg>'
    item.appendChild(removeButton)
    item.appendChild(checkbox)
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

function generatePages(){
    let format = '<div id="CMScontextMenu">' + generateMain() + generateSub() + '</div>'
    navigator.clipboard.writeText(format)
}

function generateParent(e,x){
    return '<button class="CMSclickable" onclick="CMSchangeMenu(`CMS'+ (getComputedStyle(x).getPropertyValue('--colour')).substring(1,7) +'`)">'+ generateImage(e.children[0]) +'<span>'+ e.children[0].children[3].value +'</span><svg class="CMSsubpage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.35"><path d="M816.99,312.17l-351.98,351.98c-22.01,22.01-57.69,22.01-79.7,0L33.32,312.17c-32.59-32.58-32.59-85.42,0-118h0c32.59-32.59,85.42-32.59,118,0L425.16,468.01,698.99,194.17c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118Z"></path></svg></button>'
}

function generateLink(e) {
    return '<button onclick="window.location=`'+ e.children[4].value +'`">'+ generateImage(e) +'<span>'+ e.children[3].value +'</span></button>'
}

function generateFuntion(e) {
    return '<button onclick="'+ e.children[4].value +'">'+ generateImage(e) +'<span>'+ e.children[3].value +'</span></button>'
}

function generateBack(e,x) {
    if(x){
        return '<button class="CMSclickable CMSback" onclick="CMSresetMenu()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.35"><path d="M816.99,312.17l-351.98,351.98c-22.01,22.01-57.69,22.01-79.7,0L33.32,312.17c-32.59-32.58-32.59-85.42,0-118h0c32.59-32.59,85.42-32.59,118,0L425.16,468.01,698.99,194.17c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118Z"/></svg><span>Back</span></button>'
    }else{
        return '<button class="CMSclickable CMSback" onclick="CMSchangeMenu(`'+ e +'`)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.35 850.35"><path d="M816.99,312.17l-351.98,351.98c-22.01,22.01-57.69,22.01-79.7,0L33.32,312.17c-32.59-32.58-32.59-85.42,0-118h0c32.59-32.59,85.42-32.59,118,0L425.16,468.01,698.99,194.17c32.58-32.59,85.42-32.59,118,0h0c32.59,32.59,32.59,85.42,0,118Z"/></svg><span>Back</span></button>'
    }
}

function generateContainer(e,x) {
    return '<div id="'+ x +'" class="CMScontext">'+ e +'</div>'
}

function generateImage(e) {
    let x = e.children[2].value
    if(x != ''){
        return '<img src="'+ x +'" alt="icon" draggable="false">'
    }else{
        return ''
    }
}

function generateMain() {
    let mainItems = document.getElementsByClassName('mainitem'),
    mainItemLength = mainItems.length,
    page = '';
    for(let i = 0; i < mainItemLength; i++) {

        if(mainItems[i].children[0].children[1].checked) {

            page += generateParent(mainItems[i],mainItems[i].children[1])// this line makes me want to die

        }else if(mainItems[i].children[0].children[4].value.includes('(')){

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

            }else if(subItems[i].parentNode.children[z].children[0].children[4].value.includes('(')){

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




let containerCMS = document.getElementById('CMSF'),
isDown = false,
startX,
scrollLeft;

containerCMS.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - containerCMS.offsetLeft;
    scrollLeft = containerCMS.scrollLeft;
    containerCMS.style.cursor = 'grabbing'
});

containerCMS.addEventListener('mouseleave', () => {
    isDown = false;
    containerCMS.style.cursor = 'grab'
});

containerCMS.addEventListener('mouseup', () => {
    isDown = false;
    containerCMS.style.cursor = 'grab'
});

containerCMS.addEventListener('mousemove', (e) => {
    if(!isDown) return;

    e.preventDefault();
    let x = e.pageX - containerCMS.offsetLeft,
    walk = (x - startX) * 1;
    containerCMS.scrollLeft = scrollLeft - walk;
});