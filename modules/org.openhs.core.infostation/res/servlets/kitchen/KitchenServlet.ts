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
        
var nextServlet = "";    
var stopwatchApp = false;    
    
export class Infoscreen {

private clockCanvas:         HTMLCanvasElement;
private staticImageCanvas:   HTMLCanvasElement;
ns: string;
aa : string;
    
element: JQuery;
span: JQuery;    
     

constructor (clockCanvas: HTMLCanvasElement, next: string) {
   this.clockCanvas = clockCanvas;
   this.ns = "/org.openhs.core.meteostation"; //next;
   this.timerEvent();
   //this.timerEventFast();
  //  window.setInterval(()=>this.timerEventFast(), 250); 
    
    nextServlet = next; //next;
        
    /*
   if (!Date.now) {
      Date.now = function() {
         return new Date().getTime(); }; }
   this.timerEvent();
    */ 
    
    clockCanvas.addEventListener('click',() => this.MouseClickHandler(event));
    
    /*
        clockCanvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(clockCanvas, evt);
        
            if (isInside(mousePos, stopwatchRect)) {
                
                //alert('STOPWATCH clicked...');
                
                stopwatchApp = true;
                
                this.paintTemp2();
                clicked = true;
                
            } else if (isInside(mousePos, stopwatchAppRect) && stopwatchApp) {               
                                               
                stopwatchApp = false;
                
                this.paintTemp2();
                
                clicked = true;
                                
            } else {
                //alert('clicked outside rect');
            }   
        }, false);      
*/
    }  
    
private timerEvent() {
   this.getData();
   this.paintTemp();    
   window.setTimeout(() => this.timerEvent(), 1000 * 3); 
} 

private paintTemp() {
    
   if (!this.staticImageCanvas || this.staticImageCanvas.width != this.clockCanvas.width || this.staticImageCanvas.height != this.clockCanvas.height) {
      this.createStaticImageCanvas(); }    
    
   this.clockCanvas.getContext("2d").drawImage(this.staticImageCanvas, 0, 0);
   new ImagePainter(this.clockCanvas).paintDynamicImage();
    
 }
    
private MouseClickHandler(event) {
    
    var mousePos = getMousePos(this.clockCanvas, event);

    if (isInside(mousePos, stopwatchRect)) {        
        stopwatchApp = true;
        
    } else if (isInside(mousePos, stopwatchAppRect) && stopwatchApp) {               
                                       
        stopwatchApp = false;
        
                                
    } else {
        //alert('clicked outside rect');
    } 
    
    this.paintTemp();
    
    /*
   if (!this.staticImageCanvas || this.staticImageCanvas.width != this.clockCanvas.width || this.staticImageCanvas.height != this.clockCanvas.height) {
      this.createStaticImageCanvas(); }    
    
   this.clockCanvas.getContext("2d").drawImage(this.staticImageCanvas, 0, 0);
   new ImagePainter(this.clockCanvas).paintDynamicImage();
    */
    
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
               // ni = parseInt(data['order']);
                tempIn = parseFloat(data['tempIn']);
                tempOut = parseFloat(data['tempOut']);
                timeString = data['time'];
                dateString = data['date'];               
                frostOutside = JSON.parse(data['frostOutside']);
                weatherSymbol = JSON.parse(data['weatherSymbol']);
                windSpeed = parseFloat(data['windSpeed']);                                                                                    
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
var tempIn = 0;
var tempOut = 0;
var timeString = "";
var dateString = "";
var frostOutside = false;
var frostOutsideString = "false"; 
var cloudPerc = 0.0;   
var weatherSymbol = 0; 
var windSpeed = 0;    

//Sunny image
var imgSunny = new Image(); 
imgSunny.src = '/infores/servlets/kitchen/sunny.png';
var imgSunnyLoaded = false;       
imgSunny.onload = function(){
  imgSunnyLoaded = true;
}

//Cloud Rain image    
var imgCloudRain = new Image();        
imgCloudRain.src = '/infores/servlets/kitchen/cloudRain.png';
var imgCloudRainLoaded = false;    
        
imgCloudRain.onload = function(){
  imgCloudRainLoaded = true;
}  
    
//Cloud Snow image    
var imgCloudSnow = new Image();        
imgCloudSnow.src = '/infores/servlets/kitchen/cloudSnow.png';
var imgCloudSnowLoaded = false;    
        
imgCloudSnow.onload = function(){
  imgCloudSnowLoaded = true;
}  
    
//Cloud Storm image    
var imgCloudStorm = new Image();        
imgCloudStorm.src = '/infores/servlets/kitchen/cloudStorm.png';
var imgCloudStormLoaded = false;    
        
imgCloudStorm.onload = function(){
  imgCloudStormLoaded = true;
}    
    
//Partial cloudy image    
var imgPartCloudy = new Image();        
imgPartCloudy.src = '/infores/servlets/kitchen/partcloudy.png';
var imgPartCloudyLoaded = false;    
        
imgPartCloudy.onload = function(){
  imgPartCloudyLoaded = true;
}  
    
//Cloudy image    
var imgCloudy = new Image();        
imgCloudy.src = '/infores/servlets/kitchen/cloudy.png';
var imgCloudyLoaded = false;    
        
imgCloudy.onload = function(){
  imgCloudyLoaded = true;
}      
        
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
   
   
        
class ImagePainter {

private ctx:                 CanvasRenderingContext2D;
private width:               number;
private height:              number;
private r:                   number;
private centerX:             number;
private centerY:             number;

constructor (canvas: HTMLCanvasElement) {
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

public paintDynamicImage() {
    /*
   let date: Date = new Date();
   let hour: number = date.getHours();
   let min:  number = date.getMinutes();
   let sec:  number = date.getSeconds();
   this.drawRadial(2 * Math.PI * ( (hour % 12) * 60 + min) / (12 * 60), -this.r * 10 / 44, this.r * 27 / 44, this.r * 5 / 44, this.r * 4 / 44, blackColor);
   this.drawRadial(2 * Math.PI * min / 60, -this.r * 10 / 44, this.r * 40 / 44, this.r * 9 / 88, this.r * 3 / 44, blackColor);
   this.drawRadial(2 * Math.PI * sec / 60, -this.r * 14 / 44, this.r * 27 / 44, this.r / 44, this.r / 44, secPtrColor);
   this.drawRadialFilledCircle(2 * Math.PI / 60 * sec, this.r * 27 / 44, this.r * 9 / 88, secPtrColor);
    */
    
   const ctx = this.ctx;
    
   var imageFcs = imgSunny;
   var imgLoaded = false;

    //Prediction
    if (weatherSymbol == 1) {
        imageFcs = imgSunny;
        imgLoaded = imgSunnyLoaded;
    } else if (weatherSymbol == 2) {
        imageFcs = imgPartCloudy;  
        imgLoaded = imgPartCloudyLoaded;
    } else if (weatherSymbol == 3) {
        imageFcs = imgCloudy;
        imgLoaded = imgCloudyLoaded;    
    } else if (weatherSymbol == 4) {
        imageFcs = imgCloudRain;  
        imgLoaded = imgCloudRainLoaded;
    } else if (weatherSymbol == 5) {
        imageFcs = imgCloudStorm;  
        imgLoaded = imgCloudStormLoaded;
    } else if (weatherSymbol == 6) {
        imageFcs = imgCloudSnow;  
        imgLoaded = imgCloudSnowLoaded;
    } else {
        imageFcs = imgSunny;
        imgLoaded = imgSunnyLoaded;
    }  
    
    //Draw image...
    if (imgLoaded) {     
        ctx.save();
        ctx.drawImage(imageFcs, 0, 0, 150, 150);
        ctx.restore();        
    }      
    
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
        
   //Outside temperature 
   ctx.save();
   ctx.font = fontSizeTempOut + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
   ctx.textAlign = "right";
   ctx.textBaseline = "middle";
   ctx.fillStyle = textColor;          
   ctx.fillText(tempOut + " \u00B0C", 320, 50);
   ctx.restore();  
    
    //Wind outside
   ctx.save();
   ctx.font = fontSizeWind + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
   ctx.textAlign = "right";
   ctx.textBaseline = "middle";
   ctx.fillStyle = textColor;          
   ctx.fillText(windSpeed + " m/s", 320, 100);
  // ctx.restore();          
    
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
   ctx.save();
   ctx.font = fontSizeTempIn + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
   ctx.textAlign = "center";
   ctx.textBaseline = "middle";
   ctx.fillStyle = textColor;          
   ctx.fillText(tempIn + " \u00B0C", (this.width / 2) , (this.height / 2) + 50);
   ctx.restore();       
    
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
    
    if (stopwatchApp) {
        
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



