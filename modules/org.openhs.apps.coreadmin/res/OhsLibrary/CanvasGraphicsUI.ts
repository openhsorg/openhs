

module CanvasGraphicsUI {
          
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
        
        public position (x: number, y: number) {
            this.x = x;
            this.y = y;
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

    
      
    export class Item {
        
        //Basic Rectangle...
        protected rect:     Rect = new Rect ();
        
        constructor () {
        }
        
        public paint (ctx: CanvasRenderingContext2D){                       
        }  
        
        public MouseDownHandler(x: number, y: number) {
            if (this.rect.isClicked(x, y)) {
                return this;
            } else {
                return null;
            }
        }        
        
        public MouseUpHandler(x: number, y: number) {
            return null;
        }
        
        public MouseMoveHandler(x: number, y: number) {
            return null;
        }       
        
        public Move (x: number, y: number) {
            this.rect.x = x;
            this.rect.y = y;
        }
        
        public Size (x: number, y: number, w: number, h: number) {
            this.rect.x = x;
            this.rect.y = y;
            this.rect.w = w;
            this.rect.h = h;
        }                               
    }
    
  export class ImageButton extends Item {
        
        private img:                HTMLImageElement    = new Image();
        private imgPush:            HTMLImageElement    = new Image();
                        
        protected border:           boolean             = false;
        protected push:             boolean             = false;
        
        protected int = null;
        
        
        constructor (imgSrc: string, imgPush: string, x: number, y: number, w: number, h: number) {
            super();            

            this.img.src = imgSrc;                          
            this.imgPush.src = imgPush;                                            
        //    this.border = false;
            
            this.rect.size(x, y, w, h);

        }    
        
        public paint (ctx: CanvasRenderingContext2D){

            ctx.save();

            if (this.push) {
                ctx.drawImage(this.imgPush, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            } else {
                ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            }
            
            ctx.restore();         
            
            if (this.border){
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue'; 
                ctx.stroke();           
                ctx.closePath();
                ctx.restore();  
            }            
        }        
    }         
    
      
    
    export class MessageBox extends Item {
        
        protected radius:   number = 4;
         
        constructor () {
            super ();
         
        }
        
        public paint (ctx: CanvasRenderingContext2D){
                                    
            //super.paint(ctx);
            ctx.save();
            ctx.beginPath();                        
            ctx.moveTo(this.rect.x + this.radius, this.rect.y);
            ctx.lineTo(this.rect.x + this.rect.w - this.radius, this.rect.y);
            ctx.quadraticCurveTo(this.rect.x + this.rect.w, this.rect.y, this.rect.x + this.rect.w, this.rect.y + this.radius);
            ctx.lineTo(this.rect.x + this.rect.w, this.rect.y + this.rect.h - this.radius);
            ctx.quadraticCurveTo(this.rect.x + this.rect.w, this.rect.y + this.rect.h, this.rect.x + this.rect.w - this.radius, this.rect.y + this.rect.h);
            ctx.lineTo(this.rect.x + this.radius, this.rect.y + this.rect.h);
            ctx.quadraticCurveTo(this.rect.x, this.rect.y + this.rect.h, this.rect.x, this.rect.y + this.rect.h - this.radius);
            ctx.lineTo(this.rect.x, this.rect.y + this.radius);
            ctx.quadraticCurveTo(this.rect.x, this.rect.y, this.rect.x + this.radius, this.rect.y);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue'; 
            ctx.stroke();    
            ctx.restore();                                  
        }                 
     }
        
    export class TextSimple extends Item {
        
        public fontSize:        number = 20; 
        public fontColor:       string = "#000000";
        public fontFamily:      string = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
        public textAlign:       string = "left";
        public textBaseline:    string = "middle"; 
        public bold:            boolean = false;   
                        
        protected text:         String;
        
        protected border:       boolean = false;
        
        constructor (txt: String, x: number, y: number, w: number, h: number){
            super ();
            
            this.text = txt;
            this.rect.x = x;
            this.rect.y = y;
            this.rect.w = w;
            this.rect.h = h;
        }
        
        public setText (txt: String) {
            this.text = txt.toString();            
        }
        
        public getText () {
            return this.text;
        }
                                
        public paint (ctx: CanvasRenderingContext2D) {    
            
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
            
            var boldString = '';
            
            if (this.bold) {
                boldString = 'bold ';
           }
            
            ctx.save();
            ctx.font = boldString + this.fontSize + this.fontFamily;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.fillStyle = this.fontColor;                                  
            ctx.fillText(this.text.toString(), x, y);
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
    
  
    export class NumberRounded extends TextSimple {
        
        
        protected colorInside           :string             = '#a6a6a6';
        protected colorText             :string             = '#ffffff';       
        public num                      :number             = 0;
        
        constructor () {
            super('', 0,0,0,0);  
            
            this.fontSize = 26;
            this.fontFamily = "px Tahoma, sans-serif";
            this.fontColor = this.colorText;
            this.textAlign = "center";
            this.textBaseline = "middle";  
            this.bold = true;
        }
        
        public center (cx: number, cy: number, w: number, h: number) {                        
            this.rect.size(cx - (w /2 ), cy - (h / 2), w, h);
        }              
        
        public SetNumber (num: number) {
            this.num = num;
            
            this.setText(this.num.toString());            
        }
        
        public paint (ctx: CanvasRenderingContext2D) {            
            
            if (this.num <= 0) {
                this.colorInside = '#a6a6a6';
            } else {
                this.colorInside = '#003399';
            }
            
            //Basic shape
            ctx.save();
            ctx.beginPath();            
            ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.colorInside;
            ctx.stroke();
            ctx.restore();    
            
            super.paint(ctx);
        }
        
    }    
    
    export class Button extends Item {
        
        public text:    TextSimple;
        
        constructor (txt: String) {
            super ();
            
             this.text = new TextSimple (txt, 30, 30, 250, 100);
        }
        
        public paint (ctx: CanvasRenderingContext2D){                       
        }  
        
        public MouseDownHandler(x: number, y: number) {
            return null;
        }        
        
        public MouseUpHandler(x: number, y: number) {
            return null;
        }
        
        public MouseMoveHandler(x: number, y: number) {
            return null;
        }           
                           
    }    
    
    export class ButtonImage extends Button {
        
        private img:                HTMLImageElement    = new Image();
        private imgPush:            HTMLImageElement    = new Image();
        
        constructor (imgSrc: string, imgPush: string) {            
            super ('');
            
            this.img.src = imgSrc;                          
            this.imgPush.src = imgPush;   
        }
        
        public paint (ctx: CanvasRenderingContext2D){  
                             
        }  
        
        public MouseDownHandler(x: number, y: number) {
            return null;
        }        
        
        public MouseUpHandler(x: number, y: number) {
            return null;
        }
        
        public MouseMoveHandler(x: number, y: number) {
            return null;
        }           
                           
    }        
   
    export class ImageStatic extends Item {                
        
        private img            :HTMLImageElement    = null;
        private imgSrc         :string              = '---';        
        public loaded          :boolean             = false;
        protected border       :boolean             = false;
        protected rectClicked  :Rect                = null;
        private radius: number = 0;
        
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
            
            ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            ctx.restore();         
            
            if (this.border){
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
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
                ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), 10, 0, 2 * Math.PI, false);
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
        
    
    }     
   
    export class Screen {

        public m_item:              Array <Item> =              null;
        private canvas:             HTMLCanvasElement =         null;   
        
        private message:            boolean = false;
        private msg:                MessageBox = new MessageBox ();
    
        constructor (canvas: HTMLCanvasElement) {
            
            this.canvas = canvas;
            this.m_item = new Array<Item>();
        }
        
        public add (item: Item) {
            this.m_item.push(item);        
        }
        
        public SetCanvas (canvas: HTMLCanvasElement) {
            this.canvas = canvas;
        
        }
        
        public GetSize(){            
            return {
                    width: this.canvas.width,
                    height: this.canvas.height
                    };
        }
 
        
        public MouseDownHandler(x: number, y: number) {
            for (let item of this.m_item) {
                let ret = item.MouseDownHandler(x, y);
                
                if (ret != null)  return ret;
            }              
            
            return null;
        }        
        
        public MouseUpHandler(x: number, y: number) {
            for (let item of this.m_item) {
                let ret = item.MouseUpHandler(x, y);       
                
                if (ret != null)  return ret;                                     
            }     
                        
            return null;
        }
        
        public MouseMoveHandler(x: number, y: number) {
            for (let item of this.m_item) {
                let ret = item.MouseMoveHandler(x, y);    
                
                if (ret != null)  return ret;                                        
            }     
                   
            return null;
        }   
        
        public MessagBox(text: String, type: number) {
            
            this.message = true;
            
        }
        
        public paint () {          
            const ctx = this.canvas.getContext('2d');
            var width: number = this.canvas.width;
            var height: number = this.canvas.height;    
            
            ctx.clearRect(0, 0, width, height);

            for (let item of this.m_item) {
                item.paint(ctx);                            
            }
        }         
    }   
    
    export class Frame {
        
        public m_screens:           Array <Screen>;// = new Array<Screen>();      
        private canvas:             HTMLCanvasElement;
        private ctx:                CanvasRenderingContext2D;          
        
        //Pointer to current screen...
        public m_curScreen:         Screen = null;
    
        constructor (canvas: HTMLCanvasElement) {     
        
      //   window.alert('--ttt---');
            
            this.canvas = canvas; 
            this.ctx = canvas.getContext("2d");  
            
            this.m_screens = new Array<Screen>();  
            
            var self = this;
            this.canvas.addEventListener('mousedown', function(event){self.MouseDownHandler(event);}, false);                      
            this.canvas.addEventListener('mouseup', function(event){self.MouseUpHandler(event);}, false);
            this.canvas.addEventListener('mousemove', function(event){self.MouseMoveHandler(event);}, false);                               
            
            requestAnimationFrame(()=>this.paint());   
                        
        }
        
        public paint () {       
        
            var benchmark: boolean = false;            
            
            if (benchmark) {
                
                /////**** Benchmark*****  
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Move registration point to the center of the canvas
                this.ctx.translate(this.canvas.width/2, this.canvas.width/2);
                
                // Rotate 1 degree
                this.ctx.rotate(Math.PI / 180);
                
                // Move registration point back to the top left corner of canvas
                this.ctx.translate(-this.canvas.width/2, -this.canvas.width/2);
                
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(this.canvas.width/4, this.canvas.width/4, this.canvas.width/2, this.canvas.height/4);
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(this.canvas.width/4, this.canvas.width/2, this.canvas.width/2, this.canvas.height/4);
                /////****************                
                
            } else {
                this.m_curScreen.paint();      
            }
            
            requestAnimationFrame(()=>this.paint());  
            
       }  
        
        private MouseMoveHandler (event){
           var mousePos = getMousePos(this.canvas, event);  
                                     
            if (this.m_curScreen != null) {                
                this.m_curScreen.MouseMoveHandler(mousePos.x, mousePos.y);
            } 
        }        
        
        private MouseDownHandler (event){                  
            var mousePos = getMousePos(this.canvas, event); 
            
            if (this.m_curScreen != null) {                
                this.m_curScreen.MouseDownHandler(mousePos.x, mousePos.y);
            }                        
        }
        
        private MouseUpHandler(event) {
            
            var mousePos = getMousePos(this.canvas, event);                           
            
            if (this.m_curScreen != null) {                
                this.m_curScreen.MouseUpHandler(mousePos.x, mousePos.y);
            } 
        }
                      
        public addItem (screen: Screen) {
            
           // screen.SetCanvas(this.canvas);
                        
            this.m_screens.push(screen);            
        }
        
    }

    //Function to get the mouse position
    function getMousePos(canvas, event) {
    
        var rect = canvas.getBoundingClientRect();
            
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
       
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }      
    
}