


let videoElement = null,
center = {x:0,y:0}
const video = document.getElementById('video'), 
canvas = document.getElementById('canvas'), 
ctx = canvas.getContext('2d', {willReadFrequently: true}), 
cameractx = video.getContext('2d', {willReadFrequently: true}),



faceCanvas = document.getElementById('facecanvas'),
faceCtx = faceCanvas.getContext('2d', {willReadFrequently: true}),

rotate = {
  x:0,
  y:0,
  z:0
},

cameraPoints = {
  red:{x:0,y:0},
  blue:{x:0,y:0},
  green:{x:0,y:0}
},



colors = {
  'red':[255,0,0],
  'green':[0,190,0],
  'blue':[0,0,255]
},


anchors={
  centerAnchor:{x:0,y:0,xRange:[0,0.2],yRange:[0,0.3]},
  topAnchor:{x:0,y:-0.6,xRange:[0,0.025],yRange:[-0.6,-0.53]},
  bottomAnchor:{x:0,y:0.6,xRange:[0,0.08],yRange:[0.56,0.65]},
  leftAnchor:{x:-0.5,y:0,xRange:[-0.5,-0.48],yRange:[0,0.05]},
  rightAnchor:{x:0.5,y:0,xRange:[0.5,0.52],yRange:[0,0.05]}
},
{centerAnchor, topAnchor, bottomAnchor, leftAnchor, rightAnchor} = anchors;




//gets video data and passes it to canvas
navigator.mediaDevices.getUserMedia({ video:true, audio:false })
.then(function(videoInfo){
  
  let videoElement = document.createElement('video')
  videoElement.muted = true
  videoElement.srcObject = videoInfo;
  videoElement.play();
/*
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(info);
  const scriptProcessor = audioContext.createScriptProcessor(512, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);
  
  scriptProcessor.onaudioprocess = function() {

    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    const arraySum = array.reduce((a, value) => a + value, 0);
    const average = arraySum / array.length;
    x = Math.floor(average)*0.01

    if(x > volume){
      mouthnum = {x:0.2 * x,y:0.05 * x}
    }else{
      mouthnum = {x:0,y:0}
    }
  }
*/
  videoElement.onloadeddata = function() {

    video.height = videoElement.videoHeight;
    video.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.width = videoElement.videoWidth;
    //console.log(video.height, video.width)


    faceCanvas.height = 400
    faceCanvas.width = 400

    faceCtx.translate(faceCanvas.width/2,faceCanvas.height/2);
    faceCtx.scale(faceCanvas.width*0.5,faceCanvas.height*0.5);
    


    drawVideo(videoElement)
  }

}).catch(function(error) {

  console.log(error)

});


//uses video data to draw video to canvas
function drawVideo(videoElement){

  cameractx.drawImage(videoElement,0,0);


  let videoframe = cameractx.getImageData(0,0,video.width,video.height);


  drawhead()

  drawAnchorCanvas(videoframe)
  calculateCenter()

  window.requestAnimationFrame(function(){
    drawVideo(videoElement)
  });

}



function drawAnchorCanvas(videoframe){
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLines()
  calculateDistance()
  drawAnchor(cameraPoints.red = avgLocation(getPointCamera(videoframe,colors.red)),'red')
  drawAnchor(cameraPoints.green = avgLocation(getPointCamera(videoframe,colors.green)),'green')
  drawAnchor(cameraPoints.blue = avgLocation(getPointCamera(videoframe,colors.blue)),'blue')
  drawAnchor(center = calculateCenter(), 'black')
}



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

  let avg = {x:0, y:0};

  for(let i = 0; i<location.length; i++) {

    avg.x += location[i].x;
    avg.y += location[i].y;

  }

  avg.x /= location.length;
  avg.y /= location.length;


    return avg;

};



