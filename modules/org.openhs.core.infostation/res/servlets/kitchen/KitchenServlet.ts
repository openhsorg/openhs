// Copyright 2015 Christian d'Heureuse, Inventec Informatik AG, Zurich, Switzerland
// www.source-code.biz, www.inventec.ch/chdh
//
// This module is multi-licensed and may be used under the terms of any of the following licenses:
//
//  LGPL, GNU Lesser General Public License, V2.1 or later, http://www.gnu.org/licenses/lgpl.html
//  EPL, Eclipse Public License, V1.0 or later, http://www.eclipse.org/legal
//
// Please contact the author if you need another license.
// This module is provided "as is", without warranties of any kind.
//
// Home page: http://www.source-code.biz/snippets/typescript

/// <reference path="jquery.d.ts" />


module KitchenInfoStation {

//------------------------------------------------------------------------------
    
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
    
var stopwatchAppRect = {
    x:0,
    y:0,
    width:0,
    heigth:0
};
             
enum Application {
    None,
    Watch,    
    Floor,
    WeatherForecast
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
        
        /*
        imgWind.onload = function(){
          imgWindLoaded = true;
        }        
*/ 
      
    }    
    
    getImage() {
        
        var index = this.weatherSymbol - 1;
        
        if (index <0 || index > 6) index = 0;
    
        this.img = this.images[index];
        
        return this.img;
    }
    
}
    
let weatherForecast: Array<WeatherData> = new Array<WeatherData>();  
     
weatherForecast.push(new WeatherData()); //today
weatherForecast.push(new WeatherData()); //today + 1
weatherForecast.push(new WeatherData()); //today + 2
weatherForecast.push(new WeatherData()); //today + 3
weatherForecast.push(new WeatherData()); //today + 4      
    
var appMode = Application.None;  //Mode of application     
var nextServlet = "";        
    
export class Infoscreen {

private clockCanvas:         HTMLCanvasElement;
private staticImageCanvas:   HTMLCanvasElement;
ns: string;
aa : string;
    
element: JQuery;
span: JQuery;    
imPainter : ImagePainter;    
     

constructor (clockCanvas: HTMLCanvasElement, next: string) {       
   this.clockCanvas = clockCanvas;
   this.ns = "/org.openhs.core.meteostation"; //next;
   this.timerEvent();
   
   nextServlet = next; //next;
 
   clockCanvas.addEventListener('click',() => this.MouseClickHandler(event));

}  
    
private timerEvent() {
   this.getData();
   this.paintScreen();    
   window.setTimeout(() => this.timerEvent(), 1000 * 3); 
} 

private paintScreen() {
    
   if (!this.staticImageCanvas || this.staticImageCanvas.width != this.clockCanvas.width || this.staticImageCanvas.height != this.clockCanvas.height) {
      this.createStaticImageCanvas(); }    
    
   this.clockCanvas.getContext("2d").drawImage(this.staticImageCanvas, 0, 0);
   this.imPainter = new ImagePainter(this.clockCanvas);
   this.imPainter.weatherToday = weatherForecast[0];//.fillData(weatherForecast);
   this.imPainter.paint();    
}
    
private MouseClickHandler(event) {
    
    var mousePos = getMousePos(this.clockCanvas, event);
    
    if (appMode == Application.None) {

        if (isInside(mousePos, stopwatchRect)) {            
            appMode = Application.Watch;            
        } else if (isInside(mousePos, stopwatchRect)) {
            appMode = Application.Watch;    
        } else if (isInside(mousePos, this.imPainter.tmpInText.getRect())) {
            appMode = Application.Floor;    
        } else if (isInside(mousePos, forecastRect)) {
            appMode = Application.WeatherForecast;    
        }               
        
        
     } else if (appMode == Application.Watch) {
        
        if (isInside(mousePos, stopwatchAppRect)) {               
            appMode = Application.None;                                                
        } else {
            //alert('clicked outside rect');
        }           
     } else if (appMode == Application.Floor) {     
        appMode = Application.None;
     } else if (appMode == Application.WeatherForecast) {     
        appMode = Application.None;
     }
        
    this.paintScreen();    
}    

private createStaticImageCanvas() {
   let canvas: HTMLCanvasElement = document.createElement("canvas");
   canvas.width = this.clockCanvas.width;
   canvas.height = this.clockCanvas.height;
   new ImagePainter(canvas).paintStaticImage();
   this.staticImageCanvas = canvas; }
    
//Get data from server...    
private getData() {
        
        $(document).ready(function() {
            
            $.getJSON('kitchen', { orderId : "InfoData"}, function(data) {
                timeString = data['time'];
                dateString = data['date'];   
                weatherForecast[0].tempIn = parseFloat(data['tempIn']);
                weatherForecast[0].tempOut = parseFloat(data['tempOut']);
                weatherForecast[0].frostOutside = JSON.parse(data['frostOutside']);
                weatherForecast[0].weatherSymbol = JSON.parse(data['weatherSymbol']);
                weatherForecast[0].windSpeed = parseFloat(data['windSpeed']);                                                                           
                });           
         });
       
        $(document).ready(function() {
            
            $.getJSON('kitchen', { orderId : "Day1"}, function(data) {  
                weatherForecast[1].tempOut = parseFloat(data['temp']);
                weatherForecast[1].weatherSymbol = JSON.parse(data['weatherSymbol']);
                weatherForecast[1].windSpeed = parseFloat(data['windSpeed']);                                                                           
                });           
         });    
    
        $(document).ready(function() {
            
            $.getJSON('kitchen', { orderId : "Day2"}, function(data) {  
                weatherForecast[2].tempOut = parseFloat(data['temp']);
                weatherForecast[2].weatherSymbol = JSON.parse(data['weatherSymbol']);
                weatherForecast[2].windSpeed = parseFloat(data['windSpeed']);                                                                           
                });           
         }); 
    
        $(document).ready(function() {
            
            $.getJSON('kitchen', { orderId : "Day3"}, function(data) {  
                weatherForecast[3].tempOut = parseFloat(data['temp']);
                weatherForecast[3].weatherSymbol = JSON.parse(data['weatherSymbol']);
                weatherForecast[3].windSpeed = parseFloat(data['windSpeed']);                                                                           
                });           
         });     
    
    }     

} // end class Temperature

    
    
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
   
