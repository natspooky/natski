/*!
 * ENCORE SETTINGS MENU SYSTEM
 * Author: NATSKI
 * MIT License
 */



let settingsItem = document.getElementsByClassName('setting'),
    settingsBG = document.getElementById('settingsBG'),
    settings = document.getElementById('settingsPanel');


    for(let i = 0; i < settingsItem.length; i++){
        settingsItem[i].addEventListener('mouseenter', function(){
            settingsBG.style.transform = 'translateY('+ this.offsetTop +'px)'
            settingsBG.style.height = this.offsetHeight + 'px'
        })
    }

    settings.addEventListener('mouseenter',function(){
        settingsBG.style.opacity = '1'
    })

    settings.addEventListener('mouseleave',function(){
        settingsBG.style.opacity = '0'
    })


    let selections = document.getElementsByClassName('selection');
    for(let i = 0; i < selections.length; i++){
        selections[i].addEventListener('click', function(){
            if(settingsBG.style.height != (this.parentNode.offsetHeight + 'px')){
                settingsBG.style.height = (this.parentNode.offsetHeight - this.children[0].offsetHeight + 30) + 'px'
            }else{
                settingsBG.style.height = (this.parentNode.offsetHeight + this.children[0].offsetHeight - 30) + 'px'
            }
            selectionToggle(this)

        })
        selections[i].addEventListener('mouseenter', function(){
            popupSystem(this)
        })
        selections[i].addEventListener('mouseleave', function(){
            popup.style.opacity = '0'
            selectionClose(this)
            settingsBG.style.height = (this.parentNode.offsetHeight - this.children[0].offsetHeight + 30) + 'px'
        })
        for(let x = 1; x < selections[i].children[0].childElementCount; x++){
            selections[i].children[0].children[x].addEventListener('click', function(){
                selections[i].children[0].children[0].value = this.value
                selections[i].children[0].children[0].innerHTML = this.innerText
            })
        }
    }


    function selectionToggle(e){
        e.classList.toggle('active')
        if(e.style.height != e.children[0].offsetHeight + 'px') {
            e.style.height = e.children[0].offsetHeight + 'px'
        }else{
            e.style.height = '30px'
        }
    }

    function selectionClose(e){
        e.classList.remove('active')
        e.style.height = '30px'
    }

    let inputs = document.getElementsByTagName('input'),
    popup = document.getElementById('informationPopup')
    for(let i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('mouseenter', function(){
            popupSystem(this)
        })

        inputs[i].addEventListener('mouseleave', function(){
            popup.style.opacity = '0'

            //make this into a class 
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
            //
        })

        if(inputs[i].type == 'range'){
            inputs[i].addEventListener('input',function(){
                popup.innerHTML = '<p>'+ inputs[i].value +'</p>'
                
            })
            inputs[i].addEventListener('mousedown',function(){
              popup.innerHTML = '<p>'+ inputs[i].value +'</p>'
              popup.style.width = popup.children[0].offsetWidth + 'px'
          })

            inputs[i].addEventListener('mouseup',function(){
                popup.innerHTML = '<p>'+ this.name +'</p>'
                popup.style.width = popup.children[0].offsetWidth + 'px'
            })
        }
    }

    function popupSystem(e){
        popup.style.opacity = '1'
        popup.style.transform = 'translate('+ (e.offsetLeft + e.offsetWidth + 15)+'px,' + (e.parentNode.offsetTop + e.offsetTop - settings.scrollTop) +'px)'
        popup.innerHTML = '<p>'+ e.getAttribute('name') +'</p>'
        popup.style.width = popup.children[0].offsetWidth + 'px'
    }
