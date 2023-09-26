


let videoElement = null,
center = {x:0, y:0},
frameTimer = undefined,
currentVideoMedia = undefined,
videoConstraints = {video:{width: { max: 1280 },height: { max: 720 }, frameRate: { max: 30 }, deviceId:null}, audio:true}
const video = document.getElementById('video'), 
canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d', {willReadFrequently: true}), 
cameractx = video.getContext('2d', {willReadFrequently: true}),
faceCanvas = document.getElementById('facecanvas'),
faceCtx = faceCanvas.getContext('2d', {willReadFrequently: true}),

trackerSettings = {
  Threshold:125,
  Ysense:1,
  Xsense:1,
  LocationLock:false,
  RotationLock:false,
  AudioTracking:true,
  VideoTracking:true,
  ShowCalculations:true,
  DrawTimer:33
},

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
  red:[255,0,0],
  green:[0,190,0],
  blue:[0,0,255]
},


anchors={
  centerAnchor:{x:0,y:0,xRange:[0,0.2],yRange:[0,0.3]},
  topAnchor:{x:0,y:-0.6},
  bottomAnchor:{x:0,y:0.6},
  leftAnchor:{x:-0.5,y:0},
  rightAnchor:{x:0.5,y:0}
},
{centerAnchor, topAnchor, bottomAnchor, leftAnchor, rightAnchor} = anchors,

PI = aproximatePi();


//gets video data and passes it to canvas







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





function changeCameraData(value,constraintType){

    switch(constraintType){
      case 'device':
        videoConstraints.video.deviceId = { exact: value }
        break;
      case 'fps':
        videoConstraints.video.frameRate = { max: Number(value) }
        trackerSettings.DrawTimer = 1000 / Number(value)
        break;
      case 'resolution':
        let tempValue = value.split(' ')
        videoConstraints.video.width = { min: 640, ideal: Number(tempValue[0]), max: 1920 }
        videoConstraints.video.height = { min: 480, ideal: Number(tempValue[1]), max: 1080 }
        break;
    }
    getMedia(videoConstraints)

}






function getMedia(constraints){
  frameTimer = undefined
  stopMedia(currentVideoMedia)
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(Info => {

      currentVideoMedia = Info;
      videoElement = document.createElement('video')
      videoElement.muted = true
      videoElement.srcObject = Info;

      videoElement.onloadeddata = function() {
        let height = videoElement.videoHeight,
        width = videoElement.videoWidth;
    
        video.height = height
        video.width = width
        canvas.height = height
        canvas.width = width

        videoElement.play();

        frameTimer = true
    
        drawVideo(videoElement)
      }
    })
    .catch(error => {
      console.error(error);
    });
}



function changeMicrophone(){

}

