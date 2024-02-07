let videoElement = null,
audioElement = null,
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
  center:{x:0,y:0},
  top:{x:0,y:-0.6},
  bottom:{x:0,y:0.6},
  left:{x:-0.5,y:0},
  right:{x:0.5,y:0}
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
    audioElement.close()
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
      this.ctx.arc(this.position.x, this.position.y, 5, 0, this.diameter);
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
    //console.log(this.colour)
    this.colour[this.threshold] = 255
    trackerSettings.Threshold[this.threshold] = 125
    let counter = 0
    while(super.getPosition(this.frame).length < 10 * (480 / video.height)) {
      if(APF.sum(this.colour) > 0) {
        counter += 1
        
        this.colour[this.threshold] -= 1
      }else{
        trackerSettings.Threshold[this.threshold] += 2
        //this.colour[this.threshold] = 255
      }
    }
  
    //lower the delta E the closer the two colours
    deltaE = sqrt(deltaL^2 + deltaA^2 + deltaB^2)


    //console.log('counter/10'+ (APF.max([1,counter]) / 20))
    trackerSettings.Threshold[this.threshold] += APF.max([1,counter]) / 20
    console.log(this.colour, trackerSettings.Threshold[this.threshold])
    return APF.max([0,(this.colour[this.threshold] - 10)])
  }

}

class trackingDisplay {
  constructor(ctx, output, anchors) {
    this.ctx = ctx
    this.outputCtx = output
    this.positions = []
    this.center = {x:0,y:0}
    this.diameter = PI * 2
    this.angle = 0
    this.range = {x: [0,0.2], y: [0,0.3]}
    this.anchors = anchors
  }

  set colourPositions(positions) {
    this.positions = positions
    //console.log(this.positions)
  }

  calculateCenter() {
    let center = {x:0, y:0};
    for(let i = 0; i < this.positions.length - 1; i++) {
      center.x += this.positions[i].x;
      center.y += this.positions[i].y;
    }
    center.x /= this.positions.length - 1;
    center.y /= this.positions.length - 1;
    this.center = center
  }

  drawCenterAnchor() {
    if(trackerSettings.ShowTrackingPoints){
      this.ctx.beginPath();
      this.ctx.arc(this.center.x, this.center.y, 5, 0, this.diameter);
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fill();
    }
  }
/*
  calculateRotationAngle() {
    //use the red horizontal position and the green position to get rotation
    this.angle = APF.inverseTan(this.positions[1].y - this.positions[0].y, this.positions[1].x - this.positions[0].x)
    //console.log(this.angle)

    //console.log(this.positions[0], this.positions[2])

    //console.log(`y: ${this.positions[0].y - this.positions[2].y}, x: ${this.positions[0].x - this.positions[2].x}`)
    //console.log(this.angle)
  }
*/
  interpolate(x, y, t) {
    return x + (y - x) * t;
  }

  rotationMatrix(point, center) {
    if(!trackerSettings.RotationLock) {

      
      this.angle = APF.inverseTan(this.positions[1].y - this.positions[0].y, this.positions[1].x - this.positions[0].x)

      let points = {x: point.x - center.x, y: point.y - center.y},
      newPointsList = APF.multiplyMatrix(
        [[APF.cos(this.angle), -(APF.sin(this.angle))], 
        [APF.sin(this.angle), APF.cos(this.angle)]],
        [[points.x], 
        [points.y]])
        //console.log({x: newPointsList[0][0] + center.x, y: newPointsList[1][0] + center.y}, point)
      return {x: newPointsList[0][0] + center.x, y: newPointsList[1][0] + center.y}
    }else {
      return point
    }
    /*APF.multiplyMatrix([[23, 54], 
                          [12, 87]],           [[30], 
                                               [58]])*/
  }


