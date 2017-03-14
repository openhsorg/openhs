
/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>

module OhsCanvasGraphics {    

import Floor = OhsSiteData.Floor;
import TemperatureSensor = OhsSiteData.TemperatureSensor;    
import Door = OhsSiteData.Door;
import Window = OhsSiteData.Window;
import Switch = OhsSiteData.Switch;
import ContactSensor = OhsSiteData.ContactSensor;
import Thing = OhsSiteData.Thing;     
    
    export class Graphics {
        
        private canvas:              HTMLCanvasElement;
        public ctx:                  CanvasRenderingContext2D;                  
        private timerUpdateGraphics;
        
        constructor (canvas: HTMLCanvasElement) {    
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");    
            
        }
        
        public setNumber<T>(num:  number, arg: Array<T>, types: { new(ctx: CanvasRenderingContext2D, rect: Rect): T ;}, ctx: CanvasRenderingContext2D, rect: Rect) {
            if (num > arg.length) {            
                for (var i = arg.length; i < num; i++) {                    
                    var ss = new types(ctx, rect);
                    arg.push(ss);
                }
            } else if (num < arg.length) {            
                arg.length = num;             
            }   
        }  
        
        public setNumber2<T>(num:  number, arg: Array<T>, types: { new(x: number, y: number, w: number, h: number): T ;}, x: number, y: number, w: number, h: number) {
            if (num > arg.length) {            
                for (var i = arg.length; i < num; i++) {                    
                    var ss = new types(x, y, w, h);
                    arg.push(ss);
                }
            } else if (num < arg.length) {            
                arg.length = num;             
            }   
        }  
        
        public setNumber3<T>(num:  number, arg: Array<T>, types: { new(): T ;}) {
            if (num > arg.length) {            
                for (var i = arg.length; i < num; i++) {                    
                    var ss = new types();
                    arg.push(ss);
                }
            } else if (num < arg.length) {            
                arg.length = num;             
            }   
        }         
 
        public getFilteredImage(array: Array<ImageRect>, src: string) {
            for (var i = 0; i < array.length; i++) {                                         
                if (array[i].getImageSrc() == src){     
                //window.alert("A: " + array[i].getImageSrc() + "  B: " + src);                                                      
                    return array[i];                                   
                }
            }            
            return null;
        }
    }
                
    export class Rect {
                                       
        public x:  number = 0;
        public y:  number = 0;
        public w:  number = 0;    
        public h:  number = 0;
        
        public isClicked (clx:number, cly:number) {       
            if (!(clx > this.x && clx < this.x + this.w)) return false;
            if (!(cly < this.y+this.h && cly > this.y)) return false;
            
            return true;
            //return (clx > this.x && clx < this.x+this.w && cly < this.y+this.h && cly > this.y);
        }    
        
        public equals (rectI: Rect) {
            this.x = rectI.x;
            this.y = rectI.y;
            this.w = rectI.w;
            this.h = rectI.h;                
        }
        
        public size (x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        
        public sizeRect (rect: Rect){
            this.x = rect.x;
            this.y = rect.y;
            this.w = rect.w;
            this.h = rect.h;
        }
        
        public getSize () {
            var rect: Rect = new Rect ();
            
            rect.x = this.x;
            rect.y = this.y;
            rect.w = this.w;
            rect.h = this.h;
            
            return rect;        
        }
        
        public move (dx: number, dy: number){
            this.x = this.x + dx;
            this.y = this.y + dy;
        }
        
        public scaleSize (perc: number) {
            
            var old_w: number = this.w;
            var old_h: number = this.h;
            
            this.w = this.w * perc;
            this.h = this.h * perc;
            
            this.x = this.x + ((old_w - this.w) / 2);
            this.y = this.y + ((old_h - this.h) / 2);
        }        
        
        public paint(ctx: CanvasRenderingContext2D) {
          ctx.beginPath();
          ctx.rect(this.x, this.y, this.w, this.h);
          ctx.closePath();              
        }       
        
        public getRight () {
            return this.x + this.w;
        }
        
        public getBottom () {
            return this.y + this.h;
        }
    }        
    
    export class RectRounded extends Rect {
        
        public radius:          number = 0;
        
        public rad (rad: number){
            this.radius = rad;
        
        }

