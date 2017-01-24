// Copyright 2016 
//
//
// Home page: ***

/// <reference path="jquery.d.ts" />
/// <reference path='OhsCanvasGraphics.ts'/>

module KitchenInfoStation {

import Rect = OhsCanvasGraphics.Rect;
import Text = OhsCanvasGraphics.Text;
    
    
var forecastRect = {
    x:0,
    y:0,
    width:150,
    heigth:150
};     

var stopwatchRect = {
    x:0,
    y:0,
    width:0,
    heigth:0
};  
             
enum Application {
    None,
    Watch,    
    Floor,
    WeatherForecast,
    Room
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
        
class WeatherData {

public tempIn: number = 0.0;
public tempOut: number = 0.0;
public timeString: string = "";
public dateString: string = "";
public frostOutside: boolean = false;
public frostOutsideString: string = "false"; 
public cloudPerc: number = 0.0;   
public weatherSymbol: number = 0; 
public windSpeed: number = 0;      
    
private img:HTMLImageElement = null;

private images: Array<HTMLImageElement> = new Array<HTMLImageElement>();    
    
    constructor() {
                
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/sunny.png";        
        this.images.push(this.img);
        
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/partcloudy.png";        
        this.images.push(this.img);
        
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/cloudy.png";        
        this.images.push(this.img);
        
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/cloudRain.png";        
        this.images.push(this.img);
        
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/cloudStorm.png";        
        this.images.push(this.img);
        
        this.img = new Image();
        this.img.src="/infores/servlets/kitchen/cloudSnow.png";        
        this.images.push(this.img);                          
    }    
    
    getImage() {
        
        var index = this.weatherSymbol - 1;
        
        if (index <0 || index > 6) index = 0;
    
        this.img = this.images[index];
        
        return this.img;
    }
    
}

var appMode = Application.None;  //Mode of application
var roomNum = 1; //number of selected room for Application.Room       
    
export class BasicScreen {       
    
    private canvas:              HTMLCanvasElement;
    private staticImageCanvas:   HTMLCanvasElement;
    private ctx:                 CanvasRenderingContext2D;    
    private width:               number;
    private height:              number;    
    
    private timerPaint;
    private timerData;           
        
    private r:                   number;
    private arcCenterX:          number;
    private arcCenterY:          number;
    private arcRadius:           number;   
                
    public tmpInText:  Text;
    public tmpOutText:  Text;       
       
    public weather: WeatherData = new WeatherData(); //current weather today    
    public forecastScreen: WeatherForecastScreen = null; //forecast screen      
    public stopWatch: StopWatch = null;        
    public floor: Floor = null;    
    private room: Array<Room> = new Array<Room>();

    constructor (canvas: HTMLCanvasElement) {        
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;    
        this.r = Math.min(this.width, this.height) * 7 / 16;
        this.arcCenterX = this.width / 2;
        this.arcCenterY = this.height / 2 + 50;
        this.arcRadius = 120;
        
        this.stopWatch = new StopWatch (canvas);
        this.stopWatch.arcCenterX = this.arcCenterX;
        this.stopWatch.arcCenterY = this.arcCenterY;
        this.stopWatch.arcRadius = this.arcRadius;    
            
        stopwatchRect.x = (this.width / 2) + 180;
        stopwatchRect.y = (this.height / 2) + 20;    
        stopwatchRect.width = 60;
        stopwatchRect.heigth = 60;
            
        this.tmpInText = new Text (this.ctx, new Rect ((this.width / 2), (this.height / 2) + 50, 150, 100));
        this.tmpOutText = new Text (this.ctx, new Rect ((this.width / 2), (this.height / 2) + 50, 150, 100));
     
        this.forecastScreen = new WeatherForecastScreen (canvas);
        this.floor = new Floor (canvas);
        
        this.room.push(new Room (canvas, "/infores/servlets/kitchen/room0.png")); //0: Outside
        this.room.push(new Room (canvas, "/infores/servlets/kitchen/room1.png")); //1: Room1...
        this.room.push(new Room (canvas, "/infores/servlets/kitchen/room2.png"));
        this.room.push(new Room (canvas, "/infores/servlets/kitchen/room3.png"));
        
        this.getData('kitchen');
        this.timerGetDataEvent(5000);
        this.timerPaintEvent(5000);
        
        var self = this;
                    
        this.canvas.addEventListener('click',function(event){self.MouseClickHandler(event);}, false);    
    }  
    
