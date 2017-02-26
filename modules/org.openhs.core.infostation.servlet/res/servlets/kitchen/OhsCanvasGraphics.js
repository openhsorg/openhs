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
        Graphics.prototype.getFilteredImage = function (array, src) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].getImageSrc() == src) {
                    return array[i];
                }
            }
            return null;
        };
        return Graphics;
    }());
    OhsCanvasGraphics.Graphics = Graphics;
    var Rect = (function () {
        function Rect(x, y, w, h) {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        Rect.prototype.isClicked = function (clx, cly) {
            return (clx > this.x && clx < this.x + this.w && cly < this.y + this.h && cly > this.y);
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
        return Rect;
    }());
    OhsCanvasGraphics.Rect = Rect;
    var RectRounded = (function (_super) {
        __extends(RectRounded, _super);
        function RectRounded(x, y, w, h, radius) {
            _super.call(this, x, y, w, h);
            this.radius = 0;
            this.radius = radius;
        }
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
    var ImageRect = (function (_super) {
        __extends(ImageRect, _super);
        function ImageRect(x, y, w, h, radius, imgSrc) {
            var _this = this;
            _super.call(this, x, y, w, h, radius);
            this.img = null;
            this.imgSrc = '---';
            this.loaded = false;
            this.img = new Image();
            this.img.onload = function (event) {
                _this.onImageLoad(event);
            };
            this.img.src = imgSrc;
            this.imgSrc = imgSrc;
        }
        ImageRect.prototype.onImageLoad = function (event) {
            this.loaded = true;
        };
        ImageRect.prototype.paint = function (ctx) {
            ctx.save();
            _super.prototype.paint.call(this, ctx);
            if (this.radius != 0) {
                ctx.clip();
            }
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();
        };
        ImageRect.prototype.getImage = function () {
            return this.img;
        };
        ImageRect.prototype.getImageSrc = function () {
            return this.imgSrc;
        };
        return ImageRect;
    }(RectRounded));
    OhsCanvasGraphics.ImageRect = ImageRect;
    var ImageRectArray = (function (_super) {
        __extends(ImageRectArray, _super);
        function ImageRectArray(x, y, w, h, radius) {
            _super.call(this, x, y, w, h, radius);
            this.array = null;
            this.border = false;
            this.array = new Array();
        }
        ImageRectArray.prototype.setImages = function (imgPaths) {
            for (var i = 0; i < imgPaths.length; i++) {
                if (this.array.length < i + 1) {
                    var img = new ImageRect(0, 0, 0, 0, 0, imgPaths[i].toString());
                    this.array.push(img);
                }
                else {
                    //Compare images...
                    if (imgPaths[i].toString() == this.array[i].getImageSrc()) {
                    }
                    else {
                        //Replace image on position 'i'
                        var img = new ImageRect(0, 0, 0, 0, 0, imgPaths[i].toString());
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
        function TextSimple(x, y, w, h) {
            _super.call(this, x, y, w, h, 0);
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
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
            ctx.save();
            ctx.font = this.fontSize + this.fontFamily;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.text, x, y);
            ctx.restore();
            if (this.border) {
                ctx.save();
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        TextSimple.prototype.equals = function (txtIn) {
            _super.prototype.equals.call(this, txtIn);
            this.fontSize = txtIn.fontSize;
            this.fontColor = txtIn.fontColor;
            this.fontFamily = txtIn.fontFamily;
            this.textAlign = txtIn.textAlign;
            this.textBaseline = txtIn.textBaseline;
        };
        return TextSimple;
    }(RectRounded));
    OhsCanvasGraphics.TextSimple = TextSimple;
    var Mark = (function (_super) {
        __extends(Mark, _super);
        function Mark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.thing = null;
            this.colorIncideReady = '#a6a6a6';
            this.colorBorderReady = '#595959';
            this.imgError = null;
            this.imgError = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_error.png');
        }
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
        function DoorMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgOpen = null;
            this.imgClose = null;
            this.imgLock = null;
            this.m_switchArray = null;
            this.m_contactSensorArray = null;
            this.imgOpen = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_open.png');
            this.imgClose = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_close.png');
            this.imgLock = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            this.size(x, y, w, h);
        }
        DoorMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            //Size of images
            var perc = 0.7;
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
        DoorMark.prototype.paintByThing = function (ctx) {
            var door = this.getDoorThing();
            if (door != null) {
                this.size(door.x, door.y, 60, 60);
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
        function WindowMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgOpen = null;
            this.imgClose = null;
            this.imgLock = null;
            this.m_switchArray = null;
            this.m_contactSensorArray = null;
            this.imgOpen = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_windowOpen.png');
            this.imgClose = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_windowClosed.png');
            this.imgLock = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            this.size(x, y, w, h);
        }
        WindowMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            //Size of images
            var perc = 0.7;
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
        WindowMark.prototype.paintByThing = function (ctx) {
            var wnd = this.getWindowThing();
            if (wnd != null) {
                this.size(wnd.x, wnd.y, 60, 60);
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
        function TempMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgThermometer = null;
            this.imgFrost = null;
            this.textTemp = null;
            this.border = false;
            this.imgThermometer = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/tempSymbol.png');
            this.imgFrost = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/tempSymbol.png');
            this.textTemp = new TextSimple(x, y, w, h);
            this.size(x, y, w, h);
        }
        TempMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var dx = 8;
            var dy = 8;
            this.imgThermometer.size(x - dx, y + dy, w - (2 * dx), h - (2 * dy));
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
        TempMark.prototype.paintByThing = function (ctx) {
            var tempSensor = this.getTemperatureSensorThing();
            if (tempSensor != null) {
                this.size(tempSensor.x, tempSensor.y, 60, 60);
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
        function SwitchMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgBulbOn = null;
            this.imgBulbOff = null;
            this.imgBulbOn_Off = null;
            this.imgBulbOff_On = null;
            this.border = false;
            this.imgBulbOn = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn.png');
            this.imgBulbOff = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff.png');
            this.imgBulbOn_Off = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn_Off.png');
            this.imgBulbOff_On = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff_On.png');
            this.size(x, y, w, h);
        }
        SwitchMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var perc = 0.9;
            this.imgBulbOn.size(x, y, w, h);
            this.imgBulbOn.scaleSize(perc);
            this.imgBulbOff.size(x, y, w, h);
            this.imgBulbOff.scaleSize(perc);
            this.imgBulbOn_Off.size(x, y, w, h);
            this.imgBulbOn_Off.scaleSize(perc);
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
        SwitchMark.prototype.paintByThing = function (ctx) {
            var swtch = this.getSwitchThing();
            if (swtch != null) {
                this.size(swtch.x, swtch.y, 60, 60);
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
        function SwitchLockMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgLockOn = null;
            this.imgLockOff = null;
            this.imgLockOn_Off = null;
            this.imgLockOff_On = null;
            this.border = false;
            this.imgLockOn = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOn.png');
            this.imgLockOff = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOff.png');
            this.imgLockOn_Off = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOn_Off.png');
            this.imgLockOff_On = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_lockOff_On.png');
            this.size(x, y, w, h);
        }
        SwitchLockMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var perc = 0.9;
            this.imgLockOn.size(x, y, w, h);
            this.imgLockOn.scaleSize(perc);
            this.imgLockOff.size(x, y, w, h);
            this.imgLockOff.scaleSize(perc);
            this.imgLockOn_Off.size(x, y, w, h);
            this.imgLockOn_Off.scaleSize(perc);
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
                this.size(swtch.x, swtch.y, 60, 60);
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
        function ContactSensorMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgSensorOpen = null;
            this.imgSensorClosed = null;
            this.imgSensorOff = null;
            this.border = false;
            this.imgSensorOpen = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_open.png');
            this.imgSensorClosed = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_close.png');
            this.imgSensorOff = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/symbol_error.png');
            this.size(x, y, w, h);
        }
        ContactSensorMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var perc = 0.9;
            this.imgSensorOpen.size(x, y, w, h);
            this.imgSensorOpen.scaleSize(perc);
            this.imgSensorClosed.size(x, y, w, h);
            this.imgSensorClosed.scaleSize(perc);
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
        ContactSensorMark.prototype.paintByThing = function (ctx) {
            var contact = this.getContactSensorThing();
            if (contact != null) {
                this.size(contact.x, contact.y, 60, 60);
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