  drawFaceCanvas() {
    faceCtx.fillStyle = "#ffffff";
    faceCtx.fillRect(-1, -1, 2, 2);
    let Xmap = (this.center.x - canvas.width / 2) / canvas.width,
    Ymap = (this.center.y - canvas.height / 2) / canvas.height
    for(let ID in this.anchors) {
      let coords = {x:0,y:0}
      
        if(ID == 'center') {
          coords = {x: this.anchors[ID].x + ((this.positions[2].x - this.center.x) / canvas.width) + this.interpolate(this.range.x[0], this.range.x[1], Xmap), 
          y: this.anchors[ID].y + ((this.positions[2].y - this.center.y) / canvas.height) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}
        }else {
      
          let centerPoint = {x: this.anchors['center'].x -((canvas.height / 2 - this.center.x) / canvas.height) + this.interpolate(this.range.x[0], this.range.x[1], Xmap), 
          y: this.anchors['center'].y -((canvas.height / 2 - this.center.x) / canvas.height) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}
    
          coords = this.rotationMatrix({x: this.anchors[ID].x -((canvas.height / 2 - this.center.x) / canvas.height) + this.interpolate(this.range.x[0], this.range.x[1], Xmap),
          y: this.anchors[ID].y -((canvas.width / 2 - this.center.y) / canvas.width) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}, centerPoint)
          //console.log(coords)
        }
      
      //this.rotationMatrix()


      //make the required distance between the center and green be dependant on the distance between the red center


      if(trackerSettings.ShowTrackingPoints){
        this.outputCtx.beginPath();
        this.outputCtx.arc(coords.x, coords.y, 0.04, 0, this.diameter);
        this.outputCtx.fillStyle = 'rgb(0,0,0)'
        this.outputCtx.fill();
      }
    }
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
  trackingPoints[1].push(new trackingDisplay(cameraContext, faceCtx, anchors))
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


 // drawhead()

  //drawAnchorCanvas(videoframe)

  runTrackers(videoframe)
  /*
  if(trackerSettings.VideoTracking) {
    for(let i = 0; i < 3; i++) {
      trackingPoints[0][i].setLocation(videoframe)
      trackingPoints[0][i].drawAnchor()
    }
    trackingPoints[1][0].colourPositions = [
      trackingPoints[0][0].getAveragePosition,   //red
      trackingPoints[0][2].getAveragePosition,   //blue
      trackingPoints[0][1].getAveragePosition   //green
    ]
    trackingPoints[1][0].calculateCenter()
    trackingPoints[1][0].drawCenterAnchor()

    //center = calculateCenter()
  }
  //calculateCenter()
*/
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

function runTrackers(videoframe) {
  if(trackerSettings.VideoTracking) {
    for(let i = 0; i < 3; i++) {
      trackingPoints[0][i].setLocation(videoframe)
      trackingPoints[0][i].drawAnchor()
    }
    //console.log(trackingPoints[0][0].getAveragePosition)
    trackingPoints[1][0].colourPositions = [
      trackingPoints[0][0].getAveragePosition,   //red
      trackingPoints[0][2].getAveragePosition,   //blue
      trackingPoints[0][1].getAveragePosition   //green
    ]
    trackingPoints[1][0].calculateCenter()
    trackingPoints[1][0].drawCenterAnchor()
    //trackingPoints[1][0].calculateRotationAngle()
    trackingPoints[1][0].drawFaceCanvas()
  }
}

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


function interpolate(x, y, a) {
  return x + (y - x) * a;
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
/*
// user colour
var Red   = 56;
var Green = 79;
var Blue  = 132;

// user colour converted to XYZ space
XYZ = RGBtoXYZ(Red,Green,Blue)
var colX = XYZ[0];
var colY = XYZ[1];
var colZ = XYZ[2];
*/
// alert(XYZ)

//LAB = XYZtoLAB(colX, colY, colZ)


function lab2rgb(lab){
  var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  return [Math.max(0, Math.min(1, r)) * 255, 
          Math.max(0, Math.min(1, g)) * 255, 
          Math.max(0, Math.min(1, b)) * 255]
}


function rgb2lab(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

function deltaE(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}