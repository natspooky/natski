
/* variables */
var video = document.getElementById('video');
const canvas = document.getElementById('canvas'), ctx = canvas.getContext("2d"), 
anchors={
  centerAnchor:{x:0,y:0,xRange:[0,0.2],yRange:[0,0.3]}, 
  topAnchor:{x:0,y:-0.6,xRange:[0,0.025],yRange:[-0.6,-0.55]}
},
{centerAnchor, topAnchor} = anchors;




async function camerastart(){
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





async function main() {
  await camerastart();
  canvas.height = 300;
  canvas.width = 300;
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.scale(canvas.width*0.5,canvas.height*0.5);
  movement();
  
};


function movement() {
  drawmain();
  requestAnimationFrame(movement)
};

function drawmain() {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.01;
  ctx.fillRect(-1,-1,2,2);
  drawhead();
  drawbody();
  drawanchor(centerAnchor);
  drawanchor(topAnchor);
};
function drawhead() {
  ctx.beginPath();
  ctx.moveTo(topAnchor.x,topAnchor.y);
  ctx.quadraticCurveTo(centerAnchor.x,centerAnchor.y,0,0.6);
  ctx.moveTo(-0.5, 0);
  ctx.quadraticCurveTo(centerAnchor.x,centerAnchor.y,0.5,0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0.6);
  ctx.quadraticCurveTo(-0.4, 0.5,-0.5,0);
  ctx.quadraticCurveTo(-0.45, -0.55,topAnchor.x,topAnchor.y);
  ctx.quadraticCurveTo(0.45, -0.55,0.5,0);
  ctx.quadraticCurveTo(0.4, 0.5,0,0.6);
  ctx.stroke();
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

function drawanchor(location,rad=0.05) {
  ctx.beginPath();
  ctx.arc(location.x, location.y,rad,0,Math.PI*2);
  ctx.fillStyle='#000000'
  ctx.fill();
}

function moveAnchor(data,attr) {
  for(let anchorID in anchors){
    const p = anchors[anchorID]
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
}
main();