    private timerGetDataEvent(step : number) {
       this.getData('kitchen');
       window.clearTimeout(this.timerData);
       this.timerData = window.setTimeout(() => this.timerGetDataEvent(step), step); 
    }     
    
    private timerPaintEvent(step : number) {     
       this.paint();  
       window.clearTimeout(this.timerPaint);
       this.timerPaint = window.setTimeout(() => this.timerPaintEvent(step), step); 
    } 
        
    private MouseClickHandler(event) {
        
        //window.alert("handler clicked !!" + event.clientX + " : " + event.clientY );
        
        var mousePos = getMousePos(this.canvas, event);
            
        if (appMode == Application.None) {
    
            if (isInside(mousePos, stopwatchRect)) {            
                appMode = Application.Watch;          
                this.stopWatch.start();
                this.timerPaintEvent(40);
                            
            } else if (isInside(mousePos, this.tmpInText.getRect())) {                                          
                appMode = Application.Floor;                                
                this.timerPaintEvent(10);   
                this.timerGetDataEvent(10);                                  
            } else if (isInside(mousePos, forecastRect)) {
                appMode = Application.WeatherForecast;    
            }                       
            
         } else if (appMode == Application.Watch) {
                                              
            if (this.stopWatch.getStatus()) {
                if(this.stopWatch.stopwatchRect.isClicked(mousePos.x, mousePos.y)) {                                
                    this.stopWatch.stop();
                    this.timerPaintEvent(3000);                                
                 }
            }
            else {        
                appMode = Application.None;
            }        
            
         } else if (appMode == Application.Floor) {     
           
            var room = this.floor.clickedTempMark(mousePos.x, mousePos.y);
            var light = this.floor.clickedSwitchMark(mousePos.x, mousePos.y);
            
            if (room != -1) {            
                appMode = Application.Room;
                roomNum = room;            
               } else if (light != -1) {
                
    //             window.alert("switch clicked !!");            
                 postAjax('kitchen', "switchClicked", "switch1");                            
                 this.getData('kitchen');
                 this.paint();  
                                           
                } else {                
                    appMode = Application.None;
                
                    this.timerPaintEvent(5000);   
                    this.timerGetDataEvent(5000);                  
                }        
            
         } else if (appMode == Application.Room) {     
            appMode = Application.Floor;        
         } else if (appMode == Application.WeatherForecast) {     
            appMode = Application.None;
         }
            
        this.paint();    
    }    
        
    private getData(url: string) {
    
        var data = getAjax(url, 'InfoData');
                
        if (data != null) {
                    timeString = data['time'];
                    dateString = data['date'];           
                    this.weather.tempIn = parseFloat(data['tempIn']);
                    this.weather.tempOut = parseFloat(data['tempOut']);
                    this.weather.frostOutside = JSON.parse(data['frostOutside']);
                    this.weather.weatherSymbol = JSON.parse(data['weatherSymbol']);
                    this.weather.windSpeed = parseFloat(data['windSpeed']);   
            }
        
        //Other objects...
        
        this.forecastScreen.getData(url);
        this.floor.getData(url);
            
    }
    
    private postData (url: string) {
        
                 var data = {
                    switch1: "clicked",
                    bar: "barValue",
                    baz: "bazValue"
                                };
        
        //var switch1 = "clicked";
        
        var dataSend : string = JSON.stringify(data);
        
        var send = postAjax(url, "mmm", dataSend);
        
     }

     
    public paintStaticImage() {
       const ctx = this.ctx;
        
       ctx.save();
       ctx.fillStyle = whiteColor;
       ctx.fillRect(0, 0, this.width, this.height);
       ctx.restore();   
    }
        
    public paint() { 
    
        this.paintStaticImage();
        
        if (appMode == Application.None || appMode == Application.Watch) {       
            this.paintBasic();        
        } else if (appMode == Application.Floor) {        
              this.floor.paint(this.weather);       
        } else if (appMode == Application.Room) {        
              this.room[roomNum].paint(this.weather);              
        } else if (appMode == Application.WeatherForecast) {
            this.forecastScreen.paint();
        }
    }         
    
