
document.addEventListener('DOMContentLoaded', startTimer);
function startTimer()
{
	var canvas = document.getElementById("clockCanvas");
	//var context = canvas.getContext("2d");
	var nextAddress = document.getElementById("myScript").getAttribute("next");	
	
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
	
	setInterval(updateClocks, 1000);
}

function updateClocks()
{
	var now = new Date();
	var h = now.getHours() % 12;
	var m = now.getMinutes();
	var s = now.getSeconds();
	
	// --- Analog clock ---//

	var canvas = document.getElementById("clockCanvas");
	var context = canvas.getContext("2d");
	var nextAddress = document.getElementById("myScript").getAttribute("add");
	
	// You can change this to make the clock as big or small as you want.
	// Just remember to adjust the canvas size if necessary.
	var clockRadius = 300;

	// Make sure the clock is centered in the canvas
	var clockX = canvas.width / 2;
	var clockY = canvas.height / 2;

	// Make sure TAU is defined (it's not by default)
	Math.TAU = 2 * Math.PI;
	
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw background

	for (var i = 0; i < 12; i++)
	{
		var innerDist		= (i % 3) ? 0.85 : 0.75;
		var outerDist		= (i % 3) ? 1.0 : 1.0;
		context.lineWidth 	= (i % 3) ? 4 : 10;
		context.strokeStyle = '#999999';
		
		var armRadians = (Math.TAU * (i/12)) - (Math.TAU/4);
		var x1 = clockX + Math.cos(armRadians) * (innerDist * clockRadius);
		var y1 = clockY + Math.sin(armRadians) * (innerDist * clockRadius);
		var x2 = clockX + Math.cos(armRadians) * (outerDist * clockRadius);
		var y2 = clockY + Math.sin(armRadians) * (outerDist * clockRadius);
		
		context.beginPath();
		context.moveTo(x1, y1); // Start at the center
		context.lineTo(x2, y2); // Draw a line outwards
		context.stroke();
	}
	
	// Draw arms

	function drawArm(progress, armThickness, armLength, armColor)
	{
		var armRadians = (Math.TAU * progress) - (Math.TAU/4);
		var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

		context.lineWidth = armThickness;
		context.strokeStyle = armColor;

		context.beginPath();
		context.moveTo(clockX, clockY); // Start at the center
		context.lineTo(targetX, targetY); // Draw a line outwards
		context.stroke();
	}
	
	var hProgress = (h/12) + (1/12)*(m/60) + (1/12)*(1/60)*(s/60);
	var mProgress =                 (m/60) +        (1/60)*(s/60);
	var sProgress =                                        (s/60);
	
	drawArm( hProgress, 10, 1/2, '#FFFFFF'); // Hour
	drawArm( hProgress, 10, -5/clockRadius, '#FFFFFF'); // Hour

	drawArm( mProgress,  4, 3/4, '#FFFFFF'); // Minute
	drawArm( mProgress,  4, -2/clockRadius, '#FFFFFF'); // Minute

	drawArm( sProgress,  2,   1, '#FF0000'); // Second
	drawArm( sProgress,  2, -10/clockRadius, '#FF0000'); // Second

}