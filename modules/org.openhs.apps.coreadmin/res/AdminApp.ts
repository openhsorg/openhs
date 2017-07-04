// Copyright 2016 
//
//
// Home page: ***

/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>
/// <reference path='OhsLibrary/OhsSiteData.ts'/>

module AdminApp {        

    import Rect =               OhsCanvasGraphics.Rect;
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

    import SiteData =           OhsSiteData.SiteData;
    import Floor =              OhsSiteData.Floor;
    import Room =               OhsSiteData.Room;
    import TemperatureSensor =  OhsSiteData.TemperatureSensor;    
    import Door =               OhsSiteData.Door;
    import Window =             OhsSiteData.Window;
    import Switch =             OhsSiteData.Switch;
    import ContactSensor =      OhsSiteData.ContactSensor;
    import Thing =              OhsSiteData.Thing;        
    
    const imagePadlockOpen          = '/infores/servlets/kitchen/symbol_padlock_on.png';
    const imagePadlockOpenPushed    = '/infores/servlets/kitchen/symbol_padlock_on_pushed.png';
    const imagePadlockOff           = '/infores/servlets/kitchen/symbol_padlock_off.png';
    const imagePadlockOffPushed     = '/infores/servlets/kitchen/symbol_padlock_off_pushed.png';
    const imageBkg1                 = '/infores/servlets/kitchen/bkg1.jpg';
    const imageStopwatch            = '/infores/servlets/kitchen/symbol_stopwatch.png';
    const imageStopwatchPushed      = '/infores/servlets/kitchen/symbol_stopwatch_pushed.png';
    const imageDoor                 = '/infores/servlets/kitchen/symbol_door.png';
    const imageDoorPushed           = '/infores/servlets/kitchen/symbol_door_pushed.png';
    const imageBulbOn               = '/infores/servlets/kitchen/symbol_bulb_on.png';
    const imageBulbOnPushed         = '/infores/servlets/kitchen/symbol_bulb_on_pushed.png';
    const imageBulbOff              = '/infores/servlets/kitchen/symbol_bulb_off.png';
    const imageBulbOffPushed        = '/infores/servlets/kitchen/symbol_bulb_off_pushed.png';
    const symbol_settings           = '/infores/servlets/kitchen/symbol_settings.png';
    const logo_htdvere              = '/infores/servlets/kitchen/logo_htdvere.png';
    const symbol_callBack           = '/infores/servlets/kitchen/symbol_callBack.png';
    const symbol_web                = '/infores/servlets/kitchen/symbol_web.png';
   
    
    enum SwitchScreen {
        Main,
        Watch,    
        Floor,
        WeatherForecast,
        Room,
        DoorList,
        DoorScreen
    }          
    
    var imagePaths: Array <String> = [
            "/infores/servlets/kitchen/sunny.png",        
            "/infores/servlets/kitchen/partcloudy.png",        
            "/infores/servlets/kitchen/cloudy.png",        
            "/infores/servlets/kitchen/cloudRain.png",        
            "/infores/servlets/kitchen/cloudStorm.png",        
           "/infores/servlets/kitchen/cloudSnow.png"       
    ];     
        
    const whiteColor        = "#FFFFFF";
    const blackColor        = "#000000";
    const borderColor       = "#C0C0C0";
    const secPtrColor       = "#CC0000";
    const textColor         = "#000000";
    const circleColor       = "#c0c0c0";
  //  let fontSizeTempIn:     number = 140;
    let fontSizeTempOut:    number = 50;    
    let fontSizeWind:       number = 24;      
    let fontSizeHum:        number = 27;
    let fontSizeTime:       number = fontSizeTempOut;
    let fontSizeDate:       number = fontSizeWind;         
    
    
    export class Admin {
        
        private canvas:             HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        private url:                string = "kitchen";
        
        // Data        
        public m_siteData:          SiteData = null; //general Site Data      
        
        // Timers
      //  private timerData;
     //   private timerPaint;
      //  private timerLoadGraphics;
        
        // Screens
        private m_screenMain:       ScreenMain = null;                    
        private m_room:             ScreenRoom = null;
        private m_floor:            ScreenFloor =  null;

               
        //Graphics
        private m_graphics: Graphics = null;        
        
        // Handlers
        private currPage: Screen = null;
        private refreshRateMain: number = 5000; 
        
