// Copyright 2016 
//
//
// Home page: ***

/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>


module WelcomeApp {        

    import Rect =               OhsCanvasGraphics.Rect;
    import Triangle =           OhsCanvasGraphics.Triangle;
    import RectRounded =        OhsCanvasGraphics.RectRounded;
    import ImageRect =          OhsCanvasGraphics.ImageRect;
    import TextSimple =         OhsCanvasGraphics.TextSimple;    
    import TempMark =           OhsCanvasGraphics.TempMark;    
    import SwitchMark =         OhsCanvasGraphics.SwitchMark;
    import SwitchLockMark =     OhsCanvasGraphics.SwitchLockMark;        
    import ContactSensorMark =  OhsCanvasGraphics.ContactSensorMark;
    import DoorMark =           OhsCanvasGraphics.DoorMark;
    import WindowMark =         OhsCanvasGraphics.WindowMark;
    import ImageRectArray =     OhsCanvasGraphics.ImageRectArray;
    import Graphics =           OhsCanvasGraphics.Graphics;
    import Mark =               OhsCanvasGraphics.Mark;
    import ImageButton =        OhsCanvasGraphics.ImageButton;
    import Point2D =            OhsCanvasGraphics.Point2D;
    import DlgNumbers =         OhsCanvasGraphics.DlgNumbers;
    import NumberMark =         OhsCanvasGraphics.NumberMark;
             
              
    const whiteColor        = "#FFFFFF";
    const blackColor        = "#000000";
    const borderColor       = "#C0C0C0";
    const secPtrColor       = "#CC0000";
    const textColor         = "#000000";
    const circleColor       = "#c0c0c0";
    let fontSizeTempOut:    number = 50;    
    let fontSizeWind:       number = 24;      
    let fontSizeHum:        number = 27;
    let fontSizeTime:       number = fontSizeTempOut;
    let fontSizeDate:       number = fontSizeWind;        
    /*
    const imageAdd           = '/wres/images/add.png';
    const imageDestroy       = '/wres/images/destroy.png';
    const imagePadlockOff           = '/wres/images/add.png';
    const imagePadlockOffPushed     = '/wres/images/add.png';
    const imageLeave            = '/wres/images/leave.png';
    const imageFloor            = '/wres/images/floor.png';
    const imageBkg            = '/wres/images/config_bkg.png';
    const imageTempIcon          = '/wres/images/tempIcon.png';
    const imageDoorIcon          = '/wres/images/doorIcon.png';
    const imageSwitchIcon          = '/wres/images/switchIcon.png';
    const imageRoomIcon          = '/wres/images/roomIcon.png';
    const imageFloorIcon          = '/wres/images/floorIcon.png';
    */
    
    export class Welcome {
        
        private canvas:             HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        private url:                String;
        private urlRes:             String;
        
        // Data        
        //public m_siteData:          SiteData = null; //general Site Data      
        
        // Timers
      //  private timerData;
     //   private timerPaint;
      //  private timerLoadGraphics;
        
        // Screens
        private m_screenMain:             ScreenMain = null;                    

               
        //Graphics
        private m_graphics: Graphics = null;        
        
        // Handlers
        private currPage: Screen = null;
        
        constructor (canvas: HTMLCanvasElement, url: string, urlRes: string) {  
        
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");  
            this.url = '/' + url;
            this.urlRes = '/' + urlRes;    
            
            //window.alert('url:' + this.url + "   urlRes:" + this.urlRes);
            
            //---Data---
           // this.m_siteData = new SiteData ();
            
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);                  
            
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_graphics, this.url, this.urlRes);                        
        //    this.m_screenFloors = new ScreenFloors(this.m_siteData, this.m_graphics);
        //    this.m_screenRooms = new ScreenRooms(this.m_siteData, this.m_graphics);
        //    this.m_screenList = new ScreenList(this.m_siteData, this.m_graphics);
         //   this.m_screenRoom = new ScreenRoom(this.m_siteData, this.m_graphics);      

            //---Mouse Handler---
            var self = this;
            this.canvas.addEventListener('mousedown', function(event){self.MouseDownHandler(event);}, false);                      
            this.canvas.addEventListener('mouseup', function(event){self.MouseUpHandler(event);}, false);
            this.canvas.addEventListener('mousemove', function(event){self.MouseMoveHandler(event);}, false);                               
                          
            //---Set current displayed page---
            //this.openPage(this.m_screenMain);
            //this.SwitchPage(ScreenMain.name);
            this.currPage = this.m_screenMain;
            
