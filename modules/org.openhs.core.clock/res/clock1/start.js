      clockd1_={
              "indicate": true,
              "indicate_color": "#222",
              "dial1_color": "#666600",
              "dial2_color": "#81812e",
              "dial3_color": "#9d9d5c",
              "time_add": 1,
              "time_24h": true,
              "date_add":3,
              "date_add_color": "#999",
             };
 
     
      var c = document.getElementById('clock1_');
      cns1_ = c.getContext('2d');
                  
      clock_conti(600,cns1_,clockd1_);
      
      start1();
      
      function start1() {
               
        var canvasA = document.getElementById("clock1_");
        var nextAddress = document.getElementById("clock1script").getAttribute("next");
        
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
      
     