        constructor (canvas: HTMLCanvasElement) {  
        
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");          
            
            //---Data---
            this.m_siteData = new SiteData ();
            
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);                  
            
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_siteData, this.m_graphics);
            this.m_floor = new ScreenFloor(this.m_siteData, this.m_graphics);
            this.m_room = new ScreenRoom(this.m_siteData, this.m_graphics);      

            //---Mouse Handler---
            var self = this;
            this.canvas.addEventListener('mousedown', function(event){self.MouseDownHandler(event);}, false);                      
            this.canvas.addEventListener('mouseup', function(event){self.MouseUpHandler(event);}, false);
            this.canvas.addEventListener('mousemove', function(event){self.MouseMoveHandler(event);}, false);                               
                          
            //---Set current displayed page---
            this.openPage(this.m_screenMain, this.refreshRateMain);
            
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
            var retVal = this.currPage.MouseUpHandler(mousePos.x, mousePos.y);
            
            if (retVal == null) {
                return null;
            }
            
            var refresh = this.refreshRateMain;
            var screen = null;
                                               
           // window.alert(">>>" + retVal.nextScreen + "\n\n>>>" + retVal.nextThingPath);
                    
            if (retVal.nextScreen == SwitchScreen.Floor) {               
                refresh = 1000;
                screen = this.m_floor;
                this.m_floor.setThing(<Thing>this.m_siteData.m_floorArray[0]);
                
              //  window.alert("floor");
                
                // window.alert("path:   " + this.m_siteData.m_floorArray[0].getSitePath() + " dx: " + this.m_siteData.m_floorArray[0].dim_x + " dy: " + this.m_siteData.m_floorArray[0].dim_y);
                
            } else if (retVal.nextScreen == SwitchScreen.Main) {
                screen = this.m_screenMain;     
                
            } else if (retVal.nextScreen == SwitchScreen.Room) {
                refresh = 100;
                screen = this.m_room;                
                this.m_room.setThing(this.m_siteData.getThing(retVal.nextThingPath));
                
            }
            
      //      this.paint();
            
