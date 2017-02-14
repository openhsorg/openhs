
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
        
        public m_tempMarks: Array<TempMark> = null;
        public m_switchMarks: Array<SwitchMark> = null;
        public m_doorMarks: Array<DoorMark> = null;
        public m_doorPictures: Array<Iconset> = null;    
        
        public m_iconsetRoomBkg: Iconset = null; //room images...
        
        private timerUpdateGraphics;
        
        constructor (canvas: HTMLCanvasElement, m_siteData: SiteData) {    
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");    
            
            //---Data---
            this.m_siteData = m_siteData;
            
            //---Graphics---            
            this.m_tempMarks = new Array<TempMark>();
            this.m_switchMarks = new Array<SwitchMark>();
            this.m_doorMarks = new Array<DoorMark>();   
            this.m_doorPictures = new Array<Iconset>();
            
            this.m_iconsetRoomBkg = new Iconset (this.ctx, new Rect (0, 0, this.canvas.width, this.canvas.height));
            
           // this.m_iconsetRoomBkg = new Iconset();
            
            //---Timer---
            this.timerUpdateGraphicsEvent(10000);
            
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
        
        private updateGraphics () {                      
            
            //Rooms
            var imgPaths: Array <String> = new Array <String> ();
            
            for (var id in this.m_siteData.rooms) {
                imgPaths.push(this.m_siteData.rooms[id].imageBkgPath);   
                
               // window.alert("updateGraphics: " + this.m_siteData.rooms[id].imageBkgPath);
            }
            
            this.m_iconsetRoomBkg.setImages(imgPaths);            
            
         // Doors images
            this.setNumber(this.m_siteData.doors.length, this.m_doorPictures, Iconset, this.ctx, new Rect (0, 0, 0, 0));
 
            for (let id in this.m_siteData.doors) {                  
                this.m_doorPictures[id].thing = <Thing> this.m_siteData.doors[id];    
                this.m_doorPictures[id].setImages(new Array<String>(this.m_siteData.doors[id].image_open, this.m_siteData.doors[id].image_close))
                //this.m_doorPictures[id].                                
            }              
            
            // Temperature
            this.setNumber(this.m_siteData.tempSensors.length, this.m_tempMarks, TempMark, this.ctx, new Rect (0, 0, 0, 0));
  
            for (let id in this.m_siteData.tempSensors) {
                this.m_tempMarks[id].setSize(new Rect (this.m_siteData.tempSensors[id].x, this.m_siteData.tempSensors[id].y, 80, 80));
                this.m_tempMarks[id].setData(this.m_siteData.tempSensors[id]);                                   
            }
            
            // Switches
            this.setNumber(this.m_siteData.switches.length, this.m_switchMarks, SwitchMark, this.ctx, new Rect (0, 0, 80, 80));

            for (let id in this.m_siteData.switches) {
                this.m_switchMarks[id].thing = <Thing> this.m_siteData.switches[id];
            }          
                    
            // Doors symbols
            this.setNumber(this.m_siteData.doors.length, this.m_doorMarks, DoorMark, this.ctx, new Rect (0, 0, 0, 0));
 
            for (let id in this.m_siteData.doors) {
                this.m_doorMarks[id].setSize(new Rect (this.m_siteData.doors[id].x, this.m_siteData.doors[id].y, 80, 80));
               // this.m_doorMarks[id].setState(this.m_siteData.doors[id].open, this.m_siteData.doors[id].locked);    
                this.m_doorMarks[id].thing = <Thing> this.m_siteData.doors[id];                    
            }       
            
               
        }        
        
        private timerUpdateGraphicsEvent(step : number) {     
           this.updateGraphics();  
           window.clearTimeout(this.timerUpdateGraphics);
           this.timerUpdateGraphics = window.setTimeout(() => this.timerUpdateGraphicsEvent(step), step); 
        }   
        
        public isClicked(x: number, y: number, filterPath: string) {
            
            var switches = this.getFilteredMarks(this.m_switchMarks, filterPath);
            
            for (let id in switches) {                
                if(switches[id].isClicked(x, y)) {
                    return <Thing> switches[id].getData();
                }
            }  
            
            var temps = this.getFilteredMarks(this.m_tempMarks, filterPath);
            
            for (let id in temps) {                
                if(temps[id].isClicked(x, y)) {
                    return <Thing> temps[id].getData();
                }
            }
            
            var doors = this.getFilteredMarks(this.m_doorMarks, filterPath);
            
            for (let id in doors) {                
                if(doors[id].isClicked(x, y)) {
                    return <Thing> doors[id].getData();
                }
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
    /*
    export class DoorMark extends Mark {
    
        private imgOpen:HTMLImageElement = null;
        private imgClose:HTMLImageElement = null;
        private imgLock:HTMLImageElement = null;
        
        private imgLoaded: boolean;// = false;    
        private colorButton: string = "white";
        private colorBorder: string = "black";     
        
        protected state: number = 0; // 0- unknown, 1- open, 2- closed,  3- locked 

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
        
        public setState (open: boolean, lock: boolean) {
            if (open) this.state = 1;
            else {
                if (!lock) this.state = 2;
                else {
                    this.state = 3;
                }    
            }                                              
        }
    
        public paint () {      
        
            if (this.thing != null) {
                var doorVar: Door = <Door> this.thing;
                // Update this
                this.rect.x = doorVar.x;
                this.rect.y = doorVar.y;
            }                 
            
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
            if (this.state == 0) {
                this.colorButton = "#808080";  
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x - 5, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (this.state == 1) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgOpen, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (this.state == 2) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();                   
                
            } else if (this.state == 3) {
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
}