/*!
 * Face Tracking System
 * Author: Natski
 * MIT License
 */

/* camera system */
  let audio = video = null;
  navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
  }).then(function(info){

    audio = document.createElement('audio');
    audio.srcObject = info;
    audio.play();
    
    video = document.createElement('video');
    video.srcObject = info;
    video.play();

    video.onloadeddata = function() {

      //console.log(video);
      cameracan.height = video.videoHeight;
      cameracan.width = video.videoWidth;
      
    }

  }).catch(function(error) {

    console.log(error);
    alert(error);

  });



/* variables */
const cameracan = document.getElementById('video'), canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d', {willReadFrequently: true}), cameractx = cameracan.getContext('2d', {willReadFrequently: true}),
anchors={
  centerAnchor:{x:0,y:0,xRange:[0,0.2],yRange:[0,0.3]},
  topAnchor:{x:0,y:-0.6,xRange:[0,0.025],yRange:[-0.6,-0.53]},
  bottomAnchor:{x:0,y:0.6,xRange:[0,0.08],yRange:[0.56,0.65]},
  leftAnchor:{x:-0.5,y:0,xRange:[-0.5,-0.48],yRange:[0,0.05]},
  rightAnchor:{x:0.5,y:0,xRange:[0.5,0.52],yRange:[0,0.05]}
},
{centerAnchor, topAnchor, bottomAnchor, leftAnchor, rightAnchor} = anchors;


function main() {

  canvas.height = 300;
  canvas.width = 300;
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.scale(canvas.width*0.5,canvas.height*0.5);
  frames();

};


function drawmain() {

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.01;
  ctx.fillRect(-1,-1,2,2);
  drawhead();
  //drawbody();
  drawanchor(centerAnchor);
  drawanchor(topAnchor);
  drawanchor(bottomAnchor);
  drawanchor(leftAnchor);
  drawanchor(rightAnchor);

};


function drawhead() {

  ctx.beginPath();
  ctx.moveTo(topAnchor.x,topAnchor.y);
  ctx.quadraticCurveTo(centerAnchor.x,centerAnchor.y,bottomAnchor.x,bottomAnchor.y);
  ctx.moveTo(leftAnchor.x, leftAnchor.y);
  ctx.quadraticCurveTo(centerAnchor.x,centerAnchor.y,rightAnchor.x,rightAnchor.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bottomAnchor.x,bottomAnchor.y);
  ctx.quadraticCurveTo(-0.4, bottomAnchor.y-0.1,leftAnchor.x,leftAnchor.y);
  ctx.quadraticCurveTo(-0.45, topAnchor.y+0.05,topAnchor.x,topAnchor.y);
  ctx.quadraticCurveTo(0.45, topAnchor.y+0.05,rightAnchor.x,rightAnchor.y);
  ctx.quadraticCurveTo(0.4, bottomAnchor.y-0.1,bottomAnchor.x,bottomAnchor.y);
  ctx.stroke();

  drawnose(centerAnchor);
  drawmouth(centerAnchor);
};


function drawbody() {

  ctx.beginPath();
  ctx.moveTo(-0.2, 0.4);
  ctx.lineTo(-0.2, 0.75);
  ctx.lineTo(-0.7, 0.9);
  ctx.lineTo(-0.7, 1);
  ctx.moveTo(0.2, 0.4);
  ctx.lineTo(0.2, 0.75);
  ctx.lineTo(0.7, 0.9);
  ctx.lineTo(0.7, 1);
  ctx.stroke();

};

function drawmouth(point,mouthmove=0.2) {

  ctx.save();
  ctx.translate(point.x/2,(point.y/2)+0.3);

  ctx.beginPath();
  ctx.moveTo(-0.2,0);
  ctx.quadraticCurveTo(0,(point.y/2.3)+mouthmove,0.2,0);
  ctx.quadraticCurveTo(0,(point.y/2.3)-mouthmove,-0.2,0);
  ctx.stroke();
  ctx.restore();

};

