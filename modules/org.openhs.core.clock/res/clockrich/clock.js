function clock() {
  var canvas = document.getElementById('cnv');
  if (!canvas.getContext) {
    alert('canvas not supported!');
    return;
  }
  canvas.width = 500;
  canvas.height = 500;
  tick();
  
  //var canvas = document.getElementById("clockCanvas");
	//var context = canvas.getContext("2d");
	var nextAddress = document.getElementById("richscript").getAttribute("next");	
	
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
  
}
function tick() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes() + h * 60;
	var s = d.getSeconds() + m * 60;
	var ms = d.getMilliseconds();
	var secAngle = -90 + s * 6 + ms * 0.006;
	var minAngle = -90 + s * 0.1;
	var hourAngle = -90 + (s / 120);
	var canvas = document.getElementById('cnv');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 500);
  	drawFace(ctx);
    ctx.translate(250, 250);
	drawTicks(ctx);
  drawHourHand(ctx, hourAngle);
  drawMinHand(ctx, minAngle);
  drawSecHand(ctx, secAngle);
  ctx.translate(-250, -250);
  drawFace2(ctx);
  setTimeout(tick, 31);
}
function drawFace(ctx) {
  ctx.beginPath();
  ctx.arc(250, 250, 250, 0, 2 * Math.PI);
  ctx.fillStyle = '#111';
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(250, 250, 248, 0, 2 * Math.PI);
  ctx.fillStyle = '#bbb';
  ctx.fill();
  ctx.closePath();
  var g1x1 = 250 + 246 * Math.cos(4/3*Math.PI);
  var g1y1 = 250 + 246 * Math.sin(4/3*Math.PI)
  var g1x2 = 250 + 246 * Math.cos(1/3*Math.PI);
  var g1y2 = 250 + 246 * Math.sin(1/3*Math.PI);
  var g1 = ctx.createLinearGradient(g1x1,g1y1,g1x2,g1y2);
  g1.addColorStop(0, '#f4f4f4');
  g1.addColorStop(1, '#4CC552');
  ctx.beginPath();
  ctx.arc(250, 250, 246, 0, 2 * Math.PI);
  ctx.fillStyle = g1;
  ctx.fill();
  ctx.closePath();
  var g2x1 = 250 + 224 * Math.cos(4/3*Math.PI);
  var g2y1 = 250 + 224 * Math.sin(4/3*Math.PI)
  var g2x2 = 250 + 224 * Math.cos(1/3*Math.PI);
  var g2y2 = 250 + 224 * Math.sin(1/3*Math.PI);
  var g2 = ctx.createLinearGradient(g2x1,g2y1,g2x2,g2y2);
  g2.addColorStop(0, '#ff0000');
  g2.addColorStop(1, '#4CC552');
  ctx.beginPath();
  ctx.arc(250, 250, 224, 0, 2 * Math.PI);
  ctx.fillStyle = g2;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(250, 250, 212, 0, 2 * Math.PI);
  ctx.fillStyle = '#d5c595';
  ctx.fill();
  ctx.closePath();
}
function drawTicks(ctx) {
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 0);
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 30);
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 60);
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 90);
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 120);
	drawPath(ctx, 'M -108,-1 L 108,-1 108,1 -108,1 Z', '#baa77c', 150);
  drawPath(ctx, 'M 154,0 L 178,-6 178,6 Z', '#111', 0);
  drawPath(ctx, 'M 154,0 L 178,-6 178,6 Z', '#111', 90);
  drawPath(ctx, 'M 154,0 L 178,-6 178,6 Z', '#111', 180);
  drawPath(ctx, 'M 154,0 L 178,-6 178,6 Z', '#111', -90);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', 30);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', 60);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', 120);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', 150);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', -30);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', -60);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', -120);
	drawPath(ctx, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#baa77c', -150);
	ctx.font = '24pt Georgia';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#ff0000';
	ctx.fillText('3', 140, -4);
	ctx.fillText('6', 0, 138);
	ctx.fillText('9', -140, -4);
	ctx.fillText('12', 0, -140);
	ctx.beginPath();
  ctx.arc(0, -195, 4, 0, 2 * Math.PI);
  ctx.fillStyle = '#444';
  ctx.fill();
  ctx.closePath();
	for (var i = 0; i < 360; i += 30) {
		drawPath(ctx, 'M 180,-3 L 184,-3 184,3 180,3 Z', '#ff0000', i);
		drawPath(ctx, 'M 110,-3 L 120,-3 120,3 110,3 Z', '#4CC552', i);
		var lbl = '' + Math.round(i/6 + 15);
		if (lbl == '60') lbl = '';
		if (lbl == '65') lbl = '5';
		if (lbl == '70') lbl = '10';
		var x = 195 * Math.cos(i * Math.PI / 180.0);
		var y = 195 * Math.sin(i * Math.PI / 180.0);
		ctx.save();
		ctx.translate(x,y);
		ctx.rotate((i + 90 - (i > 0 && i < 180 ? 180 : 0)) * Math.PI / 180.0);
		ctx.font = '9pt Georgia';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'rgba(68,68,68,0.8)';
		ctx.fillText(lbl, 0, 0);
		ctx.restore();
		ctx.beginPath();
		x = 195 * Math.cos((i+15) * Math.PI / 180);
		y = 195 * Math.sin((i+15) * Math.PI / 180);
		ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
		ctx.fillStyle = '#ff0000';
		ctx.fill();
		ctx.closePath();
		for (var j = 0; j < 25; j += 6) {
			if (j != 0) {
				drawPath(ctx, 'M 174,-0.5 L 184,-0.5 184,0.5 174,0.5 Z', '#444', i+j);
				drawPath(ctx, 'M 114,-0.5 L 120,-0.5 120,0.5 114,0.5 Z', 'rgba(68,68,68,0.8)', i+j);
			}
			for (var k = 1.5; k < 5; k += 1.5) {
				drawPath(ctx, 'M 180,-0.3 L 184,-0.3 184,0.3 180,0.3 Z', 'rgba(68,68,68,0.5)', i+j+k);
			}
		}
	}
}
function drawSecHand(ctx,ang) {
	drawPath(ctx, 'M -50,0 L -45,-5 -25,-5 -22,-2 22,-2 25,-5 180,0 25,5 22,2 -22,2 -25,5 -45,5 Z', '#c21', ang);
	ctx.beginPath();
  ctx.arc(0, 0, 8, 0, 2 * Math.PI);
  ctx.fillStyle = '#c21';
  ctx.fill();
  ctx.closePath();
}
function drawMinHand(ctx,ang) {
	drawPath(ctx, 'M 0,0 L 1,-2 20,-2 22,-5 122,-5 124,-2 146,-2 168,0 146,2 124,2 122,5 22,5 20,2 1,2 0,0 24,0 24,2 120,2 122,0 120,-2 24,-2 24,0 Z', '#111', ang);
}
function drawHourHand(ctx,ang) {
	drawPath(ctx, 'M 0,0 L 1,-3 14,-3 17,-7 97,-7 100,-3 112,-2 134,0 112,2 100,3 97,7 17,7 14,3 1,3 0,0 18,0 21,3 94,3 96,0 94,-3 21,-3 18,0 Z', '#000', ang);
}
function drawFace2(ctx) {
  var g1x1 = 250 + 5 * Math.cos(4/3*Math.PI);
  var g1y1 = 250 + 5 * Math.sin(4/3*Math.PI)
  var g1x2 = 250 + 5 * Math.cos(1/3*Math.PI);
  var g1y2 = 250 + 5 * Math.sin(1/3*Math.PI);
  var g1 = ctx.createLinearGradient(g1x1,g1y1,g1x2,g1y2);
  g1.addColorStop(0, '#999');
  g1.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(250, 250, 5, 0, 2 * Math.PI);
  ctx.fillStyle = g1;
  ctx.font="20px Georgia";
  ctx.fillStyle="rgba(219, 219, 219, 0.5)";
  ctx.fillText("html5andcss3.org",250,245);
  ctx.fill();
  ctx.closePath();
  var g2x1 = 250 + 3 * Math.cos(4/3*Math.PI);
  var g2y1 = 250 + 3 * Math.sin(4/3*Math.PI)
  var g2x2 = 250 + 3 * Math.cos(1/3*Math.PI);
  var g2y2 = 250 + 3 * Math.sin(1/3*Math.PI);
  var g2 = ctx.createLinearGradient(g2x1,g2y1,g2x2,g2y2);
  g2.addColorStop(0, '#ccc');
  g2.addColorStop(1, '#aaa');
  ctx.beginPath();
  ctx.arc(250, 250, 3, 0, 2 * Math.PI);
  ctx.fillStyle = g2;
  ctx.fill();
  ctx.closePath();
  var g3x1 = 250 + 212 * Math.cos(4/3*Math.PI);
  var g3y1 = 250 + 212 * Math.sin(4/3*Math.PI)
  var g3x2 = 250 + 212 * Math.cos(1/3*Math.PI);
  var g3y2 = 250 + 212 * Math.sin(1/3*Math.PI);
  var g3 = ctx.createLinearGradient(g3x1,g3y1,g3x2,g3y2);
  g3.addColorStop(0, 'rgba(255,255,255,0.5)');
  g3.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.arc(250, 250, 212, 0, 2 * Math.PI);
  ctx.fillStyle = g3;
  ctx.fill();
  ctx.closePath();
}
function drawPath(ctx,path,fill,ang) {
  ctx.save();
	ctx.rotate(ang == undefined ? 0 : ang  * Math.PI / 180.0);
	ctx.beginPath();
	var parts = path.split(' ');
	while (parts.length > 0) {
	  var part = parts.shift();
	  if (part == 'M') {
	    coords = parts.shift().split(',');
	    ctx.moveTo(coords[0], coords[1]);
	  } else if (part == 'L') {
	    continue;
	  } else if (part == 'Z') {
	    break;
	  } else if (part.indexOf(',') >= 0) {
			coords = part.split(',');
			ctx.lineTo(coords[0], coords[1]);
		}
	}
	ctx.closePath();
	ctx.fillStyle = (fill == undefined ? '#000' : fill);
	ctx.fill();
	ctx.restore();
}