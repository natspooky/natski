/*!
 * ENCORE CHANGELOG EDITOR
 * Author: NATSKI
 * MIT License
 */


let value = ['add','remove','fix','point','GIS icon'],
CLSFalertTimer;

function newheader() {
    headerlog = document.createElement('section'), 
    title = document.createElement('input'),
    elembutton = document.createElement('button'),
    del = document.createElement('button'),
    positionbut = document.createElement('button')
    positionbut.onclick = function() {move(this)}
    positionbut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 747.47 1135.84"><path d="M701,659.64h-199.64v417.93c0,32.18-26.08,58.27-58.26,58.27h-138.72c-32.18,0-58.26-26.09-58.26-58.27v-417.93H46.48c-35.72,0-58.05-38.67-40.19-69.6L333.56,23.2c17.85-30.93,62.5-30.93,80.36,0l327.27,566.84c17.86,30.93-4.47,69.6-40.19,69.6Z"/></svg>'
    positionbut.className = 'logbutton'
    del.className = 'delete'
    del.innerText = 'Delete Category'
    del.onclick = function() {this.parentNode.remove()}
    headerlog.className = 'headerLog'
    title.type = 'text'
    title.placeholder = 'Category'
    title.className = 'logbutton headerinput'
    elembutton.onclick = function() {newelement(this.parentNode, this)}
    elembutton.innerText = 'New Log'
    elembutton.className = 'addbut'
    headerlog.appendChild(document.createElement('hr'))
    headerlog.appendChild(del)
    headerlog.appendChild(positionbut)
    headerlog.appendChild(title)
    headerlog.appendChild(elembutton)
    document.querySelector('main').appendChild(headerlog)
}


function newelement(e,z) {
    let options = document.createElement('select'),
    logs = document.createElement('section'),
    change = document.createElement('input'),
    del = document.createElement('button'),
    elembutton = document.createElement('button'),
    imageLink = document.createElement('input');
    elembutton.onclick = function() {newelement(this.parentNode, this)}
    elembutton.innerText = 'New Log'
    elembutton.className = 'addbut'
    del.className = 'delete'
    del.innerText = 'Delete Log'
    del.onclick = function() {this.parentNode.remove()}
    change.className = 'changes'
    change.placeholder = 'Log Information'
    change.type = 'text'
    imageLink.className = 'imglink'
    imageLink.placeholder = 'Image URL'
    imageLink.type = 'text'
    logs.className = 'changeLog'
    for(let i = 0; i < value.length; i++){
        let x = document.createElement('option')
        x.value = value[i]
        x.innerText = value[i]
        options.appendChild(x)
    }
    z.remove()
    logs.appendChild(del)
    options.onchange = function(){
        checkGISactive(this)
    }
    logs.appendChild(options)
    logs.appendChild(createButtonGIS())
    logs.appendChild(change)
    logs.appendChild(imageLink)
    e.appendChild(logs)
    e.appendChild(elembutton)
}


function checkGISactive(e){
    if(e.value == 'GIS icon'){
        e.parentNode.children[2].style.display = 'inline-flex'
    }else{
        e.parentNode.children[2].style.display = 'none'
    }
}






function reset() {
    let logtiles = document.getElementsByClassName('headerLog'),
    logtilelen = logtiles.length;
    document.getElementById('date').value = null
    for(let i = 0; i < logtilelen; i++) {
        logtiles[document.getElementsByClassName('headerLog').length - 1].remove()
    }
    document.getElementById('prev').innerHTML = ''
}




//


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

    let listValues = [''],
    listNames = ['']
    for(let i = 0; i < 2; i++){
        let x = document.createElement('span')
        x.className = 'listItem'
        x.addEventListener('click', function(){
            checkGISactive(this)
            this.parentNode.children[0].setAttribute('info',this.value)
            this.parentNode.children[0].innerText = this.innerText
        })
        x.value = listValues[i]
        x.innerHTML = listNames[i]

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
            document.getElementById('editContainer').appendChild(containerMain)
            break;
    }
}