function drawnose(point) {

  ctx.save();
  ctx.translate((point.x/1.5),point.y/1.3);

  ctx.beginPath();
  ctx.moveTo(0,-0.1);
  ctx.quadraticCurveTo((point.x*1.05),(point.y/2)+0.15,0,0.2);
  ctx.stroke();
  ctx.restore();

};


function drawanchor(location,rad=0.05) {

  ctx.beginPath();
  ctx.arc(location.x, location.y,rad,0,Math.PI*2);
  ctx.fillStyle='#ff0000'
  ctx.fill();

};


function moveAnchor(data,attr) {

  for(let anchorID in anchors){

    const p = anchors[anchorID];

    switch(attr) {
      case 'x':
        p.x=interpolate(p.xRange[0],p.xRange[1],data.value);
        break;
      case 'y':
        p.y=interpolate(p.yRange[0],p.yRange[1],data.value);
        break;

    }
  }
};


function interpolate(l, e, t) {

  return l+(e-l)*t;

};


function getPointCamera(videoframe,color=[239, 205, 205],amount=150){

  const location = [];
  const data = videoframe.data;

  for(let i = 0; i <= data.length; i+=4) {

    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];

    if(match([r,g,b],color,amount)) {

      const index = i / 4;
      const y = Math.floor(index / videoframe.width);
      const x = index % videoframe.width;
      location.push({x,y});
      
    }
  }

  return location;

};


function match(color1,color2,amount) {

  return space(color1,color2) <= amount;

};


function space(col1,col2) {

  let distance = 0;

  for(let i = 0; i < col1.length; i++) {

    distance+=(col1[i]-col2[i])*(col1[i]-col2[i])

  }

  return Math.sqrt(distance)

};


function avgLocation(location) {

  const avg = {x:0, y:0};

  for(let i = 0; i<location.length; i++) {

    avg.x += location[i].x;
    avg.y += location[i].y;

  }

  avg.x /= location.length;
  avg.y /= location.length;
  return avg;

};


function frames() {

  drawmain();

  if (video) {

    cameractx.drawImage(video,0,0);
    const videoframe = cameractx.getImageData(0,0,cameracan.width,cameracan.height);
    const videolocation = getPointCamera(videoframe);
    drawframe();
    //console.log(videoframe)
    //console.log(videolocation.length)

    if(videolocation.length>0){

      const average = avgLocation(videolocation);
      //console.log(average)
      //console.log(contain(average))
      const Xmap=(average.x-videoframe.width/2)/videoframe.width;
      const Ymap=(average.y-videoframe.height/2)/videoframe.height;

      if (contain(average) == true) {

        drawcameraanchor(average, 'white');
        moveAnchor({value:Xmap*10},'x');
        moveAnchor({value:Ymap*7},'y');

      } else {

        drawcameraanchor(average, 'red');

      }
    }
  }

  requestAnimationFrame(frames);

};


function drawcameraanchor(location,col,rad=5) {

  cameractx.beginPath();
  cameractx.arc(location.x, location.y,rad,0,Math.PI*2);
  cameractx.fillStyle=col;
  cameractx.fill();

};


function drawframe() {

  cameractx.beginPath();
  cameractx.rect(245, 150, 140, 200)
  cameractx.strokeStyle='white';
  cameractx.stroke();

};


function contain(location) {

  return 245 <= location.x && location.x <= 385 && 150 <= location.y && location.y <= 350;

};


main();

/*hi michey :D 
i did my job poggersssss you are most welcome and i hope this has helped wooo 
i said i was gonna write a secret message but i actually dont know what i am going to write so here you go. you were probably wondering what i was writing this entire time
and now you are gonna be like damn that is a lot of typing woooooowwwww but im actually not writng much lol 
i hope i havent broken anything and i also want you to know i really like your keyboard because i can type quickly and that is very fun to me pog 
tyty and gl with you code you are indeed the mega coder and omg i need to make another nickname for youuuuuu 
we have chef michey, michey boi , computer michey ? idk at this point but i will get there! i should probably make a list or smth...*/