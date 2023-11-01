/*!
 * ENCORE SIMPLE SETTINGS MENU
 * Author: NATSKI
 * MIT License
 */



function loadSSM(SSMsettings){
    let settingsItem = document.getElementsByClassName('SSMcategory'),
    settingsBG = document.getElementById('SSMbg'),
    settings = document.getElementById('SSM'),
    inputs = document.getElementsByClassName('SSMinput'),
    popup = document.getElementById('SSMinfo'),
    selections = document.getElementsByClassName('selection');

    for(let i = 0; i < settingsItem.length; i++){
        settingsItem[i].addEventListener('mouseenter', function(){
            settingsBG.style.transform = `translateY(${this.parentNode.offsetTop + this.offsetTop}px)`
            settingsBG.style.height = `${this.offsetHeight}px`
        })
    }


    settings.addEventListener('mouseenter',function(){
        settingsBG.style.opacity = '1'
    })

    settings.addEventListener('mouseleave',function(){
        settingsBG.style.opacity = '0'
    })

    inputs[0].addEventListener('input', function(){
        searchSSM(this, settingsItem)
    })

    for(let i = 0; i < selections.length; i++) {
        selections[i].addEventListener('click', function(){
            selectionToggleSSM(this)
        })
        selections[i].addEventListener('mouseleave', function(){
            selectionCloseSSM(this)
        })
        for(let x = 1; x < selections[i].children[0].childElementCount; x++){
            selections[i].children[0].children[x].addEventListener('click', function(){
                selectChangeSSM(this)
            })
        }
    }

    for(let i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('mouseenter', function(){
            popupSystemSSM(this, popup)
        })
    
        inputs[i].addEventListener('mouseleave', function(){
            popup.style.opacity = '0'
        })
    
        if(inputs[i].type == 'range'){
            inputs[i].addEventListener('input',function(){
                popup.innerHTML = `<p>${inputs[i].value}</p>`
            })
    
            inputs[i].addEventListener('mousedown',function(){
                popup.innerHTML = `<p>${inputs[i].value}</p>`
            })
    
            inputs[i].addEventListener('mouseup',function(){
                popup.innerHTML = `<p>${this.getAttribute('ssminfo')}</p>`
            })
        }
    }
    settings.style.display = 'block'
}


function toggleSSM(){
    document.getElementById('SSM').classList.toggle('open')
}

function selectChangeSSM(e){
    e.parentNode.children[0].value = e.value
    e.parentNode.children[0].innerText = e.innerText
}


function selectionToggleSSM(e){
    e.classList.toggle('active')
}


function selectionCloseSSM(e){
    e.classList.remove('active')
}


function popupSystemSSM(e,popup){
    popup.style.opacity = '1'
    if(!e.parentNode.classList.contains('SSMcategory')){
        popup.style.transform = `translateY(${e.parentNode.parentNode.parentNode.offsetTop + e.parentNode.parentNode.offsetTop + /*e.parentNode.offsetTop +*/ e.offsetTop + 40}px)`
    }else{
        popup.style.transform = `translateY(${e.parentNode.parentNode.offsetTop + e.parentNode.offsetTop + e.offsetTop + 40}px)`
    }
    popup.innerHTML = `<p>${e.getAttribute('ssminfo')}</p>`
}

function searchSSM(e,settings){
    let len = settings.length,
    text = (e.value).toLowerCase()
    
    for(let x = 0; x < len; x++){
        settings[x].parentNode.style.display = 'none'
    }
    for(let i = 0; i < len; i++){
        if(((settings[i].children[0].innerText).toLowerCase()).includes(text) || settings[i] == settings[0]) {
            settings[i].style.display = 'block'
            settings[i].parentNode.style.display = 'block'
        }else{
            settings[i].style.display = 'none'
        }
    }
}


function SSMstyleCall(url, settings, load) {
    let style = document.createElement('link');
    style.rel = "stylesheet"
    style.type = "text/css"
    style.href = url
    document.getElementsByTagName('head')[0].appendChild(style);
    let linkloaded = document.createElement('img');
        linkloaded.onerror = function(){
            if(load) load(settings);
        }
        linkloaded.src = url;
}


function checkLoadedSSM() {
    return document.readyState === "complete";
}


if(checkLoadedSSM()) {
    SSMstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSM/${SSM_settings.style}SSM.css`, SSM_settings, loadSSM)
}


window.addEventListener("load", function() {
    setTimeout(() => {
        SSMstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSM/${SSM_settings.style}SSM.css`, SSM_settings, loadSSM)
    },300)
})