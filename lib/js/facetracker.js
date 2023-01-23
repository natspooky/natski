
/* variables */
var video = document.getElementById('video'), canvas = document.getElementById('canvas'), ctx = canvas.getContext("2d");




async function camerastart(){
/* getting camera info */
  var facingMode = "user";
  var constraints = {
    audio: false,
    video: {
    facingMode: facingMode
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    video.srcObject = stream;
  });
};
/* makes the canvas have the same pixel size as the camera feed */



async function drawVideo(){
  // Draw the video stream into our screen
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, 0, 0);
  // Call self again
  requestAnimationFrame(drawVideo);
};


async function main() {
  await camerastart();
  drawVideo();
};

function drawhead() {
  
}
main();