function stopMedia(stream) {
  if(stream){
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
}


function getSettingData(){
  navigator.mediaDevices.enumerateDevices()
  .then((devices) => {
    devices.forEach((device) => {
      console.log(device.kind)
      if(device.kind == 'videoinput' || device.kind == 'audioinput'){
        let Select;
        if(device.kind == 'videoinput'){
          Select = document.getElementById('videoInput')
        }
        if(device.kind == 'audioinput'){
          Select = document.getElementById('audioInput')
        }
        let item = document.createElement('span')
        item.className = 'item'
        item.value = device.deviceId
        item.innerText = device.label
        item.addEventListener('click',function(){
          selectChange(this)
          changeCameraData(device.deviceId,'device')
        })
        console.log(Select)
        Select.children[0].appendChild(item)
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}


function setup(){
  faceCanvas.height = 400
  faceCanvas.width = 400
  faceCtx.translate(faceCanvas.width/2,faceCanvas.height/2);
  faceCtx.scale(faceCanvas.width*0.5,faceCanvas.height*0.5);
  getMedia(videoConstraints)
  getSettingData()
}

window.onload = function(){
  setup()
}






















//uses video data to draw video to canvas
function drawVideo(videoElement){

  cameractx.drawImage(videoElement, 0, 0);
  //cameractx.drawImage(document.getElementById('source'),0,0);

  let videoframe = cameractx.getImageData(0, 0, video.width, video.height);


  drawhead()

  drawAnchorCanvas(videoframe)
  calculateCenter()


  if(frameTimer){
    setTimeout(() => {
      window.requestAnimationFrame(function(){
        drawVideo(videoElement)
      });
    }, trackerSettings.DrawTimer);
  }
}


function drawAnchorCanvas(videoframe){

  cameraPoints.red = avgLocation(getPointCamera(videoframe, colors.red))
  cameraPoints.green = avgLocation(getPointCamera(videoframe, colors.green))
  cameraPoints.blue = avgLocation(getPointCamera(videoframe, colors.blue))
  center = calculateCenter()

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawLines()
  drawDistance()

  drawAnchor(cameraPoints.red, 'red')
  drawAnchor(cameraPoints.green, 'green')
  drawAnchor(cameraPoints.blue, 'blue')
  drawAnchor(center, 'black')
}


function match(color1, color2, amount) {
  return space(color1, color2) <= amount;
};


function space(col1, col2) {
  let distance = 0;
  for(let i = 0; i < col1.length; i++) {
    distance += (col1[i] - col2[i]) * (col1[i] - col2[i])
  }
  return aproximateSquareRoot(distance)
};


function avgLocation(location) {
  let avg = {x:0, y:0};
  for(let i = 0; i < location.length; i++) {
    avg.x += location[i].x;
    avg.y += location[i].y;
  }
  avg.x /= location.length;
  avg.y /= location.length;
  return avg
}


function getPointCamera(videoframe, color, amount = trackerSettings.Threshold) {
  let location = [],
  data = videoframe.data;
  for(let i = 0; i <= data.length; i += 4) {
    let r = data[i],
    g = data[i+1],
    b = data[i+2];
    if(match([r, g, b], color, amount)) {
      let index = i / 4,
      y = Math.floor(index / videoframe.width),
      x = index % videoframe.width;
      location.push({x, y});
    }
  }
  return location
}


function drawAnchor(location, color, rad=10) {
    cameractx.beginPath();
    cameractx.arc(location.x, location.y, rad, 0, PI*2);
    cameractx.fillStyle = color
    cameractx.fill();
    ctx.beginPath();
    ctx.arc(location.x, location.y, rad, 0, PI*2);
    ctx.fillStyle = color
    ctx.fill();
}


function calculateRotation(){
  //center to green

  Math.atan((center.y - cameraPoints.green.y) / (center.x - cameraPoints.green.x));

  deg * (PI / 180)
}
  

function calculateCenter() {
  let avg = {x:0, y:0};
  for(let ID in cameraPoints){
    let points = cameraPoints[ID];
    avg.x += points.x
    avg.y += points.y
  }
  avg.x /= 3
  avg.y /= 3
  return avg
}


function drawDistance(){
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
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

    ctx.arc(center.x, center.y,
      
      //bitwiseSquarRoot()
      
      max([aproximateSquareRoot((center.x - cameraPoints.green.x) ** 2 + (center.y - cameraPoints.green.y) ** 2), aproximateSquareRoot((center.x - cameraPoints.red.x) ** 2 + (center.y - cameraPoints.red.y) ** 2), aproximateSquareRoot((center.x - cameraPoints.blue.x) ** 2 + (center.y - cameraPoints.blue.y) ** 2)]),
      
      
      0, PI * 2);

    ctx.stroke();
}


function interpolate(l, e, t) {
  return l + (e - l) * t;
};


function drawhead() {
  let Xmap = (center.x - canvas.width / 2) / canvas.width,
  Ymap = (center.y - canvas.height / 2) / canvas.height,
  xr = -((canvas.height / 2 - center.x) / canvas.width) + interpolate(centerAnchor.xRange[0], centerAnchor.xRange[1], Xmap),
  yr = -((canvas.width / 2 - center.y) / canvas.width) + interpolate(centerAnchor.yRange[0], centerAnchor.yRange[1], Ymap),
  xt = ((cameraPoints.green.x - center.x)) / (canvas.width / 7),
  yt = ((cameraPoints.green.y - center.y)) / (canvas.height / 7);

//add function to lock face to center, settings to change camera input FPS,  add setting to lock rotation.



  faceCtx.fillStyle = "#ffffff";
  faceCtx.strokeStyle = "black";
  faceCtx.lineWidth = 0.01;

  faceCtx.fillRect(-1, -1, faceCanvas.width, faceCanvas.height);
  faceCtx.beginPath();
  faceCtx.moveTo(topAnchor.x + xr, topAnchor.y + yr);
  faceCtx.quadraticCurveTo(centerAnchor.x + xr + xt, centerAnchor.y + yr + yt, bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.moveTo(leftAnchor.x + xr, leftAnchor.y + yr);
  faceCtx.quadraticCurveTo(centerAnchor.x + xr + xt, centerAnchor.y + yr + yt, rightAnchor.x + xr, rightAnchor.y + yr);
  faceCtx.stroke();

  faceCtx.beginPath();
  faceCtx.moveTo(bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.quadraticCurveTo(xr - 0.4, bottomAnchor.y + yr - 0.1, leftAnchor.x + xr, leftAnchor.y + yr);
  faceCtx.quadraticCurveTo(xr - 0.45, topAnchor.y + yr + 0.05, topAnchor.x + xr, topAnchor.y + yr);
  faceCtx.quadraticCurveTo(0.45 + xr, topAnchor.y + yr + 0.05, rightAnchor.x + xr, rightAnchor.y + yr);
  faceCtx.quadraticCurveTo(0.4 + xr, bottomAnchor.y + yr - 0.1, bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.stroke();


}



function changecol(col,e){
    switch(col){
      case 'red':
        colors.red = convertToRGB(e.value)
        break;
      case 'green':
        colors.green = convertToRGB(e.value)
        break;
      case 'blue':
        colors.blue = convertToRGB(e.value)
        break;
    }  
}


function changethresh(e) {
  trackerSettings.Threshold = (125 * parseInt(e.value))
}


function convertToRGB(color) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]

}

/*
function getColor(col){
  
    let position = {
      x:video.offsetLeft,
      y:video.offsetTop
    },
    x = e.pageX - position.x;
    y = e.pageY - position.y;
  
    colData = cameractx.getImageData(x, y, 1, 1).data;
    for(let ID in colors){
      let color = colors[ID];
      if(ID == col){
        color = [colData[0], colData[1], colData[2]]
      }
    }

alert(colors)
}




video.addEventListener('mousemove', function(e){
  let col = 'red'
  let pagY = e.pageY - video.offsetTop,
  pagX = e.pageX - video.offsetLeft;
console.log(pagX,pagY, e.pageX, e.pageY, pagX, pagY)
document.getElementById('move').style.left = pagX+'px'
document.getElementById('move').style.top = pagY+'px'
  colData = cameractx.getImageData(pagX, pagY, 1, 1).data;
  for(let ID in colors){
    let color = colors[ID];
    if(ID == col){
      color = [colData[0], colData[1], colData[2]]
      console.log(color)
    }
  }

})*/



/*
navigator.mediaDevices.getUserMedia({audio: true, video: true})
   .then(function (stream) {
         if (stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0){
            let videos = stream.getVideoTracks(),
            audio = stream.getAudioTracks();
            for(let i = 0; i < videos.length; i++){
              console.log(videos[i],videos)
            }
         } else {
            // code for when both devices are available
         }
   })
  .catch(function (error) { 
       // code for when there is an error
   });*/

