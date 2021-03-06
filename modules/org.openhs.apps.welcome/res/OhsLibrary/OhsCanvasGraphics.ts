
/// <reference path="jquery.d.ts" />

module OhsCanvasGraphics {    

//import SiteData =  OhsSiteData.SiteData;
import Floor = OhsSiteData.Floor;
import TemperatureSensor = OhsSiteData.TemperatureSensor;    
import Door = OhsSiteData.Door;
import Window = OhsSiteData.Window;
import Switch = OhsSiteData.Switch;
import ContactSensor = OhsSiteData.ContactSensor;
import Thing = OhsSiteData.Thing;    
    
const imageDestroy       = '/wres/images/destroy.png';    
    
    export class Graphics {
        
        private canvas:              HTMLCanvasElement;
        public ctx:                  CanvasRenderingContext2D;           
        private timerUpdateGraphics;
        
        public textA:            TextSimple      = new TextSimple();
        public textB:            TextSimple      = new TextSimple();
        public textC:            TextSimple      = new TextSimple();
        public textD:            TextSimple      = new TextSimple();
        public textE:            TextSimple      = new TextSimple();    
        
        
        constructor (canvas: HTMLCanvasElement) {    
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");    
            
            this.setTextTempate ();
            
           // this.m_siteData = siteData;                        
        }
        
