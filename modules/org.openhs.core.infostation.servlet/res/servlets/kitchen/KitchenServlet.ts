// Copyright 2016 
//
//
// Home page: ***

/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>
/// <reference path='OhsLibrary/OhsWeatherData.ts'/>
/// <reference path='OhsLibrary/OhsSiteData.ts'/>

module KitchenInfoStation {        

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
        
    import WeatherDataForecast = OhsWeatherData.WeatherDataForecast;
    import WeatherForecast =     OhsWeatherData.WeatherForecast;    
        
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
    
    //Meteorological data    
    var timeString = "";
    var dateString = "";                    
        
    //Fingerprint image    
    var imgFingerprint = new Image(); 
    imgFingerprint.src = '/infores/servlets/kitchen/fingerprint.png'; 
    var imgFingerprintLoaded = false;    
        
    imgFingerprint.onload = function(){
      imgFingerprintLoaded = true;
    }   
    
    export class ApplicationKitchen {
        
        private canvas:             HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        private url:                string = "kitchen";
        
        // Data
        public m_weatherData:       WeatherDataForecast = new WeatherDataForecast(); // General weather
        public m_siteData:          SiteData = null; //general Site Data      
        
        // Timers
        private timerData;
        private timerPaint;
        private timerLoadGraphics;
        