    public paintBasic() {
        
       const ctx = this.ctx;
    
        //Draw image...
    
        var img:HTMLImageElement = this.weather.getImage();
            
        ctx.save();
        ctx.drawImage(img, forecastRect.x, forecastRect.y, forecastRect.width, forecastRect.heigth);
        ctx.restore();  
        
        //Wind
        if (imgWindLoaded) {     
            ctx.save();
            ctx.drawImage(imgWind, 140, 70, 50, 50);
            ctx.restore();        
         }     
        
        //Hum
        if (imgHumLoaded) {     
            ctx.save();
            ctx.drawImage(imgHum,  (this.width / 2) + 10 , (this.height / 2) + 70, 60, 60);
            ctx.restore();        
         }      
        
        //Voice message
        if (imgVoiceMessageLoaded) {     
            ctx.save();
            ctx.drawImage(imgVoiceMessage,  (this.width / 2) - 220 , (this.height / 2) + 20, 60, 60);
            ctx.restore();        
         }   
        
        //Stopwatch
        if (imgStopwatchLoaded) {     
            ctx.save();
            ctx.drawImage(imgStopwatch,  (this.width / 2) + 180 , (this.height / 2) + 20, 60, 60);
            ctx.restore();        
         }     
            
        //Wind outside
       ctx.save();
       ctx.font = fontSizeWind + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
       ctx.textAlign = "right";
       ctx.textBaseline = "middle";
       ctx.fillStyle = textColor;          
       ctx.fillText(this.weather.windSpeed + " m/s", 320, 100);
       ctx.restore();          
        
        //Time
       //ctx.save();
       ctx.font = fontSizeTime + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
       ctx.textAlign = "right";
       ctx.textBaseline = "middle";
       ctx.fillStyle = textColor;          
       ctx.fillText(timeString, 580, 50);
       ctx.restore();    
        
        //Date
      // ctx.save();
       ctx.font = fontSizeDate + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
       ctx.textAlign = "right";
       ctx.textBaseline = "middle";
       ctx.fillStyle = textColor;          
       ctx.fillText(dateString, 580, 100);
       ctx.restore();         
        
        //Inside temperature
       this.tmpInText.fontSize = fontSizeTempIn;
       this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
       this.tmpInText.fontColor = textColor;
       this.tmpInText.textAlign = "center";
       this.tmpInText.textBaseline = "middle";   
       this.tmpInText.paint(this.weather.tempIn + " \u00B0C");
        
        //Outside temperature    
       this.tmpOutText.equals(this.tmpInText);    
       this.tmpOutText.rect.x = 320;
       this.tmpOutText.rect.y =  50;     
       this.tmpOutText.textAlign = "right";   
       this.tmpOutText.paint(this.weather.tempOut + " \u00B0C");    
            
        //Humidity
       ctx.save();
       ctx.font = fontSizeHum + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
       ctx.textAlign = "right";
       ctx.textBaseline = "middle";
       ctx.fillStyle = textColor;          
       ctx.fillText("44", (this.width / 2) , (this.height / 2) + 105);
       ctx.restore();       
        
       //Draw arc...
       ctx.save();
       ctx.beginPath();
       ctx.arc(this.arcCenterX, this.arcCenterY, this.arcRadius, 0, 2 * Math.PI, false); 
       ctx.lineWidth = 1;
       ctx.strokeStyle = circleColor;
       ctx.stroke();
       ctx.restore(); 
        
        if (appMode == Application.Watch) {        
                 this.stopWatch.paint();    
        }           
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

} // end class Infoscreen

    
class WeatherForecastScreen {
           
    private canvas:              HTMLCanvasElement;
    private staticImageCanvas:   HTMLCanvasElement;
    private ctx:                 CanvasRenderingContext2D;    
    private width:               number;
    private height:              number;    
            
    private forecastPanels: Array<WeatherForecastPanel> = new Array<WeatherForecastPanel>();        
        
    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;      
     
