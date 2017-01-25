
/// <reference path="jquery.d.ts" />

module OhsCanvasGraphics {
                
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
            
    export class Text {
        
        private ctx:    CanvasRenderingContext2D;   
        public rect:    Rect;
    
        public fontSize:      number = 10; 
        public fontColor:     string = "#000000";
        public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:   string = "center";
        public textBaseline:   string = "middle";    

        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {
            this.ctx = ctx;               
            this.rect = new Rect (rect.x, rect.y, rect.w, rect.h);
        }          
    
        public paint (text: string) {        
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;          
            this.ctx.fillText(text, this.rect.x, this.rect.y);
            this.ctx.restore();                   
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
    
        getRect() {
            var rect = {
                 x:0,
                 y:0,
                 width:0,
                heigth:0
            };  
        
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;        
        
            if (this.textAlign == "center") {
                rect.x = this.rect.x - (this.rect.w / 2);
            } else if (this.textAlign == "right" || this.textAlign == "end") {
                rect.x = this.rect.x - this.rect.h;
            }
            
            if (this.textBaseline == "bottom") {
                rect.y = this.rect.y - this.rect.h;
            } else if (this.textBaseline == "middle") {
                rect.y = this.rect.y - (this.rect.h / 2);
            }        
            
            return rect;        
        }            
    }
             
    export class Mark {
        
        protected ctx:    CanvasRenderingContext2D;  
        protected rect:   Rect;
        
        constructor (ctx: CanvasRenderingContext2D, rect: Rect){            
            this.ctx = ctx;        
            this.rect = new Rect (rect.x, rect.y, rect.w, rect.h);             
        }
        
        public setSize (rect:   Rect){
            this.rect.equals(rect);
        }
        
        public isClicked (clx:number, cly:number) {                
            return (clx > this.rect.x && clx < this.rect.x + this.rect.w && cly < this.rect.y + this.rect.h && cly > this.rect.y);        
       }                           
    }
    
    export class TempMark extends Mark {

        private txt:  Text;
    
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;       
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.img = new Image();                                
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }      
        
        setSize (rect:  Rect) {        
            super.setSize(rect);            
            this.txt.rect.equals(rect);               
         }
    
        public paint (text: string) {      
    
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y, this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#ccffe6';
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();      
                    
            this.txt.rect.x = this.rect.x + 20;
            this.txt.paint(text);
            
            //Draw image...
         //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x - 8, this.rect.y - 20, 40, 40);
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
        
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;                
        
            return rect;        
        }             
    }          
    
    export class SwitchMark extends Mark {

        private txt:  Text;
    
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;    
        private colorButton: string = "#666699";    
        public state: number = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 

    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src) {            
            super(ctx, rect);

            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.img = new Image();                                
            this.img.src = src;           
        }      
        
        setSize (rect:  Rect) {        
            super.setSize(rect);            
            this.txt.rect.equals(rect);               
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
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y, this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.colorButton;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();      
                    
            this.txt.rect.x = this.rect.x + 30;
            this.txt.paint(text);
        
        //Draw image...
     //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x - 8, this.rect.y - 20, 40, 40);
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
        
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;                
        
            return rect;        
        }             
    }           
}