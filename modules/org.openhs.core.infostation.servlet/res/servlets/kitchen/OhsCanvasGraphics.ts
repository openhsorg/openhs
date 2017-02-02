
/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>

module OhsCanvasGraphics {
    
import SiteData = OhsSiteData.SiteData;
import Floor = OhsSiteData.Floor;
import TemperatureSensor = OhsSiteData.TemperatureSensor;    
import Door = OhsSiteData.Door;
import Switch = OhsSiteData.Switch;         
                
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
        
        private temp:   number = -100.0;
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 18;
            
            this.img = new Image();                                
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }      
        
        setSize (rect:  Rect) {                      
            super.setSize(rect);     
            this.txt.setSize(rect);                    
         }
        
        setTemp (temp: number) {
            this.temp = temp;    
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
            this.txt.paint(this.temp + " \u00B0C");
            
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

        public switch: Switch = null;        
        private txt:  Text;   
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;    
        private colorButton: string = "#666699";    
        protected border:    boolean = false; //debug border        
            
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.img = new Image();                                
            this.img.src = src;                    
        }                              
        
        setSize (rect:  Rect) {        
            super.setSize(rect);    
            this.txt.setSize(rect);                 
         }
                    
        public paint () {      
        
            // Update this
            this.rect.x = this.switch.x;
            this.rect.y = this.switch.y;        
            
            this.txt.setSize(this.rect);
                
            var text: string = "---";    

            //logic of switch
            if (this.switch.getState() == 0) {
                this.colorButton = "#808080"; 
                text = "---";
            } else if (this.switch.getState() == 1) {
                this.colorButton = "#3333ff";
                text = "off";
            } else if (this.switch.getState() == 2) {
                this.colorButton = "#33cc33";
                text = "->on";
            } else if (this.switch.getState() == 3) {
                this.colorButton = "#ffaa00";
                text = "on";
            } else if (this.switch.getState() == 4) {
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
    
    export class DoorMark extends Mark {

       // private txt:  Text;
    
        private imgOpen:HTMLImageElement = null;
        private imgClose:HTMLImageElement = null;
        private imgLock:HTMLImageElement = null;
        
        private imgLoaded: boolean;// = false;    
        private colorButton: string = "black";
        private colorBorder: string = "black";     
        
        protected state: number = 0; // 0- unknown, 1- open, 2- closed,  3- locked 

        protected border:    boolean = false; //debug border
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {            
            super(ctx, rect);
/*
            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            */
            
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
}