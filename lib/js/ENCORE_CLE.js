/*!
 * ENCORE CHANGELOG EDITOR
 * Author: NATSKI
 * MIT License
 */

console.log('loading ENCORE_CLE')

let value = ['add','remove','fix'],
htmlData = ['<svg class="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.73 609.73"><path d="M305.04,609.73c-15.82,.01-30.15-6.4-40.52-16.76-10.37-10.37-16.76-24.65-16.76-40.45l-.11-190.37-190.37,.11C25.66,362.28,.02,336.66,0,305.04c-.02-15.82,6.4-30.14,16.77-40.51s24.65-16.76,40.45-16.77l190.37-.11-.11-190.37C247.46,25.67,273.07,.02,304.69,0c15.82-.01,30.14,6.4,40.51,16.77s16.77,24.65,16.77,40.45l.11,190.37,190.37-.11c31.61-.02,57.26,25.6,57.28,57.21,.01,15.82-6.4,30.15-16.77,40.52-10.37,10.37-24.65,16.76-40.45,16.76l-190.37,.11,.11,190.37c.02,31.62-25.59,57.26-57.21,57.28Z"/></svg>','<svg class="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.14 616.14"><path d="M593.94,593.61c-14.82,14.84-34.25,22.26-53.68,22.26s-38.81-7.4-53.62-22.2l-178.51-178.3-178.3,178.51c-29.62,29.65-77.66,29.68-107.31,.06-14.84-14.81-22.25-34.25-22.25-53.68s7.39-38.81,22.19-53.62l178.3-178.51L22.25,129.83c-29.64-29.62-29.67-77.66-.06-107.31C37.01,7.68,56.44,.27,75.87,.27s38.82,7.39,53.63,22.19l178.51,178.3L486.31,22.25c29.61-29.64,77.65-29.67,107.3-.06,14.84,14.82,22.26,34.25,22.26,53.69s-7.4,38.81-22.2,53.62l-178.3,178.51,178.51,178.3c29.65,29.61,29.68,77.65,.06,107.3Z"/></svg>','<svg class="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 692.13 496.44"><path d="M692.13,75.84c0,21.49-9.08,42.85-26.74,57.86L259.79,478.38c-14.27,12.13-31.73,18.06-49.1,18.06-21.49,0-42.84-9.08-57.85-26.74L18.06,311.1c-27.14-31.94-23.25-79.82,8.68-106.96,14.28-12.13,31.73-18.06,49.1-18.06,21.5,0,42.85,9.09,57.86,26.75l85.64,100.77L567.12,18.06c31.94-27.13,79.82-23.25,106.96,8.69,12.12,14.27,18.05,31.72,18.05,49.09Z"/></svg>']

function newheader() {
    headerlog = document.createElement('section'), 
    title = document.createElement('input'),
    elembutton = document.createElement('button'),
    del = document.createElement('button')
    del.className = 'delete'
    del.innerText = 'Delete Catagory'
    del.onclick = function() {this.parentNode.remove()}
    headerlog.className = 'headerLog'
    title.type = 'text'
    title.placeholder = 'Catagory'
    title.className = 'logbutton'
    elembutton.onclick = function() {newelement(this.parentNode, this)}
    elembutton.innerText = 'new log'
    elembutton.className = 'addbut'
    headerlog.appendChild(document.createElement('hr'))
    headerlog.appendChild(title)
    headerlog.appendChild(elembutton)
    headerlog.appendChild(del)
    document.querySelector('main').appendChild(headerlog)
}


function newelement(e,z) {
    options = document.createElement('select'),
    logs = document.createElement('section'),
    change = document.createElement('input'),
    del = document.createElement('button'),
    elembutton = document.createElement('button')
    elembutton.onclick = function() {newelement(this.parentNode, this)}
    elembutton.innerText = 'new change'
    elembutton.className = 'addbut'
    del.className = 'delete'
    del.innerText = 'Delete Change'
    del.onclick = function() {this.parentNode.remove()}
    change.className = 'changes'
    change.placeholder = 'Log Information'
    change.type = 'text'
    logs.className = 'changeLog'
    for(let i = 0; i < 3; i++){
        x = document.createElement('option')
        x.value = value[i]
        x.innerText = value[i]
        options.appendChild(x)
    }
    z.remove()
    logs.appendChild(del)
    logs.appendChild(options)
    logs.appendChild(change)
    e.appendChild(logs)
    e.appendChild(elembutton)
}

function reset() {
    let logtiles = document.getElementsByClassName('headerLog'),
    logtilelen = logtiles.length
    document.getElementById('date').value = null
    for(let i = 0; i < logtilelen; i++) {
        logtiles[document.getElementsByClassName('headerLog').length - 1].remove()
    }
}

function format() {
    let format = '',
        main = document.getElementsByClassName('headerLog'),
        sub = document.getElementsByClassName('changeLog')
        date = document.getElementById('date').value.split("-")
    format += '<h4>' + date[2] + ' / ' + date[1] + ' / ' + date[0] + '</h4><hr class="mini">'
    for(let i = 1; i < main.length + 1; i++) {
        if(main[i-1].firstElementChild.value == null) {
            alert('please fill in all fields')
            return
        }
        format += '<h3>' + main[i-1].firstElementChild.value + '<h3><hr>'
        for(let e = 0; e < main[i-1].childElementCount - (4*i); e++) {
            for(let x = 0; x < 2; x++) {
                if(sub[e].children[1].value == value[x]) {
                    format += '<section>'+htmlData[e]
                }if(sub[e].children[1].value == null) {
                    alert('please fill in all fields')
                    return
                }
            }
            format += '<p>' + sub[e].lastElementChild.value + '</p></section>'
        }
    }
    const link = document.createElement("a"),
        file = new Blob([format], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "log.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove()
}
console.log('ENCORE_CLE loaded')