        this.forecastPanels.push(new WeatherForecastPanel (this.ctx));
        this.forecastPanels.push(new WeatherForecastPanel (this.ctx));
        this.forecastPanels.push(new WeatherForecastPanel (this.ctx));
        this.forecastPanels.push(new WeatherForecastPanel (this.ctx));        
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
    
    public getData (url: string) {
        
        var i: number = 0;
        
        for (var panel of this.forecastPanels) {
            panel.getData(url, "Day" + i);
            
            i++;
        }        
    }    
}
    
    
//------------------------------------------------------------------------------

const clockLabel       = "source-code.biz";
const transparentColor = "rgba(0,0,0,0)";
const whiteColor       = "#FFFFFF";
const blackColor       = "#000000";
const borderColor      = "#C0C0C0";
const secPtrColor      = "#CC0000";
const textColor        = "#000000";
const circleColor        = "#c0c0c0";
let fontSizeTempIn:      number = 54;
let fontSizeTempOut:      number = 50;    
let fontSizeWind:      number = 24;      
let fontSizeHum:      number = 27;
let fontSizeTime:      number = fontSizeTempOut;
let fontSizeDate:      number = fontSizeWind;         
    
//Meteorological data    
var timeString = "";
var dateString = "";             
        
//Wind image    
var imgWind = new Image();  
imgWind.src = '/infores/servlets/kitchen/wind.png';
var imgWindLoaded = false;      
    
imgWind.onload = function(){
  imgWindLoaded = true;
}     

//Hum image    
var imgHum = new Image();
imgHum.src = '/infores/servlets/kitchen/drop.png';
var imgHumLoaded = false;
    
imgHum.onload = function(){
  imgHumLoaded = true;
}      
    
//Voice message Image    
var imgVoiceMessage = new Image();
imgVoiceMessage.src = '/infores/servlets/kitchen/voicemessage.png';
var imgVoiceMessageLoaded = false;
    
imgVoiceMessage.onload = function(){
  imgVoiceMessageLoaded = true;
}     
        
//Stop watch image    
var imgStopwatch = new Image(); 
imgStopwatch.src = '/infores/servlets/kitchen/stopwatch.png'; 
var imgStopwatchLoaded = false;    
    
imgStopwatch.onload = function(){
  imgStopwatchLoaded = true;
}        
    
//Fingerprint image    
var imgFingerprint = new Image(); 
imgFingerprint.src = '/infores/servlets/kitchen/fingerprint.png'; 
var imgFingerprintLoaded = false;    
    
imgFingerprint.onload = function(){
  imgFingerprintLoaded = true;
}        
       
   
   /*
class Rect {

    public x:  number = 0;
    public y:  number = 0;
    private w:  number = 0;    
    private h:  number = 0;
    
    constructor (x: number, y: number, w: number, h: number){
    
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
   public width() {        
        return this.w;
    }
    
   public height() {        
        return this.h;
    }        
    
   public setWidth(w: number) {        
        this.w = w;
    }
    
   public setHeight(h: number) {        
        this.h = h;
    }
    
    public isClicked (clx:number, cly:number) {                
        return (clx > this.x && clx < this.x+this.w && cly < this.y+this.h && cly > this.y);        
    }    
}
  */
   /*
class Text {
    
    private ctx:    CanvasRenderingContext2D;   
    
    public fontSize:      number = 10; 
    public fontColor:     string = "#000000";
    public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
    public textAlign:   string = "center";
    public textBaseline:   string = "middle";
    
    public x:  number = 0;
    public y:  number = 0;
    public width : number = 0;
    public height : number = 0;        
         
    constructor (ctx: CanvasRenderingContext2D, x, y, width, height) {
        this.ctx = ctx;        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;        
    }  
    
    public paint (text: string) {        
       this.ctx.save();
       this.ctx.font = this.fontSize + this.fontFamily;
       this.ctx.textAlign = this.textAlign;
       this.ctx.textBaseline = this.textBaseline;
       this.ctx.fillStyle = this.fontColor;          
       this.ctx.fillText(text, this.x, this.y);
       this.ctx.restore();                   
    }   
    
    setSize (x: number, y: number, width: number, height: number) {
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;     
    }    
    
    copyFrom(tx: Text) {        
        this.x = tx.x;
        this.y = tx.y;
        this.width = tx.width;
        this.height = tx.height;
        this.ctx = tx.ctx;
        this.fontSize = tx.fontSize;
        this.fontColor = tx.fontColor;
        this.fontFamily = tx.fontFamily;
        this.textAlign = tx.textAlign;
        this.textBaseline = tx.textBaseline;
    }
    
    getRect() {
            var rect = {
                 x:0,
                 y:0,
                 width:0,
                heigth:0
            };  
        
        rect.x = this.x;
        rect.y = this.y;
        rect.width = this.width;
        rect.heigth = this.height;
        
        
        if (this.textAlign == "center") {
            rect.x = this.x - (this.width / 2);
        } else if (this.textAlign == "right" || this.textAlign == "end") {
            rect.x = this.x - this.width;
        }
        
        if (this.textBaseline == "bottom") {
            rect.y = this.y - this.height;
        } else if (this.textBaseline == "middle") {
            rect.y = this.y - (this.height / 2);
        }        
        
        return rect;
        
        }
    
}           
    */
class TempMark {
    