//Stop watch image    
var imgFloor = new Image(); 
imgFloor.src = '/infores/servlets/kitchen/floor1.jpg'; 
var imgFloorLoaded = false;    
    
imgFloor.onload = function(){
  imgFloorLoaded = true;
}  
    
    
class Rect {

    private x:  number = 0;
    private y:  number = 0;
    private w:  number = 0;    
    private h:  number = 0;
    
    constructor (x: number, y: number, w: number, h: number){
    
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
   width() {        
        return this.w;
    }
    
   height() {        
        return this.h;
    }        
}
    
   
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
        
        this.txt = new Text (ctx, x, y, width, height);
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
        
        this.txt.x = x;
        this.txt.y = y;
        this.txt.width = width;
        this.txt.height = height;    
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
                
       this.txt.x = this.x + 20;
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
}

class ForecastPanel {
    
    private ctx:    CanvasRenderingContext2D;  
         
    public x:  number = 0.0;
    public y:  number = 0.0;
    public width:  number = 0.0;  
    public height:  number = 0.0;    
    public lineWidth: number = 2.0;
    
    private forecast: WeatherData = null;
    private txt:  Text;
    private txtWind:  Text;        
    imgWind:HTMLImageElement = null;
    
    constructor (ctx: CanvasRenderingContext2D, fcs: WeatherData) {
         
        this.forecast = fcs;
        this.txtWind = new Text (ctx, 0, 0, 0, 0);
        this.txt = new Text (ctx, 0, 0, 0, 0);
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
        
        this.txt.x = x;
        this.txt.y = y;
        this.txt.width = width;
        this.txt.height = height;    
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
        this.txt.x = this.x + ((this.width - (2 * this.lineWidth)) / 2);
        this.txt.y = this.width * 1.25;
        this.txt.textAlign = "center";
        this.txt.paint(this.forecast.tempOut + " \u00B0C");
                
        //wind image
        ctx.save();
        ctx.drawImage(imgWind, this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
        ctx.restore();       
        
        //wind text
        this.txtWind.x = this.x + (this.width * 0.9);
        this.txtWind.y = this.width * 1.6;
        this.txtWind.width = this.width * 0.4;
        this.txtWind.textAlign = "right";
        this.txtWind.fontSize = 15;
        this.txtWind.textBaseline = "hanging";
        this.txtWind.paint(this.forecast.windSpeed + " \u00B0C");        
    }     

    
}
    
        
class ImagePainter {

private ctx:                 CanvasRenderingContext2D;
private width:               number;
private height:              number;
private r:                   number;
private centerX:             number;
private centerY:             number;
    
public weatherToday : WeatherData = null; 
        
public tmpInText:  Text;
public tmpOutText:  Text;      

private roomTmps: Array<Text> = new Array<Text>();
private TempMarks: Array<TempMark> = new Array<TempMark>();
private forecastPanels: Array<ForecastPanel> = new Array<ForecastPanel>();           

constructor (canvas: HTMLCanvasElement) {
    
 //  this.weatherForecast = new WeatherData();
    
   this.ctx = canvas.getContext("2d");
   this.width = canvas.width;
   this.height = canvas.height;
   this.r = Math.min(this.width, this.height) * 7 / 16;
   this.centerX = this.width / 2;
   this.centerY = this.height / 2;
    
    stopwatchRect.x = (this.width / 2) + 180;
    stopwatchRect.y = (this.height / 2) + 20;    
    stopwatchRect.width = 60;
    stopwatchRect.heigth = 60;

    stopwatchAppRect.width = 300;
    stopwatchAppRect.heigth = 150;       
    stopwatchAppRect.x = (this.width / 2) - (stopwatchAppRect.width / 2);
    stopwatchAppRect.y = (this.height / 2) - (stopwatchAppRect.heigth / 2);   
        
    this.tmpInText = new Text (this.ctx, (this.width / 2), (this.height / 2) + 50, 150, 100);
    this.tmpOutText = new Text (this.ctx, (this.width / 2), (this.height / 2) + 50, 150, 100);
    
    this.roomTmps.push(new Text (this.ctx, 0, 0, 0, 0));
    this.roomTmps.push(new Text (this.ctx, 0, 0, 0, 0));
    this.roomTmps.push(new Text (this.ctx, 0, 0, 0, 0));
    this.roomTmps.push(new Text (this.ctx, 0, 0, 0, 0));
    this.roomTmps.push(new Text (this.ctx, 0, 0, 0, 0));
    
    this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));
    this.TempMarks.push(new TempMark (this.ctx, 0, 0, 0, 0));
    
