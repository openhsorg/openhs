/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>
var OhsCanvasGraphics;
(function (OhsCanvasGraphics) {
    var TemperatureSensor = OhsSiteData.TemperatureSensor;
    var Door = OhsSiteData.Door;
    var Window = OhsSiteData.Window;
    var Switch = OhsSiteData.Switch;
    var ContactSensor = OhsSiteData.ContactSensor;
    class Graphics {
        constructor(canvas) {
            this.textA = new TextSimple();
            this.textB = new TextSimple();
            this.textC = new TextSimple();
            this.textD = new TextSimple();
            this.textE = new TextSimple();
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.setTextTempate();
            // this.m_siteData = siteData;                        
        }
        setTextTempate() {
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
        setNumber(num, arg, types, ctx, rect) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types(ctx, rect);
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        }
        setNumber2(num, arg, types, x, y, w, h) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types(x, y, w, h);
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        }
        setNumber3(num, arg, types) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types();
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        }
        getFilteredImage(array, src) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].getImageSrc() == src) {
                    //window.alert("A: " + array[i].getImageSrc() + "  B: " + src);                                                      
                    return array[i];
                }
            }
            return null;
        }
    }
    OhsCanvasGraphics.Graphics = Graphics;
    class Point2D {
        constructor(x, y) {
            this.x = 0.0;
            this.y = 0.0;
            this.x = x;
            this.y = y;
        }
        setPoint(pt) {
            this.x = pt.x;
            this.y = pt.y;
        }
    }
    OhsCanvasGraphics.Point2D = Point2D;
    class Triangle {
        constructor() {
            this.a = new Point2D(0, 0);
            this.b = new Point2D(0, 0);
            this.c = new Point2D(0, 0);
            this.fillColor = '#FFCC00';
            this.strokeColor = '#666666';
            this.widthLine = 0;
        }
        setTriangle(a, b, c) {
            this.a.setPoint(a);
            this.b.setPoint(b);
            this.c.setPoint(c);
        }
        paint(ctx) {
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
    OhsCanvasGraphics.Triangle = Triangle;
    class Rect {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        }
        isClicked(clx, cly) {
            if (!(clx > this.x && clx < this.x + this.w))
                return false;
            if (!(cly < this.y + this.h && cly > this.y))
                return false;
            return true;
        }
        equals(rectI) {
            this.x = rectI.x;
            this.y = rectI.y;
            this.w = rectI.w;
            this.h = rectI.h;
        }
        size(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        sizeRect(rect) {
            this.x = rect.x;
            this.y = rect.y;
            this.w = rect.w;
            this.h = rect.h;
        }
        getSize() {
            var rect = new Rect();
            rect.x = this.x;
            rect.y = this.y;
            rect.w = this.w;
            rect.h = this.h;
            return rect;
        }
        move(dx, dy) {
            this.x = this.x + dx;
            this.y = this.y + dy;
        }
        scaleSize(perc) {
            var old_w = this.w;
            var old_h = this.h;
            this.w = this.w * perc;
            this.h = this.h * perc;
            this.x = this.x + ((old_w - this.w) / 2);
            this.y = this.y + ((old_h - this.h) / 2);
        }
        paint(ctx) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        }
        getRight() {
            return this.x + this.w;
        }
        getBottom() {
            return this.y + this.h;
        }
    }
    OhsCanvasGraphics.Rect = Rect;
    class RectRounded extends Rect {
        constructor(...args) {
            super(...args);
            this.radius = 0;
        }
        rad(rad) {
            this.radius = rad;
        }
        paint(ctx) {
            if (this.radius == 0) {
                super.paint(ctx);
            }
            else {
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
    OhsCanvasGraphics.RectRounded = RectRounded;
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
    class ImageRect extends RectRounded {
        constructor() {
            super();
            this.img = null;
            this.imgSrc = '---';
            this.loaded = false;
            this.border = false;
            this.rectClicked = null;
            this.img = new Image();
        }
        onImageLoad(event) {
            this.loaded = true;
        }
        setImage(path) {
            if (path != this.imgSrc) {
                this.img.src = path;
                this.imgSrc = path;
            }
        }
        paint(ctx) {
            ctx.save();
            super.paint(ctx);
            if (this.radius != 0) {
                ctx.clip();
            }
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();
            if (this.border) {
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
        paintPush(ctx) {
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
        getImage() {
            return this.img;
        }
        getImageSrc() {
            return this.imgSrc;
        }
        MouseDownHandler(event, ctx) {
            this.paint(ctx);
            this.paintPush(ctx);
            this.rectClicked = this.getSize();
            window.setTimeout(() => this.paint(ctx), 200);
        }
        MouseUpHandler(event, ctx) {
            if (this.rectClicked != null) {
                this.rectClicked = null;
            }
        }
    }
    OhsCanvasGraphics.ImageRect = ImageRect;
    class ImageButton extends RectRounded {
        constructor(imgSrc, imgPush) {
            super();
            this.img = new Image();
            this.imgPush = new Image();
            this.border = false;
            this.push = false;
            this.int = null;
            this.img.src = imgSrc;
            this.imgPush.src = imgPush;
            this.border = false;
        }
        paint(ctx) {
            ctx.save();
            if (this.push) {
                ctx.drawImage(this.imgPush, this.x, this.y, this.w, this.h);
            }
            else {
                ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            }
            ctx.restore();
            if (this.border) {
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
        PushEvent(x, y) {
            if (this.isClicked(x, y)) {
                this.push = true;
                return true;
            }
            return false;
        }
        UpEvent(x, y) {
            if (this.push) {
                //   window.setTimeout(() => this.closeEvent(ctx), 50);
                this.push = false;
                return true;
            }
            return false;
        }
        getState() {
            return this.push;
        }
    }
    OhsCanvasGraphics.ImageButton = ImageButton;
    class ImageRectArray extends RectRounded {
        constructor(...args) {
            super(...args);
            this.array = new Array();
            this.border = false;
        }
        setImages(imgPaths) {
            for (let i = 0; i < imgPaths.length; i++) {
                if (this.array.length < i + 1) {
                    var img = new ImageRect();
                    img.setImage(imgPaths[i].toString());
                    this.array.push(img);
                }
                else {
                    //Compare images...
                    if (imgPaths[i].toString() == this.array[i].getImageSrc()) {
                    }
                    else {
                        //Replace image on position 'i'
                        var img = new ImageRect();
                        img.setImage(imgPaths[i].toString());
                        this.array.splice(i, 1, img);
                    }
                }
            }
            //Check lenght of array and cut            
            if (this.array.length > imgPaths.length) {
                this.array.length = imgPaths.length;
            }
        }
        paintImage(ctx, nImage) {
            if (!(nImage <= 0 || nImage > this.array.length)) {
                this.array[nImage].size(this.x, this.y, this.w, this.h);
                this.array[nImage].paint(ctx);
            }
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.restore();
            }
        }
        getImages() {
            return this.array;
        }
        getImagesPaths() {
            var paths = new Array();
            for (let id in this.array) {
                var str = this.array[id].getImageSrc();
                paths.push(str);
            }
            return paths;
        }
    }
    OhsCanvasGraphics.ImageRectArray = ImageRectArray;
    class TextSimple extends RectRounded {
        constructor(...args) {
            super(...args);
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "left";
            this.textBaseline = "middle";
            this.bold = false;
            this.text = '';
            this.border = false;
        }
        setText(txt) {
            this.text = txt.toString();
        }
        getText() {
            return this.text;
        }
        paintText(ctx, text) {
            this.text = text;
            this.paint(ctx);
        }
        paint(ctx) {
            var x = this.x;
            var y = this.y;
            var align = this.textAlign.toString();
            var baseline = this.textBaseline.toString();
            if (align == "right" || align == "end") {
                x = this.x + this.w;
            }
            else if (align == "center") {
                x = this.x + (this.w / 2);
            }
            if (baseline == "bottom" || baseline == "alphabetic") {
                y = this.y + this.h;
            }
            else if (baseline == "middle") {
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
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                ctx.restore();
            }
        }
        copyStyle(origin) {
            this.fontSize = origin.fontSize;
            this.fontColor = origin.fontColor;
            this.fontFamily = origin.fontFamily;
            this.textAlign = origin.textAlign;
            this.textBaseline = origin.textBaseline;
            this.bold = origin.bold;
        }
    }
    OhsCanvasGraphics.TextSimple = TextSimple;
    class Mark extends Rect {
        constructor(...args) {
            super(...args);
            this.thing = null;
            this.colorIncideReady = '#a6a6a6';
            this.colorBorderReady = '#595959';
            this.imgError = new ImageRect();
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            this.imgError.setImage('/infores/servlets/kitchen/symbol_error.png');
            this.imgError.size(x, y, w, h);
        }
        setThing(thing) {
            this.thing = thing;
        }
        getThing() {
            return this.thing;
        }
    }
    OhsCanvasGraphics.Mark = Mark;
    class DoorMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgOpen = new ImageRect();
            this.imgClose = new ImageRect();
            this.imgLock = new ImageRect();
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            var perc = 0.7;
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
        getDoorThing() {
            var door = null;
            if (this.thing) {
                if (this.thing instanceof Door) {
                    door = this.thing;
                }
            }
            return door;
        }
        paintByThing(ctx, dx, dy, xScale, yScale) {
            var door = this.getDoorThing();
            if (door != null) {
                this.size((door.posX * xScale) + dx - 30, (door.posY * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        }
        paint(ctx) {
            var door = this.getDoorThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            var state = -1;
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
                }
                else {
                    this.imgClose.paint(ctx);
                    if (door.locked) {
                        this.imgLock.paint(ctx);
                    }
                }
            }
        }
    }
    OhsCanvasGraphics.DoorMark = DoorMark;
    class WindowMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgOpen = new ImageRect();
            this.imgClose = new ImageRect();
            this.imgLock = new ImageRect();
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            //Size of images            
            var perc = 0.7;
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
        getWindowThing() {
            var wnd = null;
            if (this.thing) {
                if (this.thing instanceof Window) {
                    wnd = this.thing;
                }
            }
            return wnd;
        }
        paintByThing(ctx, dx, dy, xScale, yScale) {
            var wnd = this.getWindowThing();
            if (wnd != null) {
                this.size((wnd.posX * xScale) + dx - 30, (wnd.posY * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        }
        paint(ctx) {
            var wnd = this.getWindowThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            var state = -1;
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
                }
                else {
                    this.imgClose.paint(ctx);
                    if (wnd.locked) {
                        this.imgLock.paint(ctx);
                    }
                }
            }
        }
    }
    OhsCanvasGraphics.WindowMark = WindowMark;
    class TempMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgThermometer = new ImageRect();
            this.imgFrost = new ImageRect();
            this.textTemp = new TextSimple();
            this.border = false;
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            var dx = 8;
            var dy = 8;
            this.imgThermometer.setImage('/infores/servlets/kitchen/tempSymbol.png');
            this.imgThermometer.size(x - dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgFrost.setImage('/infores/servlets/kitchen/tempSymbol.png');
            this.imgFrost.size(x + dx - 3, y + dy, w - (2 * dx), h - (2 * dy));
            this.textTemp.size(x + 3 * dx, y + 2.5 * dy, 60, 30);
        }
        getTemperatureSensorThing() {
            var tempSensor = null;
            if (this.thing) {
                if (this.thing instanceof TemperatureSensor) {
                    tempSensor = this.thing;
                }
            }
            return tempSensor;
        }
        paintByThing(ctx, dx, dy, xScale, yScale) {
            var tempSensor = this.getTemperatureSensorThing();
            if (tempSensor != null) {
                this.size((tempSensor.posX * xScale) + dx - 30, (tempSensor.posY * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        }
        paint(ctx) {
            var tempSensor = this.getTemperatureSensorThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            if (tempSensor != null) {
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
            }
            else {
                this.textTemp.paintText(ctx, tempSensor.temp + ' \u00B0C');
            }
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.restore();
            }
        }
    }
    OhsCanvasGraphics.TempMark = TempMark;
    class SwitchMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgBulbOn = new ImageRect();
            this.imgBulbOff = new ImageRect();
            this.imgBulbOn_Off = new ImageRect();
            this.imgBulbOff_On = new ImageRect();
            this.border = false;
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            var perc = 0.9;
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
        getSwitchThing() {
            var swtch = null;
            if (this.thing) {
                if (this.thing instanceof Switch) {
                    swtch = this.thing;
                }
            }
            return swtch;
        }
        paintByThing(ctx, dx, dy, xScale, yScale) {
            var swtch = this.getSwitchThing();
            if (swtch != null) {
                this.size((swtch.posX * xScale) + dx - 30, (swtch.posY * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        }
        paint(ctx) {
            var swtch = this.getSwitchThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            if (swtch != null) {
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
            }
            else {
                //logic of switch
                if (swtch.getState() == 0) {
                    this.imgBulbOff.paint(ctx);
                }
                else if (swtch.getState() == 1) {
                    this.imgBulbOff.paint(ctx);
                }
                else if (swtch.getState() == 2) {
                    this.imgBulbOff_On.paint(ctx);
                }
                else if (swtch.getState() == 3) {
                    this.imgBulbOn.paint(ctx);
                }
                else if (swtch.getState() == 4) {
                    this.imgBulbOn_Off.paint(ctx);
                }
                else {
                    this.imgBulbOff.paint(ctx);
                }
            }
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.restore();
            }
        }
    }
    OhsCanvasGraphics.SwitchMark = SwitchMark;
    class SwitchLockMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgLockOn = new ImageRect();
            this.imgLockOff = new ImageRect();
            this.imgLockOn_Off = new ImageRect();
            this.imgLockOff_On = new ImageRect();
            this.border = false;
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            var perc = 0.9;
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
        getSwitchThing() {
            var swtch = null;
            if (this.thing) {
                if (this.thing instanceof Switch) {
                    swtch = this.thing;
                }
            }
            return swtch;
        }
        paintByThing(ctx) {
            var swtch = this.getSwitchThing();
            if (swtch != null) {
                this.size(swtch.posX, swtch.posY, 50, 50);
            }
            this.paint(ctx);
        }
        paint(ctx) {
            var swtch = this.getSwitchThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            if (swtch != null) {
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
            }
            else {
                //logic of switch
                if (swtch.getState() == 0) {
                    this.imgLockOff.paint(ctx);
                }
                else if (swtch.getState() == 1) {
                    this.imgLockOff.paint(ctx);
                }
                else if (swtch.getState() == 2) {
                    this.imgLockOff_On.paint(ctx);
                }
                else if (swtch.getState() == 3) {
                    this.imgLockOn.paint(ctx);
                }
                else if (swtch.getState() == 4) {
                    this.imgLockOn_Off.paint(ctx);
                }
                else {
                    this.imgLockOff.paint(ctx);
                }
            }
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.restore();
            }
        }
    }
    OhsCanvasGraphics.SwitchLockMark = SwitchLockMark;
    class ContactSensorMark extends Mark {
        constructor(...args) {
            super(...args);
            this.imgSensorOpen = new ImageRect();
            this.imgSensorClosed = new ImageRect();
            this.imgSensorOff = new ImageRect();
            this.border = false;
        }
        size(x, y, w, h) {
            super.size(x, y, w, h);
            var perc = 0.9;
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
        getContactSensorThing() {
            var contact = null;
            if (this.thing) {
                if (this.thing instanceof ContactSensor) {
                    contact = this.thing;
                }
            }
            return contact;
        }
        paintByThing(ctx, dx, dy, xScale, yScale) {
            var contact = this.getContactSensorThing();
            if (contact != null) {
                this.size((contact.posX * xScale) + dx - 30, (contact.posY * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        }
        getState() {
            var contact = this.getContactSensorThing();
            if (contact != null && contact.isValid()) {
                return contact.getState();
            }
            return false;
        }
        paint(ctx) {
            var contact = this.getContactSensorThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            if (contact != null) {
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
            }
            else {
                if (!contact.isValid()) {
                    this.imgSensorOff.paint(ctx);
                }
                else {
                    //logic of switch
                    if (contact.getState()) {
                        this.imgSensorOpen.paint(ctx);
                    }
                    else {
                        this.imgSensorClosed.paint(ctx);
                    }
                }
            }
            if (this.border) {
                ctx.save();
                super.paint(ctx);
                ctx.restore();
            }
        }
    }
    OhsCanvasGraphics.ContactSensorMark = ContactSensorMark;
    class NumberMark extends Rect {
        constructor(...args) {
            super(...args);
            this.colorInside = '#a6a6a6';
            this.colorText = '#ffffff';
            this.numberText = new TextSimple();
        }
        center(cx, cy, w, h) {
            super.size(cx - (w / 2), cy - (h / 2), w, h);
        }
        paintNum(ctx, num) {
            if (num <= 0) {
                this.colorInside = '#a6a6a6';
            }
            else {
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
    OhsCanvasGraphics.NumberMark = NumberMark;
    class DlgNumbers {
        constructor() {
            this.m_rectRounded = new RectRounded();
            this.m_rectNumber = new Array();
            this.m_textNumbers = new TextSimple();
            this.setSize(9);
            this.m_textNumbers.fontSize = 18;
            this.m_textNumbers.fontFamily = "px sans-serif";
            this.m_textNumbers.fontColor = '#196619';
            this.m_textNumbers.textAlign = "left";
            this.m_textNumbers.textBaseline = "middle";
        }
        setSize(num) {
            this.m_rectNumber.length = 0;
            for (var i = 0; i < num; i++) {
                this.m_rectNumber.push(new Rect());
            }
        }
        getSize() {
            return this.m_rectNumber.length;
        }
        MouseUpHandler(mx, my) {
            var i = 1;
            for (let item of this.m_rectNumber) {
                if (item.isClicked(mx, my)) {
                    return i;
                }
                i++;
            }
            return -1;
        }
        paint(ctx, x, y, width, height) {
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
                i++;
            }
        }
        organize(x, y, width, height) {
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
                    nRow++;
                }
                else {
                    nColumn++;
                }
            }
        }
    }
    OhsCanvasGraphics.DlgNumbers = DlgNumbers;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
