let videoElement = null,
audioElement,
center = {x:0, y:0},
frameTimer = false,
currentMedia = undefined,
trackingPoints = [[],[]],
colourValues = [255,255,255]
inputConstraints = {video:{width:{ max: 1280 }, height:{ max: 720 }, frameRate:{ max:30 }, deviceId:null }, audio:{ deviceId:null }},
trackerSettings = {
  Threshold:[125,125,125],
  Ysense:1,
  Xsense:1,
  LocationLock:false,
  RotationLock:false,
  AudioTracking:true,
  VideoTracking:true,
  ShowCalculations:false,
  ShowTrackingPoints:true,
  DrawTimer:33
}

const video = document.getElementById('video'), 
canvas = document.getElementById('canvas'),
cameraContext = video.getContext('2d', {willReadFrequently: true}),
faceCanvas = document.getElementById('facecanvas'),
faceCtx = faceCanvas.getContext('2d', {willReadFrequently: true}),
ctx = canvas.getContext('2d', {willReadFrequently: true}), 


anchors={
  centerAnchor:{position:{x:0,y:0},xRange:[0,0.2],yRange:[0,0.3]},
  topAnchor:{x:0,y:-0.6},
  bottomAnchor:{x:0,y:0.6},
  leftAnchor:{x:-0.5,y:0},
  rightAnchor:{x:0.5,y:0}
},
{centerAnchor, topAnchor, bottomAnchor, leftAnchor, rightAnchor} = anchors,

PI = APF.PI();


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





function changeInputData(value,constraintType){


  switch(constraintType){
    case 'video':
      inputConstraints.video.deviceId = { exact: value }
      break;
    case 'fps':
      inputConstraints.video.frameRate = { max: value }
      trackerSettings.DrawTimer = 1000 / value
      break;
    case 'resolution':
      let tempValue = value.split(' ')
      inputConstraints.video.width = { min: 640, ideal: Number(tempValue[0]), max: 1920 }
      inputConstraints.video.height = { min: 480, ideal: Number(tempValue[1]), max: 1080 }
      break;
    case 'audio':
      inputConstraints.audio.deviceId = { exact: value }
  }
  getMedia(inputConstraints)

    

}





async function getMedia(constraints){

  frameTimer = false
 
  stopMedia(currentMedia)

  await navigator.mediaDevices
    .getUserMedia(constraints)
    .then(Info => {

      currentMedia = Info;
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

  
        audioElement = new AudioContext();
        let analyser = audioElement.createAnalyser(),
        microphone = audioElement.createMediaStreamSource(Info),
        scriptProcessor = audioElement.createScriptProcessor(512, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioElement.destination);
        
        scriptProcessor.onaudioprocess = function() {

          let array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let arraySum = array.reduce((a, value) => a + value, 0),
          average = arraySum / array.length;
          x = APF.floor(average)*0.01
          document.getElementById('volume').style.transform = `scaleY(${x})`
          if(x > 1){
            document.getElementById('volume').classList.add('large')
          }else {
            document.getElementById('volume').classList.remove('large')
          }
          
        }

        frameTimer = true
    
        framerateLoop(videoElement)
        return Promise.resolve(0)
      }
    })
    .catch(error => {
      console.error(error);
    });
      
    
     


  
  
}

//make getmedia handle both audio and video

function stopMedia(stream) {
  if(stream){
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }

}


