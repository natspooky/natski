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
        var value=$(this).attr('value')
        $('.page').css('display','none');
        $(value).css('display','flex');
    });
});
