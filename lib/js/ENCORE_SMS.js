/*!
 * ENCORE SETTINGS MENU SYSTEM
 * Author: NATSKI
 * MIT License
 */



let settingsItem = document.getElementsByClassName('setting'),
    settingsBG = document.getElementById('settingsBG'),
    settings = document.getElementById('settingsPanel'),
    inputs = document.getElementsByTagName('input'),
    popup = document.getElementById('informationPopup'),
    selections = document.getElementsByClassName('selection');


    for(let i = 0; i < settingsItem.length; i++){
        settingsItem[i].addEventListener('mouseenter', function(){
            settingsBG.style.transform = `translateY(${this.offsetTop}px)`
            settingsBG.style.height = `${this.offsetHeight}px`
        })
    }

    settings.addEventListener('mouseenter',function(){
        settingsBG.style.opacity = '1'
    })

    settings.addEventListener('mouseleave',function(){
        settingsBG.style.opacity = '0'
    })


    for(let i = 0; i < selections.length; i++){
        selections[i].addEventListener('click', function(){
            selectionToggle(this)

        })
        selections[i].addEventListener('mouseenter', function(){
            popupSystem(this)
        })
        selections[i].addEventListener('mouseleave', function(){
            popup.style.opacity = '0'
            selectionClose(this)
        })
        for(let x = 1; x < selections[i].children[0].childElementCount; x++){
            selections[i].children[0].children[x].addEventListener('click', function(){
                selectChange(this)
            })
        }
    }

    function selectChange(e){
        e.parentNode.children[0].value = e.value
        e.parentNode.children[0].innerHTML = e.innerText
    }


    function selectionToggle(e){
        e.classList.toggle('active')
    }


    function selectionClose(e){
        e.classList.remove('active')
        e.style.height = '30px'
    }


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
                popup.innerHTML = '<p>'+ Number(inputs[i].value).toFixed(2) +'</p>'
            })

            inputs[i].addEventListener('mousedown',function(){
                popup.innerHTML = '<p>'+ Number(inputs[i].value).toFixed(2) +'</p>'
                popup.style.width = `${popup.children[0].offsetWidth}px`
            })

            inputs[i].addEventListener('mouseup',function(){
                popup.innerHTML = '<p>'+ this.name +'</p>'
                popup.style.width = `${popup.children[0].offsetWidth}px`
            })
        }
    }

    function popupSystem(e){
        popup.style.opacity = '1'
        popup.style.transform = `translate(${e.offsetLeft + e.offsetWidth + 15}px, ${e.parentNode.offsetTop + e.offsetTop - settings.scrollTop}px)`
        popup.innerHTML = '<p>'+ e.getAttribute('name') +'</p>'
        popup.style.width = `${popup.children[0].offsetWidth}px`
    }