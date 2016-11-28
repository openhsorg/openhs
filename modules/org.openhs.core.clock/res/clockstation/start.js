      var clock = new StationClock("clock");
      clock.body = StationClock.RoundBody;
      clock.dial = StationClock.SwissStrokeDial;
      clock.hourHand = StationClock.SwissHourHand;
      clock.minuteHand = StationClock.SwissMinuteHand;
      clock.secondHand = StationClock.BarSecondHand;
      clock.boss = StationClock.NoBoss;
      clock.minuteHandBehavoir = StationClock.BouncingMinuteHand;
      clock.secondHandBehavoir = StationClock.OverhastySecondHand;

      animate();
            

      function animate() {
        clock.draw();
        window.setTimeout("animate()", 50);
        
        var canvasA = document.getElementById("clock");
        var nextAddress = document.getElementById("stationclock").getAttribute("next");
        
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