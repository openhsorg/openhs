// Copyright 2016 
//
//
// Home page: ***

/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>
/// <reference path='OhsLibrary/OhsSiteData.ts'/>

module AdminApp {        

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

    import SiteData =           OhsSiteData.SiteData;
    import Floor =              OhsSiteData.Floor;
    import Room =               OhsSiteData.Room;
    import TemperatureSensor =  OhsSiteData.TemperatureSensor;    
    import Door =               OhsSiteData.Door;
    import Window =             OhsSiteData.Window;
    import Switch =             OhsSiteData.Switch;
    import ContactSensor =      OhsSiteData.ContactSensor;
    import Thing =              OhsSiteData.Thing;               
              
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
    
    const imageAdd           = '/adminres/images/add.png';
    const imageDestroy       = '/adminres/images/destroy.png';
    const imagePadlockOff           = '/adminres/images/add.png';
    const imagePadlockOffPushed     = '/adminres/images/add.png';
    const imageLeave            = '/adminres/images/leave.png';
    const imageFloor            = '/adminres/images/floor.png';
    const imageBkg            = '/adminres/images/config_bkg.png';
    const imageTempIcon          = '/adminres/images/tempIcon.png';
    const imageDoorIcon          = '/adminres/images/doorIcon.png';
    const imageSwitchIcon          = '/adminres/images/switchIcon.png';
    const imageRoomIcon          = '/adminres/images/roomIcon.png';
    const imageFloorIcon          = '/adminres/images/floorIcon.png';
    
    
    export class Admin {
        
        private canvas:             HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        
        // Data        
        public m_siteData:          SiteData = null; //general Site Data      
        
        // Timers
      //  private timerData;
     //   private timerPaint;
      //  private timerLoadGraphics;
        
        // Screens
        private m_screenMain:             ScreenMain = null;                    
        private m_screenRoom:             ScreenRoom = null;
        private m_screenFloors:           ScreenFloors =  null;
        private m_screenRooms:            ScreenRooms =  null;
        private m_screenList:             ScreenList = null;
               
        //Graphics
        private m_graphics: Graphics = null;        
        
        // Handlers
        private currPage: Screen = null;
       // private refreshRateMain: number = 5000; 
        
