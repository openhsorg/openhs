
/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>

module OhsCanvasGraphics {
    
import SiteData = OhsSiteData.SiteData;
import Floor = OhsSiteData.Floor;
import TemperatureSensor = OhsSiteData.TemperatureSensor;    
import Door = OhsSiteData.Door;
import Switch = OhsSiteData.Switch;
import Thing = OhsSiteData.Thing;     
    
    export class Graphics {
        
        private canvas:              HTMLCanvasElement;
        public ctx:                  CanvasRenderingContext2D;          
        
        private m_siteData: SiteData = null;
        
       // public m_iconsetRoomBkg: Iconset = null; //room images...
        
        private timerUpdateGraphics;
        
        constructor (canvas: HTMLCanvasElement, m_siteData: SiteData) {    
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");    
            
            //---Data---
            this.m_siteData = m_siteData;
            
            //---Graphics---                        
        //    this.m_iconsetRoomBkg = new Iconset (this.ctx, new Rect (0, 0, this.canvas.width, this.canvas.height));
            
           // this.m_iconsetRoomBkg = new Iconset();
            
            //---Timer---
           // this.timerUpdateGraphicsEvent(10000);
            
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
        
        public getFilteredMarks<T>(arg: Array<T>, filterPath: string):T[] {
            
            if (filterPath == null) {
                return arg;
                
            } else {
   
                 return arg.filter(function(element){
                     
                     var mark: Mark = (<Mark><any>element);
                     
                     if (mark.thing == null) {
                         return true;
                         
                     } else {
                         
                         return mark.thing.getPath().indexOf(filterPath) >= 0;                         
                     }
                 });                               
             }
        }   
        
        public getFilteredImage(array: Array<ImageRect>, src: string) {
            for (var i = 0; i < array.length; i++) {                                              
                if (array[i].getImageSrc() == src){                                                           
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
        
        constructor (x: number, y: number, w: number, h: number){                    
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        
        public isClicked (clx:number, cly:number) {                
            return (clx > this.x && clx < this.x+this.w && cly < this.y+this.h && cly > this.y);
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
        
        public paint(ctx: CanvasRenderingContext2D) {
          ctx.beginPath();
          ctx.rect(this.x, this.y, this.w, this.h);
          ctx.closePath();              
        }        
    }        
    
    export class RectRounded extends Rect {
        
        public radius: number = 0;
        
        constructor (x: number, y: number, w: number, h: number, radius: number){
            super(x, y, w, h);
            
            this.radius = radius;
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
        
        private img:HTMLImageElement = null;
        private imgSrc: string = '---';
        
        public loaded: boolean = false;
        
        constructor (x: number, y: number, w: number, h: number, radius: number, imgSrc: string) {
            super(x, y, w, h, radius);
            
            
            this.img = new Image();                                
         //   this.img.src = imgSrc;        
            
            this.img.onload = (event) => {
                  this.onImageLoad(event);
            }
                                               
            this.img.src = imgSrc;
            
            this.imgSrc = imgSrc;
        }
        
       private onImageLoad(event):void
        {
           this.loaded = true;
            //console.log("onImageLoad");
            //this.ir = true;
           //return true;
        }          
        
        public paint (ctx: CanvasRenderingContext2D){
            ctx.save();
            
            super.paint(ctx);
            if (this.radius != 0) {
                
                ctx.clip();
            }
            
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();            
        }
        
        public getImage() {
            return this.img;            
        }
        
        public getImageSrc() {
            return this.imgSrc;
        }
    }
    
    export class TextSimple extends Rect {
        
        public fontSize:      number = 20; 
        public fontColor:     string = "#000000";
        public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:   string = "center";
        public textBaseline:   string = "middle";    
                        
        protected text: string = '';
        
        protected border: boolean = false;
        
        constructor(x: number, y: number, w: number, h: number){
            super(x, y, w, h);
        }
                
        public painitText (ctx: CanvasRenderingContext2D, text: string){
            
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
                ctx.restore();
             }              
            
        }
    }
         
    /**
     * Graphical symbol...
     */
    export class Mark {
        
        protected   ctx:    CanvasRenderingContext2D;  
        public      rect:   Rect;
        
        public thing: Thing = null; //data
        
        constructor (ctx: CanvasRenderingContext2D, rect: Rect){                    
            this.ctx = ctx;        
            this.rect = new Rect (rect.x, rect.y, rect.w, rect.h);             
        }
        
        public equals (mark:   Mark){
            this.ctx = mark.ctx;
            this.rect.equals(mark.rect);
        }
        
        public setSize (rect:   Rect){
            this.rect.equals(rect);
        }  
        
        public isClicked (clx:number, cly:number) {                
            return this.rect.isClicked(clx, cly);        
        }        
    }
    
    export class Mark2 extends Rect {
        
        protected thing: Thing = null;
        
        protected colorIncideReady: string = '#a6a6a6';
        protected colorBorderReady: string = '#595959';
        
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
        }
        
        public setThing (thing: Thing) {
            this.thing = thing;            
        }
        
        public getThing() {
            return this.thing;
        }
    }
    
    export class DoorMark2 extends Mark2 {
        
        protected imgOpen:      ImageRect = null;
        protected imgClose:     ImageRect = null;
        protected imgLock:      ImageRect = null;
         
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgOpen = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/door_open.png');
            this.imgClose = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/door_close.png');            
            this.imgLock = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            
            this.size(x, y, w, h);
        }      
        
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var dx: number = 20;
            var dy: number = 20;
            
            this.imgOpen.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgClose.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgLock.size(x + dx, y + dy, w - dx, h - dy);              
        
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
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var door = this.getDoorThing();
                        
            if (door != null) {                                    
                //this.x = door.x;
                //this.y = door.y;
                this.size(door.x, door.y, 80, 80);                                  
            }
            
            this.paint(ctx);
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var door: Door = this.getDoorThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            var state: number = -1;
            
            if (door != null) {     
            
                state = door.getState();
            
                //logic of switch
                if (state == 0) {
                    colorInside = "#808080";  
                    colorBorder = "#00cc69";
                                                         
                } else if (state == 1) {
                    colorInside = "#ccffe6";
                    colorBorder = "#00cc69";              
                    
                } else if (state == 2) {
                    colorInside = "#ccffe6";
                    colorBorder = "#00cc69";                
                    
                } else if (state == 3) {
                    colorInside = "#ff8080";
                    colorBorder = "red";                
                    
                } else {
                    colorInside = "#808080"; 
                    
                }                             
            }
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = colorBorder;
            ctx.stroke();
            ctx.restore();   
            
           if (door != null) {     
            
                //logic of switch
                if (state == 0) {                    
                    this.imgClose.paint(ctx);                 
                    
                } else if (state == 1) {
                    this.imgOpen.paint(ctx);                  
                    
                } else if (state == 2) {
                    this.imgClose.paint(ctx);                   
                    
                } else if (state == 3) {
                    this.imgClose.paint(ctx);                 
                    this.imgLock.paint(ctx);                  
                    
                }                             
            }                        
        }
    }
    
    export class Icon extends Mark {
        
        private img:HTMLImageElement = null;
        protected border:    boolean = false; //debug border
        
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src: string) {
            super(ctx, rect);
            
            this.img = new Image();                                
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";   
        }    
        
        public paint () {   
            
            //Draw image...
         //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            this.ctx.restore();        
           // }            
            
            if (this.border){
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
    
    export class Iconset extends Mark {
        
        protected border:    boolean = false; //debug border        
        protected images: Array <HTMLImageElement>;
        protected imagesPaths: Array <String>;
        protected imagesReady: Array <boolean>;  
        
        protected ir: boolean = false;
        
        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {
            super(ctx, rect);
            
            this.images = new Array <HTMLImageElement>();
            this.imagesPaths = new Array <String>();
            this.imagesReady = new Array <boolean>();
        }    
        
        public setImages (imgPaths: Array<String>){   
        
            if (this.imagesReady.length < imgPaths.length) {
                this.imagesReady.push(false);
            }
            else {
                this.imagesReady.length = imgPaths.length;   
            }                 
            this.ir = false;
             
            //window.alert("Size:" + imgPaths.length);
            for (var i = 0; i < imgPaths.length; i ++) {
                
                this.imagesReady[i] = false;
                
                var img: HTMLImageElement = new Image();                         
                
                if (i < this.images.length) {
                    this.images[i] = img;
                }
                else {
                    this.images.push(img);    
                }
                
                if (i < this.imagesPaths.length) {
                    this.imagesPaths[i] = imgPaths[i].toString();
                }
                else {
                    this.imagesPaths.push(imgPaths[i].toString());    
                }                
            }    
            
            //load images....            
            for (let id in this.images) {                                
                
                this.images[id].onload = (event) => {
                        this.onImageLoad(event);
                 }
                                               
                this.images[id].src = imgPaths[id].toString();                                     
            }
                        
        }
        
        private onImageLoad(event):void
        {
            console.log("onImageLoad");
            this.ir = true;
        }        
        
        protected imageReady (img: HTMLImageElement, path: string) {
            img.src = path;
        }
        
        public getImages () {
            return this.images;
        }
        
        public getImagesPaths () {
            return this.imagesPaths;
        }        
        
        public paint (nImage: number) {               
            //Draw image... 
            var ret = false;           
            
         //   var image: HTMLImageElement = this.images[nImage];
            
            if (this.images[nImage] != null) {                                            
                if (this.images[nImage].onload) {
                    this.ctx.save(); 
                    this.ctx.drawImage(this.images[nImage], this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                    this.ctx.restore();  
                    
                    ret = true;
                }                                                                                                     
             }
            
                if (this.border){
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.lineWidth=2;
                    this.ctx.strokeStyle="blue";
                    this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                    this.ctx.stroke();
                    this.ctx.restore();
                 }       
            
            return ret;
         }                 
    }    
    
    export class Text extends Mark {
    
        public fontSize:      number = 10; 
        public fontColor:     string = "#000000";
        public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:   string = "center";
        public textBaseline:   string = "middle";    
        
        protected border:    boolean = false; //debug border

        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {
            super(ctx, rect);
        }          
    
        public paint (text: string) {        
        
            var x: number = this.rect.x;
            var y: number = this.rect.y;
            var align: String = this.textAlign.toString();
            var baseline: String = this.textBaseline.toString();
                        
            if(align == "right" || align == "end") {
                x = this.rect.x + this.rect.w;
            } else if (align == "center"){
                x = this.rect.x + (this.rect.w / 2);
            }
            
            if(baseline == "bottom" || baseline == "alphabetic") {
                y = this.rect.y + this.rect.h;
            } else if (baseline == "middle"){
                y = this.rect.y + (this.rect.h / 2);
            }            
            
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;                                  
            this.ctx.fillText(text, x, y);
            this.ctx.restore();   
            
            if (this.border){
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth=2;
                this.ctx.strokeStyle="red";
                this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                this.ctx.stroke();
                this.ctx.restore();
             }       
        }   

        public equals(tx: Text) {                    
            this.rect.equals(tx.rect);
            this.ctx = tx.ctx;
            this.fontSize = tx.fontSize;
            this.fontColor = tx.fontColor;
            this.fontFamily = tx.fontFamily;
            this.textAlign = tx.textAlign;
            this.textBaseline = tx.textBaseline;
        }
        
        public setSize (rect:   Rect){
            super.setSize(rect);
        }              
    }   
    
    export class TempMark2 extends Mark2 {
        
        protected imgThermometer:   ImageRect = null;
        protected imgFrost:         ImageRect = null;
        protected textTemp:         TextSimple = null;
        
        protected border: boolean = false;
                 
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgThermometer = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/tempSymbol.png');
            this.imgFrost = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/tempSymbol.png');      
            this.textTemp = new TextSimple(x, y, w, h);                  
            
            this.size(x, y, w, h);
        }      
        
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
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var tempSensor = this.getTemperatureSensorThing();
                        
            if (tempSensor != null) {                                    
                this.size(tempSensor.x, tempSensor.y, 80, 80);                                  
            }
            
            this.paint(ctx);
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var tempSensor: TemperatureSensor = this.getTemperatureSensorThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
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
                this.textTemp.painitText(ctx, "---");
                
            } else {
                this.textTemp.painitText(ctx, tempSensor.temp + ' \u00B0C');
            }                      
            
            if (this.border){
                ctx.save();
                super.paint(ctx);
                ctx.restore();
             }           
        }
    }    
    /*
    export class TempMark extends Mark {

        public txt:  Text;
    
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;     
        
        protected border:    boolean = false; //debug border
        
      //  private temp:   number = -100.0;
      //  private tempSensor: TemperatureSensor = null;
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 18;
            
            this.img = new Image();                                
            this.img.src = '/infores/servlets/kitchen/tempSymbol.png';              
        }      
        
        setSize (rect:  Rect) {                      
            super.setSize(rect);     
            this.txt.setSize(rect);                    
         }

        public setData (temp: TemperatureSensor){
            this.thing = <Thing> temp;
        }
        
        public getData () {
            return <TemperatureSensor> this.thing;
        }
            
        public paint () {          
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#ccffe6';
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();      
                    
            //this.rect.x = this.rect.x + 20;
            this.txt.rect.x = this.rect.x - 10;
            
            if (this.thing != null) {
                
                var thingSensor: TemperatureSensor = <TemperatureSensor> this.thing;
                
                this.txt.paint(thingSensor.temp + " \u00B0C");
            }
            
            //Draw image...
         //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x + (this.rect.w / 2) - 20, this.rect.y - 20, 40, 40);
            this.ctx.restore();        
           // }            
            
            if (this.border){
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
    */
    
     export class SwitchMark2 extends Mark2 {
        
        protected imgBulbOn:          ImageRect = null;
        protected imgBulbOff:         ImageRect = null;
       // protected textState:          TextSimple = null;
        
        protected border: boolean = false;
                 
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgBulbOn = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn.png');
            this.imgBulbOff = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff.png');      
         //   this.textState = new TextSimple(x, y, w, h);                  
            
            this.size(x, y, w, h);
        }      
        
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var dx: number = 1;
            var dy: number = 1;
            
            this.imgBulbOn.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgBulbOff.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));     
          // this.textState.size(x + 3 * dx, y + 2.5 * dy, 60, 30);                 
        
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
                this.size(swtch.x, swtch.y, 80, 80);                                  
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
                    this.imgBulbOn.paint(ctx);
                    
                } else if (swtch.getState() == 3) { //ON
                    this.imgBulbOn.paint(ctx);
                    
                } else if (swtch.getState() == 4) { //->OFF";
                    this.imgBulbOff.paint(ctx);
                    
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
    /*
    export class SwitchMark extends Mark {

     //   public switch: Switch = null;        
        private txt:  Text;   
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;    
        private colorButton: string = "#666699";    
        protected border:    boolean = false; //debug border        
            
        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.img = new Image();                                
            this.img.src = '/infores/servlets/kitchen/BulbSymbol.png';                    
        }                              
        
        setSize (rect:  Rect) {        
            super.setSize(rect);    
            this.txt.setSize(rect);                 
         }
        
        public setData (switchIn: Switch){
            this.thing = <Switch> switchIn;
        }
        
        public getData () {
            return <Switch> this.thing;
        }        
                    
        public paint () {      
        
            var switchVar: Switch = <Switch> this.thing;
            // Update this
            this.rect.x = switchVar.x;
            this.rect.y = switchVar.y;        
            
            this.txt.setSize(this.rect);
                
            var text: string = "---";    

            //logic of switch
            if (switchVar.getState() == 0) {
                this.colorButton = "#808080"; 
                text = "---";
            } else if (switchVar.getState() == 1) {
                this.colorButton = "#3333ff";
                text = "off";
            } else if (switchVar.getState() == 2) {
                this.colorButton = "#33cc33";
                text = "->on";
            } else if (switchVar.getState() == 3) {
                this.colorButton = "#ffaa00";
                text = "on";
            } else if (switchVar.getState() == 4) {
                this.colorButton = "#9999ff";
                text = "->off";
            } else {
                this.colorButton = "#808080"; 
                text = "---";
            }        
        
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.colorButton;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();      
                    
            this.txt.rect.x = this.rect.x - 10;
            this.txt.paint(text);
        
        //Draw image...
     //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x - 5, this.rect.y + 20, 40, 40);
            this.ctx.restore();        
       // }                        
            
            if (this.border){
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
    */
     
   /*
    export class DoorMark extends Mark {
    
        private imgOpen:HTMLImageElement = null;
        private imgClose:HTMLImageElement = null;
        private imgLock:HTMLImageElement = null;
        
        private colorButton: string = "white";
        private colorBorder: string = "black";     

        protected border:    boolean = true; //debug border
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {            
            super(ctx, rect);

            this.imgOpen = new Image();                                
            this.imgOpen.src = "/infores/servlets/kitchen/door_open.png";               
            
            this.imgClose = new Image();                                
            this.imgClose.src = "/infores/servlets/kitchen/door_close.png"; 
            
            this.imgLock = new Image();                                
            this.imgLock.src = "/infores/servlets/kitchen/padlock.png";     
            
        }      
        
        public setSize (rect:  Rect) {        
            super.setSize(rect);                
         }
        
        public setData (door: Door){
            this.thing = <Door> door;
           
        }
        
        public getData () {
            return <Door> this.thing;
        }          
        
        public paintByThing(w: number, h: number) {
             if (this.thing != null) {
                var doorVar: Door = <Door> this.thing;
                // Update this
                this.rect.x = doorVar.x;
                this.rect.y = doorVar.y;
                               
                var state = 0;
                 
                //Set state by door....
                if(doorVar.open) {
                    state = 1;
                } else {
                    if (!doorVar.locked) state = 2;
                    else state = 3;                
                }        
                 
            }
            
            this.paint(state);        
        }
    
        public paint (state: number) {                    
            
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 3, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.colorButton;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.colorBorder;
            this.ctx.stroke();
            this.ctx.restore();              
            
            //logic of switch
            if (state == 0) {
                this.colorButton = "#808080";  
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x - 5, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (state == 1) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgOpen, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (state == 2) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (state == 3) {
                this.colorButton = "#ff8080";
                this.colorBorder = "red";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();                  
                
                this.ctx.save();
                this.ctx.drawImage(this.imgLock, this.rect.x + 20 + 10, this.rect.y + 30, 20, 20);
                this.ctx.restore();                  
                
            } else {
                this.colorButton = "#808080"; 
                
            }        
                                        
            if (this.border){
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
    */
}