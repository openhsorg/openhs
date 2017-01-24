
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
        /*
        public width() {        
            return this.w;
        }
        
        public height() {        
            return this.h;
        }        
        */
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
            
    export class Text {
        
        private ctx:    CanvasRenderingContext2D;   
        public rect:   Rect;
    
        public fontSize:      number = 10; 
        public fontColor:     string = "#000000";
        public fontFamily:     string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:   string = "center";
        public textBaseline:   string = "middle";    

        constructor (ctx: CanvasRenderingContext2D, rect: Rect) {
            this.ctx = ctx;   
            this.rect = rect;   
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
    /*
        setSize (x: number, y: number, width: number, height: number) {            
            this.rect.x = x;
            this.rect.y = y;
            this.rect.setWidth(width);
            this.rect.setHeight(height);     
        }    
    */
        copyFrom(tx: Text) {        
            //this.rect = tx.rect;
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
        
        private ctx:    CanvasRenderingContext2D;  
        private rect:   Rect;
        
        constructor (ctx: CanvasRenderingContext2D, rect: Rect){            
            this.ctx = ctx;        
            this.rect = rect;                
        }
           
    }
    
    export class TempMark {
                   
        private ctx:    CanvasRenderingContext2D;       
        public x:  number = 0;
        public y:  number = 0;
        public width:  number = 0;  
        public height:  number = 0;    
    
        private txt:  Text;
    
        private img:HTMLImageElement = null;
        private imgLoaded: boolean;// = false;       
    
        constructor (ctx: CanvasRenderingContext2D, rect: Rect, src) {
            this.ctx = ctx;        
            this.x = rect.x;
            this.y = rect.y;
            this.width = rect.w;
            this.height = rect.h;              
            
            this.txt = new Text (ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            
            this.img = new Image();                                
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }      
        
        setSize (x: number, y: number, width: number, height: number) {
        
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;     
            
            this.txt.rect.x = x;
            this.txt.rect.y = y;
            this.txt.rect.setWidth(width);
            this.txt.rect.setHeight(height);    
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
}