function addItem(e,z) {
    let x = 0;
    switch(z){
        case 'category':
            containerMain.className = 'mainitem'
            containerMain.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            item.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            addButton.onclick = function() {addItem(this,'main')}
            removeButton.onclick = function() {removeItemMain(this)}
            containerMain.appendChild(item)
            e.parentNode.parentNode.parentNode.appendChild(containerMain)
            e.parentNode.parentNode.parentNode.insertBefore(containerMain,e.parentNode.parentNode.nextSibling)
            break;

        case 'log':
            containerSub.className = 'subitem'
            containerSub.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            item.style = '--colour:'+ getComputedStyle(e.parentNode).getPropertyValue('--colour') +';'
            addButton.onclick = function() {addItem(this,'sub')}
            removeButton.onclick = function() {removeItemSub(this)}
            containerSub.appendChild(item)
            e.parentNode.parentNode.parentNode.appendChild(containerSub)
            e.parentNode.parentNode.parentNode.insertBefore(containerSub,e.parentNode.parentNode.nextSibling)
            break;

        case 'subLog':
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
        
    }
}


//note to designer
//make 4 layers: main changelog container, category, log, subLog items (eg. image and subtext)

function checkGISactive(e){
    if(e.value != 'img'){
        e.parentNode.parentNode.parentNode.children[3].style.display = 'inline-flex'
        e.parentNode.parentNode.parentNode.children[4].style.display = 'none'
    }else{
        e.parentNode.parentNode.parentNode.children[4].style.display = 'inline-flex'
        e.parentNode.parentNode.parentNode.children[3].style.display = 'none'
    }
}










//



function CLSFalert(e) {
    clearTimeout(CLSFalertTimer)
    let alertbox = document.getElementById('CLSFalert');
    alertbox.innerHTML = `<p>${e}</p>`
    alertbox.classList.add('active')
    CLSFalertTimer = setTimeout(() => {
        alertbox.classList.remove('active')
    }, 2000);
}



function format() {
    let format = '',
    count = 0,
    main = document.getElementsByClassName('headerLog'),
    sub = document.getElementsByClassName('changeLog'),
    headinpt = document.getElementsByClassName('headerinput'),
    changes = document.getElementsByClassName('changes'),
    date = document.getElementById('date').value.split("-"),
    htmlData = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.73 609.73"><path d="M305.04,609.73c-15.82,.01-30.15-6.4-40.52-16.76-10.37-10.37-16.76-24.65-16.76-40.45l-.11-190.37-190.37,.11C25.66,362.28,.02,336.66,0,305.04c-.02-15.82,6.4-30.14,16.77-40.51s24.65-16.76,40.45-16.77l190.37-.11-.11-190.37C247.46,25.67,273.07,.02,304.69,0c15.82-.01,30.14,6.4,40.51,16.77s16.77,24.65,16.77,40.45l.11,190.37,190.37-.11c31.61-.02,57.26,25.6,57.28,57.21,.01,15.82-6.4,30.15-16.77,40.52-10.37,10.37-24.65,16.76-40.45,16.76l-190.37,.11,.11,190.37c.02,31.62-25.59,57.26-57.21,57.28Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 616.14"><path d="M593.94,593.61c-14.82,14.84-34.25,22.26-53.68,22.26s-38.81-7.4-53.62-22.2l-178.51-178.3-178.3,178.51c-29.62,29.65-77.66,29.68-107.31,.06-14.84-14.81-22.25-34.25-22.25-53.68s7.39-38.81,22.19-53.62l178.3-178.51L22.25,129.83c-29.64-29.62-29.67-77.66-.06-107.31C37.01,7.68,56.44,.27,75.87,.27s38.82,7.39,53.63,22.19l178.51,178.3L486.31,22.25c29.61-29.64,77.65-29.67,107.3-.06,14.84,14.82,22.26,34.25,22.26,53.69s-7.4,38.81-22.2,53.62l-178.3,178.51,178.51,178.3c29.65,29.61,29.68,77.65,.06,107.3Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 692.13 496.44"><path d="M692.13,75.84c0,21.49-9.08,42.85-26.74,57.86L259.79,478.38c-14.27,12.13-31.73,18.06-49.1,18.06-21.49,0-42.84-9.08-57.85-26.74L18.06,311.1c-27.14-31.94-23.25-79.82,8.68-106.96,14.28-12.13,31.73-18.06,49.1-18.06,21.5,0,42.85,9.09,57.86,26.75l85.64,100.77L567.12,18.06c31.94-27.13,79.82-23.25,106.96,8.69,12.12,14.27,18.05,31.72,18.05,49.09Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1133.86 1133.86"><circle cx="566.93" cy="566.93" r="566.93"/></svg>'];
    if(document.getElementById('date').value == ''){
        CLSFalert('please add a date')
        return 0
    }
    for(let i = 0; i < headinpt.length; i++) {
        if (headinpt[i].value == ''){
            CLSFalert('please fill all fields')
            return 0
        }
    }
    for(let i = 0; i < changes.length; i++) {
        if (changes[i].value == ''){
            CLSFalert('please fill all fields')
            return 0
        }
    }
    
    format += `<h4>${date[2]} / ${date[1]} / ${date[0]}</h4><hr class="mini">`


    for(let i = 0; i < main.length; i++) {

        format += `<h3>${main[i].children[3].value}</h3><hr>`

        for(let e = 0; e < main[i].childElementCount - 5; e++) {
            if(sub[e + count].children[1].value == 'GIS icon'){
                format += `<section><GIS-icon title="${sub[e + count].children[2].title}"></GIS-icon>`
            }else{
                for(let x = 0; x < value.length; x++) {
                    if(sub[e + count].children[1].value == value[x]) {
                        format += `<section>${htmlData[x]}`
                    }
                }
            }
            format += `<p>${sub[e + count].children[3].value}</p></section>`

            if(sub[e + count].children[4].value != ''){
                let imgURL = sub[e + count].children[4].value
                format += `<div name="${imgURL}"><svg class="CLSsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.39 850.39"><path d="M746.41,0H103.99C77.59,0,56.19,21.4,56.19,47.8V802.6c0,26.39,21.4,47.79,47.8,47.79H746.41c26.39,0,47.79-21.4,47.79-47.79V47.8C794.2,21.4,772.8,0,746.41,0Zm-36.6,749.3c0,9.22-7.48,16.7-16.71,16.7H157.29c-9.23,0-16.71-7.48-16.71-16.7V101.1c0-9.23,7.48-16.71,16.71-16.71H699.41c5.74,0,10.4,4.66,10.4,10.4V749.3Z"></path><rect x="371.3" y="-59.51" width="107.79" height="483.41" rx="53.9" ry="53.9" transform="translate(607.4 -243) rotate(90)"></rect><rect x="397.5" y="186.14" width="55.4" height="323.31" rx="27.7" ry="27.7" transform="translate(772.99 -77.4) rotate(90)"></rect><rect x="397.5" y="229.39" width="55.4" height="443.21" rx="27.7" ry="27.7" transform="translate(876.19 25.8) rotate(90)"></rect><rect x="397.5" y="447.39" width="55.4" height="213.61" rx="27.7" ry="27.7" transform="translate(979.39 129) rotate(90)"></rect><rect x="397.5" y="486.99" width="55.4" height="340.81" rx="27.7" ry="27.7" transform="translate(1082.59 232.2) rotate(90)"></rect></svg><img class="CLSimage" src="${imgURL}" alt="${imgURL}" draggable="false"></div>`
            }
        }
        count += (main[i].childElementCount - 5)
    }
    return format
}


