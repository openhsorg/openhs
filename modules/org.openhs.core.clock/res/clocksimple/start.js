  window.onload = function() {
    try {
      startClock('clockCanvas');
      
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
      
    } catch(e) {
      // in Internet Explorer there is no canvas!
      document.getElementById('myCanvasContainer').style.display = 'none';
    }
  };