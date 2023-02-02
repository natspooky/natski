/*!
 * Word Counter And Citing System
 * Author: Natski
 * MIT License
 */
var frameloader=document.getElementById("bibcontainer"),hoverable=document.getElementsByClassName("sourcer");for(let i=0;i<hoverable.length;i++)hoverable[i].addEventListener("mouseenter",function(e){frameloader.innerHTML=hoverable[i].name,(icon=frameloader.appendChild(document.createElement("ion-icon"))).name="open-outline";let r=e.pageX,t=e.pageY;frameloader.style.left=r+"px",frameloader.style.top=t+"px",frameloader.style.display="block"}),hoverable[i].addEventListener("mouseleave",function(){frameloader.innerHTML="",frameloader.style.left="0px",frameloader.style.top="0px",frameloader.style.display="none"});function wordCount(e){return e.textContent.split(/\s+[^0-9]/).length}document.getElementById("wordcount").innerHTML="Word Count: "+wordCount(document.querySelector("article"));