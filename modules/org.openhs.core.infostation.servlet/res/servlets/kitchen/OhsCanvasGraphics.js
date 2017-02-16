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
    var Switch = OhsSiteData.Switch;
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
        Graphics.prototype.getFilteredMarks = function (arg, filterPath) {
            if (filterPath == null) {
                return arg;
            }
            else {
                return arg.filter(function (element) {
                    var mark = element;
                    if (mark.thing == null) {
                        return true;
                    }
                    else {
                        return mark.thing.getPath().indexOf(filterPath) >= 0;
                    }
                });
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
            //   this.img.src = imgSrc;        
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
    var TextSimple = (function (_super) {
        __extends(TextSimple, _super);
        function TextSimple(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.text = '';
            this.border = false;
        }
        TextSimple.prototype.painitText = function (ctx, text) {
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
        return TextSimple;
    }(Rect));
    OhsCanvasGraphics.TextSimple = TextSimple;
    /**
     * Graphical symbol...
     */
    var Mark = (function () {
        function Mark(ctx, rect) {
            this.thing = null; //data
            this.ctx = ctx;
            this.rect = new Rect(rect.x, rect.y, rect.w, rect.h);
        }
        Mark.prototype.equals = function (mark) {
            this.ctx = mark.ctx;
            this.rect.equals(mark.rect);
        };
        Mark.prototype.setSize = function (rect) {
            this.rect.equals(rect);
        };
        Mark.prototype.isClicked = function (clx, cly) {
            return this.rect.isClicked(clx, cly);
        };
        return Mark;
    }());
    OhsCanvasGraphics.Mark = Mark;
    var Mark2 = (function (_super) {
        __extends(Mark2, _super);
        function Mark2(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.thing = null;
            this.colorIncideReady = '#a6a6a6';
            this.colorBorderReady = '#595959';
        }
        Mark2.prototype.setThing = function (thing) {
            this.thing = thing;
        };
        Mark2.prototype.getThing = function () {
            return this.thing;
        };
        return Mark2;
    }(Rect));
    OhsCanvasGraphics.Mark2 = Mark2;
    var DoorMark = (function (_super) {
        __extends(DoorMark, _super);
        function DoorMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgOpen = null;
            this.imgClose = null;
            this.imgLock = null;
            this.imgOpen = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_open.png');
            this.imgClose = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_close.png');
            this.imgLock = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            this.size(x, y, w, h);
        }
        DoorMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var dx = 20;
            var dy = 20;
            this.imgOpen.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgClose.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgLock.size(x + dx, y + dy, w - dx, h - dy);
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
                //this.x = door.x;
                //this.y = door.y;
                this.size(door.x, door.y, 80, 80);
            }
            this.paint(ctx);
        };
        DoorMark.prototype.paint = function (ctx) {
            var door = this.getDoorThing();
            var colorInside = '#a6a6a6';
            var colorBorder = '#595959';
            var state = -1;
            if (door != null) {
                state = door.getState();
                //logic of switch
                if (state == 0) {
                    colorInside = "#808080";
                    colorBorder = "#00cc69";
                }
                else if (state == 1) {
                    colorInside = "#ccffe6";
                    colorBorder = "#00cc69";
                }
                else if (state == 2) {
                    colorInside = "#ccffe6";
                    colorBorder = "#00cc69";
                }
                else if (state == 3) {
                    colorInside = "#ff8080";
                    colorBorder = "red";
                }
                else {
                    colorInside = "#808080";
                }
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 3, 0, 2 * Math.PI, false);
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
                }
                else if (state == 1) {
                    this.imgOpen.paint(ctx);
                }
                else if (state == 2) {
                    this.imgClose.paint(ctx);
                }
                else if (state == 3) {
                    this.imgClose.paint(ctx);
                    this.imgLock.paint(ctx);
                }
            }
        };
        return DoorMark;
    }(Mark2));
    OhsCanvasGraphics.DoorMark = DoorMark;
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.border = false; //debug border
            this.img = new Image();
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";   
        }
        Icon.prototype.paint = function () {
            //Draw image...
            //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            this.ctx.restore();
            // }            
            if (this.border) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                this.ctx.stroke();
                this.ctx.restore();
            }
        };
        return Icon;
    }(Mark));
    OhsCanvasGraphics.Icon = Icon;
    var Iconset = (function (_super) {
        __extends(Iconset, _super);
        function Iconset(ctx, rect) {
            _super.call(this, ctx, rect);
            this.border = false; //debug border        
            this.ir = false;
            this.images = new Array();
            this.imagesPaths = new Array();
            this.imagesReady = new Array();
        }
        Iconset.prototype.setImages = function (imgPaths) {
            var _this = this;
            if (this.imagesReady.length < imgPaths.length) {
                this.imagesReady.push(false);
            }
            else {
                this.imagesReady.length = imgPaths.length;
            }
            this.ir = false;
            //window.alert("Size:" + imgPaths.length);
            for (var i = 0; i < imgPaths.length; i++) {
                this.imagesReady[i] = false;
                var img = new Image();
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
            for (var id in this.images) {
                this.images[id].onload = function (event) {
                    _this.onImageLoad(event);
                };
                this.images[id].src = imgPaths[id].toString();
            }
        };
        Iconset.prototype.onImageLoad = function (event) {
            console.log("onImageLoad");
            this.ir = true;
        };
        Iconset.prototype.imageReady = function (img, path) {
            img.src = path;
        };
        Iconset.prototype.getImages = function () {
            return this.images;
        };
        Iconset.prototype.getImagesPaths = function () {
            return this.imagesPaths;
        };
        Iconset.prototype.paint = function (nImage) {
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
            if (this.border) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                this.ctx.stroke();
                this.ctx.restore();
            }
            return ret;
        };
        return Iconset;
    }(Mark));
    OhsCanvasGraphics.Iconset = Iconset;
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(ctx, rect) {
            _super.call(this, ctx, rect);
            this.fontSize = 10;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.border = false; //debug border
        }
        Text.prototype.paint = function (text) {
            var x = this.rect.x;
            var y = this.rect.y;
            var align = this.textAlign.toString();
            var baseline = this.textBaseline.toString();
            if (align == "right" || align == "end") {
                x = this.rect.x + this.rect.w;
            }
            else if (align == "center") {
                x = this.rect.x + (this.rect.w / 2);
            }
            if (baseline == "bottom" || baseline == "alphabetic") {
                y = this.rect.y + this.rect.h;
            }
            else if (baseline == "middle") {
                y = this.rect.y + (this.rect.h / 2);
            }
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(text, x, y);
            this.ctx.restore();
            if (this.border) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "red";
                this.ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                this.ctx.stroke();
                this.ctx.restore();
            }
        };
        Text.prototype.equals = function (tx) {
            this.rect.equals(tx.rect);
            this.ctx = tx.ctx;
            this.fontSize = tx.fontSize;
            this.fontColor = tx.fontColor;
            this.fontFamily = tx.fontFamily;
            this.textAlign = tx.textAlign;
            this.textBaseline = tx.textBaseline;
        };
        Text.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
        };
        return Text;
    }(Mark));
    OhsCanvasGraphics.Text = Text;
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
                this.size(tempSensor.x, tempSensor.y, 80, 80);
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
                this.textTemp.painitText(ctx, "---");
            }
            else {
                this.textTemp.painitText(ctx, tempSensor.temp + ' \u00B0C');
            }
            if (this.border) {
                ctx.save();
                _super.prototype.paint.call(this, ctx);
                ctx.restore();
            }
        };
        return TempMark;
    }(Mark2));
    OhsCanvasGraphics.TempMark = TempMark;
    var SwitchMark = (function (_super) {
        __extends(SwitchMark, _super);
        function SwitchMark(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgBulbOn = null;
            this.imgBulbOff = null;
            // protected textState:          TextSimple = null;
            this.border = false;
            this.imgBulbOn = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOn.png');
            this.imgBulbOff = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/bulbOff.png');
            //   this.textState = new TextSimple(x, y, w, h);                  
            this.size(x, y, w, h);
        }
        SwitchMark.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var dx = 1;
            var dy = 1;
            this.imgBulbOn.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgBulbOff.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            // this.textState.size(x + 3 * dx, y + 2.5 * dy, 60, 30);                 
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
                this.size(swtch.x, swtch.y, 80, 80);
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
                    this.imgBulbOn.paint(ctx);
                }
                else if (swtch.getState() == 3) {
                    this.imgBulbOn.paint(ctx);
                }
                else if (swtch.getState() == 4) {
                    this.imgBulbOff.paint(ctx);
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
    }(Mark2));
    OhsCanvasGraphics.SwitchMark = SwitchMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