        // Screens
        private m_screenMain:       ScreenMain = null;
        public m_forecastScreen:    ScreenWeatherForecast = null; //forecast screen            
        private m_room:             ScreenRoom = null;
        private m_floor:            ScreenFloor =  null;
        private m_screenDoorList:   ScreenDoorList = null;
        private m_screenDoor:       ScreenDoor = null;
               
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
            this.m_weatherData = new WeatherDataForecast ();
            
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);                  
            
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_siteData, this.m_graphics, this.m_weatherData);
            this.m_floor = new ScreenFloor(this.m_siteData, this.m_graphics);
            this.m_room = new ScreenRoom(this.m_siteData, this.m_graphics);      
            this.m_forecastScreen = new ScreenWeatherForecast (this.m_siteData, this.m_graphics, this.m_weatherData);   
            this.m_screenDoorList = new ScreenDoorList (this.m_siteData, this.m_graphics);
            this.m_screenDoor = new ScreenDoor (this.m_siteData, this.m_graphics);                                  
            
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
                
            } else if (retVal.nextScreen == SwitchScreen.WeatherForecast) {
                screen = this.m_forecastScreen;     
                       
            } else if (retVal.nextScreen == SwitchScreen.Room) {
                refresh = 100;
                screen = this.m_room;                
                this.m_room.setThing(this.m_siteData.getThing(retVal.nextThingPath));
                
            } else if (retVal.nextScreen == SwitchScreen.DoorList) {
                refresh = 5000;
                screen = this.m_screenDoorList;     
                           
            } else if (retVal.nextScreen == SwitchScreen.DoorScreen) {
                refresh = 100;                                      
                screen = this.m_screenDoor;  
                this.m_screenDoor.setThing(this.m_siteData.getThing(retVal.nextThingPath));                            
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
                        
                    } else if (this.currPage instanceof ScreenDoorList) {
                        next.prevPage = SwitchScreen.DoorList;                                                                      
                    }                                                                        
                }             
 
                this.currPage = next; //open(refreshRate);
            }
        }

        private getServerData () {            
            if (this.currPage != null) {
                this.currPage.getServerData(this.url);                
            }
        }
       
        private timerGetServerDataEvent(step : number) {
           this.getServerData();
           window.clearTimeout(this.timerData);
           this.timerData = window.setTimeout(() => this.timerGetServerDataEvent(step), step); 
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
          
        public getServerData (url: string) {
        
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
        
        private m_weatherData:      WeatherDataForecast     = null;
        
        //Graphics
        public stopWatch:           StopWatch       = new StopWatch ();  
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
        
        constructor (m_siteData: SiteData, m_graphicsData: Graphics, m_weatherData: WeatherDataForecast) {  
        
            super (m_siteData, m_graphicsData);
            
            this.m_weatherData = m_weatherData;
            
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
       
            if (this.appWatch) {
                if (this.stopWatch.getStatus()) {
                    if(this.stopWatch.stopwatchRect.isClicked(mx, my)) {                                
                        this.stopWatch.stop();
                //        this.paint();                                 
                     }   
                } else {
                    this.appWatch = false;
                    //this.open(5000);                     
                }
                
                return null;
                
            } else {                
            
                if (this.ButtonStopWatch.UpEvent(mx, my)){
                      //window.alert("clicked....");
                    this.stopWatch.start();
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
            }        
            
            return null;
        }
                
        public paint (canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
                                   
            ctx.clearRect(0, 0, width, height);
                                    
            var arcCenterX = width / 2;
            var arcCenterY = height / 2 + (height * 0.1);
            var arcRadius = height * 0.32;                 
        
            //Weather outside...
            this.iconWeather.size(0, 0, height * 0.4, height * 0.4);
            this.iconWeather.paintImage(ctx, this.m_weatherData.getCurrent().weatherSymbol);
    
            //Wind
            this.iconWind.size(this.iconWeather.getRight(), this.iconWeather.y + (this.iconWeather.h / 2), 60, 60);
            this.iconWind.paint(ctx);

            //Hum
            //this.iconHum.paint(this.ctx);

            //Face icons
       //     this.iconStopWatch.size((this.width / 2) + arcRadius + 20, arcCenterY - 30, 60, 60);
        //    this.iconStopWatch.paint(this.ctx);       
            
            this.iconVoiceMessage.size((width / 2) - arcRadius - 80 , arcCenterY - 30, 60, 60);                             
            this.iconVoiceMessage.paint(ctx);
           
            
            //Wind outside
            this.windText.fontSize = 40;
            this.windText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.windText.fontColor = textColor;
            this.windText.textAlign = "right";
            this.windText.textBaseline = "middle";    
            this.windText.size(this.iconWind.getRight() + 1, this.iconWind.y, 100, 65);                    
            this.windText.paintText(ctx, this.m_weatherData.getCurrent().windSpeed.toPrecision(2) + "");                
            
            //Time          
            this.timeText.fontSize = 80;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";   
            this.timeText.size(canvas.width - 250, 20, 250, 65);        
            this.timeText.paintText(ctx, this.m_siteData.timeString);        
                    
            //Date
            this.dateText.fontSize = 40;
            this.dateText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.dateText.fontColor = textColor;
            this.dateText.textAlign = "right";
            this.dateText.textBaseline = "middle";    
            this.dateText.size(canvas.width - 350, 90, 350, 65);         
            this.dateText.paintText(ctx, this.m_siteData.dateString);                
            
            //Inside temperature
            this.tmpInText.fontSize = 160;
            this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInText.fontColor = textColor;
            this.tmpInText.textAlign = "right";
            this.tmpInText.textBaseline = "middle";     
            this.tmpInText.size((canvas.width / 2) - 60, (canvas.height / 2) - 10, 200, 120);
            
            this.tmpInGradeText.fontSize = 60;
            this.tmpInGradeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInGradeText.fontColor = textColor;
            this.tmpInGradeText.textAlign = "left";
            this.tmpInGradeText.textBaseline = "middle";     
            this.tmpInGradeText.size(this.tmpInText.getRight() - 40, this.tmpInText.getBottom() - 80, 80, 80);   
            this.tmpInGradeText.paintText(ctx, "C");         

            
            //Temperature from sensor 1...            
            this.tmpInText.paintText(ctx, this.m_weatherData.getCurrent().tempIn.toPrecision(2) + "\u00B0");
            
            //Outside temperature    
            this.tmpOutText.fontSize = 80;       
            this.tmpOutText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpOutText.fontColor = textColor;
            this.tmpOutText.textAlign = "right";
            this.tmpOutText.textBaseline = "middle";            
            this.tmpOutText.size(this.iconWeather.getRight(), 20, 250, 65);
            this.tmpOutText.paintText(ctx, this.m_weatherData.getCurrent().tempOut.toPrecision(2) + " \u00B0C");    
                
            //Humidity
      
            //Draw arc...
            var r = Math.min(canvas.width, canvas.height) * 7 / 16;       
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(arcCenterX, arcCenterY, arcRadius, 0, 2 * Math.PI, true); 
            ctx.lineWidth = 2;
            ctx.strokeStyle = circleColor;
            ctx.stroke();
            ctx.restore(); 
            
            if (this.appWatch) {        
                     this.stopWatch.paint(canvas);    
            }   
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();           
            ctx.closePath();
            ctx.restore();    
            
            var arcCenterX = canvas.width / 2;
            var arcCenterY = canvas.height / 2 + (canvas.height * 0.1);
            var arcRadius = canvas.height * 0.32;                
            
            this.ButtonDoor.size((canvas.width / 2) + arcRadius + 20 + 100, arcCenterY - 40, 80, 80);
            this.ButtonDoor.paint(ctx);    
            
            this.ButtonStopWatch.size((canvas.width / 2) + arcRadius + 20, arcCenterY - 40, 80, 80); 
            this.ButtonStopWatch.paint(ctx);                       
        }
    }
       
    class ScreenWeatherForecast extends Screen {
        
        public weatherData: WeatherDataForecast; //weather data source
                
        private forecastPanels: Array<WeatherForecastPanel> = new Array<WeatherForecastPanel>();  // Panels      
           
        constructor (siteData:  SiteData, m_graphics: Graphics, weatherData: WeatherDataForecast) {
            super(siteData, m_graphics);    
            
            this.weatherData = weatherData; 
         
            this.forecastPanels.push(new WeatherForecastPanel (this.weatherData, 0));
            this.forecastPanels.push(new WeatherForecastPanel (this.weatherData, 1));
            this.forecastPanels.push(new WeatherForecastPanel (this.weatherData, 2));
            this.forecastPanels.push(new WeatherForecastPanel (this.weatherData, 3));       
            
        }        
        
        public MouseUpHandler(event) {                                   
            this.returnVal.nextScreen = SwitchScreen.Main;
            
            return this.returnVal;
        }        
        
        public paint (canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            let segment: number = width / 4;
            let seg: number = segment - (2 * this.forecastPanels[1].lineWidth);
                
            this.forecastPanels[0].setSize(0, 0, seg, height);
            this.forecastPanels[1].setSize(segment, 0, seg, height);
            this.forecastPanels[2].setSize((2 * segment), 0, seg, height);
            this.forecastPanels[3].setSize((3 * segment), 0, seg, height);
            
            this.forecastPanels[0].paint(ctx);
            this.forecastPanels[1].paint(ctx);
            this.forecastPanels[2].paint(ctx);
            this.forecastPanels[3].paint(ctx);        
        }      
        
    }
     
    class StopWatch {
        
        public stopwatchRect:        Rect = new Rect();
        
        private timer;
        
        private sec:    number = 0;
        private min:    number = 0;
        private hrs:    number = 0;
        
        private dotCounter: number = 0;
        private angle: number = 0;

        public arcRadius:           number = 120;    
        
        constructor () {
            this.sec.toExponential(2);
            this.min.toFixed(2);
            this.hrs.toFixed(2)
        }     
        
        public zeroPad(num: number, places: number) {
          var zero = places - num.toString().length + 1;
          return Array(+(zero > 0 && zero)).join("0") + num;
        }    
        
        public paint(canvas: HTMLCanvasElement) {
                        
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            if (this.getStatus()) { 
                this.paintEffect (ctx, width / 2, (height / 2) + 50);           
            }                                   
                                    
            ctx.save();
            ctx.beginPath();
            this.stopwatchRect.size((width / 2) - (300 / 2) + 0, (height / 2) - (150 / 2) + 70, 300, 120);
            this.roundRect(ctx, this.stopwatchRect.x,this.stopwatchRect.y,this.stopwatchRect.w,this.stopwatchRect.h, 40); 
        
            ctx.fillStyle = "white";
            ctx.fill();   
            ctx.lineWidth = 1;
            
            if (this.getStatus()) { 
                ctx.strokeStyle = "green";           
            } else {
                ctx.strokeStyle = "grey";            
            }        
            
            ctx.stroke();
    
            ctx.font = 32 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
           
            
            if (this.getStatus()) {
                ctx.fillStyle = "green";            
                ctx.fillText("running", this.stopwatchRect.x + 55, this.stopwatchRect.y + 30);                     
            } else {           
                ctx.fillStyle = "grey";            
                ctx.fillText("stopped", this.stopwatchRect.x + 55, this.stopwatchRect.y + 30);                    
            }
        
            let dots: string = "..........................."; 
            let str: string = dots.substring(0, this.dotCounter);        
            
            ctx.fillText(str, this.stopwatchRect.x + 55, this.stopwatchRect.y + 43);
            
            let text: string = this.zeroPad(this.hrs, 2) + ":" + this.zeroPad(this.min, 2) + ":" + this.zeroPad(this.sec, 2);                                        
        
            ctx.font = 42 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.fillText(text, this.stopwatchRect.x + 50, this.stopwatchRect.y + 80);
            
            if (imgFingerprintLoaded) { 
                ctx.save();
                ctx.drawImage(imgFingerprint, this.stopwatchRect.x + this.stopwatchRect.w - 60, this.stopwatchRect.y + 10, 50, 50);
                ctx.restore();        
             }         
                       
        }    
        
        private paintEffect (ctxi: CanvasRenderingContext2D, arcCenterX: number, arcCenterY: number) {
            
            const ctx = ctxi;
           
            ctx.save();
            ctx.translate(arcCenterX, arcCenterY);                        
            
            this.angle = this.angle + (Math.PI / 180);            
            ctx.rotate(this.angle);                           
                                      
            ctx.beginPath();
            ctx.arc(0 , 0, this.arcRadius, 0, 2 * Math.PI, false);
            ctx.moveTo(0, - this.arcRadius);
            ctx.lineTo(0, this.arcRadius);   
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 2;
            ctx.stroke();  
            
            ctx.translate(-arcCenterX, -arcCenterY);
            ctx.restore();
                        
        }
        
        private roundRect(ctxi: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
          
          const ctx = ctxi;
              
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();          
        }  
         
        public stop () {        
            clearTimeout(this.timer);              
            
            this.timer = 0;
            
            this.dotCounter = 0;
        }
                    
        public start () {
            
            this.angle = 0;
            
            this.sec = 0;
            this.min = 0;
            this.hrs = 0;
            
            this.stop();            
            this.add();
                        
        }
            
        private add () {
                    
            this.sec ++;
            
            if (this.sec >= 60) {
                this.sec = 0;
                this.min ++;
                
                if (this.min >= 60) {
                    this.min = 0;
                    this.hrs ++;                
                    }                        
                }     
            
            this.dotCounter++ ;
            
            if (this.dotCounter > 17) this.dotCounter = 1;
            
            this.timer = setTimeout(() => this.add(), 1000);
        }
        
        public getStatus() {
            if (this.timer != 0) return true;
            else return false;
        }
        
 
    }
    
    class WeatherForecastPanel {
          
        public x:                   number = 0.0;
        public y:                   number = 0.0;
        public width:               number = 0.0;
        public height:              number = 0.0;    
        public lineWidth:           number = 2.0;
        public weatherData:         WeatherDataForecast = null; //weather data source        
        private numForecast:        number = 0;    
        public txtValid:            TextSimple = new TextSimple ();   
        private txt:                TextSimple = new TextSimple ();   
        private txtWind:            TextSimple = new TextSimple ();        
        imgWind:                    HTMLImageElement = null;
        
        private iconWeather:        ImageRectArray = new ImageRectArray();
        private iconWind:           ImageRect = new ImageRect ();
        
        constructor (weatherData:  WeatherDataForecast, numForecast: number ) {         
                        
           // this.txtValid = new TextSimple (10, 10, 60, 10);   
            this.txtValid.size(10, 10, 60, 10);     
            this.txtValid.textAlign = "left";
            this.txtValid.textBaseline = "top";
            this.txtValid.fontSize = 20;
    
         //   this.txtWind = new TextSimple (0, 0, 0, 0);
           // this.txt = new TextSimple (0, 0, 0, 0);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
         //   this.iconWind = new ImageRect ('/infores/servlets/kitchen/wind.png');
            
            this.weatherData = weatherData;
            this.numForecast = numForecast;
            
           // this.iconWeather = new ImageRectArray (0, 0, 10, 10, 0);     
            this.iconWeather.setImages(imagePaths);  
            this.iconWind.setImage('/infores/servlets/kitchen/wind.png');      
        }      
        
        setSize (x: number, y: number, width: number, height: number) {        
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;     
            
            this.txt.x = x;
            this.txt.y = y;
            this.txt.w = width;
            this.txt.h = height;    
        }
    
        public paint (ctx: CanvasRenderingContext2D) {
    
            //Draw rectangle...               
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = 'black';
            ctx.stroke();         
            ctx.restore(); 
                    
            var weatherForecast:    WeatherForecast = this.weatherData.getForecast(this.numForecast);
            
            if (!weatherForecast.valid){
                this.txtValid.size(this.x + 5, this.y + 1, 20, 10);
                this.txtValid.paintText(ctx, "Not valid...");
            } else {
                                 
                    //Draw forecast image
                    if (this.iconWeather != null) {
                        this.iconWeather.size(this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth));
                        this.iconWeather.paintImage(ctx, weatherForecast.weatherSymbol);
                    }
                    
                    //Draw temperature...
                    this.txt.x = this.x + (this.width - 110);
                    this.txt.y = this.height * 0.8;
                    this.txt.w = 100;
                    this.txt.h = 30;
                    this.txt.textAlign = "right";
                    this.txt.paintText(ctx, weatherForecast.tempOut + " \u00B0C");
                            
                    //wind image
                    this.iconWind.size(this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
                    this.iconWind.paint(ctx);
           
                    //wind text
                    this.txtWind.x = this.x + (this.width - 70);
                    this.txtWind.y = this.width * 1.6 - 10;
                    this.txtWind.w = 60;
                    this.txtWind.h = 30;
                    this.txtWind.textAlign = "right";
                    this.txtWind.fontSize = 15;
                    this.txtWind.textBaseline = "middle";
                    this.txtWind.paintText(ctx, weatherForecast.windSpeed + " \u00B0C");
                }        
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
    
    class ScreenDoor extends Screen {

        public m_switchMarks               :Array<SwitchLockMark>       = new Array<SwitchLockMark>();       // Switch marks
        public m_contactSensorsMarks       :Array<ContactSensorMark>    = new Array<ContactSensorMark>();    // Switch marks        
        protected m_rectData               :RectRounded                 = new RectRounded();
        public    m_textDoorName           :TextSimple                  = new TextSimple();         
        protected m_imgDoorsOpen           :ImageRect                   = new ImageRect();
        protected m_imgDoorsClose          :ImageRect                   = new ImageRect();
        protected m_imgLogo                :ImageRect                   = new ImageRect();
        protected btnSettings              :ImageButton                 = new ImageButton(symbol_settings, symbol_settings);
        protected btnWeb                   :ImageButton                 = new ImageButton(symbol_web, symbol_web);
        protected btnCallBack              :ImageButton                 = new ImageButton(symbol_callBack, symbol_callBack);
        
        protected serviceInfo              :boolean                     = false;
                    
        protected serviceRect              :RectRounded                 = new RectRounded();   
        
        constructor (m_siteData:  SiteData, m_graphics: Graphics) {            
            super(m_siteData, m_graphics);      
            
            //this.m_imgLogo.setImage(logo_htdvere);            
        }
      
        public paint(canvas: HTMLCanvasElement) {
                                    
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
  
            var state: boolean = false;
            
            var door: Door = <Door> this.getThing();
            
            if (this.m_contactSensorsMarks.length > 0) {
                state = this.m_contactSensorsMarks[0].getState();                                   
                
                if (state) {
                    this.m_imgDoorsOpen.setImage(door.image_open);
                    this.m_imgDoorsOpen.size(0, 0, width, height);
                    this.m_imgDoorsOpen.paint(ctx);
                    
                } else {
                    this.m_imgDoorsClose.setImage(door.image_close);
                    this.m_imgDoorsClose.size(0, 0, width, height);
                    this.m_imgDoorsClose.paint(ctx);                    

                }
                
            } else {
                    this.m_imgDoorsClose.setImage(door.image_close);
                    this.m_imgDoorsClose.size(0, 0, width, height);
                    this.m_imgDoorsClose.paint(ctx);     
            }

            //m_switchArray
            for (var i = 0; i < this.m_switchMarks.length; i ++) {
                this.m_switchMarks[i].size(5 + (30 * i), 30, 60, 60);
                this.m_switchMarks[i].paint(ctx);
            }   
            
            //Contact sensors
            for (var i = 0; i < this.m_contactSensorsMarks.length; i ++) {
                this.m_contactSensorsMarks[i].size(5 + (30 * i), 100, 60, 60);
                this.m_contactSensorsMarks[i].paint(ctx);
            }            
            
            //Doors name
            ctx.save();            
            this.m_rectData.radius = 20;
            var dx = width - 50;
            var dy = 120;
            this.m_rectData.size((width - dx) / 2, height - dy - 5, dx, dy);
            this.m_rectData.paint(ctx);
            ctx.fillStyle = "white";
            ctx.lineWidth=2;
            ctx.strokeStyle="gray";            
            ctx.fill();
            ctx.stroke();
            ctx.restore();            
            
            this.m_textDoorName.fontSize = 15;
            this.m_textDoorName.textAlign = 'left';
            this.m_textDoorName.textBaseline = 'bottom';
            this.m_textDoorName.size(this.m_rectData.x + 10, this.m_rectData.y + 10, dx, 26);
            this.m_textDoorName.paintText(ctx, "Door name: " + door.name);    
            
            this.m_textDoorName.move(0, 20);
            this.m_textDoorName.paintText(ctx, "Door site path: " + door.getSitePath());
            
            //Settings
            this.btnSettings.size(width - 90, 30, 80, 80);
            this.btnSettings.paint(ctx);
            
            if (this.serviceInfo) {
                this.paintSettings(ctx, 100, 80, width - 200, 250, door);
            }
            
        }
        
        public paintSettings(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, door: Door) {
            
            ctx.save();  
             
            this.serviceRect.size(x, y, w, h);
            this.serviceRect.radius = 20;
            this.serviceRect.paint(ctx);
            ctx.fillStyle = "white";
            ctx.lineWidth=2;
            ctx.strokeStyle="gray";            
            ctx.fill();
            ctx.stroke();
            
            //Logo
            if (door.supplier.valid) {
                /*
                this.m_imgLogo.setImage(door.supplier.logo);
                this.m_imgLogo.size(x + 30, y + 20, 170, 60);
                this.m_imgLogo.paint(ctx);
                */
            }
            
            //Buttons
            //this.btnWeb.size(x + 30 , y + 20 + 60 + 50, 70, 70);
          //  this.btnWeb.paint(ctx);
            
         //   this.btnCallBack.size(x + 30 + 170 + 30 , y + 20, 60, 60);
           // this.btnCallBack.paint(ctx);   
            
            //History data
            var textDesc:TextSimple = new TextSimple();
            textDesc.bold = true;
            textDesc.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
            textDesc.fontSize = 14;
            textDesc.textAlign = 'left';
            textDesc.textBaseline = 'bottom';
            var lineGap: number = 20;
            textDesc.size(x + 30, 160, 80, 40);            
            textDesc.paintText(ctx, "Message for you:");
            textDesc.move(170, 0);    
            textDesc.bold = false;      
            textDesc.paintText(ctx, "Click on button anything you need our help :)");
            textDesc.move(-170, lineGap);    
            textDesc.bold = true;                                                    
            textDesc.paintText(ctx, "Date of install:");
            textDesc.move(170, 0);
            textDesc.bold = false; 
            textDesc.paintText(ctx, "14-October-2015");      

            textDesc.bold = true;
            textDesc.fontColor = "red";
            textDesc.size(x + 30, y + h - 70, 80, 40);
            textDesc.paintText(ctx, "Warning:");
            textDesc.move(120, 0);
            textDesc.paintText(ctx, "30 days after service interval!!!"); 
            
            if (door.supplier.valid){
                /*
                textDesc.bold = true;
                textDesc.fontColor = "black";
                textDesc.size(x + 250, y + 10, 80, 40);
                textDesc.paintText(ctx, "Address:");
                textDesc.bold = false;
                textDesc.move(90, 0);
                textDesc.paintText(ctx, "" + door.supplier.address); 
                textDesc.move(-90, 20);
                textDesc.bold = true;
                textDesc.paintText(ctx, "Phone:");  
                textDesc.move(90, 0);
                textDesc.bold = false;
                textDesc.paintText(ctx, "" + door.supplier.phone);       
                textDesc.move(-90, 20);
                textDesc.bold = true;
                textDesc.paintText(ctx, "www:");  
                textDesc.move(90, 0);
                textDesc.bold = false;
                textDesc.paintText(ctx, "" + door.supplier.www);    
                */
            }        
            
            ctx.restore();             
            
        }
        
        public setThing(thing: Thing){
            
            this.serviceInfo = false;
            
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            var door1: Door = <Door> this.getThing(); 
            //window.alert("A: " + door1.image_close);
            
            //update other data
            if (thing != oldThing) {
                if (thing instanceof Door) {                  
                    
                    //Switch
                    var m_switchArray: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getSitePath());                  
                    
                    this.m_graphics.setNumber2(m_switchArray.length, this.m_switchMarks, SwitchLockMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing>m_switchArray[id]);                        
                    }   
                    
                    //Contact Sensor
                    var m_contactSensorArray: Array<ContactSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_contactSensorArray, thing.getSitePath());                    
                    
                    this.m_graphics.setNumber2(m_contactSensorArray.length, this.m_contactSensorsMarks, ContactSensorMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_contactSensorsMarks) {
                        this.m_contactSensorsMarks[id].setThing(<Thing>m_contactSensorArray[id]);                        
                    }                       
                }                
            }            
        } 
        
        MouseDownHandler(mx: number, my: number) { 
            
            if (this.btnSettings.PushEvent(mx, my)){
                
            }
        }        
        
        public MouseUpHandler(mx: number, my: number) {      
        
            if (this.btnSettings.UpEvent(mx, my)){                               
                if (this.serviceInfo) this.serviceInfo = false;
                else this.serviceInfo = true;
                
                // Get data about supplier
                //var door: Door = <Door> this.getThing();                
               // door.supplier.getServerData();
                
              //  window.alert("****" + this.serviceInfo);
                                            
                return null;                 
            }
            
            if (this.serviceInfo) {
                if (this.serviceRect.isClicked(mx, my)){
                    this.serviceInfo = false;
                    return null;
                }
            }
            
            
            this.returnVal.nextScreen = this.prevPage;
            
               for (let id in this.m_switchMarks) {
                   if (this.m_switchMarks[id].isClicked(mx, my)) {
                      
                    var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
                    
            //        switchSensor.postServerClick();                  
             //       switchSensor.getServerData();
             //       switchSensor.getServerDataDelayed(100);                  
                    
                    this.returnVal.nextScreen = null;                         
                       
                  }               
               }             

               for (let id in this.m_contactSensorsMarks) {
                   if (this.m_contactSensorsMarks[id].isClicked(mx, my)) {
                    
                    this.returnVal.nextScreen = null;                                                
                  }               
               }  
                          
            return this.returnVal;
        }           
    }
    
    class ScreenDoorList extends Screen {
        
        protected m_arrayViewDoor:          Array<ViewDoor>     = new Array<ViewDoor>(); 
        protected m_iconBkgImage:           ImageRect          = new ImageRect();  ;        
        protected btnLock:                  ImageButton         = new ImageButton(imagePadlockOff, imagePadlockOffPushed);
        protected btnUnLock:                ImageButton         = new ImageButton(imagePadlockOpen, imagePadlockOpenPushed);        
        
        //protected clickedImage: ImageRect = null;
        
        constructor (m_siteData:  SiteData, m_graphics: Graphics) {            
            super(m_siteData, m_graphics);
            this.m_iconBkgImage.setImage(imageBkg1);            
            this.setup();                                  

        }
        
        protected setup() {
            //Setup view array ...
            for (var i = 0; i < this.m_siteData.m_doorArray.length; i++) {
                if(this.m_arrayViewDoor.length < i + 1) {
                    this.m_arrayViewDoor.push(new ViewDoor(this.m_siteData, this.m_graphics));
                }
                
                //Align data...
                this.m_arrayViewDoor[i].setThing(this.m_siteData.m_doorArray[i]);                
            }
            
            //Cut over-remaining View parts
            if (this.m_arrayViewDoor.length > this.m_siteData.m_doorArray.length){
                this.m_arrayViewDoor.length = this.m_siteData.m_doorArray.length;                
            }
                  
        }
        
        public paint(canvas: HTMLCanvasElement) {
            
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;  
            
            ctx.clearRect(0, 0, width, height);
            
            this.setup();
            
            this.setGrid(width, height, 3, 2);
            
            // Repaint background
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
            
            this.m_iconBkgImage.size(0, 0, width, height);
            this.m_iconBkgImage.paint(ctx);   
            
            for (let id in this.m_arrayViewDoor) {
                this.m_arrayViewDoor[id].paint(ctx);                
            }            
            
            this.btnLock.size((width) * 0.48, height - 120, 60, 60);
            this.btnLock.paint(ctx);
            
            this.btnUnLock.size((width) * 0.56, height - 75, 60, 60);
            this.btnUnLock.paint(ctx);            
            
            if (this.wait) {
                super.paintWait(canvas);
            }           
            
            if (this.wait) {
                super.paintWait(canvas);
            }
        }   
        
        MouseDownHandler(mx: number, my: number) { 
            
            if (this.btnLock.PushEvent(mx, my)){
            
            } else if (this.btnUnLock.PushEvent(mx, my)){
            
            }                        
        }
        
        MouseMoveHandler(mx: number, my: number) { 
             
        }        
                        
        MouseUpHandler(mx: number, my: number) {  
        
            if (this.btnLock.UpEvent(mx, my)){                
     //           this.m_siteData.postServerCommand('AllDoorSwitchesOn');  
         //       this.m_siteData.getFastData_DoorArray();                                                
                return null; 
                
            }else if (this.btnUnLock.UpEvent(mx, my)){                
         //       this.m_siteData.postServerCommand('AllDoorSwitchesOff');  
          //      this.m_siteData.getFastData_DoorArray();                    
                return null;
            }            
            
            this.returnVal.nextScreen = SwitchScreen.Main;
            
            var viewDoorClicked: ViewDoor = null;       
                        
            for (let i in this.m_arrayViewDoor) {                  
                if(this.m_arrayViewDoor[i].isClicked(mx, my)){
                    viewDoorClicked = this.m_arrayViewDoor[i];
                    break;
                }                                   
            }            
            
            if (viewDoorClicked != null) {
                this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                this.returnVal.nextThingPath = viewDoorClicked.getThing().getSitePath();
            }                                
            
            return this.returnVal;
        }       
        
        protected setGrid (width: number, height: number, numHorizontal: number, numVertical: number) {                        
            
            // Set number views...
            var maxItems = numHorizontal * numVertical;
                        
            var spaceHor: number = 25.0;
            var spaceVer: number = 25.0;
            var belowStrip: number = 100;                        
            
            var widthView: number =  (width - ((numHorizontal + 1) * spaceHor)) / numHorizontal;
            var heightView: number =  ((height - belowStrip) - ((numVertical + 1) * spaceVer)) / numVertical;
                                    
            var nItem: number = 0;
            for (var j = 1; j <= numVertical; j ++) {
                for (var i = 1; i <= numHorizontal; i ++) {                                        
                    if (nItem < this.m_arrayViewDoor.length) {
                        var x: number = ((i - 1) * widthView) + ( i * spaceHor);
                        var y: number = ((j - 1) * heightView) + ( j * spaceVer); 
                        
                        this.m_arrayViewDoor[nItem].size(x, y, widthView, heightView);
                    }                    
                    nItem ++;
                }                
            }                                    
        }        
    }
    
    class ViewDoor extends Mark {

        public m_doorMark2         :DoorMark            = null;       // Mark of m_doorArray
        public textDoorName        :TextSimple          = new TextSimple();                  //Name of m_doorArray
        public m_siteData          :SiteData            = null;
        public m_graphics          :Graphics            = null;
        protected rectName         :RectRounded         = new RectRounded ();
        public m_imgDoorOpen       :ImageRect           = new ImageRect();                                       
        private border             :boolean             = false;
                
        constructor (m_siteData:  SiteData, m_graphics: Graphics) {
            super();     

            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;

        }
        
        public setThing(m_door: Door){
            var m_doorOld: Door = <Door> this.thing;
            
            if (m_doorOld != m_door) {
                this.thing = <Thing> m_door;
 
                //Reload pictures etc...?
                var door: Door = <Door> this.thing;       
                         
                this.m_imgDoorOpen.setImage(door.image_close);        
                
                this.m_doorMark2 = new DoorMark();
                this.m_doorMark2.setThing(this.thing);             
            }        
        }        
        
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);    
            
            if (this.m_imgDoorOpen != null) {                
                this.m_imgDoorOpen.size(x, y, w, h);
                this.m_imgDoorOpen.radius = 10;
            }
            
            if (this.m_doorMark2 != null) {
                this.m_doorMark2.size(x + 5, y + 20, 60, 60);
            }   
                     
        }
        
        public paint (ctx: CanvasRenderingContext2D) {   
        
        //    const ctx = canvas.getContext('2d');
         //   var width: number = canvas.width;
         //   var height: number = canvas.height;              
            
            var door: Door = <Door> this.getThing();
 
            if (this.m_imgDoorOpen != null) {      
            
                this.m_imgDoorOpen.setImage(door.image_close);                
                this.m_imgDoorOpen.paint(ctx);
            }
            
            if(this.m_doorMark2 != null) {
                //this.m_doorMark2.size(this.rect.x + 30, this.rect.y + 20, 80, 80);
                this.m_doorMark2.paint(ctx);
            }              
            
            //Doors name
            ctx.save();            
            this.rectName.radius = 10;
            var dx = 120;
            var dy = 30;
            this.rectName.size(this.x + 5, this.y + this.h - dy - 5, dx, dy);
            this.rectName.paint(ctx);
            ctx.fillStyle = "white";
            ctx.lineWidth=2;
            ctx.strokeStyle="gray";            
            ctx.fill();
            ctx.stroke();
            ctx.restore();            
            
            this.textDoorName.fontSize = 15;
            this.textDoorName.textAlign = 'center';
            this.textDoorName.textBaseline = 'bottom';
            this.textDoorName.size(this.rectName.x + 5, this.rectName.y - 5, dx, dy);
            this.textDoorName.paintText(ctx, door.name);
            
            if (this.border) {                
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle="blue";
                ctx.rect(this.x, this.y, this.w, this.h);
                ctx.stroke();
                ctx.restore();            
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



