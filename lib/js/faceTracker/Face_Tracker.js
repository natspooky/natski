let videoElement = null,
audioElement = null,
frameTimer = false,
currentMedia = undefined,
trackingPoints = [[],[]],
colourValues = [[255,0,0],[0,255,0],[0,0,255]]
inputConstraints = {video:{width:{ max: 1280 }, height:{ max: 720 }, frameRate:{ max:30 }, deviceId:null }, audio:{ deviceId:null }},
trackerSettings = {
  Threshold:[4,4,4],
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
cameraContext = video.getContext('2d', {willReadFrequently: true}),
output = document.getElementById('output'),
outputCtx = output.getContext('2d', {willReadFrequently: true}),

anchors={
  center:{x:0,y:0},
  top:{x:0,y:-0.6},
  bottom:{x:0,y:0.6},
  left:{x:-0.5,y:0},
  right:{x:0.5,y:0}
},
{centerAnchor, topAnchor, bottomAnchor, leftAnchor, rightAnchor} = anchors,

PI = APF.PI();

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

        videoElement.play();

  
        audioElement = new AudioContext();
        let analyser = audioElement.createAnalyser(),
        microphone = audioElement.createMediaStreamSource(Info),
        scriptProcessor = audioElement.createScriptProcessor(512, 1, 1);

        analyser.smoothingTimeConstant = 0.4;
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
        return Promise.resolve('media changed')
      }
    })
    .catch(error => {
      console.error(error);
    });
  
}

function stopMedia(stream) {
  if(stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
    audioElement.close()
  }
//
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
  output.height = 400
  output.width = 400

  outputCtx.translate(output.width/2,output.height/2);
  outputCtx.scale(output.width*0.5,output.height*0.5);

  getMedia(inputConstraints).then(() => {
    createTrackers()
    getSettingsData()
  })
}

window.onload = function(){
  setup()
}



class VideoProcessor {
  constructor(ctx, colour, colourIndex) {
    this.position = {x:0,y:0}
    this.colour = this.convertRGBToLab(colour)
    this.threshold = colourIndex
    this.ctx = ctx
  }

  convertRGBToLab(rgb){
    //return [40.6481252684625, 10.430108237689664, 420.625428594414618]
    let red = rgb[0] / 255,
    green = rgb[1] / 255,
    blue = rgb[2] / 255,
    x, y, z;
    
    red = (red > 0.04045) ? ((red + 0.055) / 1.055) ** 2.4 : red / 12.92;
    green = (green > 0.04045) ? ((green + 0.055) / 1.055) ** 2.4 : green / 12.92;
    blue = (blue > 0.04045) ? ((blue + 0.055) / 1.055) ** 2.4 : blue / 12.92;

    x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
    y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1.00000;
    z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;

    x = (x > 0.008856) ? x ** 1/3 : (7.787 * x) + 0.13793;
    y = (y > 0.008856) ? y ** 1/3 : (7.787 * y) + 0.13793;
    z = (z > 0.008856) ? z ** 1/3 : (7.787 * z) + 0.13793;
   // console.log([(116 * y) - 16, 500 * (x - y), 200 * (y - z)])
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }

