
/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>

module OhsCanvasGraphics {    

import Floor = OhsSiteData.Floor;
import TemperatureSensor = OhsSiteData.TemperatureSensor;    
import Door = OhsSiteData.Door;
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
            
            this.img.onload = (event) => {
                  this.onImageLoad(event);
            }
                                               
            this.img.src = imgSrc;
            
            this.imgSrc = imgSrc;
        }
        
       private onImageLoad(event):void {
        
           this.loaded = true;            
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
    
    export class ImageRectArray extends RectRounded {
        
        protected array: Array<ImageRect> = null;
        
        protected border: boolean = false;
        
        constructor(x: number, y: number, w: number, h: number, radius: number) {
            super(x, y, w, h, radius);
            
            this.array = new Array<ImageRect>();
        }
        
        public setImages (imgPaths: Array<String>){               
        
            for (let i = 0; i < imgPaths.length; i++) {
                
                if (this.array.length < i + 1) {                    
                    var img: ImageRect = new ImageRect(0, 0, 0, 0, 0, imgPaths[i].toString());
                    this.array.push(img);
                                    
                } else {
                    //Compare images...
                    if (imgPaths[i].toString() == this.array[i].getImageSrc()) {
                        // This images exists = do not load it again...
                    } else {
                        //Replace image on position 'i'
                        var img: ImageRect = new ImageRect(0, 0, 0, 0, 0, imgPaths[i].toString());
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
    /*
    export class TextRich extends TextSimple {
        
        public borderWidth: number = 0; 
        
        constructor(x: number, y: number, w: number, h: number, rad: number){
            super(x, y, w, h);
            
            this.radius = rad;
        }        
        
    }
    */
    export class TextSimple extends RectRounded {
        
        public fontSize:      number = 20; 
        public fontColor:     string = "#000000";
        public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:     string = "center";
        public textBaseline:   string = "middle";    
                        
        protected text: string = '';
        
        protected border: boolean = false;
        
        constructor(x: number, y: number, w: number, h: number){
            super(x, y, w, h, 0);
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
        
        public equals (txtIn: TextSimple) {
            super.equals(txtIn);
            this.fontSize = txtIn.fontSize;
            this.fontColor = txtIn.fontColor;
            this.fontFamily = txtIn.fontFamily;
            this.textAlign = txtIn.textAlign;
            this.textBaseline = txtIn.textBaseline;
        }
    }
    
    export class Mark extends Rect {
        
        protected thing: Thing = null;
        
        protected colorIncideReady: string = '#a6a6a6';
        protected colorBorderReady: string = '#595959';
        
        protected imgError:          ImageRect = null;
        
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgError = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_error.png');
        }
        
        public setThing (thing: Thing) {
            this.thing = thing;            
        }
        
        public getThing() {
            return this.thing;
        }
    }
    
    export class DoorMark extends Mark {
        
        protected imgOpen:      ImageRect = null;
        protected imgClose:     ImageRect = null;
        protected imgLock:      ImageRect = null;
        
        public m_switchArray: Array<Switch> = null;
        public m_contactSensorArray: Array<ContactSensor> = null;
         
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgOpen = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/door_open.png');
            this.imgClose = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/door_close.png');            
            this.imgLock = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            
          //  this.m_switchArray = new Array<Switch>();
          //  this.m_contactSensorArray = new Array<ContactSensor>();
            
            this.size(x, y, w, h);
        }      
        
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
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var door = this.getDoorThing();
                        
            if (door != null) {                                    
                this.size(door.x, door.y, 60, 60);                                  
            }
            
            this.paint(ctx);
        }
        
        public getState() {
            
            var state: number = 0; //unknown...
            
            if (this.m_switchArray.length > 0 && this.m_contactSensorArray.length > 0) {
                
                if (this.m_contactSensorArray[0].getState()){ //Open
                    state = 1;                                    
                    
                } else { //close
                    state = 2;
                    
                    var lockState: number = this.m_switchArray[0].getState();
                    
                    if (lockState == 3) {
                        state = 3;                    
                    }    

                }
                
            }
                    
            return state;
        }
        
        public paint (ctx: CanvasRenderingContext2D) {
            
            var door: Door = this.getDoorThing();
            
            var colorInside: string = '#a6a6a6';
            var colorBorder: string = '#595959';
            
            var state: number = -1;
            
            if (door != null) {     
            
                state = this.getState(); //door.getState();
            
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
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, 2 * Math.PI, false);
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

    export class TempMark extends Mark {
        
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
                this.size(tempSensor.x, tempSensor.y, 60, 60);                                  
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
        
        protected imgBulbOn:          ImageRect = null;
        protected imgBulbOff:         ImageRect = null;
        protected imgBulbOn_Off:      ImageRect = null;
        protected imgBulbOff_On:      ImageRect = null;
        
        protected border: boolean = false;
                 
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgBulbOn = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn.png');
            this.imgBulbOff = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff.png');      
            this.imgBulbOn_Off = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn_Off.png');
            this.imgBulbOff_On = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff_On.png');      
            
            this.size(x, y, w, h);
        }      
        
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
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var swtch = this.getSwitchThing();
                        
            if (swtch != null) {                                    
                this.size(swtch.x, swtch.y, 60, 60);                                  
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
        
        protected imgLockOn:          ImageRect = null;
        protected imgLockOff:         ImageRect = null;
        protected imgLockOn_Off:      ImageRect = null;
        protected imgLockOff_On:      ImageRect = null;   
        
        protected border: boolean = false;
                 
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgLockOn = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOn.png');
            this.imgLockOff = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOff.png');      
            this.imgLockOn_Off = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOn_Off.png');
            this.imgLockOff_On = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOff_On.png');      
            
            this.size(x, y, w, h);
        }      
        
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
                this.size(swtch.x, swtch.y, 60, 60);                                  
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
        
        protected imgSensorOpen:            ImageRect = null;
        protected imgSensorClosed:          ImageRect = null;
        protected imgSensorOff:             ImageRect = null;
        
        protected border: boolean = false;
                 
        constructor (x: number, y: number, w: number, h: number){
            super(x, y, w, h);
            
            this.imgSensorOpen = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_open.png');
            this.imgSensorClosed = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_close.png');      
            this.imgSensorOff = new ImageRect (x, y, w, h, 0, '/infores/servlets/kitchen/symbol_error.png');              
            
            this.size(x, y, w, h);
        }      
        
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
        
        public paintByThing (ctx: CanvasRenderingContext2D) {
            
            var contact = this.getContactSensorThing();
                        
            if (contact != null) {                                    
                this.size(contact.x, contact.y, 60, 60);                                  
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