var threshold = 1000;
var tweenTime = 800;
var fps = 60;
var tweens = [], dots = [];
var TIME = 1000/fps;
var fontsize = 150;
var Size = fontsize*fontsize;
var SEC = 0, MIN = 1, HOUR = 2, CRN = 3;

var canvas = document.getElementById('canvas');
var text  = document.getElementById('Text');
var times = [];
var ex,ey;

var nextAddress = document.getElementById("dustscript").getAttribute("next");	

canvas.onmousedown = handleMousedown;

var rectTst={x:0,y:0,w:canvas.width,h:canvas.height};
//context.fillRect(rect.x,rect.y,rect.w,rect.h);

var BB,BBoffsetX,BBoffsetY;
setBB();	

function handleMousedown(e){
  e.preventDefault();
  e.stopPropagation();
  var mx=e.clientX-BBoffsetX;
  var my=e.clientY-BBoffsetY;
  if(mx>=rectTst.x && mx<=rectTst.x+rectTst.w && my>=rectTst.y && my<=rectTst.y+rectTst.h){
    //alert("clicked in rect:" + nextAddress);
	window.location.replace(nextAddress);
  } else {
	  //alert("clicked NO rect");
  }
}

function setBB(){
	  BB=canvas.getBoundingClientRect();
	  BBoffsetX=BB.left;
	  BBoffsetY=BB.top;
	}  



function TimeText(T, x, y){
  this.x = x;
  this.y = y;
  this.T = T;
  var c = document.createElement('canvas');
  this.c = c;
  c.width  = fontsize;
  c.height = fontsize;
  var ctx = c.getContext('2d');
  ctx.font = (fontsize*0.8|0) + "px serif";
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  //document.body.appendChild(c);
  this.ctx = ctx;
}
TimeText.prototype.setText = function setText(text, now) {
  var ctx = this.ctx;
  var X = this.x, Y = this.y;
  ctx.clearRect(0,0,fontsize,fontsize);
  ctx.fillText(text, fontsize/2, fontsize/2);
  var data = ctx.getImageData(0, 0, fontsize, fontsize-2).data;
  var n = dots.length;
  var t = this.T;
  while(n){
    n--;
    if(dots[n][2] === t){
      setPixel(dots[n][0], dots[n][1], 0, 0, 0, 245);
      dots.splice(n, 1);
    }
  }
  for(var y = 0, yl = fontsize; y < yl; y++){
    for(var x = 0, xl = fontsize; x < xl; x++){
      var id = x + y * fontsize, idx = id*4;
      if (data[idx]===255) {
        var _x, _y, r = Math.random();
        _x = t ? width /2 : x*1.66+X-fontsize/3;
        _y = t ? 0        : y*1.66+Y-fontsize/3;
        var d = [
          _x,
          _y,
          t,
          true
        ];
        var _i = dots.push(d);
        moveDot(now, _i, d, [x+X, y+Y], t?Math.random()*2-0.5:Math.random(), Math.random());
      }
    }
  }
};
var width = canvas.width;
var height = canvas.height;
//canvas.style.left = (document.documentElement.clientWidth -width )/2+'px';
//canvas.style.top  = (document.documentElement.clientHeight-height)/2+'px';
var bitmap = canvas.getContext('2d');
var pixels = bitmap.getImageData(0, 0, width, height);
var data = pixels.data;
function setPixel(x, y, r, g, b, a){
  if (x >= 0 && x < width && y >= 0 && y < height) {
    var idx = ((x|0) + (y|0) * width)*4;
    data[idx+0] = r;
    data[idx+1] = g;
    data[idx+2] = b;
    data[idx+3] = a;
  }
}
function faidout(){
  for (var i = 3, l = data.length;i < l;i+=4){
    var a = data[i];
    if (a === 0){
    } else if(a < 246) {
      if (a < 36) {
        data[i] = 0;
      } else if (a < 66) {
        data[i] *= 0.96;
      } else {
        data[i] *= 0.95;
      }
    } else {
      data[i]--;
    }
  }
}

var sec = -1 , Sec  = new TimeText(SEC,  (width - fontsize)/2,     (height - fontsize)*3/4),
    min = -1 , Min  = new TimeText(MIN,  width/2 ,                 (height - fontsize)*1/5),
    crn = -1 , Crn  = new TimeText(CRN,  width/2 - fontsize*0.55,  (height - fontsize)*1/6),
    hour = -1, Hour = new TimeText(HOUR, width/2 - fontsize*11/10, (height - fontsize)*1/5);
Crn.setText(':', +new Date);
setInterval(function(){
  var now = new Date,
  _now = +now,
  now_h = now.getHours();
  now_m = now.getMinutes();
  now_s = now.getSeconds();
  if (now_s !== sec) {
    sec = now_s;
    Sec.setText(('0'+sec).slice(-2), _now);
  }
  if (now_m !== min) {
    min = now_m;
    Min.setText(('0'+min).slice(-2), _now);
  }
  if (now_h !== hour) {
    hour = now_h;
    Hour.setText(('0'+hour).slice(-2), _now);
  }
  motionTween(_now);
  var n = dots.length;
  while(n) {
    n--;
    var d = dots[n];
    var t = d[2];
    setPixel(d[3] ? d[0] : d[0]+Math.random()*5,d[3] ? d[1] : d[1]+Math.random()*5, 0, 0, 0, 245);
  }
  bitmap.putImageData(pixels, 0, 0);
  faidout();
},TIME);

function motionTween(now) {
  var A, a, ta, t, ex, ey, tweenTime, seedx, seedy;
  var n = tweens.length;
  while (n) {
    n--;
    A = tweens[n];
    if(A) {
      a = A.a;
      seedx = A.seedx;
      seedy = A.seedy;
      tweenTime = A.tweenTime;
      ta = A.tween;
      t = now - ta[0];
      if (t < tweenTime) {
        a[0] = bezier2(Math.min(t/tweenTime, 1), ta[1][0], width *seedx, ta[2][0]);
        a[1] = bezier2(Math.min(t/tweenTime, 1), ta[1][1], height*seedy, ta[2][1]);
      } else {
        a[0] = ta[2][0];
        a[1] = ta[2][1];
        a[3] = false;
        tweens.splice(n,1);
      }
    }
  }
}
function bezier2(t, p0, p1, p2) {
  return (1-t) * (1-t) * p0 + 2 * t * (1-t) * p1 + t * t * p2;
}
function moveDot(now, i, dot, pos, sx, sy) {
  var time = !dot[2] ? 0 :
    (dot[2] === 1) ? 60*1000*Math.random()*Math.random()*Math.random() :
    (dot[2] === 2) ? 60*1000*Math.random()*Math.random() :
    -500;
  tweens.push({
    a:dot,
    tweenTime:(tweenTime + time)*Math.random(),
    tween:[now, dot.slice(), pos],
    seedx:sx,
    seedy:sy
  });
}
document.body.onmousedown = function(e){
  var n = dots.length;
  var t = this.T;
  var s = +new Date;
  while(n){
    n--;
    var d = dots[n];
    if(!d[3]){
      var x = d[0], y = d[1];
      d[0] = Math.random()*width;
      d[1] = Math.random()*height;
      d[3] = true;
      moveDot(s, n, d, [x,y], Math.random(), Math.random());
    }
  }
  return false;
};