async function getSettingsData() {
  await navigator.mediaDevices.enumerateDevices()
  .then((devices) => {
    devices.forEach((device) => {
      console.log(device.kind)
      if(device.kind == 'videoinput' || device.kind == 'audioinput'){
        let Select, inputType;
        if(device.kind == 'videoinput'){
          Select = document.getElementById('videoInput')
          inputType = 'video'
        }
        else if(device.kind == 'audioinput'){
          Select = document.getElementById('audioInput')
          inputType = 'audio'
        }
        let item = document.createElement('span')
        item.className = 'SSMitem'
        item.value = device.deviceId
        item.innerText = device.label
        item.addEventListener('click',function(){
          selectChangeSSM(this)
          changeInputData(device.deviceId,inputType)
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
  //make thingy push classes into a list

  createTrackers()

  getMedia(inputConstraints).then(() => {
    getSettingsData()
  })


}

window.onload = function(){
  setup()
}



class VideoProcessor {
  constructor(ctx, colour, colourIndex) {
    this.position = {x:0,y:0}
    this.colour = colour
    this.threshold = colourIndex
    this.ctx = ctx
  }

  calculateAverage(location) {
    let avg = {x:0, y:0};
    for(let i = 0; i < location.length; i++) {
      avg.x += location[i].x;
      avg.y += location[i].y;
    }
    avg.x /= location.length;
    avg.y /= location.length;
    return avg
  }

  getPosition(videoframe) {
    let data = videoframe.data,
    location = [];
    for(let i = 0; i <= data.length; i += 16) {
      let r = data[i],
      g = data[i+1],
      b = data[i+2];
      if(this.match([r, g, b], trackerSettings.Threshold[this.threshold])) {
        let index = i / 4,
        y = APF.floor(index / videoframe.width),
        x = index % videoframe.width;
        location.push({x, y});
      }
    }
    //console.log(location)
    return location
  }

  match(videoColor, Threshold) {
    //console.log(this.space(videoCol) <= amount, this.space(videoCol), amount)
    return this.space(videoColor) <= Threshold;
  }

  space(colour) {
    let distance = 0;
    for(let i = 0; i < colour.length; i++) {
      distance += (colour[i] - this.colour[i]) * (colour[i] - this.colour[i])
    }
    return APF.squareRoot(distance)
  }
}

class tracker extends VideoProcessor {

  constructor(colour, colourIndex, ctx, PI) {
    super(ctx, colour, colourIndex);
    this.position = {x:0,y:0}
    this.fillCol = `rgb(${colour[0]},${colour[1]},${colour[2]})`
    this.diameter = PI * 2
  }

  drawAnchor() {
    if(trackerSettings.ShowTrackingPoints){
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, 10, 0, this.diameter);
      this.ctx.fillStyle = this.fillCol
      this.ctx.fill();
    }
  }

  setLocation(videoFrame) {
    this.position = super.calculateAverage(super.getPosition(videoFrame))
  }

  get getAveragePosition() {
    return this.position
  }

}


class calibrator extends VideoProcessor {

  constructor(colour, colourIndex, ctx) {
    super(ctx, colour, colourIndex)
    this.frame = this.ctx.getImageData(0, 0, video.width, video.height)
  }

  calibrate() {

    this.colour[this.threshold] = 255
    trackerSettings.Threshold[this.threshold] = 125
    let counter = 0
    while(super.getPosition(this.frame).length < 10) {
      if(APF.sum(this.colour) > 0) {
        counter += 1
        for(let i = 0; i < 3; i++) {
          if(this.colour[i] != 0) {
            this.colour[i] -= 1
          }
        }
      }else{
        trackerSettings.Threshold[this.threshold] += 2
        //this.colour[this.threshold] = 255
      }
    }
    console.log('counter/10'+ (APF.max([1,counter]) / 20))
    trackerSettings.Threshold[this.threshold] += APF.max([1,counter]) / 20
    return APF.max([0,(this.colour[this.threshold] - 10)])
  }

}

class trackingDisplay {
  constructor(ctx) {
    this.ctx = ctx
    this.positions = []
    this.center = {x:0,y:0}
    this.diameter = PI * 2

  }

  calculateCenter() {
    let center = {x:0, y:0};
    for(let i = 0; i < this.positions.length; i++) {
      center.x += this.positions[i].x;
      center.y += this.positions[i].y;
    }
    center.x /= this.positions.length;
    center.y /= this.positions.length;
    this.center = center
  }

  calculateRotation(positionRed) {

  }

  drawCenterAnchor() {
    if(trackerSettings.ShowTrackingPoints){
      this.ctx.beginPath();
      this.ctx.arc(this.center.x, this.center.y, 10, 0, this.diameter);
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fill();
    }
  }

  set colourPositions(positions) {
    this.positions = positions
  }
}

function startCalibrate() {
  let calibrators = []
  for(let i = 0; i < 3; i++) {
    let colour = [0,0,0];
    colour[i] = 255;
    calibrators.push(new calibrator(colour, i, cameraContext))
  }
  for(let i = 0; i < 3; i++) {
    colourValues[i] = calibrators[i].calibrate()
  }
  createTrackers()
  for(let i = 0; i < 3; i++) {
    //console.log(125/trackerSettings.Threshold[i])
    document.getElementById(`Threshold${i+1}`).value = (trackerSettings.Threshold[i]/125)
  }
  calibrators = []
}


function createTrackers() {
  trackingPoints = [[],[]]
  for(let i = 0; i < 3; i++) {
    let color = [0,0,0];
    console.log(colourValues[i])
    color[i] = colourValues[i];
    trackingPoints[0].push(new tracker(color, i, cameraContext, PI))
  }
  trackingPoints[1].push(new trackingDisplay(cameraContext))
}

//use aysnc on the getmedia to make the settings always work











async function framerateLoop(videoElement) {
  let oldTimer = performance.now(),
  delta = 0;
  while (frameTimer) {
    let newTimer = await new Promise(requestAnimationFrame);
    if (newTimer - oldTimer < trackerSettings.drawTimer - delta) {
        continue;
    }
    delta = APF.min([trackerSettings.drawTimer, delta + newTimer - oldTimer - trackerSettings.drawTimer]);
    oldTimer = newTimer;

    drawVideo(videoElement)

  }
}




//uses video data to draw video to canvas
function drawVideo(videoElement) {

  cameraContext.drawImage(videoElement, 0, 0);
  //cameraContext.drawImage(document.getElementById('source'),0,0);

  let videoframe = cameraContext.getImageData(0, 0, video.width, video.height);


  drawhead()

  //drawAnchorCanvas(videoframe)

  if(trackerSettings.VideoTracking) {
    for(let i = 0; i < 3; i++) {
      trackingPoints[0][i].setLocation(videoframe)
      trackingPoints[0][i].drawAnchor()
    }
    trackingPoints[1][0].colourPositions = [
      trackingPoints[0][0].getAveragePosition,//red
      trackingPoints[0][2].getAveragePosition,//blue
      trackingPoints[0][1].getAveragePosition//green
    ]
    trackingPoints[1][0].calculateCenter()
    trackingPoints[1][0].drawCenterAnchor()

    //center = calculateCenter()
  }
  //calculateCenter()

/*
  if(frameTimer) {
    setTimeout(() => {
      window.requestAnimationFrame(function() {
        drawVideo(videoElement)
      });
    }, trackerSettings.DrawTimer);
  }*/
}

/*
function drawAnchorCanvas(videoframe){



  if(trackerSettings.ShowCalculations) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawLines()
    drawDistance()
  }


  //make the classes loop through the array also make draw anchor inside of the get location class
  drawAnchor(cameraPoints.red, 'red')
  drawAnchor(cameraPoints.green, 'green')
  drawAnchor(cameraPoints.blue, 'blue')
  drawAnchor(center, 'black')

}
*/
/*
function match(color1, color2, amount) {
  return space(color1, color2) <= amount;
};


function space(col1, col2) {
  let distance = 0;
  for(let i = 0; i < col1.length; i++) {
    distance += (col1[i] - col2[i]) * (col1[i] - col2[i])
  }
  return APF.squareRoot(distance)
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

// IM P ORT ANT MAKE POINT CAMERA INTO A CLASS OKOKOK


function getPointCamera(videoframe, color, amount = trackerSettings.Threshold) {
  let location = [],
  data = videoframe.data;
  for(let i = 0; i <= data.length; i += 4) {
    let r = data[i],
    g = data[i+1],
    b = data[i+2];
    if(match([r, g, b], color, amount)) {
      let index = i / 4,
      y = APF.floor(index / videoframe.width),
      x = index % videoframe.width;
      location.push({x, y});
    }
  }
  return location
}


function drawAnchor(location, color, rad=10) {
  if(trackerSettings.ShowTrackingPoints){
    cameraContext.beginPath();
    cameraContext.arc(location.x, location.y, rad, 0, PI*2);
    cameraContext.fillStyle = color
    cameraContext.fill();
  }
  
  if(trackerSettings.ShowCalculations){
    ctx.beginPath();
    ctx.arc(location.x, location.y, rad, 0, PI*2);
    ctx.fillStyle = color
    ctx.fill();
  }
}
*/

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
      
      APF.max([APF.squareRoot((center.x - cameraPoints.green.x) ** 2 + (center.y - cameraPoints.green.y) ** 2), APF.squareRoot((center.x - cameraPoints.red.x) ** 2 + (center.y - cameraPoints.red.y) ** 2), APF.squareRoot((center.x - cameraPoints.blue.x) ** 2 + (center.y - cameraPoints.blue.y) ** 2)]),
      
      
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
  yr = -((canvas.width / 2 - center.y) / canvas.width) + interpolate(centerAnchor.yRange[0], centerAnchor.yRange[1], Ymap)





//add function to lock face to center, settings to change camera input FPS,  add setting to lock rotation.



  faceCtx.fillStyle = "#ffffff";
  faceCtx.strokeStyle = "black";
  faceCtx.lineWidth = 0.01;

  faceCtx.fillRect(-1, -1, faceCanvas.width, faceCanvas.height);
  faceCtx.beginPath();
  faceCtx.moveTo(topAnchor.x + xr, topAnchor.y + yr);
  faceCtx.quadraticCurveTo(centerAnchor.position.x + xr, centerAnchor.position.y + yr, bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.moveTo(leftAnchor.x + xr, leftAnchor.y + yr);
  faceCtx.quadraticCurveTo(centerAnchor.position.x + xr, centerAnchor.position.y + yr, rightAnchor.x + xr, rightAnchor.y + yr);
  faceCtx.stroke();

  faceCtx.beginPath();
  faceCtx.moveTo(bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.quadraticCurveTo(xr - 0.4, bottomAnchor.y + yr - 0.1, leftAnchor.x + xr, leftAnchor.y + yr);
  faceCtx.quadraticCurveTo(xr - 0.45, topAnchor.y + yr + 0.05, topAnchor.x + xr, topAnchor.y + yr);
  faceCtx.quadraticCurveTo(0.45 + xr, topAnchor.y + yr + 0.05, rightAnchor.x + xr, rightAnchor.y + yr);
  faceCtx.quadraticCurveTo(0.4 + xr, bottomAnchor.y + yr - 0.1, bottomAnchor.x + xr, bottomAnchor.y + yr);
  faceCtx.stroke();


}


function changethresh(e, val) {
  trackerSettings.Threshold[val] = (125 * parseInt(e.value))
}


function convertToRGB(color) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]

}


function toggleSwitch(x){
  if(x.checked) return true
    return false
}

function layoutChange(x){
  document.getElementById('container').className = x.getAttribute('classInfo')
}


/*
function getColor(col){
  
    let position = {
      x:video.offsetLeft,
      y:video.offsetTop
    },
    x = e.pageX - position.x;
    y = e.pageY - position.y;
  
    colData = cameraContext.getImageData(x, y, 1, 1).data;
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
  colData = cameraContext.getImageData(pagX, pagY, 1, 1).data;
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







/*
to do list


give buttons aria labels

organise code into multiple files

make calculate center function


async function renderLoop() {
  let oldTimer = performance.now(),
  delta = 0;
  while (frameTimer) {
    let newTimer = await new Promise(requestAnimationFrame);
    if (newTimer - oldTimer < trackerSettings.drawTimer - delta) {
        continue;
    }
    delta = APF.min([trackerSettings.drawTimer, delta + newTimer - oldTimer - trackerSettings.drawTimer]);
    oldTimer = newTimer;

    animationLoop()
  }
}



*/