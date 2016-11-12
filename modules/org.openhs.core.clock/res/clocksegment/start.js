var display = new SegmentDisplay("display");
      display.pattern         = "##:##:##";
      display.cornerType      = 2;
      display.displayType     = 7;
      display.displayAngle    = 9;
      display.digitHeight     = 20;
      display.digitWidth      = 12;
      display.digitDistance   = 2;
      display.segmentWidth    = 3;
      display.segmentDistance = 0.5;
      display.colorOn         = "rgba(0, 0, 0, 0.9)";
      display.colorOff        = "rgba(0, 0, 0, 0.1)";

      animate();

      function animate() {
        var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        var value   = ((hours < 10) ? ' ' : '') + hours
                    + ':' + ((minutes < 10) ? '0' : '') + minutes
                    + ':' + ((seconds < 10) ? '0' : '') + seconds;
        display.setValue(value);
        window.setTimeout('animate()', 100);
        
        var canvasA = document.getElementById("display");
        var nextAddress = document.getElementById("segmentclock").getAttribute("next");
        
        canvasA.onmousedown = handleMousedown;

        var rectTst={x:0,y:0,w:canvasA.width,h:canvasA.height};
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
        	  BB=canvasA.getBoundingClientRect();
        	  BBoffsetX=BB.left;
        	  BBoffsetY=BB.top;
        	}            
      }     
      