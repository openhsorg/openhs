/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OhsCanvasGraphics;
(function (OhsCanvasGraphics) {
    var TemperatureSensor = OhsSiteData.TemperatureSensor;
    var Door = OhsSiteData.Door;
    var Window = OhsSiteData.Window;
    var Switch = OhsSiteData.Switch;
    var ContactSensor = OhsSiteData.ContactSensor;
    var Graphics = (function () {
        function Graphics(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        }
        Graphics.prototype.setNumber = function (num, arg, types, ctx, rect) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types(ctx, rect);
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        };
        Graphics.prototype.setNumber2 = function (num, arg, types, x, y, w, h) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types(x, y, w, h);
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        };
        Graphics.prototype.setNumber3 = function (num, arg, types) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types();
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        };
        Graphics.prototype.getFilteredImage = function (array, src) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].getImageSrc() == src) {
                    //window.alert("A: " + array[i].getImageSrc() + "  B: " + src);                                                      
                    return array[i];
                }
            }
            return null;
        };
        return Graphics;
    }());
    OhsCanvasGraphics.Graphics = Graphics;
    var Rect = (function () {
        function Rect() {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        }
        Rect.prototype.isClicked = function (clx, cly) {
            if (!(clx > this.x && clx < this.x + this.w))
                return false;
            if (!(cly < this.y + this.h && cly > this.y))
                return false;
            return true;
        };
        Rect.prototype.equals = function (rectI) {
            this.x = rectI.x;
            this.y = rectI.y;
            this.w = rectI.w;
            this.h = rectI.h;
        };
        Rect.prototype.size = function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        };
        Rect.prototype.sizeRect = function (rect) {
            this.x = rect.x;
            this.y = rect.y;
            this.w = rect.w;
            this.h = rect.h;
        };
        Rect.prototype.getSize = function () {
            var rect = new Rect();
            rect.x = this.x;
            rect.y = this.y;
            rect.w = this.w;
            rect.h = this.h;
            return rect;
        };
        Rect.prototype.move = function (dx, dy) {
            this.x = this.x + dx;
            this.y = this.y + dy;
        };
        Rect.prototype.scaleSize = function (perc) {
            var old_w = this.w;
            var old_h = this.h;
            this.w = this.w * perc;
            this.h = this.h * perc;
            this.x = this.x + ((old_w - this.w) / 2);
            this.y = this.y + ((old_h - this.h) / 2);
        };
        Rect.prototype.paint = function (ctx) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        };
        Rect.prototype.getRight = function () {
            return this.x + this.w;
        };
        Rect.prototype.getBottom = function () {
            return this.y + this.h;
        };
        return Rect;
    }());
    OhsCanvasGraphics.Rect = Rect;
    var RectRounded = (function (_super) {
        __extends(RectRounded, _super);
        function RectRounded() {
            _super.apply(this, arguments);
            this.radius = 0;
        }
        RectRounded.prototype.rad = function (rad) {
            this.radius = rad;
        };
        RectRounded.prototype.paint = function (ctx) {
            if (this.radius == 0) {
                _super.prototype.paint.call(this, ctx);
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
        };
        return RectRounded;
    }(Rect));
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
    var ImageRect = (function (_super) {
        __extends(ImageRect, _super);
        function ImageRect() {
            _super.call(this);
            this.img = null;
            this.imgSrc = '---';
            this.loaded = false;
            this.border = false;
            this.rectClicked = null;
            this.img = new Image();
        }
        ImageRect.prototype.onImageLoad = function (event) {
            this.loaded = true;
        };
        ImageRect.prototype.setImage = function (path) {
            if (path != this.imgSrc) {
                this.img.src = path;
                this.imgSrc = path;
            }
        };
        ImageRect.prototype.paint = function (ctx) {
            ctx.save();
            _super.prototype.paint.call(this, ctx);
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
        };
        ImageRect.prototype.paintPush = function (ctx) {
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
        };
        ImageRect.prototype.getImage = function () {
            return this.img;
        };
        ImageRect.prototype.getImageSrc = function () {
            return this.imgSrc;
        };
        ImageRect.prototype.MouseDownHandler = function (event, ctx) {
            var _this = this;
            this.paint(ctx);
            this.paintPush(ctx);
            this.rectClicked = this.getSize();
            window.setTimeout(function () { return _this.paint(ctx); }, 200);
        };
        ImageRect.prototype.MouseUpHandler = function (event, ctx) {
            if (this.rectClicked != null) {
                this.rectClicked = null;
            }
        };
        return ImageRect;
    }(RectRounded));
    OhsCanvasGraphics.ImageRect = ImageRect;
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton(imgSrc, imgPush) {
            _super.call(this);
            this.img = new Image();
            this.imgPush = new Image();
            this.border = false;
            this.push = false;
            this.int = null;
            this.img.src = imgSrc;
            this.imgPush.src = imgPush;
            this.border = false;
        }
        ImageButton.prototype.paint = function (ctx) {
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
        };
        ImageButton.prototype.PushEvent = function (x, y) {
            if (this.isClicked(x, y)) {
                this.push = true;
                return true;
            }
            return false;
        };
        ImageButton.prototype.UpEvent = function (x, y) {
            if (this.push) {
                //   window.setTimeout(() => this.closeEvent(ctx), 50);
                this.push = false;
                return true;
            }
            return false;
        };
        ImageButton.prototype.getState = function () {
            return this.push;
        };
        return ImageButton;
    }(RectRounded));
    OhsCanvasGraphics.ImageButton = ImageButton;
    var ImageRectArray = (function (_super) {
        __extends(ImageRectArray, _super);
        function ImageRectArray() {
            _super.apply(this, arguments);
            this.array = new Array();
            this.border = false;
        }
        ImageRectArray.prototype.setImages = function (imgPaths) {
            for (var i = 0; i < imgPaths.length; i++) {
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
        };
        ImageRectArray.prototype.paintImage = function (ctx, nImage) {
            if (!(nImage <= 0 || nImage > this.array.length)) {
                this.array[nImage].size(this.x, this.y, this.w, this.h);
                this.array[nImage].paint(ctx);
            }
            if (this.border) {
                ctx.save();
                _super.prototype.paint.call(this, ctx);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.restore();
            }
        };
        ImageRectArray.prototype.getImages = function () {
            return this.array;
        };
        ImageRectArray.prototype.getImagesPaths = function () {
            var paths = new Array();
            for (var id in this.array) {
                var str = this.array[id].getImageSrc();
                paths.push(str);
            }
            return paths;
        };
        return ImageRectArray;
    }(RectRounded));
    OhsCanvasGraphics.ImageRectArray = ImageRectArray;
    var TextSimple = (function (_super) {
        __extends(TextSimple, _super);
        function TextSimple() {
            _super.apply(this, arguments);
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "left";
            this.textBaseline = "middle";
            this.bold = false;
            this.text = '';
            this.border = false;
        }
        TextSimple.prototype.paintText = function (ctx, text) {
            this.text = text;
            this.paint(ctx);
        };
        TextSimple.prototype.paint = function (ctx) {
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
                _super.prototype.paint.call(this, ctx);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                ctx.restore();
            }
        };
        return TextSimple;
    }(RectRounded));
    OhsCanvasGraphics.TextSimple = TextSimple;
    var Mark = (function (_super) {
        __extends(Mark, _super);
        function Mark() {
            _super.apply(this, arguments);
            this.thing = null;
            this.colorIncideReady = '#a6a6a6';
            this.colorBorderReady = '#595959';
            this.imgError = new ImageRect();
        }
        Mark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            this.imgError.setImage('/infores/servlets/kitchen/symbol_error.png');
            this.imgError.size(x, y, w, h);
        };
        Mark.prototype.setThing = function (thing) {
            this.thing = thing;
        };
        Mark.prototype.getThing = function () {
            return this.thing;
        };
        return Mark;
    }(Rect));
    OhsCanvasGraphics.Mark = Mark;
    var DoorMark = (function (_super) {
        __extends(DoorMark, _super);
        function DoorMark() {
            _super.apply(this, arguments);
            this.imgOpen = new ImageRect();
            this.imgClose = new ImageRect();
            this.imgLock = new ImageRect();
        }
        DoorMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
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
        };
        DoorMark.prototype.getDoorThing = function () {
            var door = null;
            if (this.thing) {
                if (this.thing instanceof Door) {
                    door = this.thing;
                }
            }
            return door;
        };
        DoorMark.prototype.paintByThing = function (ctx, dx, dy, xScale, yScale) {
            var door = this.getDoorThing();
            if (door != null) {
                this.size((door.x * xScale) + dx - 30, (door.y * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        };
        DoorMark.prototype.paint = function (ctx) {
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
        };
        return DoorMark;
    }(Mark));
    OhsCanvasGraphics.DoorMark = DoorMark;
    var WindowMark = (function (_super) {
        __extends(WindowMark, _super);
        function WindowMark() {
            _super.apply(this, arguments);
            this.imgOpen = new ImageRect();
            this.imgClose = new ImageRect();
            this.imgLock = new ImageRect();
        }
        WindowMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
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
        };
        WindowMark.prototype.getWindowThing = function () {
            var wnd = null;
            if (this.thing) {
                if (this.thing instanceof Window) {
                    wnd = this.thing;
                }
            }
            return wnd;
        };
        WindowMark.prototype.paintByThing = function (ctx, dx, dy, xScale, yScale) {
            var wnd = this.getWindowThing();
            if (wnd != null) {
                this.size((wnd.x * xScale) + dx - 30, (wnd.y * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        };
        WindowMark.prototype.paint = function (ctx) {
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
        };
        return WindowMark;
    }(Mark));
    OhsCanvasGraphics.WindowMark = WindowMark;
    var TempMark = (function (_super) {
        __extends(TempMark, _super);
        function TempMark() {
            _super.apply(this, arguments);
            this.imgThermometer = new ImageRect();
            this.imgFrost = new ImageRect();
            this.textTemp = new TextSimple();
            this.border = false;
        }
        TempMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var dx = 8;
            var dy = 8;
            this.imgThermometer.setImage('/infores/servlets/kitchen/tempSymbol.png');
            this.imgThermometer.size(x - dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgFrost.setImage('/infores/servlets/kitchen/tempSymbol.png');
            this.imgFrost.size(x + dx - 3, y + dy, w - (2 * dx), h - (2 * dy));
            this.textTemp.size(x + 3 * dx, y + 2.5 * dy, 60, 30);
        };
        TempMark.prototype.getTemperatureSensorThing = function () {
            var tempSensor = null;
            if (this.thing) {
                if (this.thing instanceof TemperatureSensor) {
                    tempSensor = this.thing;
                }
            }
            return tempSensor;
        };
        TempMark.prototype.paintByThing = function (ctx, dx, dy, xScale, yScale) {
            var tempSensor = this.getTemperatureSensorThing();
            if (tempSensor != null) {
                this.size((tempSensor.x * xScale) + dx - 30, (tempSensor.y * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        };
        TempMark.prototype.paint = function (ctx) {
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
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        return TempMark;
    }(Mark));
    OhsCanvasGraphics.TempMark = TempMark;
    var SwitchMark = (function (_super) {
        __extends(SwitchMark, _super);
        function SwitchMark() {
            _super.apply(this, arguments);
            this.imgBulbOn = new ImageRect();
            this.imgBulbOff = new ImageRect();
            this.imgBulbOn_Off = new ImageRect();
            this.imgBulbOff_On = new ImageRect();
            this.border = false;
        }
        SwitchMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
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
        };
        SwitchMark.prototype.getSwitchThing = function () {
            var swtch = null;
            if (this.thing) {
                if (this.thing instanceof Switch) {
                    swtch = this.thing;
                }
            }
            return swtch;
        };
        SwitchMark.prototype.paintByThing = function (ctx, dx, dy, xScale, yScale) {
            var swtch = this.getSwitchThing();
            if (swtch != null) {
                this.size((swtch.x * xScale) + dx - 30, (swtch.y * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        };
        SwitchMark.prototype.paint = function (ctx) {
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
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        return SwitchMark;
    }(Mark));
    OhsCanvasGraphics.SwitchMark = SwitchMark;
    var SwitchLockMark = (function (_super) {
        __extends(SwitchLockMark, _super);
        function SwitchLockMark() {
            _super.apply(this, arguments);
            this.imgLockOn = new ImageRect();
            this.imgLockOff = new ImageRect();
            this.imgLockOn_Off = new ImageRect();
            this.imgLockOff_On = new ImageRect();
            this.border = false;
        }
        SwitchLockMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
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
        };
        SwitchLockMark.prototype.getSwitchThing = function () {
            var swtch = null;
            if (this.thing) {
                if (this.thing instanceof Switch) {
                    swtch = this.thing;
                }
            }
            return swtch;
        };
        SwitchLockMark.prototype.paintByThing = function (ctx) {
            var swtch = this.getSwitchThing();
            if (swtch != null) {
                this.size(swtch.x, swtch.y, 50, 50);
            }
            this.paint(ctx);
        };
        SwitchLockMark.prototype.paint = function (ctx) {
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
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        return SwitchLockMark;
    }(Mark));
    OhsCanvasGraphics.SwitchLockMark = SwitchLockMark;
    var ContactSensorMark = (function (_super) {
        __extends(ContactSensorMark, _super);
        function ContactSensorMark() {
            _super.apply(this, arguments);
            this.imgSensorOpen = new ImageRect();
            this.imgSensorClosed = new ImageRect();
            this.imgSensorOff = new ImageRect();
            this.border = false;
        }
        ContactSensorMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
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
        };
        ContactSensorMark.prototype.getContactSensorThing = function () {
            var contact = null;
            if (this.thing) {
                if (this.thing instanceof ContactSensor) {
                    contact = this.thing;
                }
            }
            return contact;
        };
        ContactSensorMark.prototype.paintByThing = function (ctx, dx, dy, xScale, yScale) {
            var contact = this.getContactSensorThing();
            if (contact != null) {
                this.size((contact.x * xScale) + dx - 30, (contact.y * yScale) + dy - 30, 50, 50);
            }
            this.paint(ctx);
        };
        ContactSensorMark.prototype.getState = function () {
            var contact = this.getContactSensorThing();
            if (contact != null && contact.isValid()) {
                return contact.getState();
            }
            return false;
        };
        ContactSensorMark.prototype.paint = function (ctx) {
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
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        return ContactSensorMark;
    }(Mark));
    OhsCanvasGraphics.ContactSensorMark = ContactSensorMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