    this.forecastPanels.push(new ForecastPanel (this.ctx, weatherForecast[0]));
    this.forecastPanels.push(new ForecastPanel (this.ctx, weatherForecast[1]));
    this.forecastPanels.push(new ForecastPanel (this.ctx, weatherForecast[2]));
    this.forecastPanels.push(new ForecastPanel (this.ctx, weatherForecast[3]));
 
                
  // ni = 0; 
}

public paintStaticImage() {
   // Paint outer background.
   const ctx = this.ctx;
    
   ctx.save();
   ctx.fillStyle = whiteColor;
   ctx.fillRect(0, 0, this.width, this.height);
   ctx.restore();   
}
    
public paint() {    
    if (appMode == Application.None || appMode == Application.Watch) {       
        this.paintBasic();        
    } else if (appMode == Application.Floor) {        
        this.paintFloors();        
    } else if (appMode == Application.WeatherForecast) {
        this.paintWeatherForecast();
    }
} 
    
public paintWeatherForecast() {
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
    
public paintFloors() {
    
   const ctx = this.ctx;
        
    //Draw image...
    if (imgFloorLoaded) {     
        ctx.save();
        ctx.drawImage(imgFloor, 0, 0, this.width, this.height);
        ctx.restore();        
    }      

    //Outside mark
    this.TempMarks[0].setSize(250, 350, 80, 40);
    this.TempMarks[0].paint(this.weatherToday.tempOut + " \u00B0C");    
    
    
    //Inside mark
    this.TempMarks[1].setSize(280, 200, 80, 40);
    this.TempMarks[1].paint(this.weatherToday.tempIn + " \u00B0C");
    
 }    
    

public paintBasic() {
    
   const ctx = this.ctx;

    //Draw image...
    /*
        var img:HTMLImageElement = new Image();
        img.src = this.weatherForecast.getImagePath();    
    */
        var img:HTMLImageElement = this.weatherToday.getImage();
        
        ctx.save();
        ctx.drawImage(img, forecastRect.x, forecastRect.y, forecastRect.width, forecastRect.heigth);
        ctx.restore();  
       // }

    
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
   ctx.fillText(this.weatherToday.windSpeed + " m/s", 320, 100);
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
   this.tmpInText.paint(this.weatherToday.tempIn + " \u00B0C");
    
    //Outside temperature    
   this.tmpOutText.copyFrom(this.tmpInText);    
   this.tmpOutText.x = 320;
   this.tmpOutText.y =  50;     
   this.tmpOutText.textAlign = "right";   
   this.tmpOutText.paint(this.weatherToday.tempOut + " \u00B0C");    
        
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
   ctx.arc(this.width / 2, this.height / 2 + 50, 120, 0, 2 * Math.PI, false); 
   ctx.lineWidth = 1;
   ctx.strokeStyle = circleColor;
   ctx.stroke();
   ctx.restore(); 
    
    if (appMode == Application.Watch) {
        
           ctx.save();
           ctx.beginPath();
           //ctx.rect(stopwatchAppRect.x, stopwatchAppRect.y, stopwatchAppRect.width, stopwatchAppRect.heigth);
           this.roundRect(stopwatchAppRect.x, stopwatchAppRect.y, stopwatchAppRect.width, stopwatchAppRect.heigth, 40) 
           ctx.fillStyle = "grey";
           ctx.fill();   
           ctx.lineWidth = 5;
           ctx.strokeStyle = transparentColor;
           ctx.stroke();
           ctx.restore();     
        
           ctx.save();
           ctx.font = 38 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
           ctx.textAlign = "left";
           ctx.textBaseline = "middle";
           ctx.fillStyle = whiteColor;          
           ctx.fillText("Stopwatch...", stopwatchAppRect.x + 40, stopwatchAppRect.y + 40);
           ctx.restore();                           
        }   
    
 }
          

private drawRadial (alpha: number, r1: number, r2: number, width1: number, width2: number, color: string) {
   let sin: number = Math.sin(alpha);
   let cos: number = Math.cos(alpha);
   let pm1X: number = this.centerX + sin * r1;
   let pm1Y: number = this.centerY - cos * r1;
   let pm2X: number = this.centerX + sin * r2;
   let pm2Y: number = this.centerY - cos * r2;
   let px: number[] = [];
   let py: number[] = [];
   px[0] = pm1X - cos * width1 / 2;
   py[0] = pm1Y - sin * width1 / 2;
   px[3] = pm1X + cos * width1 / 2;
   py[3] = pm1Y + sin * width1 / 2;
   px[1] = pm2X - cos * width2 / 2;
   py[1] = pm2Y - sin * width2 / 2;
   px[2] = pm2X + cos * width2 / 2;
   py[2] = pm2Y + sin * width2 / 2;
   this.drawFilledPolygon(px, py, color); }

private drawFilledPolygon (px: number[], py: number[], color: string) {
   const ctx = this.ctx;
   ctx.save();
   ctx.beginPath();
   ctx.moveTo(px[0], py[0]);
   for (let i = 1; i < px.length; i++) {
      ctx.lineTo(px[i], py[i]); }
   ctx.fillStyle = color;
   ctx.fill();
   ctx.restore(); }

private drawRadialFilledCircle (alpha: number, r1: number, circR: number, color: string) {
   const ctx = this.ctx;
   let p0X: number = this.centerX + Math.sin(alpha) * r1;
   let p0Y: number = this.centerY - Math.cos(alpha) * r1;
   ctx.save();
   ctx.beginPath();
   ctx.arc(p0X, p0Y, circR, 0, 2 * Math.PI);
   ctx.fillStyle = color;
   ctx.fill();
   ctx.restore(); }

private drawClockLabel() {
   const ctx = this.ctx;
   ctx.save();
   let fontSize: number = Math.round(this.r * 20 / 200);
   ctx.font = fontSize + "px Helvetica, sans-serif";
   ctx.textAlign = "center";
   ctx.textBaseline = "middle";
   ctx.fillStyle = borderColor;
   ctx.fillText(clockLabel, this.centerX, this.centerY + this.r / 2);
   ctx.restore(); }
    
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
        
} // end class ClockImagePainter
    
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