    private ctx:    CanvasRenderingContext2D;       
    public x:  number = 0;
    public y:  number = 0;
    public width:  number = 0;  
    public height:  number = 0;    
    
    private txt:  Text;
    
    private img:HTMLImageElement = null;
    private imgLoaded: boolean;// = false;       
    
    constructor (ctx: CanvasRenderingContext2D, x, y, width, height) {
        this.ctx = ctx;        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;              
        
        this.txt = new Text (ctx, new Rect (x, y, width, height));
        this.txt.textAlign = "left";
        this.txt.textBaseline = "middle";
        this.txt.fontSize = 20;
        
        this.img = new Image();                                
        this.img.src = "/infores/servlets/kitchen/tempSymbol.png";              
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
    
    public paint (text: string) {      
    
       this.ctx.save();
       this.ctx.beginPath();
       this.ctx.arc(this.x + (this.width / 2), this.y, this.width / 2, 0, 2 * Math.PI, false);
       this.ctx.fillStyle = '#ccffe6';
       this.ctx.fill();
       this.ctx.lineWidth = 2;
       this.ctx.strokeStyle = '#00cc69';
       this.ctx.stroke();
       this.ctx.restore();      
                
       this.txt.rect.x = this.x + 20;
       this.txt.paint(text);
        
        //Draw image...
     //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.x - 8, this.y - 20, 40, 40);
            this.ctx.restore();        
       // }                         
    }     
    
    getRect() {
            var rect = {
                 x:0,
                 y:0,
                 width:0,
                heigth:0
            };  
        
        rect.x = this.x;
        rect.y = this.y;
        rect.width = this.width;
        rect.heigth = this.height;                
        
        return rect;        
    }         
    
    public isClicked (clx:number, cly:number) {                
        return (clx > this.x && clx < this.x+this.width && cly < this.y+this.height && cly > this.y);        
    }
}
    
class SwitchMark {
    
    private ctx:    CanvasRenderingContext2D;       
    public x:  number = 0;
    public y:  number = 0;
    public width:  number = 0;  
    public height:  number = 0;    
    
    private txt:  Text;
    
    private img:HTMLImageElement = null;
    private imgLoaded: boolean;// = false;       
    
    private colorButton: string = "#666699";
    
    public state: number = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
        