function getPointCamera(videoframe,color,amount=125){

  let location = [],
  data = videoframe.data;

  for(let i = 0; i <= data.length; i+=4) {

    let r = data[i],
    g = data[i+1],
    b = data[i+2];

    if(match([r,g,b],color,amount)) {

      let index = i / 4,
      y = Math.floor(index / videoframe.width),
      x = index % videoframe.width;
      location.push({x,y});
      
    }
  }

  return location;

};


function drawAnchor(location,color,rad=10) {


    cameractx.beginPath();
    cameractx.arc(location.x, location.y,rad,0,Math.PI*2);
    cameractx.fillStyle=color
    cameractx.fill();


    ctx.beginPath();
    ctx.arc(location.x, location.y,rad,0,Math.PI*2);
    ctx.fillStyle=color
    ctx.fill();


};

//blue should be center
//red should be vertical
//green should be horizontal


function calculateRotation(){
  //center to green

  Math.atan((center.y - cameraPoints.green.y) / (center.x - cameraPoints.green.x));

  deg * (Math.PI / 180)
}
  
function calculateCenter() {

  let avg = {x:0,y:0};

  for(let ID in cameraPoints){

    let points = cameraPoints[ID];

    avg.x += points.x

    avg.y += points.y

  }

    avg.x /= 3

    avg.y /= 3

    return avg
};



function calculateDistance(){



  ctx.beginPath();
  ctx.moveTo(center.x,center.y);
  ctx.lineTo(cameraPoints.green.x, cameraPoints.green.y);
  ctx.stroke();
}


function drawLines(){
    ctx.beginPath();
    ctx.moveTo(cameraPoints.red.x, cameraPoints.red.y);
    ctx.lineTo(cameraPoints.blue.x, cameraPoints.blue.y);
    ctx.lineTo(cameraPoints.green.x, cameraPoints.green.y);
    ctx.lineTo(cameraPoints.red.x, cameraPoints.red.y);
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(center.x, center.y,170,0,Math.PI*2);
    ctx.stroke();
}








function drawhead() {
let xr = -( (canvas.height / 2 - center.x) / canvas.width),
yr = -( (canvas.width / 2 - center.y) / canvas.width),
xt = -( (canvas.height / 2 - (cameraPoints.green.x - center.x)) / canvas.height),
yt = -( (canvas.width / 2 - (cameraPoints.green.y - center.x)) / canvas.width)



  faceCtx.fillStyle = "#ffffff";
  faceCtx.strokeStyle = "black";
  faceCtx.lineWidth = 0.01;

  faceCtx.fillRect(-1,-1, faceCanvas.width, faceCanvas.height);
  faceCtx.beginPath();
  faceCtx.moveTo(topAnchor.x+xr,topAnchor.y+yr);
  faceCtx.quadraticCurveTo(centerAnchor.x+xr+xt,centerAnchor.y+yr+yt,bottomAnchor.x+xr,bottomAnchor.y+yr);
  faceCtx.moveTo(leftAnchor.x+xr, leftAnchor.y+yr);
  faceCtx.quadraticCurveTo(centerAnchor.x+xr+xt,centerAnchor.y+yr+yt,rightAnchor.x+xr,rightAnchor.y+yr);
  faceCtx.stroke();

  faceCtx.beginPath();
  faceCtx.moveTo(bottomAnchor.x+xr,bottomAnchor.y+yr);
  faceCtx.quadraticCurveTo(-0.4+xr, bottomAnchor.y+yr-0.1,leftAnchor.x+xr,leftAnchor.y+yr);
  faceCtx.quadraticCurveTo(-0.45+xr, topAnchor.y+yr+0.05,topAnchor.x+xr,topAnchor.y+yr);
  faceCtx.quadraticCurveTo(0.45+xr, topAnchor.y+yr+0.05,rightAnchor.x+xr,rightAnchor.y+yr);
  faceCtx.quadraticCurveTo(0.4+xr, bottomAnchor.y+yr-0.1,bottomAnchor.x+xr,bottomAnchor.y+yr);
  faceCtx.stroke();


};

