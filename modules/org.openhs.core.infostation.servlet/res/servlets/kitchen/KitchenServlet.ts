// Copyright 2016 
//
//
// Home page: ***

/// <reference path="jquery.d.ts" />
/// <reference path='OhsCanvasGraphics.ts'/>
/// <reference path='OhsWeatherData.ts'/>
/// <reference path='OhsSiteData.ts'/>

module KitchenInfoStation {        

    import Rect =       OhsCanvasGraphics.Rect;
    import RectRounded =       OhsCanvasGraphics.RectRounded;
    import ImageRect =       OhsCanvasGraphics.ImageRect;
    import Text =       OhsCanvasGraphics.Text;
    //import TempMark =   OhsCanvasGraphics.TempMark;
    import TempMark2 =   OhsCanvasGraphics.TempMark2;
    //import SwitchMark = OhsCanvasGraphics.SwitchMark;
    import SwitchMark2 = OhsCanvasGraphics.SwitchMark2;
    //import DoorMark =   OhsCanvasGraphics.DoorMark;
    import DoorMark2 =   OhsCanvasGraphics.DoorMark2;
    import Icon =       OhsCanvasGraphics.Icon;
    import Iconset =    OhsCanvasGraphics.Iconset;
    import Graphics =   OhsCanvasGraphics.Graphics;
    import Mark =   OhsCanvasGraphics.Mark;
    import Mark2 =   OhsCanvasGraphics.Mark2;
        
    import WeatherDataForecast = OhsWeatherData.WeatherDataForecast;
    import WeatherForecast =     OhsWeatherData.WeatherForecast;    
        
    import SiteData =           OhsSiteData.SiteData;
    import Floor =              OhsSiteData.Floor;
    import Room =               OhsSiteData.Room;
    import TemperatureSensor =  OhsSiteData.TemperatureSensor;    
    import Door =               OhsSiteData.Door;
    import Switch =             OhsSiteData.Switch;
    import Thing =              OhsSiteData.Thing;                   

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
    let fontSizeTempIn:     number = 54;
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
        
        private canvas:              HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        private url: string = "kitchen";
        
        // Data
        public m_weatherData: WeatherDataForecast = new WeatherDataForecast(); // General weather
        public m_siteData:    SiteData = null; //general Site Data      
        
        // Timers
        private timerData;
        private timerPaint;
        private timerLoadGraphics;
        
        // Screens
        private m_screenMain: ScreenMain = null;
        public m_forecastScreen: ScreenWeatherForecast = null; //forecast screen            
        private m_room: ScreenRoom = null;
        private m_floor: ScreenFloor =  null;
        private m_screenDoorList: ScreenDoorList = null;
        private m_screenDoor: ScreenDoor = null;
               
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
            this.m_graphics = new Graphics(this.canvas, this.m_siteData);                  
            
            //---Screens---
            this.m_screenMain = new ScreenMain(this.canvas, this.m_siteData, this.m_weatherData);
            this.m_floor = new ScreenFloor(this.canvas, this.m_siteData, this.m_graphics);
            this.m_room = new ScreenRoom(this.canvas, this.m_siteData, this.m_graphics);      
            this.m_forecastScreen = new ScreenWeatherForecast (this.canvas, this.m_weatherData);   
            this.m_screenDoorList = new ScreenDoorList (this.canvas, this.m_siteData, this.m_graphics);
            this.m_screenDoor = new ScreenDoor (this.canvas, this.m_siteData, this.m_graphics);                                  
            
            //---Mouse Handler---
            var self = this;                    
            this.canvas.addEventListener('click',function(event){self.MouseClickHandler(event);}, false);                           
            
            //---Timer Setup---
        //    this.timerGetServerDataEvent(this.refreshRateMain);  
                          
