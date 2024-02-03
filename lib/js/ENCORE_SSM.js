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
    selections = document.getElementsByClassName('SSMselection'),
    SSMdevice = deviceCheckSSM() || iOSspecificSSM();

    if(!SSMdevice){
        for(let i = 0; i < settingsItem.length; i++){
            settingsItem[i].addEventListener('mouseenter', function(){
                settingsBG.style.transform = `translateY(${this.parentNode.offsetTop + this.offsetTop}px)`
                settingsBG.style.height = `${this.offsetHeight}px`
            })
        }
    /*
        settings.addEventListener('mouseenter',function(){
            settingsBG.style.opacity = '1'
        })
    
        settings.addEventListener('mouseleave',function(){
            settingsBG.style.opacity = '0'
        })*/
    }

    inputs[0].addEventListener('input', function(){
        searchSSM(this, settingsItem)
    })

    for(let i = 0; i < selections.length; i++) {
        selections[i].addEventListener('click', function(){
            selectionToggleSSM(this)
            popup.style.opacity = '0'
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


function deviceCheckSSM() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


function iOSspecificSSM() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
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
        popup.style.transform = `translateY(${e.parentNode.parentNode.parentNode.offsetTop + e.parentNode.parentNode.offsetTop + /*e.parentNode.offsetTop +*/ e.parentNode.parentNode.offsetHeight}px)`
    }else{
        popup.style.transform = `translateY(${e.parentNode.parentNode.offsetTop + e.parentNode.offsetTop + e.parentNode.offsetHeight}px)`
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