            // Switch screen
            this.openPage(screen, refresh);
        }
        
        private openPage(next: Screen, refreshRate: number) {                                 
            if (next != null) {
                
                next.prevPage = SwitchScreen.Main;
                
                if (this.currPage != null) {                                                
                   //window.alert("curr page close");
                //    this.currPage.close(); 
                    
                    if (this.currPage instanceof ScreenFloor) {
                        next.prevPage = SwitchScreen.Floor;
                       // window.alert("floor switch");
                        
                    }                                                                      
                }             
 
                this.currPage = next; //open(refreshRate);
            }
        }                  
    }
    
    export class Screen {
            
        protected m_siteData:         SiteData                = null;
        protected m_graphics:         Graphics                = null;
        public prevPage:              SwitchScreen            = SwitchScreen.Main;
        
        private thing:                Thing                   = null;        
        public wait:                  boolean                 = false;
        
        protected returnVal = {
                nextScreen: null,
                nextThingPath: null                                 
            };          
        
        constructor (m_siteData: SiteData, m_graphics: Graphics) {
            
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
        }
        /*
        protected CommandSchedule (cmd: number) {
            window.setTimeout(() => this.CommandExecute(cmd), 1000); 
        }
        */
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
        
        public setThing (thing: Thing){
            this.thing = thing;
        }
        
        public getThing () {
            return this.thing;
        }   
        
        public getThingPath () {
            return this.thing.getSitePath();
        }          
    }
    
    export class ScreenMain extends Screen {                  
        
        //Data
        
        //Graphics       
        private ButtonStopWatch:    ImageButton     = new ImageButton (imageStopwatch, imageStopwatchPushed);
        private ButtonDoor:         ImageButton     = new ImageButton (imageDoor, imageDoorPushed);
        private iconVoiceMessage:   ImageRect       = new ImageRect ();
        private iconWind:           ImageRect       = new ImageRect ();
        private iconWeather:        ImageRectArray  = new ImageRectArray ();
        public tmpInText:           TextSimple      = new TextSimple ();
        public tmpOutText:          TextSimple      = new TextSimple ();
        public timeText:            TextSimple      = new TextSimple ();
        public dateText:            TextSimple      = new TextSimple ();
        public windText:            TextSimple      = new TextSimple ();
        public tmpInGradeText:      TextSimple      = new TextSimple ();       

        private appWatch:           boolean         = false;
        
        constructor (m_siteData: SiteData, m_graphicsData: Graphics) {  
        
            super (m_siteData, m_graphicsData);
            
            //---Data---
            this.iconWeather.setImages(imagePaths);
            this.iconVoiceMessage.setImage('/infores/servlets/kitchen/voicemessage.png');
            this.iconWind.setImage('/infores/servlets/kitchen/wind.png');
           
        }
        
        MouseDownHandler(mx: number, my: number) {   
            
            if (!this.appWatch){
                if (this.ButtonStopWatch.PushEvent(mx, my)){
            
                } else if (this.ButtonDoor.PushEvent(mx, my)) {
                    
                }
            }
  
            
        }
        
        public MouseUpHandler(mx: number, my: number) {                    
 
           // var mousePos = getMousePos(this.canvas, event);
       
            
            
                if (this.ButtonStopWatch.UpEvent(mx, my)){
                      //window.alert("clicked....");
         //           this.stopWatch.start();
                    this.appWatch = true;
                  //  this.open(30);
                    return null;
                } else if (this.ButtonDoor.UpEvent(mx, my)) {                
                    this.returnVal.nextScreen = SwitchScreen.DoorList;
                    return this.returnVal;
                
                } else if (this.tmpInText.isClicked(mx, my)) {
                    this.returnVal.nextScreen = SwitchScreen.Floor;
                    return this.returnVal;
                    
                } else if (this.iconWeather.isClicked(mx, my)) {
                    this.returnVal.nextScreen = SwitchScreen.WeatherForecast;
                    return this.returnVal;                                      
                }
           
            
            return null;
        }
                
        public paint (canvas: HTMLCanvasElement) {
            
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
            this.timeText.fontSize = 40;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";   
            this.timeText.size(canvas.width - 260, 2, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);                
        }
    }
       
    
    
        
        
    class ScreenFloor extends Screen {
        
        protected thingPath:            string                      = "";
        protected imgFloor2:            ImageRect                   = new ImageRect();
        private imgFloor:               HTMLImageElement            = null;        
        private imgFloorLoaded:         boolean                     = false;        
        private txtNumRooms:            TextSimple                  = new TextSimple ();
        public m_doorMarks:             Array<DoorMark>             = new Array<DoorMark>();                // Doors marks
        public m_windowMarks:           Array<WindowMark>           = new Array<WindowMark>();              // Window marks
        public m_tempMarks:             Array<TempMark>             = new Array<TempMark>();                // Temp marks
        public m_switchMarks:           Array<SwitchMark>           = new Array<SwitchMark>();              // Switch marks
        public m_contactSensorsMarks:   Array<ContactSensorMark>    = new Array<ContactSensorMark>();       // Switch marks
        private perc:                   number                      = 0.8;
        protected btnLock:              ImageButton                 = new ImageButton(imagePadlockOff, imagePadlockOffPushed);
        protected btnUnLock:            ImageButton                 = new ImageButton(imagePadlockOpen, imagePadlockOpenPushed);        
        protected btnSwitchOff:         ImageButton                 = new ImageButton(imageBulbOff, imageBulbOffPushed);
        protected btnSwitchOn:          ImageButton                 = new ImageButton(imageBulbOn, imageBulbOnPushed);        
           
        
        constructor (siteData:  SiteData, m_graphics: Graphics) {                
            super (siteData, m_graphics);

            this.imgFloor = new Image();
            this.imgFloor.src="/infores/servlets/kitchen/floor1.jpg";                     
            this.imgFloor2.setImage('/infores/servlets/kitchen/floor1.jpg');
         
            this.txtNumRooms.size (0, 0, 250, 100);
            this.txtNumRooms.textAlign = "left";
            this.txtNumRooms.textBaseline = "middle";
            this.txtNumRooms.fontSize = 40;       
        }  
        
        public setThing(thing: Thing){
            
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Floor) {                    
                    
                    //Doors
                    var m_doorArray: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(m_doorArray.length, this.m_doorMarks, DoorMark);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>m_doorArray[id]);     
                    }
                    
                    //Windows
                    var m_windowArray: Array<Window> = this.m_siteData.getFilteredThings(this.m_siteData.m_windowArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(m_windowArray.length, this.m_windowMarks, WindowMark);
                    
                    for (let id in this.m_windowMarks) {
                        this.m_windowMarks[id].setThing(<Thing>m_windowArray[id]);     
                    }                    
                    
                    //Temperature Sensors
                    var temps: Array<TemperatureSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_tempSensorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(temps.length, this.m_tempMarks, TempMark);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);                        
                    }                    
                    
                    //Switch                                       
                    
                    var m_switchArray: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getSitePath());
                 //   window.alert('Switch marks:' + m_switchArray.length + ' : ' + thing.getSitePath() + " :sa: " + this.m_siteData.m_switchArray.length);
                    var m_switchArray2: Array<Switch> = this.m_siteData.getFilteredThingsNoContains(m_switchArray, 'doors');
                    var m_switchArray3: Array<Switch> = this.m_siteData.getFilteredThingsNoContains(m_switchArray2, 'windows');
                    
                    //window.alert('Switch marks:' + m_switchArray.length + ' : ' + m_switchArray2.length + ' : ' + m_switchArray3.length + " :switches: " + this.m_siteData.m_switchArray.length + " :path: " + thing.getSitePath() + " :nFloors:" + this.m_siteData.m_floorArray.length);
                    
                    this.m_graphics.setNumber3(m_switchArray3.length, this.m_switchMarks, SwitchMark);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing>m_switchArray3[id]);                        
                    }   
                    
                    //Contact Sensor
                    var m_contactSensorArray: Array<ContactSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_contactSensorArray, thing.getSitePath());
                    var m_contactSensorArray2: Array<ContactSensor> = this.m_siteData.getFilteredThingsNoContains(m_contactSensorArray, 'doors');
                    m_contactSensorArray2= this.m_siteData.getFilteredThingsNoContains(m_contactSensorArray2, 'windows');
                    
                    this.m_graphics.setNumber3(m_contactSensorArray2.length, this.m_contactSensorsMarks, ContactSensorMark);
                    
                    for (let id in this.m_contactSensorsMarks) {
                        this.m_contactSensorsMarks[id].setThing(<Thing>m_contactSensorArray2[id]);                        
                    }                     
                }                               
            }            
        }   
        
        MouseDownHandler(mx: number, my: number) { 
            
            if (this.btnLock.PushEvent(mx, my)){
            
            } else if (this.btnUnLock.PushEvent(mx, my)){
            
            } else if (this.btnSwitchOn.PushEvent(mx, my)) {
                
            }else if (this.btnSwitchOff.PushEvent(mx, my)) {
                
            }
        }        
    
        MouseUpHandler(mx: number, my: number) { 
         
            
            if (this.btnLock.UpEvent(mx, my)){                
      //          this.m_siteData.postServerCommand('AllDoorSwitchesOn');  
         //       this.m_siteData.getFastData_DoorArray();                                 
                return null; 
                
            } else if (this.btnUnLock.UpEvent(mx, my)){                
           //     this.m_siteData.postServerCommand('AllDoorSwitchesOff');  
           //     this.m_siteData.getFastData_DoorArray();                   
                return null;
                
            } else if (this.btnSwitchOn.UpEvent(mx, my)){                
          //      this.m_siteData.postServerCommand('AllRoomSwitchesOn');  
          //      this.m_siteData.getFastData_SwitchArray();                   
                return null;
            } else if (this.btnSwitchOff.UpEvent(mx, my)){                
           //     this.m_siteData.postServerCommand('AllRoomSwitchesOff'); 
           //     this.m_siteData.getFastData_SwitchArray();                   
                return null;
            }              
            
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null                                        
            };               

           this.returnVal.nextScreen = SwitchScreen.Main;
        
           for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getSitePath();
                   }
           }
            
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.Room;
                   
                   this.returnVal.nextThingPath = this.m_siteData.getParentPath(this.m_tempMarks[id].getThing());
              }
           }   
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mx, my)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
                
                switchSensor.click();
                   /*
                switchSensor.postServerClick();           
                switchSensor.getServerData();
                switchSensor.getServerDataDelayed(100);
             //   this.paint();
                   */
                this.returnVal.nextScreen = null;    
                   return this.returnVal;                     
                   
              }               
           }    
            
           for (let id in this.m_contactSensorsMarks) {
               if (this.m_contactSensorsMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = null;
                   
                 //  window.alert("Clicked, SitePath: " + this.m_contactSensorsMarks[id].getThing().getSitePath());
                   
                   //this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
              }
           }              
            
           return this.returnVal;
        }    
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            //Picture percentage
            this.imgFloor2.size(0, 0, canvas.width, canvas.height);
            this.imgFloor2.scaleSize(0.8);
            
            var scaleX: number = 0.0;
            var scaleY: number = 0.0;
            
            var thing: Thing = this.getThing();
                        
            if ((thing != null)) {
                
                if (thing instanceof Floor) {
                    
                    var floor: Floor = <Floor> thing;
                                    
                    if (floor.dimX != 0) {
                        scaleX = this.imgFloor2.w / (floor.dimX); 
                    }
                    
                    if (floor.dimY != 0) {
                        scaleY = this.imgFloor2.h / (floor.dimY); 
                    }                               
                }
            }                    
            
            ctx.clearRect(0, 0, width, height);
            
            //Draw image...
            this.imgFloor2.paint(ctx);
            /*       
            ctx.save();            
            ctx.drawImage(this.imgFloor, 0, 0, width, height);
            ctx.restore();        
  */
           //    window.alert("" + scaleX + "" + scaleY + " marks:" +  this.m_doorMarks.length);
            
            //Doors...            
            for (let id in this.m_doorMarks) {
                 //  window.alert("" + scaleX + " " + scaleY);
                this.m_doorMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //Windows...            
            for (let id in this.m_windowMarks) {
                this.m_windowMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }            
            
            //Temperature sensors
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //window.alert("Switch marks: " + this.m_switchMarks.length);
            
            //m_switchArray
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }   
            
            //Contact sensors
            for (let id in this.m_contactSensorsMarks) {
                this.m_contactSensorsMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }    
            
            //Buttons            
            this.btnSwitchOn.size((width) * 0.61, height - 75, 60, 60);
            this.btnSwitchOn.paint(ctx);            
            
            this.btnSwitchOff.size((width) * 0.69, height - 75, 60, 60);
            this.btnSwitchOff.paint(ctx);            
            
            this.btnLock.size((width) * 0.77, height - 75, 60, 60);
            this.btnLock.paint(ctx);
            
            this.btnUnLock.size((width) * 0.85, height - 75, 60, 60);
            this.btnUnLock.paint(ctx);             
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
                       
            this.returnVal.nextScreen = SwitchScreen.Floor;
            
            for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getSitePath();
                   return this.returnVal;
               }
           }
            
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
        }       
        
        public setThing(thing: Thing){
            
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Room) {
                    
                    var room: Room = <Room> thing;
                    
                    //Images
                    /*
                    var img: ImageRect = this.m_graphics.getFilteredImage(this.m_imgRoom2Array, room.imageBkgPath);
                    
                    if (img == null) {
                        img = new ImageRect (room.imageBkgPath);
             //           img.size(0, 0, this.width, this.height);
                        this.m_imgRoom2Array.push(img);                        
                        this.m_imgRoom2 = img;
                      //  window.alert('nnnnn');
                    } else {
                        this.m_imgRoom2 = img;
                    }                                        
                          */             
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
        }         
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
            
            var room: Room = <Room> this.getThing();
            
            if (room) {
                
                this.m_imgRoom.setImage(room.imageBkgPath);
                this.m_imgRoom.size(0, 0, width, height);
                this.m_imgRoom.paint(ctx);
                
            }
            
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
    
    
    class retV {
        
        public cname: any = null;
        public path: string = null;
        
    }
     
    //Function to get the mouse position
    function getMousePos(canvas, event) {
    
        var rect = canvas.getBoundingClientRect();
            
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
        /*
    function getAjax2(urlAdr: string, id: string) {
           
        var result = null;
        
        $.ajaxSetup ({
        // Disable caching of AJAX responses
        cache: false
        });
                
        $.ajax({async: false, url: urlAdr, data: {orderId: id}, dataType: "json", success: function(data) {
            
            result = data;
                                          
            }});
        
        return result;    
        }    
        
    function postAjax2(urlAdr: string, id: string, dataPost: string) {
           
        var result = null;
                
        $.ajax({async: false, type: "POST", url: urlAdr, data: {postId: id, dataId: dataPost}, dataType: "json", success: function(response) {
            
            result = response;
                                          
            }});
        
        return result;    
        }     
        */
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }        

} // end module KitchenInfoStation



