let videoElement = null,
audioElement = null,
currentMedia = undefined,
inputConstraints = {
  video:{
    width:{
      max: 1280
    }, 
    height:{
      max: 720
    }, 
    frameRate:{ 
      max:30
    }, 
    deviceId:null
  }, 
  audio:{ 
    deviceId:null
  }
}


const video = document.getElementById('video'),
cameraContext = video.getContext('2d', {willReadFrequently: true}),
canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d', {willReadFrequently: true}),
faceCanvas = document.getElementById('facecanvas'),
faceCtx = faceCanvas.getContext('2d', {willReadFrequently: true})