        public setTextTempate () {
            
            //Text A
            this.textA.fontSize = 24;
            this.textA.fontFamily = "px Tahoma, sans-serif";
            this.textA.fontColor = '#00adc1';
            this.textA.textAlign = "left";
            this.textA.textBaseline = "middle";  
            
            //Text B
            this.textB.fontSize = 40;
            this.textB.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textB.fontColor = '#000000';
            this.textB.textAlign = "right";
            this.textB.textBaseline = "middle";        
            
            //Text C
            this.textC.fontSize = 20;
            this.textC.fontFamily = "px Tahoma, sans-serif";
            this.textC.fontColor = '#00adc1';
            this.textC.textAlign = "left";
            this.textC.textBaseline = "middle";         
            
            //Text D
            this.textD.fontSize = 15;
            this.textD.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textD.fontColor = '#000000';
            this.textD.textAlign = "left";
            this.textD.textBaseline = "middle";               
        
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
    
    export class Point2D {
        
        public x:   number = 0.0;
        public y:   number = 0.0;
        
        public constructor (x: number, y: number) {
            this.x = x;
            this.y = y;        
        }      
        
        public setPoint (pt: Point2D) {
            this.x = pt.x;
            this.y = pt.y;
            
        }        
        
    }
    
    export class Triangle {
                                       
        public a: Point2D = new Point2D(0, 0);
        public b: Point2D = new Point2D(0, 0);
        public c: Point2D = new Point2D(0, 0);
        
        public fillColor = '#FFCC00';
        public strokeColor = '#666666';
        public widthLine = 0;
        
        setTriangle (a: Point2D, b: Point2D, c: Point2D) {
            this.a.setPoint(a);
            this.b.setPoint(b);
            this.c.setPoint(c);                    
        }    
        
        public paint(ctx: CanvasRenderingContext2D) {     
               
            ctx.beginPath();
            
            ctx.moveTo(this.a.x, this.a.y);
            ctx.lineTo(this.b.x, this.b.y);
            ctx.lineTo(this.c.x, this.c.y);
            
            ctx.closePath();            
    
            ctx.fillStyle = this.fillColor;
            ctx.fill();     
            
            ctx.lineWidth = this.widthLine;
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
                 
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
    /*
    export class ImageRect extends RectRounded {
                        
        private img            :HTMLImageElement    = null;
        private imgSrc         :string              = '---';
        
        public loaded          :boolean             = false;
        protected border       :boolean             = false;
        
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
        }   

        public MouseUpHandler(event, ctx: CanvasRenderingContext2D) {
            
            if (this.rectClicked != null) {                

                this.rectClicked = null;
            }        
        }                
    }
    */
    
    export class ImageRect extends RectRounded {                
        
        private img            :HTMLImageElement    = null;
        private imgSrc         :string              = '---';        
        public loaded          :boolean             = false;
        protected border       :boolean             = false;
        protected rectClicked  :Rect                = null;
        
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
        }   

        public MouseUpHandler(event, ctx: CanvasRenderingContext2D) {
            
            if (this.rectClicked != null) {                
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
                    var img: ImageRect = new ImageRect();
                    img.setImage(imgPaths[i].toString());
                    this.array.push(img);
                                    
                } else {
                    //Compare images...
                    if (imgPaths[i].toString() == this.array[i].getImageSrc()) {
                        // This images exists = do not load it again...
                    } else {
                        //Replace image on position 'i'
                        var img: ImageRect = new ImageRect();
                        img.setImage(imgPaths[i].toString());
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
        public bold:            boolean = false;   
                        
        protected text:         string = '';
        
        protected border:       boolean = false;
        
        public setText (txt: String) {
            this.text = txt.toString();
            
        }
        
        public getText () {
            return this.text;
        }
                
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
            
            var boldString = '';
            
            if (this.bold) {
                boldString = 'bold ';
           }
            
            ctx.save();
            ctx.font = boldString + this.fontSize + this.fontFamily;
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
        
        public copyStyle (origin: TextSimple){
            
            this.fontSize = origin.fontSize; 
            this.fontColor = origin.fontColor;
            this.fontFamily = origin.fontFamily;
            this.textAlign = origin.textAlign;
            this.textBaseline = origin.textBaseline;
            this.bold = origin.bold; 
        }

    }
    
    export class Mark extends Rect {
        
        protected thing                 :Thing              = null;        
        protected colorIncideReady      :string             = '#a6a6a6';
        protected colorBorderReady      :string             = '#595959';        
        protected imgError              :ImageRect         = new ImageRect ();

        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            this.imgError.setImage('/infores/servlets/kitchen/symbol_error.png');
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
        
        protected imgOpen:      ImageRect = new ImageRect ();
        protected imgClose:     ImageRect = new ImageRect ();  
        protected imgLock:      ImageRect = new ImageRect ();
 
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                        
            
            var perc: number = 0.7;
            
            this.imgOpen.setImage('/infores/servlets/kitchen/door_open.png');
            this.imgOpen.size(x, y, w, h);
            this.imgOpen.scaleSize(perc);
            
            this.imgClose.setImage('/infores/servlets/kitchen/door_close.png');
            this.imgClose.size(x, y, w, h);
            this.imgClose.scaleSize(perc);
            
            this.imgLock.setImage('/infores/servlets/kitchen/padlock.png');
            this.imgLock.size(x, y, w, h);
            this.imgLock.scaleSize(0.5);            
                  
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
                this.size((door.posX * xScale) + dx - 30, (door.posY * yScale) + dy - 30, 50, 50);                                       
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
        
        protected imgOpen:      ImageRect = new ImageRect ();
        protected imgClose:     ImageRect = new ImageRect ();  
        protected imgLock:      ImageRect = new ImageRect ();  
        
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                        
            
            //Size of images            
            var perc: number = 0.7;
            
            this.imgOpen.setImage('/infores/servlets/kitchen/symbol_windowOpen.png');
            this.imgOpen.size(x, y, w, h);
            this.imgOpen.scaleSize(perc);
            
            this.imgClose.setImage('/infores/servlets/kitchen/symbol_windowClosed.png');
            this.imgClose.size(x, y, w, h);
            this.imgClose.scaleSize(perc);
            
            this.imgLock.setImage('/infores/servlets/kitchen/padlock.png');
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
                this.size((wnd.posX * xScale) + dx - 30, (wnd.posY * yScale) + dy - 30, 50, 50);                                   
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
        
        protected imgThermometer:   ImageRect   = new ImageRect ();
        protected imgFrost:         ImageRect   = new ImageRect ();   
        protected textTemp:         TextSimple  = new TextSimple();
        
        protected border:           boolean     = false;
 
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);                       
            
            var dx: number = 8;
            var dy: number = 8;
            
            this.imgThermometer.setImage('/infores/servlets/kitchen/tempSymbol.png');
            this.imgThermometer.size(x - dx, y + dy, w - (2 * dx), h - (2 * dy));
            
            this.imgFrost.setImage('/infores/servlets/kitchen/tempSymbol.png');
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
                this.size((tempSensor.posX * xScale) + dx - 30, (tempSensor.posY * yScale) + dy - 30, 50, 50);                             
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
        
        protected imgBulbOn:          ImageRect = new ImageRect ();
        protected imgBulbOff:         ImageRect = new ImageRect (); 
        protected imgBulbOn_Off:      ImageRect = new ImageRect ();
        protected imgBulbOff_On:      ImageRect = new ImageRect ();  
        
        protected border:             boolean   = false;
  
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgBulbOn.setImage('/infores/servlets/kitchen/bulbOn.png');
            this.imgBulbOn.size(x, y, w, h);
            this.imgBulbOn.scaleSize(perc);
            
            this.imgBulbOff.setImage('/infores/servlets/kitchen/bulbOff.png');
            this.imgBulbOff.size(x, y, w, h);
            this.imgBulbOff.scaleSize(perc);
            
            this.imgBulbOn_Off.setImage('/infores/servlets/kitchen/bulbOn_Off.png');
            this.imgBulbOn_Off.size(x, y, w, h);
            this.imgBulbOn_Off.scaleSize(perc);         
            
            this.imgBulbOff_On.setImage('/infores/servlets/kitchen/bulbOff_On.png');
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
                this.size((swtch.posX * xScale) + dx - 30, (swtch.posY * yScale) + dy - 30, 50, 50);                                 
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
        
        protected imgLockOn:          ImageRect = new ImageRect ();
        protected imgLockOff:         ImageRect = new ImageRect (); 
        protected imgLockOn_Off:      ImageRect = new ImageRect ();
        protected imgLockOff_On:      ImageRect = new ImageRect ();   
        
        protected border:             boolean   = false;
   
        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgLockOn.setImage('/infores/servlets/kitchen/symbol_lockOn.png');
            this.imgLockOn.size(x, y, w, h);
            this.imgLockOn.scaleSize(perc);
            
            this.imgLockOff.setImage('/infores/servlets/kitchen/symbol_lockOff.png');
            this.imgLockOff.size(x, y, w, h);
            this.imgLockOff.scaleSize(perc);
            
            this.imgLockOn_Off.setImage('/infores/servlets/kitchen/symbol_lockOn_Off.png');
            this.imgLockOn_Off.size(x, y, w, h);
            this.imgLockOn_Off.scaleSize(perc);         
            
            this.imgLockOff_On.setImage('/infores/servlets/kitchen/symbol_lockOff_On.png');
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
                this.size(swtch.posX, swtch.posY, 50, 50);                                  
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
        
        protected imgSensorOpen:            ImageRect   = new ImageRect ();
        protected imgSensorClosed:          ImageRect   = new ImageRect ();  
        protected imgSensorOff:             ImageRect   = new ImageRect (); 
        
        protected border:                   boolean     = false;

        public size (x: number, y: number, w: number, h: number) {
            super.size(x, y, w, h);
            
            var perc: number = 0.9;
            
            this.imgSensorOpen.setImage('/infores/servlets/kitchen/symbol_open.png');
            this.imgSensorOpen.size(x, y, w, h);
            this.imgSensorOpen.scaleSize(perc);
            
            this.imgSensorClosed.setImage('/infores/servlets/kitchen/symbol_close.png');
            this.imgSensorClosed.size(x, y, w, h);
            this.imgSensorClosed.scaleSize(perc);
            
            this.imgSensorOff.setImage('/infores/servlets/kitchen/symbol_error.png');
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
                this.size((contact.posX * xScale) + dx - 30, (contact.posY * yScale) + dy - 30, 50, 50);                                               
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
    
    export class NumberMark extends Rect {
                       
        protected colorInside           :string             = '#a6a6a6';
        protected colorText             :string             = '#ffffff';       
        public numberText               :TextSimple         = new TextSimple (); 
        
        public center (cx: number, cy: number, w: number, h: number) {                        
            super.size(cx - (w /2 ), cy - (h / 2), w, h);
        }        
        
        public paintNum (ctx: CanvasRenderingContext2D, num: number) {    
        
            if (num <= 0) {
                this.colorInside = '#a6a6a6';
            } else {
                this.colorInside = '#003399';
            }
            
            //Basic shape
            ctx.save();
            ctx.beginPath();            
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.colorInside;
            ctx.stroke();
            ctx.restore();    
            
            //Number
            //Time       
            this.numberText.fontSize = 22;
            this.numberText.fontFamily = "px Tahoma, sans-serif";
            this.numberText.fontColor = this.colorText;
            this.numberText.textAlign = "left";
            this.numberText.textBaseline = "middle";  
            this.numberText.size(this.x + (this.w / 2) - 6, this.y + (this.h / 2) - 6, 10, 10);        
            this.numberText.paintText(ctx, num.toString());              
                                       
        }        

    }     
    
    export class DlgNumbers {
        
        protected m_rectRounded:    RectRounded     = new RectRounded ();
        protected m_rectNumber:     Array<Rect>     = new Array<Rect>();
        protected m_textNumbers:    TextSimple      = new TextSimple ();
        
        constructor () {     
            this.setSize (9);     
            
            this.m_textNumbers.fontSize = 18;
            this.m_textNumbers.fontFamily = "px sans-serif";
            this.m_textNumbers.fontColor = '#196619';
            this.m_textNumbers.textAlign = "left";
            this.m_textNumbers.textBaseline = "middle";               
                        
        }
        
        public setSize (num: number) {
            
            this.m_rectNumber.length = 0;
            
            for (var i = 0; i < num; i++) {
                this.m_rectNumber.push(new Rect());            
            }        
        }
        
        public getSize () {
            return this.m_rectNumber.length;
        
        }
        
        public MouseUpHandler(mx: number, my: number) {
            
            var i = 1;
            
            for (let item of this.m_rectNumber) {
                if (item.isClicked(mx, my)) {
                    return i;                
                }
                
                i++;
            }            
            
            return -1;
        }
        
        public paint (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
            this.organize(x, y, width, height);
            
            this.m_rectRounded.paint(ctx);
            
            ctx.fillStyle = '#6666ff';
            ctx.fill();              
            
            var i = 1;
            
            for (let item of this.m_rectNumber) {
                
                item.paint(ctx);                                       
                
                ctx.fillStyle = '#FFCC00';
                ctx.fill();     
                
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#666666';
                ctx.stroke();  
                
                this.m_textNumbers.size(item.x + (item.w / 2) - 5, item.y + (item.h / 2) - 5, 50, 30);
                this.m_textNumbers.paintText(ctx, '' + i);
                
                i ++;
            }
        
        }                        
        
        public organize (x: number, y: number, width: number, height: number){
            
            var d = 20;
            
            //Rect rounded
            this.m_rectRounded.size(x, y, d + (3 * (width + d)), d + (3 * (height + d))); 
            this.m_rectRounded.radius = 10;                                               
            
            var i = 1;
            var nColumn = 0;
            var nRow = 0;                        
            
            for (let item of this.m_rectNumber) {
                
                item.size(x + d + (nColumn * (width + d)), y + d + (nRow * (height + d)), width, height);
                                
                if (nColumn == 2) {                     
                    nColumn = 0;
                    nRow ++;
                                    
                } else {                
                    nColumn++;
                }                
            }
        
        }
    }
    
    
}