  labDeltaE(labOne, labTwo) {
    //return 0
    let deltaL = labOne[0] - labTwo[0],
    deltaA = labOne[1] - labTwo[1],
    deltaB = labOne[2] - labTwo[2],
    
    c1 = APF.squareRoot(labOne[1] * labOne[1] + labOne[2] * labOne[2]),
    deltaC = c1 - APF.squareRoot(labTwo[1] * labTwo[1] + labTwo[2] * labTwo[2]),
    deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;

    deltaH = deltaH < 0 ? 0 : APF.squareRoot(deltaH);

    //console.log(deltaH, deltaL, deltaA, deltaB)

    let deltaCkcsc = deltaC / (1.0 + 0.045 * c1),
    deltaHkhsh = deltaH / (1.0 + 0.015 * c1),
    i = deltaL * deltaL + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    
    return i < 0 ? 0 : APF.squareRoot(i);
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

  getPosition(convertedVideo, videoframe) {
    let location = [],
    videoLength = videoframe.data.length
    for(let i = 0; i <= videoLength; i += 32) {
      //console.log(convertedVideo[i])
      if(this.match(convertedVideo[i / 32], trackerSettings.Threshold[this.threshold])) {
        let index = i / 4,
        y = APF.floor(index / videoframe.width),
        x = index % videoframe.width;
        location.push({x, y});
      }
    }
    //console.log(location)
    return location
  }

  convertVideoToLab(videoframe) {
    let data = videoframe.data,
    lab = [];
    for(let i = 0; i <= data.length; i += 32) {
      lab.push(this.convertRGBToLab([data[i],data[i+1],data[i+2]]))
    }
    return lab
  }

  match(videoColor, Threshold) {
    //console.log(this.space(videoCol) <= amount, this.space(videoCol), amount)
    return this.labDeltaE(this.colour, videoColor) <= Threshold;
  }

}

class tracker extends VideoProcessor {

