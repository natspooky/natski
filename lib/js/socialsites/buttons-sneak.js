$(document).ready(function(){
    let list=document.querySelectorAll('.list');
    for(let i=0;i<list.length;i++){
        list[i].onclick=function(){
            let j=0;
            while(j<list.length){
                list[j++].className='list';
            }
            list[i].className='list active';
        }
    };
    $("a").click(function(){
        var value={current:$(this).attr('value')}
        if(typeof value.old ==="undefined"){
            value.old = "#home"
        }
        $(value.old).css('display','flex');
        $(value.old).css('z-index','2');
        $('.page').css('z-index','0')

        setTimeout(function(){
            $(value.current).css('display','none')
            value={old:current}
        },1000);

    });
});