            requestAnimationFrame(()=>this.paint());      

        }
        
        public paint () {
        
            var benchmark: boolean = false;
            
            if (!benchmark) {   
                if (this.currPage != null) {
                    var retVal = this.currPage.paint(this.canvas);
                }
                
            } else {
                                 
                /////**** Benchmark*****  
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Move registration point to the center of the canvas
                this.ctx.translate(this.canvas.width/2, this.canvas.width/2);
                
                // Rotate 1 degree
                this.ctx.rotate(Math.PI / 180);
                
                // Move registration point back to the top left corner of canvas
                this.ctx.translate(-this.canvas.width/2, -this.canvas.width/2);
                
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(this.canvas.width/4, this.canvas.width/4, this.canvas.width/2, this.canvas.height/4);
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(this.canvas.width/4, this.canvas.width/2, this.canvas.width/2, this.canvas.height/4);
                /////****************
           }            
      
          requestAnimationFrame(()=>this.paint());            
            
        }
        
        private MouseMoveHandler (event){
           var mousePos = getMousePos(this.canvas, event);                           
            
            /*
            * handling in current page...
            */
            if (this.currPage != null) {
                var retVal = this.currPage.MouseMoveHandler(mousePos.x, mousePos.y);
            }            
        }        
        
        private MouseDownHandler (event){                  
            var mousePos = getMousePos(this.canvas, event); 
            /*
            * handling in current page...
            */
            if (this.currPage != null) {
                var retVal = this.currPage.MouseDownHandler(mousePos.x, mousePos.y);
            }                            
        }
        
        private MouseUpHandler(event) {
            
            var mousePos = getMousePos(this.canvas, event);                           
            
            /*
            * handling in current page...
            */
            var mouseRet: MouseReturn = null;
            
            if (this.currPage != null) {
                mouseRet = this.currPage.MouseUpHandler(mousePos.x, mousePos.y);
            }
            
            if (mouseRet != null) {
                this.SwitchPage(mouseRet.nextScreen, mouseRet.nextSitePath);
                                
            }            
        }
        
        private SwitchPage (page: string, thingPath: string) {
                /*        
            if (page == ScreenMain.name) {
                this.currPage = this.m_screenMain;
            
            } else if (page == ScreenFloors.name) {
                
                this.currPage = this.m_screenFloors; 
             //   this.currPage.m_thingPtr = this.m_siteData.getThing(thingPath);    
                       
            } else if (page == ScreenRooms.name) {
                
                this.currPage = this.m_screenRooms; 
             //   this.currPage.m_thingPtr = this.m_siteData.getThing(thingPath);    
                       
            }  else if (page == ScreenList.name) {
                                                 
                this.currPage = this.m_screenList;
                this.currPage.className = thingPath;
               // this.currPage.m_thingPtr = this.m_siteData.getThing(thingPath);           
            }
                      */  
        }
                 
    }
    
    class MouseReturn {
        public nextScreen: string = '';
        public nextSitePath: string = '';
        
    }
    
    export class Screen {
            
        public  className:              string                      = "";     
       // protected mouseRet:           MouseReturn             = new MouseReturn ();
    
        protected m_graphics:         Graphics                = null;
        public    m_dlgNumbers:       DlgNumbers              = new DlgNumbers ();
        
        public url:                String = '';
        public urlRes:             String = '';        


           
        public wait:                  boolean                 = false;
    
        constructor (m_graphics: Graphics, url: String, urlRes: String) {
            
            this.url = url;
            this.urlRes = urlRes;
              
            this.m_graphics = m_graphics;
        }
  
        protected CommandExecute (cmd: number) {
            return null;
        }
        
        public MouseDownHandler(x: number, y: number) {
            return null;
        }        
        
        public MouseUpHandler(x: number, y: number) {
            return null;
        }
        
        public MouseMoveHandler(x: number, y: number) {
            return null;
        }        
        
        public paint (canvas: HTMLCanvasElement) {  
        
           // this.paintDlgNumbers(canvas);
        }

        protected paintWait (canvas: HTMLCanvasElement) {    
        
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;                 
           
            var rect: RectRounded = new RectRounded();            
            var text: TextSimple = new TextSimple ();
                                               
            ctx.save();                        
            rect.size((width / 2) - 100, (height / 2) - 25, 200, 60);
            rect.rad(10);            
            rect.paint(ctx);
            ctx.fillStyle = "#b8b894";
            ctx.lineWidth=2;
            ctx.strokeStyle="gray";            
            ctx.fill();
            ctx.stroke();            
            
            text.size(rect.x + 5, rect.y + 5, 60, 30);
            text.fontColor = "#1a75ff";
            text.fontSize = 40;
            text.paintText(ctx, 'Wait...');                       
            
            ctx.restore();   
        }
        /*
        protected paintDlgNumbers (canvas: HTMLCanvasElement) {    
        
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            this.m_dlgNumbers.paint(ctx, 100, 100, 20, 20);

        }        
*/        
        //Called right away after entering page...       
        public updateData () {
            //your code        
        }
         
    }
    
    export class ScreenMain extends Screen {                  
    
                
        public timeText            :TextSimple     = new TextSimple ();
        public HouseNameText       :TextSimple     = new TextSimple ();                  
        public imgBkg              :ImageRect      = new ImageRect ();
        protected btnAdmin         :ImageButton;
        protected btnKitchen       :ImageButton;
        protected btnClock         :ImageButton;
        protected btnMeteo         :ImageButton;

        /*
        protected numInDoor:        NumberMark     = new NumberMark();
        protected numNewDoor:       NumberMark     = new NumberMark();
        protected numInTemp:        NumberMark     = new NumberMark();
        protected numNewTemp:       NumberMark     = new NumberMark();
        protected numInSwitch:      NumberMark     = new NumberMark();
        protected numNewSwitch:     NumberMark     = new NumberMark();
        protected numInRoom:        NumberMark     = new NumberMark();
        protected numNewRoom:       NumberMark     = new NumberMark();        
        protected numInFloor:       NumberMark     = new NumberMark();
        protected numNewFloor:      NumberMark     = new NumberMark();  
        */
        //protected enableDlgNumbers: boolean         = false;
           
        constructor (m_graphicsData: Graphics, url: String, urlRes: String) {          
            super (m_graphicsData, url, urlRes);
            
            this.imgBkg.setImage(urlRes + '/images/background.png');  
            
            this.btnAdmin = new ImageButton(urlRes + '/images/admin.png', urlRes + '/images/admin.png');
            this.btnKitchen = new ImageButton(urlRes + '/images/kitchen.png', urlRes + '/images/kitchen.png');
            this.btnClock = new ImageButton(urlRes + '/images/clock.png', urlRes + '/images/clock.png');
            this.btnMeteo = new ImageButton(urlRes + '/images/meteo.png', urlRes + '/images/meteo.png');
            
            //this.m_symbolHome      = new SymbolHome(m_siteData);                     
        }
        
        MouseDownHandler(mx: number, my: number) {   
            
        }
        
        public MouseUpHandler(mx: number, my: number) {     
       
            var mouseRet: MouseReturn = new MouseReturn ();
            
            if (this.btnAdmin.isClicked(mx, my)) {
                window.open("/admin", "_self");                  
                                
            } else if (this.btnKitchen.isClicked(mx, my)) {                
                window.open("/kitchen", "_self");  
                 
            } else if (this.btnClock.isClicked(mx, my)) {                
                window.open("/org.openhs.core.clock.servlet.ClockSimpleServlet", "_self");  
                 
            } else if (this.btnMeteo.isClicked(mx, my)) {                
                window.open("/org.openhs.core.meteostation.digital", "_self");  
                 
            }   
              
            return mouseRet;
        }
                
        public paint (canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Image Bkg
            this.imgBkg.size((width - 500) / 2, (height - 500) / 2, 500, 500);
            this.imgBkg.paint(ctx);   
            
            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore();      
            
            //Icons...        
            this.btnAdmin.size(200, (height - 100) /2, 100, 100);
            this.btnAdmin.paint(ctx);     
            
            this.btnKitchen.size(560, (height - 100) /2, 100, 100);
            this.btnKitchen.paint(ctx);      
            
            this.btnClock.size(500, ((height - 100) /2) + 120, 100, 100);
            this.btnClock.paint(ctx);            
            
            this.btnMeteo.size(((width - 100) / 2), ((height - 100) /2) + 180, 100, 100);
            this.btnMeteo.paint(ctx);                  
            
            /*
            this.btnSwitch.size(200, 50, 120, 120);
            this.btnSwitch.paint(ctx);   
            
            this.btnDoor.size(350, 50, 120, 120);
            this.btnDoor.paint(ctx);            
            
            this.btnRoom.size(50, 200, 120, 120);
            this.btnRoom.paint(ctx);               
            
            this.btnFloor.size(200, 200, 120, 120);
            this.btnFloor.paint(ctx);              
              */
        }

    }
    

    //Function to get the mouse position
    function getMousePos(canvas, event) {
    
        var rect = canvas.getBoundingClientRect();
            
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
       
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }        

} // end module KitchenInfoStation