            //---Set current displayed page---
            this.openPage(this.m_screenMain, this.refreshRateMain);
        }
        
        private MouseClickHandler(event) {
            
            var mousePos = getMousePos(this.canvas, event);                           
            
            /*
            * handling in current page...
            */
            var retVal = this.currPage.MouseClickHandler(event);
            
            var refresh = this.refreshRateMain;
            var screen = null;
            
            //window.alert(">>>" + retVal.nextScreen + "\n\n>>>" + retVal.nextThingPath);
                    
            if (retVal.nextScreen == SwitchScreen.Floor) {               
                refresh = 50;
                screen = this.m_floor;
                this.m_floor.setThing(<Thing>this.m_siteData.floors[1]);
                
                 // window.alert("path:   " + this.m_siteData.floors[0].getPath());
                
            } else if (retVal.nextScreen == SwitchScreen.Main) {
                screen = this.m_screenMain;
                                
            } else if (retVal.nextScreen == SwitchScreen.WeatherForecast) {
                screen = this.m_forecastScreen;     
                       
            } else if (retVal.nextScreen == SwitchScreen.Room) {
                refresh = 50;
                screen = this.m_room;                
                this.m_room.setThing(this.m_siteData.getThing(retVal.nextThingPath));
                
            } else if (retVal.nextScreen == SwitchScreen.DoorList) {
             //   refresh = 100;
                screen = this.m_screenDoorList;     
                           
            } else if (retVal.nextScreen == SwitchScreen.DoorScreen) {
             //   refresh = 100;
                screen = this.m_screenDoor;  
                this.m_screenDoor.setThing(this.m_siteData.getThing(retVal.nextThingPath));                            
            }
            
            // Switch screen
            this.openPage(screen, refresh);
        }
        
        private openPage(next: Screen, refreshRate: number) {                                 
            if (next != null) {
                if (this.currPage != null) {                                
                    this.currPage.close();                                                     
                }                
                
                this.currPage = next.open(refreshRate);
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
        
        public canvas:              HTMLCanvasElement;
        public ctx:                 CanvasRenderingContext2D;  
        public width:               number;
        public height:              number;      
        
        private thing: Thing = null;
        
        protected timerPaint;       
        
        protected returnVal = {
                nextScreen: null,
                nextThingPath: null                                 
            };          
        
        constructor (canvas: HTMLCanvasElement) {
                        
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;   
        }
        
        public MouseClickHandler(event) {
            return null;
        }
        
        protected paint () {
           this.ctx.save();
           this.ctx.fillStyle = whiteColor;
           this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
           this.ctx.restore();   
        }
    
        protected timerPaintEvent(step : number) {     
           this.paint();  
           window.clearTimeout(this.timerPaint);
           this.timerPaint = window.setTimeout(() => this.timerPaintEvent(step), step); 
        }  

        public open (refresh: number) {
            this.timerPaintEvent(refresh);
            
            return this;
        }     
        
        public close () {
            window.clearTimeout(this.timerPaint);
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
            return this.thing.getPath();
        }          
    }
    
    export class ScreenMain extends Screen {                  
        
        //Data
        private m_siteData: SiteData = null;
        private m_weatherData: WeatherDataForecast = null;
        
        //Graphics
        public stopWatch:           StopWatch = null;  
        private iconStopWatch:      Icon;
        private iconVoiceMessage:   Icon;
        private iconDoor:           Icon;
        private iconWind:           Icon;
        private iconHum:            Icon;
        private iconWeather:        Iconset;
        public tmpInText:           Text;
        public tmpOutText:          Text;
        public timeText:            Text;
        public dateText:            Text;
        public windText:            Text;     

        private appWatch: boolean = false;
        
        constructor (canvas: HTMLCanvasElement, m_siteData: SiteData, m_weatherData: WeatherDataForecast) {  
        
            super (canvas);
            
            //---Data---
            this.m_siteData = m_siteData; 
            this.m_weatherData = m_weatherData; 
            
            //---Graphics---
            this.iconStopWatch = new Icon (this.ctx, new Rect ((this.width / 2) + 180, (this.height / 2) + 20, 60, 60), '/infores/servlets/kitchen/stopwatch.png');
            this.iconVoiceMessage = new Icon (this.ctx, new Rect ((this.width / 2) - 220 , (this.height / 2) + 20, 60, 60), '/infores/servlets/kitchen/voicemessage.png');
            this.iconDoor = new Icon (this.ctx, new Rect ((this.width / 2) + 150, (this.height / 2) + 120, 60, 60), '/infores/servlets/kitchen/door_icon.png');
            this.iconWeather = new Iconset (this.ctx, new Rect (0, 0, 150, 150));
            this.iconWeather.setImages(imagePaths);
            this.iconWind = new Icon (this.ctx, new Rect ( 140, 70, 50, 50), '/infores/servlets/kitchen/wind.png');
            this.iconHum = new Icon (this.ctx, new Rect ((this.width / 2) + 10 , (this.height / 2) + 70, 60, 60), '/infores/servlets/kitchen/drop.png');    
            
            this.tmpInText = new Text (this.ctx, new Rect ((this.width / 2) - 120, (this.height / 2) - 10, 220, 60));
            this.tmpOutText = new Text (this.ctx, new Rect ((this.width / 2), (this.height / 2) + 50, 150, 60));
            this.timeText = new Text (this.ctx, new Rect ((this.width) - 150, 5, 150, 60));
            this.dateText = new Text (this.ctx, new Rect ((this.width) / 2 + 70, 80, 230, 40));
            this.windText = new Text (this.ctx, new Rect (160, 80, 140, 40));           
            
            this.stopWatch = new StopWatch (canvas);
            this.stopWatch.arcCenterX = this.width / 2;
            this.stopWatch.arcCenterY = this.height / 2 + 50;
            this.stopWatch.arcRadius = 120;               
        }
        
        public MouseClickHandler(event) {                    
        
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null                                  
            };     
            
            var mousePos = getMousePos(this.canvas, event);
            
            if (this.appWatch) {
                if (this.stopWatch.getStatus()) {
                    if(this.stopWatch.stopwatchRect.isClicked(mousePos.x, mousePos.y)) {                                
                        this.stopWatch.stop();
                        this.paint();                                 
                     }   
                } else {
                    this.appWatch = false;
                    this.open(5000);                     
                }
                
            } else {                
                if (this.iconStopWatch.isClicked(mousePos.x, mousePos.y)){
                    //window.alert("clicked....");
                    this.stopWatch.start();
                    this.appWatch = true;
                    this.open(30);
                       
                } else if (this.iconDoor.isClicked(mousePos.x, mousePos.y)) {                
                    returnVal.nextScreen = SwitchScreen.DoorList;
                    return returnVal;
                
                } else if (this.tmpInText.isClicked(mousePos.x, mousePos.y)) {
                   // return SwitchScreen.Floor;  
                    //window.clearTimeout(this.timerPaint);
                    returnVal.nextScreen = SwitchScreen.Floor;
                    return returnVal;
                    
                } else if (this.iconWeather.isClicked(mousePos.x, mousePos.y)) {
                   // return SwitchScreen.WeatherForecast;  
                    returnVal.nextScreen = SwitchScreen.WeatherForecast;
                    return returnVal;                                      
                }
            }        
            
            return null;
        }
        
        protected paint () {
            
           // window.alert("sss");
                                   
            this.paintStaticImage();
            
            const ctx = this.ctx;
        
            //Weather outside...
            this.iconWeather.paint(this.m_weatherData.getCurrent().weatherSymbol - 1);
    
            //Wind
            this.iconWind.paint();

            //Hum
            this.iconHum.paint();

            //Face icons
            this.iconStopWatch.paint();                                    
            this.iconVoiceMessage.paint();
            this.iconDoor.paint();    
    
            //Wind outside
            this.windText.fontSize = fontSizeWind;
            this.windText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.windText.fontColor = textColor;
            this.windText.textAlign = "right";
            this.windText.textBaseline = "middle";                       
            this.windText.paint(this.m_weatherData.getCurrent().windSpeed + " m/s");                
            
            //Time          
            this.timeText.fontSize = fontSizeTime;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";           
            this.timeText.paint(this.m_siteData.timeString);        
                    
            //Date
            this.dateText.fontSize = fontSizeDate;
            this.dateText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.dateText.fontColor = textColor;
            this.dateText.textAlign = "right";
            this.dateText.textBaseline = "middle";           
            this.dateText.paint(this.m_siteData.dateString);                
            
            //Inside temperature
            this.tmpInText.rect.y =  220;
            this.tmpInText.fontSize = fontSizeTempIn;
            this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInText.fontColor = textColor;
            this.tmpInText.textAlign = "right";
            this.tmpInText.textBaseline = "middle";     
            
            //Temperature from sensor 1...            
            this.tmpInText.paint(this.m_weatherData.getCurrent().tempIn.toPrecision(2) + " \u00B0C");
            
            //Outside temperature    
            this.tmpOutText.equals(this.tmpInText);    
            this.tmpOutText.rect.x = 80;
            this.tmpOutText.rect.y =  5;     
            this.tmpOutText.textAlign = "right";   
            this.tmpOutText.paint(this.m_weatherData.getCurrent().tempOut.toPrecision(2) + " \u00B0C");    
                
            //Humidity
            ctx.save();
            ctx.font = fontSizeHum + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;          
            ctx.fillText("44", (this.width / 2) , (this.height / 2) + 105);
            ctx.restore();       
            
            //Draw arc...
            var r = Math.min(this.width, this.height) * 7 / 16;
            var arcCenterX = this.width / 2;
            var arcCenterY = this.height / 2 + 50;
            var arcRadius = 120;            
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(arcCenterX, arcCenterY, arcRadius, 0, 2 * Math.PI, false); 
            ctx.lineWidth = 1;
            ctx.strokeStyle = circleColor;
            ctx.stroke();
            ctx.restore(); 
            
            if (this.appWatch) {        
                     this.stopWatch.paint();    
            }                                      
        }
    
        private paintStaticImage() {
           const ctx = this.ctx;
            
           ctx.save();
           ctx.fillStyle = whiteColor;
           ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
           ctx.restore();   
        }          
    }
       
    class ScreenWeatherForecast extends Screen {
        
        public weatherData: WeatherDataForecast; //weather data source
                
        private forecastPanels: Array<WeatherForecastPanel> = new Array<WeatherForecastPanel>();  // Panels      
            
        constructor (canvas: HTMLCanvasElement, weatherData: WeatherDataForecast) {
            super(canvas);    
            
            this.weatherData = weatherData; 
         
            this.forecastPanels.push(new WeatherForecastPanel (this.ctx, this.weatherData, 0));
            this.forecastPanels.push(new WeatherForecastPanel (this.ctx, this.weatherData, 1));
            this.forecastPanels.push(new WeatherForecastPanel (this.ctx, this.weatherData, 2));
            this.forecastPanels.push(new WeatherForecastPanel (this.ctx, this.weatherData, 3));        
        }        
        
        public MouseClickHandler(event) {                                   
            this.returnVal.nextScreen = SwitchScreen.Main;
            
            return this.returnVal;
        }        
        
        public paint () {
            const ctx = this.ctx;
            
            let segment: number = this.width / 4;
            let seg: number = segment - (2 * this.forecastPanels[1].lineWidth);
            //var lineW = this.forecastPanels[1].lineWidth;
                
            this.forecastPanels[0].setSize(0, 0, seg, this.height);
            this.forecastPanels[1].setSize(segment, 0, seg, this.height);
            this.forecastPanels[2].setSize((2 * segment), 0, seg, this.height);
            this.forecastPanels[3].setSize((3 * segment), 0, seg, this.height);
            
            this.forecastPanels[0].paint(ctx);
            this.forecastPanels[1].paint(ctx);
            this.forecastPanels[2].paint(ctx);
            this.forecastPanels[3].paint(ctx);        
        }        
    }
     
    class StopWatch {
        
        private ctx:                 CanvasRenderingContext2D;
        private width:               number;
        private height:              number;    
        public stopwatchRect:        Rect = null;
        
        private timer;
        
        private sec:    number = 0;
        private min:    number = 0;
        private hrs:    number = 0;
        
        private dotCounter: number = 0;
        private angle: number = 0;
        
        public arcCenterX:          number;
        public arcCenterY:          number;
        public arcRadius:           number;    
        
        constructor (canvas: HTMLCanvasElement) {
            
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
                    
            this.stopwatchRect = new Rect ((this.width / 2) - (300 / 2) + 0, (this.height / 2) - (150 / 2) + 70, 300, 120);
            
            this.sec.toExponential(2);
            this.min.toFixed(2);
            this.hrs.toFixed(2)
            
            this.angle = 90 * (Math.PI / 180);
        }     
        
        public zeroPad(num: number, places: number) {
          var zero = places - num.toString().length + 1;
          return Array(+(zero > 0 && zero)).join("0") + num;
        }    
        
        public paint() {
           const ctx = this.ctx;
            
           if (this.getStatus()) { 
            this.paintEffect ();           
           } 
                                    
           ctx.save();
           ctx.beginPath();
           this.roundRect(this.stopwatchRect.x,this.stopwatchRect.y,this.stopwatchRect.w,this.stopwatchRect.h, 40); 
        
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
        
        private paintEffect () {
            
            const ctx = this.ctx;
                    
            var dx: number;
            var dy: number; 
            
            var dAngle: number = 0.5 * (Math.PI / 180);
            
            this.angle = this.angle + dAngle; 
            
            if (this.angle > 2 * Math.PI) this.angle = 0;
            
            
            dx = this.arcRadius * Math.cos(this.angle);
            dy = this.arcRadius * Math.sin(this.angle);
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.arcCenterX, this.arcCenterY, this.arcRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = circleColor;
            ctx.stroke();
            ctx.restore();                
            
            ctx.save();               
            ctx.beginPath();
            ctx.moveTo(this.arcCenterX, this.arcCenterY);
            ctx.lineTo(this.arcCenterX + dx, this.arcCenterY + dy);
            ctx.moveTo(this.arcCenterX, this.arcCenterY);
            ctx.lineTo(this.arcCenterX - dx, this.arcCenterY - dy);        
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 1;
            ctx.stroke();                        
            
            ctx.restore();           
            
        }
        
        private roundRect(x: number, y: number, width: number, height: number, radius: number) {
          const ctx = this.ctx;
              
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
        
        private ctx:    CanvasRenderingContext2D;           
        public x:  number = 0.0;
        public y:  number = 0.0;
        public width:  number = 0.0;
        public height:  number = 0.0;    
        public lineWidth: number = 2.0;
        public weatherData: WeatherDataForecast = null; //weather data source        
        private numForecast:        number = 0;    
        public txtValid:  Text;   
        private txt:  Text;
        private txtWind:  Text;        
        imgWind:HTMLImageElement = null;
        
        private iconWeather: Iconset = null;
        private iconWind: Icon;
        
        constructor (ctx: CanvasRenderingContext2D, weatherData:  WeatherDataForecast, numForecast: number ) {         
            this.ctx = ctx;
            this.txtValid = new Text (ctx, new Rect (10, 10, 60, 10));        
            this.txtValid.textAlign = "left";
            this.txtValid.textBaseline = "top";
            this.txtValid.fontSize = 20;
    
            this.txtWind = new Text (ctx, new Rect (0, 0, 0, 0));
            this.txt = new Text (ctx, new Rect (0, 0, 0, 0));
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.iconWind = new Icon (this.ctx, new Rect ( 140, 70, 50, 50), '/infores/servlets/kitchen/wind.png');
            
            this.weatherData = weatherData;
            this.numForecast = numForecast;
            
            this.iconWeather = new Iconset (this.ctx, new Rect (0, 0, 10, 10));     
            this.iconWeather.setImages(imagePaths);        
        }      
        
        setSize (x: number, y: number, width: number, height: number) {        
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;     
            
            this.txt.rect.x = x;
            this.txt.rect.y = y;
            this.txt.rect.w = width;
            this.txt.rect.h = height;    
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
                this.txtValid.setSize(new Rect(this.x + 5, this.y + 1, 20, 10));
                this.txtValid.paint("Not valid...");
            } else {
                                 
                    //Draw forecast image
                    if (this.iconWeather != null) {
                        this.iconWeather.setSize(new Rect (this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth)));
                        this.iconWeather.paint(weatherForecast.weatherSymbol - 1);
                    }
                    
                    //Draw temperature...
                    this.txt.rect.x = this.x + (this.width - 110);
                    this.txt.rect.y = this.height * 0.8;
                    this.txt.rect.w = 100;
                    this.txt.rect.h = 30;
                    this.txt.textAlign = "right";
                    this.txt.paint(weatherForecast.tempOut + " \u00B0C");
                            
                    //wind image
                    this.iconWind.setSize(new Rect(this.x + (this.width * 0.1), this.width * 1.5, 40, 40));
                    this.iconWind.paint();
           
                    //wind text
                    this.txtWind.rect.x = this.x + (this.width - 70);
                    this.txtWind.rect.y = this.width * 1.6 - 10;
                    this.txtWind.rect.w = 60;
                    this.txtWind.rect.h = 30;
                    this.txtWind.textAlign = "right";
                    this.txtWind.fontSize = 15;
                    this.txtWind.textBaseline = "middle";
                    this.txtWind.paint(weatherForecast.windSpeed + " \u00B0C");
                }        
        }     
    }        
        
        
    class ScreenFloor extends Screen {
        
        public siteData:    SiteData = null;
        protected thingPath: string = "";
        
        //Graphics
        private m_graphics: Graphics = null;

        private imgFloor:HTMLImageElement = null;        
        private imgFloorLoaded: boolean = false;
        
        private numRooms: number = 0;
        
        private txtNumRooms:  Text;
        private timerData;
        
        //**********
        public m_doorMarks:          Array<DoorMark2> = null;       // Doors marks
        public m_tempMarks:          Array<TempMark2> = null;       // Temp marks
        public m_switchMarks:          Array<SwitchMark2> = null;       // Switch marks
        
        constructor (canvas: HTMLCanvasElement, siteData:  SiteData, m_graphics: Graphics) {                
            super (canvas);
            
            this.siteData = siteData;
            this.m_graphics = m_graphics;

            this.imgFloor = new Image();
            this.imgFloor.src="/infores/servlets/kitchen/floor1.jpg";            
         
            this.txtNumRooms = new Text (this.ctx, new Rect (0, 0, 250, 100));
            this.txtNumRooms.textAlign = "left";
            this.txtNumRooms.textBaseline = "middle";
            this.txtNumRooms.fontSize = 40;       
            
            this.m_doorMarks = new Array<DoorMark2>();
            this.m_tempMarks = new Array<TempMark2>();
            this.m_switchMarks = new Array<SwitchMark2>();
        }  
        
        public setThing(thing: Thing){
            
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Floor) {
                    
                    //Doors
                    var doors: Array<Door> = this.siteData.getFilteredThings(this.siteData.doors, thing.getPath());
                    
                    this.m_graphics.setNumber2(doors.length, this.m_doorMarks, DoorMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>doors[id]);                        
                    }
                    
                    //Marks
                    var temps: Array<TemperatureSensor> = this.siteData.getFilteredThings(this.siteData.tempSensors, thing.getPath());
                    
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);                        
                    }                    
                    
                    //Switch
                    var switches: Array<Switch> = this.siteData.getFilteredThings(this.siteData.switches, thing.getPath());
                    
                    this.m_graphics.setNumber2(switches.length, this.m_switchMarks, SwitchMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing>switches[id]);                        
                    }                   
                }                               
            }            
        }              
    
        MouseClickHandler(event) { 
        
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null                                  
            };            
                       
            var mousePos = getMousePos(this.canvas, event);
            
            
            
           this.returnVal.nextScreen = SwitchScreen.Main;
        
           for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mousePos.x, mousePos.y)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getPath();
                   }
           }
            
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mousePos.x, mousePos.y)) {
                   this.returnVal.nextScreen = SwitchScreen.Room;
                   
                   this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
              }
           }   
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mousePos.x, mousePos.y)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
                
                switchSensor.postServerClick();
                switchSensor.getServerData();
                this.paint();
                
                this.returnVal.nextScreen = null;                         
                   
              }
           }             
            
           return this.returnVal;
        }    
        
        protected paint() {
            const ctx = this.ctx;
            
            //Draw image...
     //   if (this.imgFloorLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgFloor, 0, 0, this.width, this.height);
            ctx.restore();        
         //   }      
            
//            var pth: string = this.getThingPath();

        
            // Temperature sensors...
            /*
            var tempMarks = this.m_graphics.getFilteredMarks(this.m_graphics.m_tempMarks, this.getThingPath());
            
            for (let id in tempMarks) {
                tempMarks[id].paint();  
               // tempMarks.filter()          
            }
            */
            // Switches...
            /*
            var switchMarks = this.m_graphics.getFilteredMarks(this.m_graphics.m_switchMarks, this.getThingPath());
            
            for (let id in switchMarks) {
                switchMarks[id].paint();            
            }        
            */
            
            // Doors
            /*
            var doorMarks = this.m_graphics.getFilteredMarks(this.m_graphics.m_doorMarks, this.getThingPath());
            
            for (let id in doorMarks) {
                doorMarks[id].paintByThing(80, 80);            
            }                  
            */
            //New doors...            
            for (let id in this.m_doorMarks) {
                this.m_doorMarks[id].paintByThing(this.ctx);
            }
            
            //Temperature sensors
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(this.ctx);
            }
            
            //switches
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(this.ctx);
            }            
            
             //Number rooms
            this.txtNumRooms.rect.x = this.width - 10;
            this.txtNumRooms.rect.y = this.height - 10;
            this.txtNumRooms.rect.w = this.width * 0.4;
            this.txtNumRooms.textAlign = "right";
            this.txtNumRooms.fontSize = 26;
            this.txtNumRooms.textBaseline = "bottom";
            this.txtNumRooms.paint("Number Rooms:" + this.numRooms);                         
        }       
    }
        
    class ScreenRoom extends Screen {
                  
        protected m_siteData:       SiteData = null;  
        public m_doorMarks:         Array<DoorMark2> = null;       // Doors marks
        public m_tempMarks:         Array<TempMark2> = null;       // Temps marks
        public m_switchMarks:       Array<SwitchMark2> = null;       // Switch marks
        
        //Graphics
        private m_graphics: Graphics = null;    
        
        //Images
        protected m_imgRoomDefault:     ImageRect = null;    //Array of images
        protected m_imgRoom2Array:      Array<ImageRect> = null;    //Array of images
        protected m_imgRoom2:           ImageRect = null;           //Selected image
        
    //    private imgRoom:HTMLImageElement = null;        
   //     private imgRoomLoaded: boolean = false;
        
        //private imgBkg: Iconset = null; 
        
        constructor (canvas: HTMLCanvasElement, siteData:  SiteData, m_graphics: Graphics) {            
            super(canvas);
            
            this.m_graphics = m_graphics;  
            this.m_siteData = siteData;  
            
            this.m_doorMarks = new Array<DoorMark2>();
            this.m_tempMarks = new Array<TempMark2>();
            this.m_switchMarks = new Array<SwitchMark2>();
            /*
            this.imgRoom = new Image();
            this.imgRoom.src="/infores/servlets/kitchen/room_default.png";  
                            
            this.imgRoom.onload = function(){
              this.imgRoomLoaded = true;
            }          
            */
            this.m_imgRoomDefault = new ImageRect(0, 0, 0, 0, 0, '/infores/servlets/kitchen/room_default.png');
            
            this.m_imgRoom2Array = new Array<ImageRect>();
            
            for (let id in this.m_siteData.rooms){                
                var img: ImageRect = new ImageRect (0, 0, this.width, this.height, 0, this.m_siteData.rooms[id].imageBkgPath);
                
                /*
                if (!img.getImage().onload) {
                    window.alert("Path:" + this.m_siteData.rooms[id].imageBkgPath);
                }
       */         
                this.m_imgRoom2Array.push(img);                 
            }
            
           // this..TempMarks.push(new TempMark (this.ctx, new Rect (0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
            //this.TempMarks.push(new TempMark (this.ctx, new Rect (0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));               
        }   
        
        MouseClickHandler(event) {                                           
                       
            this.returnVal.nextScreen = SwitchScreen.Main;
            
            var mousePos = getMousePos(this.canvas, event);
            
            for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mousePos.x, mousePos.y)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getPath();
                   }
           }
            
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mousePos.x, mousePos.y)) {
                  // this.returnVal.nextScreen = SwitchScreen.Room;                   
                 //  this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
                   this.returnVal.nextScreen = null;
              }
           }   
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mousePos.x, mousePos.y)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
                
                switchSensor.postServerClick();
                switchSensor.getServerData();
                this.paint();
                
                this.returnVal.nextScreen = null;                         
                   
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
                    
                    var img: ImageRect = this.m_graphics.getFilteredImage(this.m_imgRoom2Array, room.imageBkgPath);
                    
                    if (img == null) {
                        img = new ImageRect (0, 0, this.width, this.height, 0, room.imageBkgPath);
                        this.m_imgRoom2Array.push(img);                        
                        this.m_imgRoom2 = img;
                        window.alert('nnnnn');
                    } else {
                        this.m_imgRoom2 = img;
                    }                                        
                                       
                    //Doors
                    var doors: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.doors, thing.getPath());
                    
                    this.m_graphics.setNumber2(doors.length, this.m_doorMarks, DoorMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>doors[id]);                        
                    }
                    
                    //Temp marks
                    var temps: Array<TemperatureSensor> = this.m_siteData.getFilteredThings(this.m_siteData.tempSensors, thing.getPath());
                    
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);                        
                    }                    
                    
                    //Switch marks
                    var switches: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.switches, thing.getPath());
                    
                    this.m_graphics.setNumber2(switches.length, this.m_switchMarks, SwitchMark2, 0, 0, 0, 0);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing> switches[id]);                        
                    }                                          
                }                               
            }            
        }         
        
        public paint() {
            const ctx = this.ctx;
            
            // Repaint background
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();            
           
            if (this.m_imgRoom2 != null){
                                
                if (!this.m_imgRoom2.loaded) {
                    this.m_imgRoomDefault.size(0, 0, this.width, this.height);
                    this.m_imgRoomDefault.paint(this.ctx);                    
                   
                } else {                                
                    this.m_imgRoom2.size(0, 0, this.width, this.height);
                    this.m_imgRoom2.paint(this.ctx);
                }
            }         
              
/*
            var pathImage: string = null;
                         
            if (this.getThing() != null) {            
                if (this.getThing() instanceof Room) {
                    var room: Room = <Room> this.getThing();
                    
                    pathImage = room.imageBkgPath;
                }
            }
            
            var index: number = this.m_graphics.m_iconsetRoomBkg.getImagesPaths().indexOf(pathImage);
            
            if (index == -1) {
                //Draw default image... 
                ctx.save();           
                ctx.drawImage(this.imgRoom, 0, 0, this.width, this.height);        
                ctx.restore(); 
                               
            } else {
                //Draw default room image... 
                this.m_graphics.m_iconsetRoomBkg.paint(index);                
            }
            */
            
            //New door marks....
            for (let id in this.m_doorMarks) {
                this.m_doorMarks[id].paintByThing(this.ctx);
            }
            
            //New temp marks....
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(this.ctx);
            }      
            
            //New switch marks....
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(this.ctx);
            }               
        }             
    } 
    
    class ScreenDoor extends Screen {
        
        protected m_graphics:   Graphics = null;       
        protected m_siteData:   SiteData = null;   
        
        public m_doorMark2:     DoorMark2 = null;       // Doors marks
                
        protected m_imgOpenArray:   Array<ImageRect> = null;    //Array of images
        protected m_imgOpen:        ImageRect = null;           //Selected image
       // protected n: number = 0;
        
        constructor (canvas: HTMLCanvasElement, m_siteData:  SiteData, m_graphics: Graphics) {            
            super(canvas);
            
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
            
            this.m_imgOpenArray = new Array<ImageRect>();
            
            for (let id in this.m_siteData.doors){                
                var img: ImageRect = new ImageRect (0, 0, this.width, this.height, 0, this.m_siteData.doors[id].image_open);
                this.m_imgOpenArray.push(img); 
            }
        }
      
        public paint() {
            super.paint();
            
            if (this.m_imgOpen != null){
                this.m_imgOpen.size(0, 0, this.width, this.height);
                this.m_imgOpen.paint(this.ctx);
            }
            
            /*
            this.m_imgOpenArray[this.n].size(0, 0, this.width, this.height);
            this.m_imgOpenArray[this.n].paint(this.ctx);
            */
            
            if(this.m_doorMark2 != null) {
                this.m_doorMark2.size(5, 20, 80, 80);
                this.m_doorMark2.paint(this.ctx);
            }                                                   
        }
        
        public setThing(thing: Thing){
            
            var oldThing: Thing = super.getThing(); 
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                if (thing instanceof Door) {
                    
                    //Reload pictures etc...?
                    var door: Door = <Door> this.getThing();
            //        this.m_iconDoorOpen = new Icon (this.ctx, new Rect(0, 0, this.width, this.height), door.image_open);
           //         this.m_iconDoorClose = new Icon (this.ctx, new Rect(0, 0, this.width, this.height), door.image_close);
                   // window.alert('***:' + this.canvas.getAttribute());
                    
                    var img = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_open);
                    
                    if (img == null) {
                        img = new ImageRect (0, 0, this.width, this.height, 0, door.image_open);
                        this.m_imgOpenArray.push(img);
                        
                       // this.n = n - 1;
                                                
                    //    this.m_imgOpen = img;
                      //  this.n = 
                       //    window.alert('kkkkkkk:' + door.image_open);
                    } else {
                        this.m_imgOpen = img;
                        //this.n = n;
                    }
                    
                    this.m_doorMark2 = new DoorMark2(0, 0, 0, 0);
                    this.m_doorMark2.setThing(thing);   
                    
                    this.paint();
                }                
            }            
        } 
        
        public MouseClickHandler(event) {                                           
           
            var mousePos = getMousePos(this.canvas, event);

            this.returnVal.nextScreen = SwitchScreen.DoorList;
            
            return this.returnVal;
        }           
    }
    
    class ScreenDoorList extends Screen {
        
        protected m_graphics: Graphics = null;       
        protected m_siteData: SiteData = null;
        protected m_arrayViewDoor:  Array<ViewDoor>; //View of doors
        protected m_iconBkgImage:   Icon = null;
        
        protected panelBottom: RectRounded = null;
        protected imgLock: ImageRect = null;
        protected imgUnLock: ImageRect = null;
        
        constructor (canvas: HTMLCanvasElement, m_siteData:  SiteData, m_graphics: Graphics) {            
            super(canvas);
            
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
            
            this.m_arrayViewDoor = new Array<ViewDoor>();
            
            this.setup();
            
            this.m_iconBkgImage = new Icon(this.ctx, new Rect(0,0,0,0), '/infores/servlets/kitchen/bkgDoorsList3.jpg');            
            this.panelBottom = new RectRounded(20, this.height - 100, this.width - 50, 80, 40);
            
            this.imgLock = new ImageRect ((this.width / 2) - 30, this.height - 120, 80, 80, 40, '/infores/servlets/kitchen/padlock_symbol.png');
            this.imgUnLock = new ImageRect ((this.width / 2) + 15, this.height - 75, 80, 80, 40, '/infores/servlets/kitchen/padlockCrossed_symbol.png');
        }
        
        protected setup() {
            //Setup view array ...
            for (var i = 0; i < this.m_siteData.doors.length; i++) {
                if(this.m_arrayViewDoor.length < i + 1) {
                    this.m_arrayViewDoor.push(new ViewDoor(this.ctx, this.m_graphics));
                }
                
                //Align data...
                this.m_arrayViewDoor[i].setThing(this.m_siteData.doors[i]);                
            }
            
            //Cut over-remaining View parts
            if (this.m_arrayViewDoor.length > this.m_siteData.doors.length){
                this.m_arrayViewDoor.length = this.m_siteData.doors.length;                
            }
                  
        }
        
        protected paint() {
            const ctx = this.ctx;
            
            this.setup();
            
            this.setGrid(3, 2);
            
            // Repaint background
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
            
            this.m_iconBkgImage.setSize(new Rect (0, 0, this.width, this.height));
            this.m_iconBkgImage.paint();
            
            for (let id in this.m_arrayViewDoor) {
                this.m_arrayViewDoor[id].paint();                
            }
            
            //Paint bottom panel
            /*
            ctx.save();            
            this.panelBottom.paint(this.ctx);
            ctx.fillStyle = "white";
            ctx.lineWidth=2;
            ctx.strokeStyle="gray";            
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            */
            //Paint buttons on panel
            ctx.save();
            this.imgLock.paint(this.ctx);
            this.imgUnLock.paint(this.ctx);
            ctx.restore();
        }     
                        
        MouseClickHandler(event) { 
        
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null                                  
            };            
                       
            var mousePos = getMousePos(this.canvas, event);
            
            var viewDoorClicked: ViewDoor = null;
                        
            for (let i in this.m_arrayViewDoor) {
                if(this.m_arrayViewDoor[i].isClicked(mousePos.x, mousePos.y)){
                    viewDoorClicked = this.m_arrayViewDoor[i];
                    break;
                }                                    
            }            
            
            if (viewDoorClicked != null) {
                returnVal.nextScreen = SwitchScreen.DoorScreen;
                returnVal.nextThingPath = viewDoorClicked.thing.getPath();
            }
            
            if (this.panelBottom.isClicked(mousePos.x, mousePos.y) == true) {
                returnVal = null;
            }
            
            if(this.imgLock.isClicked(mousePos.x, mousePos.y)){
                window.alert("All doors locked!");
            }
            
            if(this.imgUnLock.isClicked(mousePos.x, mousePos.y)){
                window.alert("All doors UN-locked!");
            }            
            
            return returnVal;
        }       
        
        protected setGrid (numHorizontal: number, numVertical: number) {                        
            
            // Set number views...
            var maxItems = numHorizontal * numVertical;
                        
            var spaceHor: number = 25.0;
            var spaceVer: number = 25.0;
            var belowStrip: number = 80;                        
            
            var widthView: number =  (this.width - ((numHorizontal + 1) * spaceHor)) / numHorizontal;
            var heightView: number =  ((this.height - belowStrip) - ((numVertical + 1) * spaceVer)) / numVertical;
                                    
            var nItem: number = 0;
            for (var j = 1; j <= numVertical; j ++) {
                for (var i = 1; i <= numHorizontal; i ++) {                                        
                    if (nItem < this.m_arrayViewDoor.length) {
                        var x: number = ((i - 1) * widthView) + ( i * spaceHor);
                        var y: number = ((j - 1) * heightView) + ( j * spaceVer); 
                        
                        this.m_arrayViewDoor[nItem].setSize(new Rect (x, y, widthView, heightView));
                    }                    
                    nItem ++;
                }                
            }                                    
        }        
    }
    
    class ViewDoor extends Mark {
                
        public m_doorMark2:          DoorMark2 = null;       // Mark of doors
        public textDoorName:        Text;                  //Name of doors
        public m_graphics:          Graphics = null;
        
        public m_imgDoorOpen:  ImageRect = null;
        
        private border: boolean = false;
                
        constructor (ctx: CanvasRenderingContext2D, m_graphics: Graphics) {
            super(ctx, new Rect (0, 0, 0, 0));      
            
            this.m_graphics = m_graphics;
            this.textDoorName = new Text(this.ctx, new Rect (0, 0, 0, 0));
        }
        
        public setThing(m_door: Door){
            var m_doorOld: Door = <Door> this.thing;
            
            if (m_doorOld != m_door) {
                this.thing = <Thing> m_door;
 
                //Reload pictures etc...?
                var door: Door = <Door> this.thing;       
                         
                this.m_imgDoorOpen = new ImageRect (this.rect.x, this.rect.y, this.rect.w, this.rect.h, 10, door.image_close);        
                
                this.m_doorMark2 = new DoorMark2(0, 0, 0, 0);
                this.m_doorMark2.setThing(this.thing);
            }        
        }        
        
        public setSize (rect: Rect) {
            super.setSize(rect);    
           // this.m_iconDoorOpen.setSize(rect);
            //this.m_iconDoorClose.setSize(rect);
            if (this.m_imgDoorOpen != null) {
                this.m_imgDoorOpen.size(rect.x, rect.y, rect.w, rect.h);
            }
            
            if (this.m_doorMark2 != null) {
                this.m_doorMark2.size(rect.x + 30, rect.y + 20, 80, 80);
            }   
                     
        }
        
        public paint () {            
            /*
            if (this.m_iconDoorOpen != null) {
                this.m_iconDoorOpen.paint();
            }
            
            if (this.m_iconDoorClose != null) {
                this.m_iconDoorClose.paint();
            }    
*/
            if (this.m_imgDoorOpen != null) {                
                this.m_imgDoorOpen.paint(this.ctx);
            }
            
            if(this.m_doorMark2 != null) {
                //this.m_doorMark2.size(this.rect.x + 30, this.rect.y + 20, 80, 80);
                this.m_doorMark2.paint(this.ctx);
            }              
            
            this.textDoorName.setSize(new Rect (this.rect.x + 5, this.rect.y + 5, 80, 80));
            this.textDoorName.paint("name");
            
            if (this.border) {                
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth=2;
                this.ctx.strokeStyle="blue";
                this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                this.ctx.stroke();
                this.ctx.restore();            
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
        
    function getAjax(urlAdr: string, id: string) {
           
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
        
    function postAjax(urlAdr: string, id: string, dataPost: string) {
           
        var result = null;
                
        $.ajax({async: false, type: "POST", url: urlAdr, data: {postId: id, dataId: dataPost}, dataType: "json", success: function(response) {
            
            result = response;
                                          
            }});
        
        return result;    
        }     
        
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }        
//Function to check whether a point is inside a rectangle
    /*
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}
*/
} // end module KitchenInfoStation