        public paint(ctx: CanvasRenderingContext2D) {
            
            if (this.radius == 0) {
                super.paint(ctx);
            } else {
                ctx.beginPath();                        
                ctx.moveTo(this.x + this.radius, this.y);
                ctx.lineTo(this.x + this.w - this.radius, this.y);
                ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.radius);
                ctx.lineTo(this.x + this.w, this.y + this.h - this.radius);
                ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.radius, this.y + this.h);
                ctx.lineTo(this.x + this.radius, this.y + this.h);
                ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.radius);
                ctx.lineTo(this.x, this.y + this.radius);
                ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
                ctx.closePath();
            }              
        }
    }
    
    export class ImageRect extends RectRounded {
        
        
        
        private img:            HTMLImageElement    = null;
        private imgSrc:         string              = '---';
        
        public loaded:          boolean             = false;
        protected border:       boolean             = false;
        
        protected rectClicked:  Rect = null;
        
        constructor (imgSrc: string) {
            super();            
            
            this.img = new Image();                                
            
            this.img.onload = (event) => {
                  this.onImageLoad(event);
            }
                                               
            this.img.src = imgSrc;            
            this.imgSrc = imgSrc;
        }
        
        private onImageLoad(event):void {        
           this.loaded = true;            
        }
        
        public setImage (path: string) {
            if (path != this.imgSrc) {
                
                this.img.src = path;            
                this.imgSrc = path;                                     
            }        
        }
                        
        public paint (ctx: CanvasRenderingContext2D){

            ctx.save();
            
            super.paint(ctx);
            if (this.radius != 0) {                
                ctx.clip();
            }
            
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();         
            
            if (this.border){
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.w, this.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            }            
        }
        
        protected paintPush (ctx: CanvasRenderingContext2D) {
        
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), 10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            
        }
        
        public getImage() {
            return this.img;            
        }
        
        public getImageSrc() {
            return this.imgSrc;
        }
        
        public MouseDownHandler(event, ctx: CanvasRenderingContext2D) {
        
            this.paint(ctx);
            this.paintPush (ctx);
            this.rectClicked = this.getSize();        
            
            window.setTimeout(() => this.paint(ctx), 200);
           // this.size(this.rectClicked.x * 0.2, this.rectClicked.y * 0.2, this.rectClicked.w * 0.2, this.rectClicked.h * 0.2);
            //this.paint(this.ctx);
        }   

        public MouseUpHandler(event, ctx: CanvasRenderingContext2D) {
            
            if (this.rectClicked != null) {                
              //  this.sizeRect(this.rectClicked);
                
             //   this.paint(ctx);
                this.rectClicked = null;
            }
        
        }        
        
    }
    
    export class ImageRect2 extends RectRounded {
        
        
        
        private img:            HTMLImageElement    = null;
        private imgSrc:         string              = '';
        
        public loaded:          boolean             = false;
        protected border:       boolean             = false;
        
        protected rectClicked:  Rect = null;
        
        constructor () {
            super();            
            
            this.img = new Image();                                   
        }
        
        private onImageLoad(event):void {        
           this.loaded = true;            
        }
        
        public setImage (path: string) {
            if (path != this.imgSrc) {
                
                this.img.src = path;            
                this.imgSrc = path;                                     
            }        
        }
                        
        public paint (ctx: CanvasRenderingContext2D){

            ctx.save();
            
            super.paint(ctx);
            if (this.radius != 0) {                
                ctx.clip();
            }
            
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();         
            
            if (this.border){
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.w, this.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            }            
        }
        
        protected paintPush (ctx: CanvasRenderingContext2D) {
        
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), 10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            
        }
        
        public getImage() {
            return this.img;            
        }
        
        public getImageSrc() {
            return this.imgSrc;
        }
        
        public MouseDownHandler(event, ctx: CanvasRenderingContext2D) {
        
            this.paint(ctx);
            this.paintPush (ctx);
            this.rectClicked = this.getSize();        
            
            window.setTimeout(() => this.paint(ctx), 200);
           // this.size(this.rectClicked.x * 0.2, this.rectClicked.y * 0.2, this.rectClicked.w * 0.2, this.rectClicked.h * 0.2);
            //this.paint(this.ctx);
        }   

        public MouseUpHandler(event, ctx: CanvasRenderingContext2D) {
            
            if (this.rectClicked != null) {                
              //  this.sizeRect(this.rectClicked);
                
             //   this.paint(ctx);
                this.rectClicked = null;
            }
        
        }        
        
    }    
    
    
    export class ImageButton extends RectRounded {
        
        private img:                HTMLImageElement    = new Image();
        private imgPush:            HTMLImageElement    = new Image();
                        
        protected border:           boolean             = false;
        protected push:             boolean             = false;
        
        protected int = null;
        
        
        constructor (imgSrc: string, imgPush: string) {
            super();            

            this.img.src = imgSrc;                          
            this.imgPush.src = imgPush;                     
            this.border = false;

        }    
        
        public paint (ctx: CanvasRenderingContext2D){

            ctx.save();

            if (this.push) {
                ctx.drawImage(this.imgPush, this.x, this.y, this.w, this.h);
            } else {
                ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            }
            
            ctx.restore();         
            
            if (this.border){
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.w, this.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            }            
        }

        public PushEvent (x: number, y: number) {
        
            if (this.isClicked(x, y)) {
                this.push = true;
                
                return true;
            }
            
            return false;
        }   

        public UpEvent(x: number, y: number) {
            
            if (this.push) {          
            
             //   window.setTimeout(() => this.closeEvent(ctx), 50);
                 this.push = false;
                return true;
            }
            
            return false;
        
        }       
        
        public getState () {
            return this.push;               
            
        }
        
    }    
    
    
    export class ImageRectArray extends RectRounded {
        
        protected array:        Array<ImageRect>    = new Array<ImageRect>();        
        protected border:       boolean             = false;
        
        public setImages (imgPaths: Array<String>){               
        
            for (let i = 0; i < imgPaths.length; i++) {
                
                if (this.array.length < i + 1) {                    
                    var img: ImageRect = new ImageRect(imgPaths[i].toString());
                    this.array.push(img);
                                    
                } else {
                    //Compare images...
                    if (imgPaths[i].toString() == this.array[i].getImageSrc()) {
                        // This images exists = do not load it again...
                    } else {
                        //Replace image on position 'i'
                        var img: ImageRect = new ImageRect(imgPaths[i].toString());
                        this.array.splice(i, 1, img);
                    }                    
                }                                 
            }
            
            //Check lenght of array and cut            
            if (this.array.length > imgPaths.length){
                this.array.length = imgPaths.length;
            }            
        }
        
        public paintImage (ctx: CanvasRenderingContext2D, nImage: number){
            if (!(nImage <= 0 || nImage > this.array.length)) {
            
                this.array[nImage].size(this.x, this.y, this.w, this.h);
                
                this.array[nImage].paint(ctx);            
            }
            
            if (this.border){
                ctx.save();
                super.paint(ctx);                
                ctx.lineWidth=2;
                ctx.strokeStyle="red";                
                ctx.stroke();
                ctx.restore();
             }  
        }
        
        public getImages () {
            return this.array;
        }
        
        public getImagesPaths () {
            var paths: Array<String> = new Array<String>();
            
            for (let id in this.array){            
                var str: string = this.array[id].getImageSrc();
                paths.push(str);
            }
            
            return paths;
        }         
    }

    export class TextSimple extends RectRounded {
        
        public fontSize:        number = 20; 
        public fontColor:       string = "#000000";
        public fontFamily:      string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:       string = "left";
        public textBaseline:    string = "middle";    
                        
        protected text:         string = '';
        
        protected border:       boolean = false;
                
        public paintText (ctx: CanvasRenderingContext2D, text: string){
            
            this.text = text;
            
            this.paint(ctx);            
        }
        
        public paint (ctx: CanvasRenderingContext2D) {            
            
            var x: number = this.x;
            var y: number = this.y;
            var align: String = this.textAlign.toString();
            var baseline: String = this.textBaseline.toString();
                        
            if(align == "right" || align == "end") {
                x = this.x + this.w;
            } else if (align == "center"){
                x = this.x + (this.w / 2);
            }
            
            if(baseline == "bottom" || baseline == "alphabetic") {
                y = this.y + this.h;
            } else if (baseline == "middle"){
                y = this.y + (this.h / 2);
            }            
            
            ctx.save();
            ctx.font = this.fontSize + this.fontFamily;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.fillStyle = this.fontColor;                                  
            ctx.fillText(this.text, x, y);
            ctx.restore();   
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();                   
                ctx.restore();
             }                          
        }

    }
    
    export class Mark extends Rect {
        
        protected thing                 :Thing              = null;        
        protected colorIncideReady      :string             = '#a6a6a6';
        protected colorBorderReady      :string             = '#595959';        
        protected imgError              :ImageRect          = new ImageRect ('/infores/servlets/kitchen/symbol_error.png');

        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            this.imgError.size(x, y, w, h);
        }        
        
        public setThing (thing: Thing) {
            this.thing = thing;                        
        }
        
        public getThing() {
            return this.thing;
        }
    }
    
    export class DoorMark extends Mark {
        
        protected imgOpen:      ImageRect = new ImageRect ('/infores/servlets/kitchen/door_open.png');
        protected imgClose:     ImageRect = new ImageRect ('/infores/servlets/kitchen/door_close.png');  
        protected imgLock:      ImageRect = new ImageRect ('/infores/servlets/kitchen/padlock.png');
 
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                        
            
            //Size of images
            
            var perc: number = 0.7;
            
            this.imgOpen.size(x, y, w, h);
            this.imgOpen.scaleSize(perc);
            
            this.imgClose.size(x, y, w, h);
            this.imgClose.scaleSize(perc);
            
            this.imgLock.size(x, y, w, h);
            this.imgLock.scaleSize(0.5);            
            
            /*
            var dx: number = 20;
            var dy: number = 20;
            
            this.imgOpen.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgClose.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgLock.size(x + dx, y + dy, w - dx, h - dy);  
              */                  
        }
        
        public getDoorThing() {
            var door: Door = null;
            
            if(this.thing) {
                if (this.thing instanceof Door){
                    door = <Door> this.thing;        
                }            
            }
            
            return door;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D, dx: number, dy: number, xScale: number, yScale: number) {
            
            var door = this.getDoorThing();
                        
            if (door != null) {                                    
                this.size((door.x * xScale) + dx - 30, (door.y * yScale) + dy - 30, 50, 50);                                       
            }
            
            this.paint(ctx);
        }
                      
        public paint (ctx: CanvasRenderingContext2D) {
            
            var door: Door = this.getDoorThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            var state: number = -1;
            
            if (door != null) {     
            
                colorInside = "#ccffe6";
                colorBorder = "#00cc69";                                                            
            }
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();   
            
           if (door != null) {     
            
               if (door.open) {
                   this.imgOpen.paint(ctx);                   
               } else {
                   this.imgClose.paint(ctx); 
                   
                   if (door.locked){
                       this.imgLock.paint(ctx); 
                   }                    
               }                                    
            }                        
        }
    }
    
    export class WindowMark extends Mark {
        
        protected imgOpen:      ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_windowOpen.png');
        protected imgClose:     ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_windowClosed.png');  
        protected imgLock:      ImageRect = new ImageRect ('/infores/servlets/kitchen/padlock.png');
        
     //   public m_switchArray:           Array<Switch> = null;
     //   public m_contactSensorArray:    Array<ContactSensor> = null;    
        
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                        
            
            //Size of images            
            var perc: number = 0.7;
            
            this.imgOpen.size(x, y, w, h);
            this.imgOpen.scaleSize(perc);
            
            this.imgClose.size(x, y, w, h);
            this.imgClose.scaleSize(perc);
            
            this.imgLock.size(x, y, w, h);
            this.imgLock.scaleSize(0.5);            
             
        }
        
        public getWindowThing() {
            var wnd: Window = null;
            
            if(this.thing) {
                if (this.thing instanceof Window){
                    wnd = <Window> this.thing;        
                }            
            }
            
            return wnd;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D, dx: number, dy: number, xScale: number, yScale: number) {
            
            var wnd = this.getWindowThing();
                        
            if (wnd != null) {                                    
                this.size((wnd.x * xScale) + dx - 30, (wnd.y * yScale) + dy - 30, 50, 50);                                   
            }
            
            this.paint(ctx);
        }
                      
        public paint (ctx: CanvasRenderingContext2D) {
            
            var wnd: Window = this.getWindowThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            var state: number = -1;
            
            if (wnd != null) {     
            
                colorInside = "#ccffe6";
                colorBorder = "#00cc69";                                                            
            }
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();   
            
           if (wnd != null) {     
            
               if (wnd.open) {
                   this.imgOpen.paint(ctx);                   
               } else {
                   this.imgClose.paint(ctx); 
                   
                   if (wnd.locked){
                       this.imgLock.paint(ctx); 
                   }                    
               }                                    
            }                        
        }
    }    

    export class TempMark extends Mark {
        
        protected imgThermometer:   ImageRect   = new ImageRect ('/infores/servlets/kitchen/tempSymbol.png');
        protected imgFrost:         ImageRect   = new ImageRect ('/infores/servlets/kitchen/tempSymbol.png');   
        protected textTemp:         TextSimple  = new TextSimple();
        
        protected border:           boolean     = false;
 
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                       
            
            var dx: number = 8;
            var dy: number = 8;
            
            this.imgThermometer.size(x - dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgFrost.size(x + dx - 3, y + dy, w - (2 * dx), h - (2 * dy));     
            this.textTemp.size(x + 3 * dx, y + 2.5 * dy, 60, 30);                 
        
        }
        
        public getTemperatureSensorThing() {
            var tempSensor: TemperatureSensor = null;
            
            if(this.thing) {
                if (this.thing instanceof TemperatureSensor){
                    tempSensor = <TemperatureSensor> this.thing;        
                }            
            }            
            return tempSensor;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D, dx: number, dy: number, xScale: number, yScale: number) {
            
            var tempSensor = this.getTemperatureSensorThing();
                        
            if (tempSensor != null) {                                                    
                this.size((tempSensor.x * xScale) + dx - 30, (tempSensor.y * yScale) + dy - 30, 50, 50);                             
            }
            
            this.paint(ctx);
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var tempSensor:         TemperatureSensor = this.getTemperatureSensorThing();
            
            var colorInside:        string = '#a6a6a6';
            var colorBorder:        string = '#595959';
            
            if (tempSensor != null){
                colorInside = '#ccffe6';
                colorBorder = '#196619';             
            }
                                                
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();      
            
            //Draw image...
            this.imgThermometer.paint(ctx);
                    
            //Draw temperature text
            if (tempSensor == null) {
                this.textTemp.paintText(ctx, "---");
                
            } else {
                this.textTemp.paintText(ctx, tempSensor.temp + ' \u00B0C');
            }                      
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.restore();
             }           
        }
    }    
    
    export class SwitchMark extends Mark {
        
        protected imgBulbOn:          ImageRect = new ImageRect ('/infores/servlets/kitchen/bulbOn.png');
        protected imgBulbOff:         ImageRect = new ImageRect ('/infores/servlets/kitchen/bulbOff.png'); 
        protected imgBulbOn_Off:      ImageRect = new ImageRect ('/infores/servlets/kitchen/bulbOn_Off.png');
        protected imgBulbOff_On:      ImageRect = new ImageRect ('/infores/servlets/kitchen/bulbOff_On.png');  
        
        protected border:             boolean   = false;
  
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgBulbOn.size(x, y, w, h);
            this.imgBulbOn.scaleSize(perc);
            
            this.imgBulbOff.size(x, y, w, h);
            this.imgBulbOff.scaleSize(perc);
            
            this.imgBulbOn_Off.size(x, y, w, h);
            this.imgBulbOn_Off.scaleSize(perc);         
            
            this.imgBulbOff_On.size(x, y, w, h);
            this.imgBulbOff_On.scaleSize(perc);                               
        
        }
        
        public getSwitchThing() {
            var swtch: Switch = null;
            
            if(this.thing) {
                if (this.thing instanceof Switch){
                    swtch = <Switch> this.thing;        
                }            
            }            
            return swtch;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D, dx: number, dy: number, xScale: number, yScale: number) {
            
            var swtch = this.getSwitchThing();
                        
            if (swtch != null) {                                                    
                this.size((swtch.x * xScale) + dx - 30, (swtch.y * yScale) + dy - 30, 50, 50);                                 
            }
            
            this.paint(ctx);
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var swtch: Switch = this.getSwitchThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            if (swtch != null){
                //Green status....
                colorInside = '#ccffe6';
                colorBorder = '#196619';                 
            }
            
            //Basic shape
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();      
                    
            //Draw temperature text
            if (swtch == null) {
                //this.imgBulbOff.paint(ctx);
                
            } else {

                //logic of switch
                if (swtch.getState() == 0) { //off-line
                    this.imgBulbOff.paint(ctx);
                    
                } else if (swtch.getState() == 1) { //OFF
                    this.imgBulbOff.paint(ctx);
                    
                } else if (swtch.getState() == 2) {//-> ON
                    this.imgBulbOff_On.paint(ctx);
                    
                } else if (swtch.getState() == 3) { //ON
                    this.imgBulbOn.paint(ctx);
                    
                } else if (swtch.getState() == 4) { //->OFF";
                    this.imgBulbOn_Off.paint(ctx);
                    
                } else {
                    this.imgBulbOff.paint(ctx);
                }                                                            
                
            }                      
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.restore();
             }           
        }
    }
    
    export class SwitchLockMark extends Mark {
        
        protected imgLockOn:          ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_lockOn.png');
        protected imgLockOff:         ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_lockOff.png'); 
        protected imgLockOn_Off:      ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_lockOn_Off.png');
        protected imgLockOff_On:      ImageRect = new ImageRect ('/infores/servlets/kitchen/symbol_lockOff_On.png');   
        
        protected border:             boolean   = false;
   
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgLockOn.size(x, y, w, h);
            this.imgLockOn.scaleSize(perc);
            
            this.imgLockOff.size(x, y, w, h);
            this.imgLockOff.scaleSize(perc);
            
            this.imgLockOn_Off.size(x, y, w, h);
            this.imgLockOn_Off.scaleSize(perc);         
            
            this.imgLockOff_On.size(x, y, w, h);
            this.imgLockOff_On.scaleSize(perc);                               
        
        }
        
        public getSwitchThing() {
            var swtch: Switch = null;
            
            if(this.thing) {
                if (this.thing instanceof Switch){
                    swtch = <Switch> this.thing;        
                }            
            }            
            return swtch;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var swtch = this.getSwitchThing();
                        
            if (swtch != null) {                                    
                this.size(swtch.x, swtch.y, 50, 50);                                  
            }
            
            this.paint(ctx);
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var swtch: Switch = this.getSwitchThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            if (swtch != null){
                //Green status....
                colorInside = '#ccffe6';
                colorBorder = '#196619';                 
            }
            
            //Basic shape
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();      
                    
            //Draw temperature text
            if (swtch == null) {
                //this.imgBulbOff.paint(ctx);
                
            } else {

                //logic of switch
                if (swtch.getState() == 0) { //off-line
                    this.imgLockOff.paint(ctx);
                    
                } else if (swtch.getState() == 1) { //OFF
                    this.imgLockOff.paint(ctx);
                    
                } else if (swtch.getState() == 2) {//-> ON
                    this.imgLockOff_On.paint(ctx);
                    
                } else if (swtch.getState() == 3) { //ON
                    this.imgLockOn.paint(ctx);
                    
                } else if (swtch.getState() == 4) { //->OFF";
                    this.imgLockOn_Off.paint(ctx);
                    
                } else {
                    this.imgLockOff.paint(ctx);
                }                                                            
                
            }                      
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.restore();
             }           
        }
    }    
    
    export class ContactSensorMark extends Mark {
        
        protected imgSensorOpen:            ImageRect   = new ImageRect ('/infores/servlets/kitchen/symbol_open.png');
        protected imgSensorClosed:          ImageRect   = new ImageRect ('/infores/servlets/kitchen/symbol_close.png');  
        protected imgSensorOff:             ImageRect   = new ImageRect ('/infores/servlets/kitchen/symbol_error.png'); 
        
        protected border:                   boolean     = false;

        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgSensorOpen.size(x, y, w, h);
            this.imgSensorOpen.scaleSize(perc);
            
            this.imgSensorClosed.size(x, y, w, h);
            this.imgSensorClosed.scaleSize(perc);
            
            this.imgSensorOff.size(x, y, w, h);
            this.imgSensorOff.scaleSize(perc);                                             
        }
        
        public getContactSensorThing() {
            var contact: ContactSensor = null;
            
            if(this.thing) {
                if (this.thing instanceof ContactSensor){
                    contact = <ContactSensor> this.thing;        
                }            
            }            
            return contact;
        }
        
        public paintByThing (ctx: CanvasRenderingContext2D, dx: number, dy: number, xScale: number, yScale: number) {
            
            var contact = this.getContactSensorThing();
                        
            if (contact != null) {                                                    
                this.size((contact.x * xScale) + dx - 30, (contact.y * yScale) + dy - 30, 50, 50);                                               
            }
            
            this.paint(ctx);
        }
        
        public getState () {
            var contact: ContactSensor = this.getContactSensorThing();
            
            if (contact != null && contact.isValid()) {
                return contact.getState();
            }
            
            return false;            
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var contact: ContactSensor = this.getContactSensorThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            if (contact != null){
                //Green status....
                colorInside = '#ccffe6';
                colorBorder = '#196619';                 
            }
            
            //Basic shape
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();      
                    
            //Draw sensor
            if (contact == null) {
                this.imgSensorOff.paint(ctx);
                
            } else {
                if (!contact.isValid()){
                    this.imgSensorOff.paint(ctx);
                } else {

                    //logic of switch
                    if (contact.getState()) { //open
                        this.imgSensorOpen.paint(ctx);
                        
                    } else { //closed
                        this.imgSensorClosed.paint(ctx);
                    }                      
                }                
            }                      
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.restore();
             }           
        }
    }    
}