        constructor (canvas: HTMLCanvasElement) {  
        
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");          
            
            //---Data---
            this.m_siteData = new SiteData ();
            
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);                  
            
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_siteData, this.m_graphics);
            this.m_screenFloors = new ScreenFloors(this.m_siteData, this.m_graphics);
            this.m_screenRooms = new ScreenRooms(this.m_siteData, this.m_graphics);
            this.m_screenList = new ScreenList(this.m_siteData, this.m_graphics);
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
                        
        }
                 
    }
    
    class MouseReturn {
        public nextScreen: string = '';
        public nextSitePath: string = '';
        
    }
    
    export class Screen {
            
        public  className:              string                      = "";     
       // protected mouseRet:           MouseReturn             = new MouseReturn ();
        protected m_siteData:         SiteData                = null;
        protected m_graphics:         Graphics                = null;
        public    m_dlgNumbers:       DlgNumbers              = new DlgNumbers ();
        public    m_thingPtr:         Thing                   = null;

           
        public wait:                  boolean                 = false;
    
        constructor (m_siteData: SiteData, m_graphics: Graphics) {
            
            this.m_siteData = m_siteData;
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
                
        public timeText:            TextSimple     = new TextSimple ();
        public HouseNameText:       TextSimple     = new TextSimple ();                  
        public imgBkg:              ImageRect      = new ImageRect ();
        protected btnDoor:          ImageButton    = new ImageButton(imageDoorIcon, imageDoorIcon);
        protected btnTemp:          ImageButton    = new ImageButton(imageTempIcon, imageTempIcon);
        protected btnSwitch:        ImageButton    = new ImageButton(imageSwitchIcon, imageSwitchIcon);
        protected btnFloor:         ImageButton    = new ImageButton(imageFloorIcon, imageFloorIcon);
        protected btnRoom:          ImageButton    = new ImageButton(imageRoomIcon, imageRoomIcon);
        
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
        
        //protected enableDlgNumbers: boolean         = false;
           
        constructor (m_siteData: SiteData, m_graphicsData: Graphics) {  
        
            super (m_siteData, m_graphicsData);
            
            this.imgBkg.setImage(imageBkg);  
            
            //this.m_symbolHome      = new SymbolHome(m_siteData);                     
        }
        
        MouseDownHandler(mx: number, my: number) {   
            
        }
        
        public MouseUpHandler(mx: number, my: number) {     
       
            var mouseRet: MouseReturn = new MouseReturn ();
            
            if (this.btnTemp.isClicked(mx, my)) {
            //    window.alert('temp clicked......');
                
                mouseRet.nextScreen = ScreenList.name;
                mouseRet.nextSitePath = 'TemperatureSensor';     
                                
            } else if (this.btnSwitch.isClicked(mx, my)) {
            //    window.alert('temp clicked......');
                
                mouseRet.nextScreen = ScreenList.name;
                mouseRet.nextSitePath = 'Switch';        
                              
            } else if (this.btnDoor.isClicked(mx, my)) {
            //    window.alert('temp clicked......');
                
                mouseRet.nextScreen = ScreenList.name;
                mouseRet.nextSitePath = 'Door';       
                               
            } else if (this.btnRoom.isClicked(mx, my)) {                            
                mouseRet.nextScreen = ScreenRooms.name;                   
                                 
            } else if (this.btnFloor.isClicked(mx, my)) {
            //    window.alert('temp clicked......');
                
                mouseRet.nextScreen = ScreenFloors.name;
               // mouseRet.nextSitePath = 'Floor';                      
            }
       
       
       
       
            
            /*
            if (this.enableDlgNumbers) {
                var n = this.m_dlgNumbers.MouseUpHandler(mx, my);
                
                if (n != -1) {
                    this.enableDlgNumbers = false;   
                    
                  //  window.alert('Set number of floors: ' + n);
                    //Set number floors...
                    this.m_siteData.setNumberFloors(n);
                    
                    return null;
                }
            }

            var retHome = this.m_symbolHome.MouseUpHandler(mx, my);
            
            if (retHome != null) {     
            
                    if (retHome.command == 'jumpIn') {                                                       
                        mouseRet.nextScreen = ScreenFloor.name;
                        mouseRet.nextSitePath = retHome.path;
                
                        return mouseRet;
                    } else if (retHome.command == 'delete') {
                        //window.alert('Delete: ' + retHome.path);                        
                        if (confirm('Do you want to delete this floor???')) {                                       
                            
                            this.m_siteData.deleteFloor(retHome.path);
                        
                            return null;       
                        
                        } else {
                            
                            return null;
                        }                        
                    }                          
            }       
            
            if (this.textNumFloors.isClicked(mx, my)) {
              //  window.alert('changing num floors...');
                
                this.enableDlgNumbers = true;            
            }
            
            if (this.btnAdd.isClicked(mx, my)){                 
                
                 if (this.m_siteData.m_floorArray.length >= 3) {                     
                     window.alert('Maximum is 3 floors...');
                 
                 } else {
                     this.m_siteData.addFloor();
                     
                 }
                
                return null;                                  
            }            
            */
            return mouseRet;
        }
                
        public paint (canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Image Bkg
            this.imgBkg.size(20, 20, 600, 500);
            this.imgBkg.paint(ctx);  
            
            //Time       
            this.timeText.copyStyle(this.m_graphics.textB);   
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);  
            
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
            this.btnTemp.size(50, 50, 120, 120);
            this.btnTemp.paint(ctx);               
            
            this.btnSwitch.size(200, 50, 120, 120);
            this.btnSwitch.paint(ctx);   
            
            this.btnDoor.size(350, 50, 120, 120);
            this.btnDoor.paint(ctx);            
            
            this.btnRoom.size(50, 200, 120, 120);
            this.btnRoom.paint(ctx);               
            
            this.btnFloor.size(200, 200, 120, 120);
            this.btnFloor.paint(ctx);              
            
            //Marks numbers
            this.numInTemp.center(50 + 120, 50 + 120, 50, 50);
            this.numInTemp.paintNum(ctx, this.m_siteData.m_tempSensorArray.length);
            
            this.numInSwitch.center(200 + 120, 50 + 120, 50, 50);
            this.numInSwitch.paintNum(ctx, this.m_siteData.m_switchArray.length);            
                        
            this.numInDoor.center(350 + 120, 50 + 120, 50, 50);
            this.numInDoor.paintNum(ctx, this.m_siteData.m_doorArray.length);
            
            this.numInRoom.center(50 + 120, 200 + 120, 50, 50);
            this.numInRoom.paintNum(ctx, this.m_siteData.m_roomArray.length);  
            
            this.numInFloor.center(200 + 120, 200 + 120, 50, 50);
            this.numInFloor.paintNum(ctx, this.m_siteData.m_floorArray.length);               
            
            /*
            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore(); 
                            
            //Time       
            this.timeText.copyStyle(this.m_graphics.textB);   
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);  
            
            //House name
            this.HouseNameText.copyStyle(this.m_graphics.textA);  
            this.HouseNameText.size(30 , 2, 250, 65);        
            this.HouseNameText.paintText(ctx, this.m_siteData.m_site.name);  

            //house symbol
            this.m_symbolHome.paint(ctx, 200, 100, 400, 300);       
            
            //Text num floors
            this.textNumFloors.copyStyle(this.m_graphics.textA);
            this.textNumFloors.size((width * 0.5) + 200, height - 120, 100, 60);
            this.textNumFloors.paintText(ctx, this.m_siteData.m_floorArray.length + ' floors...');       

            //Add next floor
            this.btnAdd.size((width * 0.5) + 120, height - 120, 60, 60);
            this.btnAdd.paint(ctx);      
            */      
        }

    }
    
    class ScreenList extends Screen {
        
                  
        protected thingPath:            string                      = "";
        private txtThingPath:           TextSimple                  = new TextSimple ();
        public timeText:                TextSimple                  = new TextSimple ();
        public listText:                TextSimple                  = new TextSimple ();
        
        public imgFloor:                ImageRect                   = new ImageRect ();
        protected btnAdd:               ImageButton                 = new ImageButton(imageAdd, imageAdd);
        public textNumRooms:            TextSimple                  = new TextSimple();    
        
        //Filtered things...
        protected m_roomArray:          Array<Room>                 = null;
        protected btnLeave:             ImageButton                 = new ImageButton(imageLeave, imageLeave);
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {                
            super (siteData, m_graphics);
           
        }  
             
        
        MouseDownHandler(mx: number, my: number) { 

        }        
    
        MouseUpHandler(mx: number, my: number) {                    
         
            var mouseRet: MouseReturn = new MouseReturn ();
           
           // window.alert('go back...!!!');
            
            if (this.btnLeave.isClicked(mx, my)){       
            
                mouseRet.nextScreen = ScreenMain.name;
                mouseRet.nextSitePath = null;
            }
        
            return mouseRet;                            
        }    
        
        public paint(canvas: HTMLCanvasElement) {
                                    
            //window.alert('Floor switch *');
            
            //var dy = 30;
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore(); 
                            
            //Time        
            this.timeText.copyStyle(this.m_graphics.textB);  
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);
            
            //Leave page
            this.btnLeave.size((width) - 80, height - 75, 60, 60);
            this.btnLeave.paint(ctx);
  
            
            if (this.className == 'TemperatureSensor') {
                
                this.listText.copyStyle(this.m_graphics.textA);                  
                this.listText.size(30, 10, 250, 65);        
                this.listText.paintText(ctx, this.className);                   
                                                
                var i = 1;
                var dy = -30;
                
                for (let item of this.m_siteData.m_tempSensorArray) {
                            
                    dy = dy + 90;
                                       
                    this.listText.copyStyle(this.m_graphics.textC);  
                    this.listText.size(30, dy, 250, 65);        
                    this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                    
                    this.listText.copyStyle(this.m_graphics.textD);
                    this.listText.size(30, dy + 25, 250, 65);         
                    this.listText.paintText(ctx, '[ ' + item.getSitePath() + ' ]');      
                    
                    this.listText.size(30, dy + 45, 250, 65);         
                    this.listText.paintText(ctx, '[ ' + item.getDevicePath()+ ' ]');                          

                    this.listText.size(30, dy + 65, 250, 65);         
                    this.listText.paintText(ctx, 'Position in floor: x:' + item.posX + '; y:' + item.posY + '; z:' + item.posZ);                      
                    
                    i ++;
                }
            } else if (this.className == 'Switch') {
                
                this.listText.copyStyle(this.m_graphics.textA);                  
                this.listText.size(30, 10, 250, 65);        
                this.listText.paintText(ctx, this.className);                   
                                                
                var i = 1;
                var dy = -30;
                
                for (let item of this.m_siteData.m_switchArray) {
                            
                    dy = dy + 90;
                                       
                    this.listText.copyStyle(this.m_graphics.textC);  
                    this.listText.size(30, dy, 250, 65);        
                    this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                    
                    this.listText.copyStyle(this.m_graphics.textD);
                    this.listText.size(30, dy + 25, 250, 65);         
                    this.listText.paintText(ctx, 'Site Path: ' + item.getSitePath());      
                    
                    this.listText.size(30, dy + 45, 250, 65);         
                    this.listText.paintText(ctx, 'Device Path: ' + item.getDevicePath());                          

                    this.listText.size(30, dy + 65, 250, 65);         
                    this.listText.paintText(ctx, 'Position in floor: x:' + item.posX + '; y:' + item.posY + '; z:' + item.posZ);                      
                    
                    i ++;
                }                
            } else if (this.className == 'Door') {
                
                this.listText.copyStyle(this.m_graphics.textA);                  
                this.listText.size(30, 10, 250, 65);        
                this.listText.paintText(ctx, this.className);                   
                                                
                var i = 1;
                var dy = -30;
                
                for (let item of this.m_siteData.m_doorArray) {
                            
                    dy = dy + 90;
                                       
                    this.listText.copyStyle(this.m_graphics.textC);  
                    this.listText.size(30, dy, 250, 65);        
                    this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                    
                    this.listText.copyStyle(this.m_graphics.textD);
                    this.listText.size(30, dy + 25, 250, 65);         
                    this.listText.paintText(ctx, 'Site Path: ' + item.getSitePath());      
                    
                  //  this.listText.size(30, dy + 45, 250, 65);         
                  //  this.listText.paintText(ctx, 'Device Path: ' + item.getDevicePath());                          

                    this.listText.size(30, dy + 45, 250, 65);         
                    this.listText.paintText(ctx, 'Position in floor: x:' + item.posX + '; y:' + item.posY + '; z:' + item.posZ);                      
                    
                    i ++;
                }                
            } else if (this.className == 'Room') {
                
                this.listText.copyStyle(this.m_graphics.textA);                  
                this.listText.size(30, 10, 250, 65);        
                this.listText.paintText(ctx, this.className);                   
                                                
                var i = 1;
                var dy = -30;
                
                for (let item of this.m_siteData.m_roomArray) {
                            
                    dy = dy + 90;
                                       
                   this.listText.copyStyle(this.m_graphics.textC);  
                    this.listText.size(30, dy, 250, 65);        
                    this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                    
                    this.listText.copyStyle(this.m_graphics.textD);
                    this.listText.size(30, dy + 25, 250, 65);         
                    this.listText.paintText(ctx, 'Site Path: ' + item.getSitePath());      
                    /*
                    this.listText.size(30, dy + 45, 250, 65);         
                    this.listText.paintText(ctx, 'Device Path: ' + item.getDevicePath());                          

                    this.listText.size(30, dy + 65, 250, 65);         
                    this.listText.paintText(ctx, 'Position in floor: x:' + item.posX + '; y:' + item.posY + '; z:' + item.posZ);                      
                    */
                    i ++;
                }                
            } else if (this.className == 'Floor') {
                
                this.listText.copyStyle(this.m_graphics.textA);                  
                this.listText.size(30, 10, 250, 65);        
                this.listText.paintText(ctx, this.className);                   
                                                
                var i = 1;
                var dy = -30;
                
                for (let item of this.m_siteData.m_floorArray) {
                            
                    dy = dy + 90;
                                       
                   this.listText.copyStyle(this.m_graphics.textC);  
                    this.listText.size(30, dy, 250, 65);        
                    this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                    
                    this.listText.copyStyle(this.m_graphics.textD);
                    this.listText.size(30, dy + 25, 250, 65);         
                    this.listText.paintText(ctx, 'Site Path: ' + item.getSitePath());      
                    /*
                    this.listText.size(30, dy + 45, 250, 65);         
                    this.listText.paintText(ctx, 'Device Path: ' + item.getDevicePath());                          

                    this.listText.size(30, dy + 65, 250, 65);         
                    this.listText.paintText(ctx, 'Position in floor: x:' + item.posX + '; y:' + item.posY + '; z:' + item.posZ);                      
                    */
                    i ++;
                }                
            }    
        }       
    } 
    
    class ScreenFloors extends Screen {

        public timeText:                TextSimple                  = new TextSimple ();
        public listText:                TextSimple                  = new TextSimple ();
        public numFloorsText:           TextSimple                   = new TextSimple ();         
        public imgFloor:                ImageRect                   = new ImageRect ();
        protected btnAdd:               ImageButton                 = new ImageButton(imageAdd, imageAdd);
        protected m_delBtnArray:        Array<ImageButton>          = new Array<ImageButton>();         
        protected btnLeave:             ImageButton                 = new ImageButton(imageLeave, imageLeave);
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {                
            super (siteData, m_graphics);
           
        }               
        
        MouseDownHandler(mx: number, my: number) { 

        }        
    
        MouseUpHandler(mx: number, my: number) {                    
         
            var mouseRet: MouseReturn = new MouseReturn ();
           
           // window.alert('go back...!!!');
            
            if (this.btnLeave.isClicked(mx, my)){       
            
                mouseRet.nextScreen = ScreenMain.name;
                mouseRet.nextSitePath = null;
                
                return mouseRet;
                
            } else if (this.btnAdd.isClicked(mx, my)){       
            
                if (this.m_siteData.m_floorArray.length >= 3) {                     
                    window.alert('Maximum is 3 floors...');
                 
                } else {
                    this.m_siteData.addThing(Floor.name);
                     
                }
                
                return null;
            }
            
            // delete floor
            var i = 0;
               
            for (let item of this.m_delBtnArray) {
                                
                if (item.isClicked(mx, my)){                    
                    
                    this.m_siteData.deleteThing(this.m_siteData.m_floorArray[i]);
                }         
                
                i++;
            }                         
        
            return null;                            
        }    
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore(); 
                            
            //Time        
            this.timeText.copyStyle(this.m_graphics.textB);  
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);
            
            //Leave page
            this.btnLeave.size((width) - 80, height - 75, 60, 60);
            this.btnLeave.paint(ctx);        
            
            //Add floor
            this.btnAdd.size(30, height - 75, 60, 60);
            this.btnAdd.paint(ctx);       
            
            //Num floors        
            this.numFloorsText.copyStyle(this.m_graphics.textA);  
            this.numFloorsText.size(100, height - 75, 250, 65);        
            this.numFloorsText.paintText(ctx, 'Number floors: ' + this.m_siteData.m_floorArray.length);            
                
            this.listText.copyStyle(this.m_graphics.textA);                  
            this.listText.size(30, 10, 250, 65);        
            this.listText.paintText(ctx, this.className);                   
                                            
            var i = 1;
            var dy = -30;
            
            for (let item of this.m_siteData.m_floorArray) {
                                       
                dy = dy + 90;
                                   
                this.listText.copyStyle(this.m_graphics.textC);  
                this.listText.size(30, dy, 250, 65);        
                this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                
                this.listText.copyStyle(this.m_graphics.textD);
                this.listText.size(30, dy + 25, 250, 65);         
                this.listText.paintText(ctx, 'Site Path:[ ' + item.getSitePath() + ' ]');      
              
                //delete buttons                
                if (this.m_delBtnArray.length < i) {
                    this.m_delBtnArray.push(new ImageButton (imageDestroy, imageDestroy));                
                }   
                
                let btn = this.m_delBtnArray[i - 1];
                
                btn.size(350, dy + 20, 60, 60);
                btn.paint(ctx);     
                
                i ++;
                
            }                              
        }       
    }       
    
    class ScreenRooms extends Screen {

        public timeText:                TextSimple                  = new TextSimple ();
        public listText:                TextSimple                  = new TextSimple ();
        public numFloorsText:           TextSimple                   = new TextSimple ();         
        public imgFloor:                ImageRect                   = new ImageRect ();
        protected btnAdd:               ImageButton                 = new ImageButton(imageAdd, imageAdd);
        protected m_delBtnArray:        Array<ImageButton>          = new Array<ImageButton>();         
        protected btnLeave:             ImageButton                 = new ImageButton(imageLeave, imageLeave);
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {                
            super (siteData, m_graphics);
           
        }               
        
        MouseDownHandler(mx: number, my: number) { 

        }        
    
        MouseUpHandler(mx: number, my: number) {                    
         
            var mouseRet: MouseReturn = new MouseReturn ();
           
           // window.alert('go back...!!!');
            
            if (this.btnLeave.isClicked(mx, my)){       
            
                mouseRet.nextScreen = ScreenMain.name;
                mouseRet.nextSitePath = null;
                
                return mouseRet;
                
            } else if (this.btnAdd.isClicked(mx, my)){       
            
                if (this.m_siteData.m_roomArray.length >= 4) {                     
                    window.alert('Maximum is 4 rooms...');
                 
                } else {
                    this.m_siteData.addThing(Room.name);
                     
                }
                
                return null;
            }
            
            // delete floor
            var i = 0;
               
            for (let item of this.m_delBtnArray) {
                                
                if (item.isClicked(mx, my)){                
                    
                    this.m_siteData.deleteThing(this.m_siteData.m_roomArray[i]);
                }         
                
                i++;
            }                         
        
            return null;                            
        }    
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore(); 
                            
            //Time        
            this.timeText.copyStyle(this.m_graphics.textB);  
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);
            
            //Leave page
            this.btnLeave.size((width) - 80, height - 75, 60, 60);
            this.btnLeave.paint(ctx);        
            
            //Add floor
            this.btnAdd.size(30, height - 75, 60, 60);
            this.btnAdd.paint(ctx);       
            
            //Num floors        
            this.numFloorsText.copyStyle(this.m_graphics.textA);  
            this.numFloorsText.size(100, height - 75, 250, 65);        
            this.numFloorsText.paintText(ctx, 'Number rooms: ' + this.m_siteData.m_roomArray.length);            
                
            this.listText.copyStyle(this.m_graphics.textA);                  
            this.listText.size(30, 10, 250, 65);        
            this.listText.paintText(ctx, this.className);                   
                                            
            var i = 1;
            var dy = -30;
            
            for (let item of this.m_siteData.m_roomArray) {
                                       
                dy = dy + 90;
                                   
                this.listText.copyStyle(this.m_graphics.textC);  
                this.listText.size(30, dy, 250, 65);        
                this.listText.paintText(ctx, i.toString() + '.  ' + item.name);
                
                this.listText.copyStyle(this.m_graphics.textD);
                this.listText.size(30, dy + 25, 250, 65);         
                this.listText.paintText(ctx, 'Site Path:[ ' + item.getSitePath() + ' ]');      
              
                //delete buttons                
                if (this.m_delBtnArray.length < i) {
                    this.m_delBtnArray.push(new ImageButton (imageDestroy, imageDestroy));                
                }   
                
                let btn = this.m_delBtnArray[i - 1];
                
                btn.size(350, dy + 20, 60, 60);
                btn.paint(ctx);     
                
                i ++;
                
            }                              
        }       
    }       
    

    class ScreenFloorOld extends Screen {
        
        protected thingPath:            string                      = "";
        private txtThingPath:           TextSimple                  = new TextSimple ();
        public timeText:                TextSimple                  = new TextSimple ();
        public imgFloor:                ImageRect                   = new ImageRect ();
        protected btnAdd:               ImageButton                 = new ImageButton(imageAdd, imageAdd);
        public textNumRooms:            TextSimple                  = new TextSimple();    
        
        //Filtered things...
        protected m_roomArray:          Array<Room>                 = null;
        
        
     //   protected btnDelete:            ImageButton                 = new ImageButton(imageDestroy, imageDestroy);
        protected btnLeave:            ImageButton                  = new ImageButton(imageLeave, imageLeave);
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {                
            super (siteData, m_graphics);
            
         //   var m_doorArray: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getSitePath());
            
            this.imgFloor.setImage(imageFloor);  
           
        }  
        
     
        
        MouseDownHandler(mx: number, my: number) { 

        }        
    
        MouseUpHandler(mx: number, my: number) {                    
         
            var mouseRet: MouseReturn = new MouseReturn ();
           
           // window.alert('go back...!!!');
            
            if (this.btnLeave.isClicked(mx, my)){       
            
                mouseRet.nextScreen = ScreenMain.name;
                mouseRet.nextSitePath = null;
            }
        
            return mouseRet;                            
        }    
        
        public paint(canvas: HTMLCanvasElement) {
                                    
           // window.alert('Floor switch *');
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);

            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore(); 
                            
            //Time        
            this.timeText.copyStyle(this.m_graphics.textB);  
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);  
            
            //Name of floor    
            this.txtThingPath.copyStyle(this.m_graphics.textA);        
            this.txtThingPath.size(30, 2, 250, 65);        
            this.txtThingPath.paintText(ctx, this.m_thingPtr.getSitePath());     
            
            //Leave page
            this.btnLeave.size((width) - 80, height - 75, 60, 60);
            this.btnLeave.paint(ctx);
            
            //Image floor
            this.imgFloor.size(0, 50, 600, 500);
            this.imgFloor.paint(ctx);
            
            //Add next room
            this.btnAdd.size((width * 0.5) + 120, height - 120, 60, 60);
            this.btnAdd.paint(ctx);   
            
            //Text num floors
            this.textNumRooms.copyStyle(this.m_graphics.textA);
            this.textNumRooms.size((width * 0.5) + 200, height - 120, 100, 60);
            this.textNumRooms.paintText(ctx, this.m_siteData.m_roomArray.length + ' rooms...');               
            
        }                             
    }    
        
    class ScreenRoom extends Screen {
                  
        public m_doorMarks:             Array<DoorMark>         = new Array<DoorMark>();       // Doors marks
        public m_tempMarks:             Array<TempMark>         = new Array<TempMark>();       // Temps marks
        public m_switchMarks:           Array<SwitchMark>       = new Array<SwitchMark>();       // Switch marks
        protected m_imgRoomDefault:     ImageRect              = new ImageRect();;    //Array of images
        protected m_imgRoom:            ImageRect              = new ImageRect ();
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {            
            super(siteData, m_graphics);
            
            this.m_imgRoomDefault.setImage('/infores/servlets/kitchen/room_default.png');
        }   
        
        MouseUpHandler(mx: number, my: number) {                                           
                       
       //     this.returnVal.nextScreen = SwitchScreen.Floor;
            /*
            for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getSitePath();
                   return this.returnVal;
               }
           }
            */
            /*
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = null;
                   return this.returnVal;
              }
           }   
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mx, my)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();                
         //       switchSensor.postServerClick();
              //  switchSensor.getServerData();
                
                this.returnVal.nextScreen = null;    
                return this.returnVal;                     
                   
              }
           }                         

            return this.returnVal;
            */
        }       
        
        public setThing(thing: Thing){
            /*
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Room) {
                    
                    var room: Room = <Room> thing;
                    
                    //Images
                   
                    //Doors
                    var m_doorArray: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(m_doorArray.length, this.m_doorMarks, DoorMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>m_doorArray[id]);                        
                    }
                    
                    //Temp marks
                    var temps: Array<TemperatureSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_tempSensorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);                        
                    }                    
                    
                    //Switch marks
                    var m_switchArray: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(m_switchArray.length, this.m_switchMarks, SwitchMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing> m_switchArray[id]);                        
                    }                                          
                }                               
            }  
            */          
        }         
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
            /*
            var room: Room = <Room> this.getThing();
            
            if (room) {
                
                this.m_imgRoom.setImage(room.imageBkgPath);
                this.m_imgRoom.size(0, 0, width, height);
                this.m_imgRoom.paint(ctx);
                
            }
            */
            
            /*
            if (this.m_imgRoom2 != null){
                                
                if (!this.m_imgRoom2.loaded) {
                    this.m_imgRoomDefault.size(0, 0, width, height);
                    this.m_imgRoomDefault.paint(ctx);                    
                   
                } else {                                
                    this.m_imgRoom2.size(0, 0, width, height);
                    this.m_imgRoom2.paint(ctx);
                }
            }           
            */
            //New door marks....
            for (let id in this.m_doorMarks) {
                this.m_doorMarks[id].size(10, 10, 50, 50);
                this.m_doorMarks[id].paint(ctx);
            }
            
            //New temp marks....
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].size(10, 70, 50, 50);
                this.m_tempMarks[id].paint(ctx);
            }      
            
            //New switch marks....
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].size(10, 130, 50, 50);
                this.m_switchMarks[id].paint(ctx);
            }               
        }             
    } 
    
    export class SymbolHome {
        
        protected m_siteData:               SiteData = null;
        public roofTriangle:                Triangle = new Triangle();
        protected m_rectFloorArray:         Array<Rect> = new Array<Rect>();
        protected m_delBtnArray:            Array<ImageButton> = new Array<ImageButton>();
                
        constructor (m_siteData: SiteData) {
            this.m_siteData = m_siteData;
                                    
        }
        
        public MouseUpHandler(mx: number, my: number) {
            
            var i = 0;
            
            for (let item of this.m_rectFloorArray) {
                                
                if (item.isClicked(mx, my)){
                    
                  //  window.alert('it is' + this.m_sitePathArray[i].getText() + ' n:' + i);
                    return {
                        path: this.m_siteData.m_floorArray[i].getSitePath(),
                        command: 'jumpIn'
                    }
                }         
                
                i++;
            } 
                
               
            i = 0;
               
            for (let item of this.m_delBtnArray) {
                                
                if (item.isClicked(mx, my)){
                    
                  //  window.alert('it is' + this.m_sitePathArray[i].getText() + ' n:' + i);
                    return {
                        path: this.m_siteData.m_floorArray[i].getSitePath(),
                        command: 'delete'
                    }
                }         
                
                i++;
            }                

            return null;
        }
    
        public paint (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
            //x,y  left top corner
           // this.m_floorArray = m_floorArray;
            //20% is roof
            var roogHeight = 0.2 * height;                       
            
            this.roofTriangle.setTriangle(new Point2D(x + (width / 2), y), new Point2D(x, y + roogHeight), new Point2D(x + width, y + roogHeight));                                
            this.roofTriangle.paint(ctx);    
                        
            //Number of floors
            var nFloors = this.m_rectFloorArray.length;
                        
            //Create rectangles...
            var distance = 20.0;  // Distance between rectangles
            
            var rectHeight = ((height - roogHeight) / nFloors) - distance;        
            
            var i = 0;
            //Draw rectangles  & Del buttons   
            for (let item of this.m_siteData.m_floorArray) {
                
                if (this.m_rectFloorArray.length < i + 1) {
                    this.m_rectFloorArray.push(new Rect ());                
                }
                
                if (this.m_delBtnArray.length < i + 1) {
                    this.m_delBtnArray.push(new ImageButton (imageDestroy, imageDestroy));                
                }                
                
                let rc = this.m_rectFloorArray[i];
                let btn = this.m_delBtnArray[i];
                               
                let cx = x;
                let cy = (y + roogHeight + distance) + (i * (distance + rectHeight));
                
                rc.size(cx, cy, width, rectHeight);                    
                rc.paint(ctx);                                       
                
                ctx.fillStyle = '#FFCC00';
                ctx.fill();     
                
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#666666';
                ctx.stroke();        
                
                btn.size(cx + width + 10, cy, 60, 60);
                btn.paint(ctx);                 
                
                i++;  
            }
                       
            
            i = 0;
            //Draw texts    
            for (let item of this.m_siteData.m_floorArray) {                                
                
                let txtName: TextSimple     = new TextSimple(); 
                let txtPath: TextSimple     = new TextSimple(); 
                
                txtName.fontSize = 18;
                txtName.fontFamily = "px sans-serif";
                txtName.fontColor = '#196619';
                txtName.textAlign = "left";
                txtName.textBaseline = "top";
                
                txtPath.copyStyle(txtName);
                
                let cx = x;
                let cy = ((y + roogHeight + distance) + (i * (distance + rectHeight))) + (rectHeight / 2);                    
                
                txtName.size(cx + 150, cy, 100, 60);
                txtName.paintText(ctx, item.name);
                
                txtPath.size(cx + 10, cy, 100, 60);
                txtPath.paintText(ctx, item.getSitePath());                
                
                i++;
            }    
                    
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