    constructor (ctx: CanvasRenderingContext2D, x, y, width, height) {
        this.ctx = ctx;        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;              
        
        this.txt = new Text (ctx, new Rect (x, y, width, height));
        this.txt.textAlign = "left";
        this.txt.textBaseline = "middle";
        this.txt.fontSize = 20;
        
        this.img = new Image();                                
        this.img.src = "/infores/servlets/kitchen/BulbSymbol.png";              
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
    
    public paint () { 
    
        var text: string = "---";
    
        // state=   0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
        
        //logic of switch
        if (this.state == 0) {
            this.colorButton = "#808080"; 
            text = "---";
        } else if (this.state == 1) {
            this.colorButton = "#3333ff";
            text = "off";
        } else if (this.state == 2) {
            this.colorButton = "#33cc33";
            text = "->on";
        } else if (this.state == 3) {
            this.colorButton = "#ffaa00";
            text = "on";
        } else if (this.state == 4) {
            this.colorButton = "#9999ff";
            text = "->off";
        } else {
            this.colorButton = "#808080"; 
            text = "---";
        }
        
        
       this.ctx.save();
       this.ctx.beginPath();
       this.ctx.arc(this.x + (this.width / 2), this.y, this.width / 2, 0, 2 * Math.PI, false);
       this.ctx.fillStyle = this.colorButton;
       this.ctx.fill();
       this.ctx.lineWidth = 2;
       this.ctx.strokeStyle = '#00cc69';
       this.ctx.stroke();
       this.ctx.restore();      
                
       this.txt.rect.x = this.x + 30;
       this.txt.paint(text);
        
        //Draw image...
     //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.x - 8, this.y - 20, 40, 40);
            this.ctx.restore();        
       // }                         
    }     
    
    getRect() {
            var rect = {
                 x:0,
                 y:0,
                 width:0,
                heigth:0
            };  
        
        rect.x = this.x;
        rect.y = this.y;
        rect.width = this.width;
        rect.heigth = this.height;                
        
        return rect;        
    }         
    
    public isClicked (clx:number, cly:number) {                
        return (clx > this.x && clx < this.x+this.width && cly < this.y+this.height && cly > this.y);        
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
    
    public forecast: WeatherData = null;
    private txt:  Text;
    private txtWind:  Text;        
    imgWind:HTMLImageElement = null;
    
    constructor (ctx: CanvasRenderingContext2D) {
         
        this.forecast = new WeatherData ();
        this.txtWind = new Text (ctx, new Rect (0, 0, 0, 0));
        this.txt = new Text (ctx, new Rect (0, 0, 0, 0));
        this.txt.textAlign = "left";
        this.txt.textBaseline = "middle";
        this.txt.fontSize = 20;
        
        imgWind = new Image();
        imgWind.src="/infores/servlets/kitchen/wind.png";
              
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
    
    setForecast(fcs: WeatherData) {
        this.forecast = fcs;        
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
        
        //Draw forecast image
        var img:HTMLImageElement = this.forecast.getImage();        
        ctx.save();
        ctx.drawImage(img, this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth));
        ctx.restore();  
        
        //Draw temperature...
        this.txt.rect.x = this.x + ((this.width - (2 * this.lineWidth)) / 2);
        this.txt.rect.y = this.width * 1.25;
        this.txt.textAlign = "center";
        this.txt.paint(this.forecast.tempOut + " \u00B0C");
                
        //wind image
        ctx.save();
        ctx.drawImage(imgWind, this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
        ctx.restore();       
        
        //wind text
        this.txtWind.rect.x = this.x + (this.width * 0.9);
        this.txtWind.rect.y = this.width * 1.6;
        this.txtWind.rect.w = this.width * 0.4;
        this.txtWind.textAlign = "right";
        this.txtWind.fontSize = 15;
        this.txtWind.textBaseline = "hanging";
        this.txtWind.paint(this.forecast.windSpeed + " \u00B0C");        
    }
    
    public getData(url: string, id: string) {   
     
        var data = getAjax(url, id);
                
        if (data != null) {
                    this.forecast.tempOut = parseFloat(data['temp']);
                    this.forecast.weatherSymbol = JSON.parse(data['weatherSymbol']);
                    this.forecast.windSpeed = parseFloat(data['windSpeed']);   
            }                     
    }         
}        
    
    
class Floor {
    
    private ctx:                 CanvasRenderingContext2D;
    private width:               number;
    private height:              number;
        
    private TempMarks: Array<TempMark> = new Array<TempMark>();
    private SwitchMarks: Array<SwitchMark> = new Array<SwitchMark>();
    
    private imgFloor:HTMLImageElement = null;
    
    private imgFloorLoaded: boolean = false;
    
    private numRooms: number = 0;
    
    private txtNumRooms:  Text;
    
    constructor (canvas: HTMLCanvasElement) {
        
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.imgFloor = new Image();
        this.imgFloor.src="/infores/servlets/kitchen/floor1.jpg";      

                
       // this.imgFloor.onload = function(){
      //    this.imgFloorLoaded = true;
     //   }          
        
        this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));
        this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));
        