function saveCLS(e) {
    let x = format()
    if(x == 0) {
        return
    }else{
        switch(e) {
            case 'copy':
                navigator.clipboard.writeText(btoa(x));
                CLSFalert("copied to clipboard");
                break;

            case 'save':
                let link = document.createElement("a"),
                file = new Blob([btoa(x)], { type: 'text/plain' });
                link.href = URL.createObjectURL(file);
                link.download = "log.ntsk";
                link.click();
                URL.revokeObjectURL(link.href);
                link.remove();
                break;

            case 'preview':
                document.getElementById('prev').innerHTML = x
                break;
        }
    }
}

function CLEstyleCall(url) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementById('CLS').appendChild(style);
}



function CLScreateObserver(){
    const observerMutLCS = new MutationObserver(CLSimageLoader);
    const observerConfig = {attributes: false, childList: true, characterData: false, subtree:true};
    observerMutLCS.observe(document.getElementById('CLS'), observerConfig);
}


function CLSimageLoader(mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (typeof node.getElementsByTagName !== 'function') {
                return
            }
            let imgs = node.getElementsByTagName('img');
            Array.prototype.forEach.call(imgs, img => {
                if(img.complete && img.naturalHeight !== 0){
                    img.style.opacity = '1'
                }else{
                    img.onload = function(){
                       img.style.opacity = '1'
                    }
                } 
            })
        })
    })
}



function move(x) {
    let span = x.parentNode,
    td = span.parentNode;
    if (span.previousElementSibling && span.previousElementSibling != document.getElementById('date')) {
        td.insertBefore(span, span.previousElementSibling);
    }
}

CLEstyleCall('https://natski.netlify.app/lib/ENCORE_DB/CLS/1CLS.css')
CLScreateObserver()