  constructor(colour, colourIndex, ctx, PI) {
    super(ctx, colour, colourIndex);
    this.position = {x:0,y:0}
    //console.log(colour)
    this.fillCol = `rgb(${255},${255},${255})`// make these colours RBG again
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

  setLocation(labVideo, videoFrame) {
    this.position = super.calculateAverage(super.getPosition(labVideo, videoFrame))
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

      let data = this.frame.data,
      deltaList = [[],[]],
      smallestDelta = {value: 0, index: 0}
      console.log(this.colour)
      console.log(data.length)
      for(let i = 0; i <= data.length; i += 16) {
        let r = data[i],
        g = data[i+1],
        b = data[i+2];

        deltaList[0].push(super.labDeltaE(this.colour, super.convertRGBToLab([r,g,b])))
        deltaList[1].push([r,g,b])
      }

      smallestDelta.value = deltaList[0][0]

      for(let i = 0; i < deltaList[0].length; i++) {
        if(smallestDelta.value > deltaList[0][i]) {
          smallestDelta.value = deltaList[0][i]
          smallestDelta.index = i
        }
      }
    
  
    //lower the delta E the closer the two colours
      console.log(this.colour, deltaList[1][smallestDelta.index], smallestDelta.value)
      return deltaList[1][smallestDelta.index]

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
    if(trackerSettings.ShowTrackingPoints) {
      this.ctx.beginPath();
      this.ctx.arc(this.center.x, this.center.y, 5, 0, this.diameter);
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fill();
    }
  }

  interpolate(x, y, t) {
    return x + (y - x) * t;
  }

  rotationMatrix(point, center) {
    if(!trackerSettings.RotationLock) {

      this.angle = APF.inverseTan(
        this.positions[1].y - this.positions[0].y, 
        this.positions[1].x - this.positions[0].x)

      let points = {
      x: point.x - center.x, 
      y: point.y - center.y},

      newPointsList = APF.multiplyMatrix(
        [[APF.cos(this.angle), -(APF.sin(this.angle))],
        [APF.sin(this.angle), APF.cos(this.angle)]],
        [[points.x], [points.y]])
        //console.log({x: newPointsList[0][0] + center.x, y: newPointsList[1][0] + center.y}, point)
      return {x: newPointsList[0][0] + center.x, y: newPointsList[1][0] + center.y}
    }else {
      return point
    }
    /*APF.multiplyMatrix([[23, 54], 
                          [12, 87]],           [[30], 
                                               [58]])*/
  }


  drawOutput() {

    outputCtx.fillStyle = "#ffffff";
    outputCtx.fillRect(-1, -1, 2, 2);

    let Xmap = (this.center.x - video.width / 2) / video.width,
    Ymap = (this.center.y - video.height / 2) / video.height,
    coords;
    if(!trackerSettings.LocationLock) {
      for(let ID in this.anchors) {

        if(ID == 'center') {

          coords = {
          x: this.anchors[ID].x + ((this.positions[2].x - this.center.x) / video.width) + this.interpolate(this.range.x[0], this.range.x[1], Xmap), 
          y: this.anchors[ID].y + ((this.positions[2].y - this.center.y) / video.height) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}

        }else {
      
          let centerPoint = {
          x: this.anchors['center'].x -((video.height / 2 - this.center.x) / video.height) + this.interpolate(this.range.x[0], this.range.x[1], Xmap), 
          y: this.anchors['center'].y -((video.height / 2 - this.center.x) / video.height) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}
    
          coords = this.rotationMatrix({
          x: this.anchors[ID].x -((video.height / 2 - this.center.x) / video.height) + this.interpolate(this.range.x[0], this.range.x[1], Xmap),
          y: this.anchors[ID].y -((video.width / 2 - this.center.y) / video.width) + this.interpolate(this.range.y[0], this.range.y[1], Ymap)}, centerPoint)
          //console.log(coords)
        }
        this.drawOutputPoint(coords)
      }
      //this.rotationMatrix()
      //make the required distance between the center and green be dependant on the distance between the red center
    }else {
      for(let ID in this.anchors) {

        if(ID == 'center') {

          coords = {
          x: this.anchors[ID].x + ((this.positions[2].x - this.center.x) / video.width) + this.interpolate(
            this.range.x[0], 
            this.range.x[1], 
            Xmap), 
          y: this.anchors[ID].y + ((this.positions[2].y - this.center.y) / video.height) + this.interpolate(
            this.range.y[0], 
            this.range.y[1], 
            Ymap)}

        }else {

          let centerPoint = {
          x: 0,
          y: 0}
    
          coords = this.rotationMatrix({
          x: this.anchors[ID].x,
          y: this.anchors[ID].y},
            centerPoint)
          //console.log(coords)
        }
        this.drawOutputPoint(coords)
      }
    }
  }

  drawOutputPoint(coords) {
    if(trackerSettings.ShowTrackingPoints) {
      this.outputCtx.beginPath();
      this.outputCtx.arc(coords.x, coords.y, 0.04, 0, this.diameter);
      this.outputCtx.fillStyle = 'rgb(0,0,0)'
      this.outputCtx.fill();
    }
  }

}


function startCalibrate() {
  let calibrators = []
  trackingPoints = [[],[]]
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
    document.getElementById(`Threshold${i+1}`).value = (trackerSettings.Threshold[i]/4)
  }
  calibrators = []
}


function createTrackers() {
  trackingPoints = [[],[]]
  for(let i = 0; i < 3; i++) {
    let color = colourValues[i];
    //console.log(colourValues[i])
    trackingPoints[0].push(new tracker(color, i, cameraContext, PI))
  }
  trackingPoints[1].push(new trackingDisplay(cameraContext, outputCtx, anchors))
}

//use aysnc on the getmedia to make the settings always work



async function framerateLoop(videoElement) {
  let oldTimer = performance.now(),
  delta = 0;
  while(frameTimer) {
    let newTimer = await new Promise(requestAnimationFrame);
    if(newTimer - oldTimer < trackerSettings.drawTimer - delta) {
        continue;
    }
    delta = APF.min([trackerSettings.drawTimer, delta + newTimer - oldTimer - trackerSettings.drawTimer]);
    oldTimer = newTimer;

    drawVideo(videoElement)

  }
}

//uses video data to draw video to video
function drawVideo(videoElement) {

  cameraContext.drawImage(videoElement, 0, 0);
  //cameraContext.drawImage(document.getElementById('source'),0,0);

  let videoframe = cameraContext.getImageData(0, 0, video.width, video.height);

  runTrackers(videoframe)

}


function runTrackers(videoframe) {
  if(trackerSettings.VideoTracking) {
    let labVideo = trackingPoints[0][0].convertVideoToLab(videoframe)
    for(let i = 0; i < 3; i++) {
      trackingPoints[0][i].setLocation(labVideo, videoframe)
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
    trackingPoints[1][0].drawOutput()
  }
}