        this.SwitchMarks.push(new SwitchMark (this.ctx, 0, 0, 0, 0));    
        
        this.txtNumRooms = new Text (this.ctx, new Rect (0, 0, 250, 100));
        this.txtNumRooms.textAlign = "left";
        this.txtNumRooms.textBaseline = "middle";
        this.txtNumRooms.fontSize = 40;
                
    }     
    
    public paint(weatherToday : WeatherData) {
        const ctx = this.ctx;
        
        //Draw image...
     //   if (this.imgFloorLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgFloor, 0, 0, this.width, this.height);
            ctx.restore();        
     //   }      
    
        //Outside mark
        this.TempMarks[0].setSize(250, 350, 80, 40);
        this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");    
            
        //Inside mark
        this.TempMarks[1].setSize(300, 200, 80, 40);
        this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");    
        
        //Inner switch
        this.SwitchMarks[0].setSize(220, 150, 80, 40);
        this.SwitchMarks[0].paint();          
        
         //Number rooms
        this.txtNumRooms.rect.x = this.width - 10;
        this.txtNumRooms.rect.y = this.height - 10;
        this.txtNumRooms.rect.w = this.width * 0.4;
        this.txtNumRooms.textAlign = "right";
        this.txtNumRooms.fontSize = 26;
        this.txtNumRooms.textBaseline = "bottom";
        this.txtNumRooms.paint("Number Rooms:" + this.numRooms);             
        
    }
    
    public clickedTempMark (clx:number, cly:number) {
        
        let cId: number = -1;
        let n:   number = -1;
        
        for (let id in this.TempMarks) {
             
            n++;
            
            if (this.TempMarks[id].isClicked(clx, cly)) {
                cId = n;
             }
        }        
                
        return cId;
    }    
    
    public clickedSwitchMark (clx:number, cly:number) {
        
        let cId: number = -1;
        let n:   number = -1;
        
        for (let id in this.SwitchMarks) {
             
            n++;
            
            if (this.SwitchMarks[id].isClicked(clx, cly)) {
                cId = n;
             }
        }        
                
        return cId;
    }     
    
    public getData(url: string) {   
     
        var id: string = "floor1";
        
        //window.alert("floor clicked !!");
        
        var data = getAjax(url, id);
                
        if (data != null) {
            this.numRooms = parseFloat(data['nRooms']);
            }   
        
        var id2: string = "switch1";        
        var data2 = getAjax(url, id2);
                
        if (data2 != null) {
            this.SwitchMarks[0].state = parseFloat(data2['switchState']);                                 
            
            } 
    }      
    
}
    
class Room {
    
    private ctx:                 CanvasRenderingContext2D;
    private width:               number;
    private height:              number;
        
    private TempMarks: Array<TempMark> = new Array<TempMark>();
    
    private imgRoom:HTMLImageElement = null;
    
    private imgRoomLoaded: boolean = false;
    
    constructor (canvas: HTMLCanvasElement, imgSrc:string) {
        
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.imgRoom = new Image();
        this.imgRoom.src=imgSrc; //"/infores/servlets/kitchen/room1.png";  
                        
        this.imgRoom.onload = function(){
          this.imgRoomLoaded = true;
        }          
        
        this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));
        this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));               
    }     
    
    public paint(weatherToday : WeatherData) {
        const ctx = this.ctx;
        
        //Draw image...
      //  if (this.imgRoomLoaded) {     
        ctx.save();           
        ctx.drawImage(this.imgRoom, 0, 0, this.width, this.height);        
        ctx.restore();        
     //   }      
    
        //Outside mark
        this.TempMarks[0].setSize(250, 350, 80, 40);
        this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");    
            
        //Inside mark
        this.TempMarks[1].setSize(280, 200, 80, 40);
        this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");            
    }
    
    public clickedTempMark (clx:number, cly:number) {
        
        let cId: number = -1;
        let n:   number = 0;
        
        for (let id in this.TempMarks) {
             
            n++;
            
            if (this.TempMarks[id].isClicked(clx, cly)) {
                cId = n;
             }
        }        
                
        return cId;
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
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}

} // end module KitchenInfoStation



