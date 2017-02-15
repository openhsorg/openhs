/// <reference path="jquery.d.ts" />
/// <reference path='OhsSiteData.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OhsCanvasGraphics;
(function (OhsCanvasGraphics) {
    var Door = OhsSiteData.Door;
    var Graphics = (function () {
        function Graphics(canvas, m_siteData) {
            this.m_siteData = null;
            this.m_tempMarks = null;
            this.m_switchMarks = null;
            this.m_doorMarks = null;
            this.m_doorPictures = null;
            this.m_iconsetRoomBkg = null; //room images...
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            //---Data---
            this.m_siteData = m_siteData;
            //---Graphics---            
            this.m_tempMarks = new Array();
            this.m_switchMarks = new Array();
            this.m_doorMarks = new Array();
            this.m_doorPictures = new Array();
            this.m_iconsetRoomBkg = new Iconset(this.ctx, new Rect(0, 0, this.canvas.width, this.canvas.height));
            // this.m_iconsetRoomBkg = new Iconset();
            //---Timer---
            this.timerUpdateGraphicsEvent(10000);
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
        Graphics.prototype.updateGraphics = function () {
            //Rooms
            var imgPaths = new Array();
            for (var id in this.m_siteData.rooms) {
                imgPaths.push(this.m_siteData.rooms[id].imageBkgPath);
            }
            this.m_iconsetRoomBkg.setImages(imgPaths);
            // Doors images
            this.setNumber(this.m_siteData.doors.length, this.m_doorPictures, Iconset, this.ctx, new Rect(0, 0, 0, 0));
            for (var id_1 in this.m_siteData.doors) {
                this.m_doorPictures[id_1].thing = this.m_siteData.doors[id_1];
                this.m_doorPictures[id_1].setImages(new Array(this.m_siteData.doors[id_1].image_open, this.m_siteData.doors[id_1].image_close));
            }
            // Temperature
            this.setNumber(this.m_siteData.tempSensors.length, this.m_tempMarks, TempMark, this.ctx, new Rect(0, 0, 0, 0));
            for (var id_2 in this.m_siteData.tempSensors) {
                this.m_tempMarks[id_2].setSize(new Rect(this.m_siteData.tempSensors[id_2].x, this.m_siteData.tempSensors[id_2].y, 80, 80));
                this.m_tempMarks[id_2].setData(this.m_siteData.tempSensors[id_2]);
            }
            // Switches
            this.setNumber(this.m_siteData.switches.length, this.m_switchMarks, SwitchMark, this.ctx, new Rect(0, 0, 80, 80));
            for (var id_3 in this.m_siteData.switches) {
                this.m_switchMarks[id_3].thing = this.m_siteData.switches[id_3];
            }
            // Doors symbols
            this.setNumber(this.m_siteData.doors.length, this.m_doorMarks, DoorMark, this.ctx, new Rect(0, 0, 0, 0));
            for (var id_4 in this.m_siteData.doors) {
                this.m_doorMarks[id_4].setSize(new Rect(this.m_siteData.doors[id_4].x, this.m_siteData.doors[id_4].y, 80, 80));
                // this.m_doorMarks[id].setState(this.m_siteData.doors[id].open, this.m_siteData.doors[id].locked);    
                this.m_doorMarks[id_4].thing = this.m_siteData.doors[id_4];
            }
        };
        Graphics.prototype.timerUpdateGraphicsEvent = function (step) {
            var _this = this;
            this.updateGraphics();
            window.clearTimeout(this.timerUpdateGraphics);
            this.timerUpdateGraphics = window.setTimeout(function () { return _this.timerUpdateGraphicsEvent(step); }, step);
        };
        Graphics.prototype.isClicked = function (x, y, filterPath) {
            var switches = this.getFilteredMarks(this.m_switchMarks, filterPath);
            for (var id in switches) {
                if (switches[id].isClicked(x, y)) {
                    return switches[id].getData();
                }
            }
            var temps = this.getFilteredMarks(this.m_tempMarks, filterPath);
            for (var id in temps) {
                if (temps[id].isClicked(x, y)) {
                    return temps[id].getData();
                }
            }
            var doors = this.getFilteredMarks(this.m_doorMarks, filterPath);
            for (var id in doors) {
                if (doors[id].isClicked(x, y)) {
                    return doors[id].getData();
                }
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
            _super.call(this, x, y, w, h, radius);
            this.img = null;
            this.img = new Image();
            this.img.src = imgSrc;
        }
        ImageRect.prototype.paint = function (ctx) {
            ctx.save();
            _super.prototype.paint.call(this, ctx);
            if (this.radius != 0) {
                ctx.clip();
            }
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            ctx.restore();
        };
        return ImageRect;
    }(RectRounded));
    OhsCanvasGraphics.ImageRect = ImageRect;
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
    var DoorMark2 = (function (_super) {
        __extends(DoorMark2, _super);
        function DoorMark2(x, y, w, h) {
            _super.call(this, x, y, w, h);
            this.imgOpen = null;
            this.imgClose = null;
            this.imgLock = null;
            this.imgOpen = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_open.png');
            this.imgClose = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/door_close.png');
            this.imgLock = new ImageRect(x, y, w, h, 0, '/infores/servlets/kitchen/padlock.png');
            this.size(x, y, w, h);
        }
        DoorMark2.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            var dx = 20;
            var dy = 20;
            this.imgOpen.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgClose.size(x + dx, y + dy, w - (2 * dx), h - (2 * dy));
            this.imgLock.size(x + dx, y + dy, w - dx, h - dy);
        };
        DoorMark2.prototype.getDoorThing = function () {
            var door = null;
            if (this.thing) {
                if (this.thing instanceof Door) {
                    door = this.thing;
                }
            }
            return door;
        };
        DoorMark2.prototype.paintByThing = function (ctx) {
            var door = this.getDoorThing();
            if (door != null) {
                //this.x = door.x;
                //this.y = door.y;
                this.size(door.x, door.y, 80, 80);
            }
            this.paint(ctx);
        };
        DoorMark2.prototype.paint = function (ctx) {
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
        return DoorMark2;
    }(Mark2));
    OhsCanvasGraphics.DoorMark2 = DoorMark2;
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
        //  private temp:   number = -100.0;
        //  private tempSensor: TemperatureSensor = null;
        function TempMark(ctx, rect) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.border = false; //debug border
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 18;
            this.img = new Image();
            this.img.src = '/infores/servlets/kitchen/tempSymbol.png';
        }
        TempMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.setSize(rect);
        };
        TempMark.prototype.setData = function (temp) {
            this.thing = temp;
        };
        TempMark.prototype.getData = function () {
            return this.thing;
        };
        TempMark.prototype.paint = function () {
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
                var thingSensor = this.thing;
                this.txt.paint(thingSensor.temp + " \u00B0C");
            }
            //Draw image...
            //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.rect.x + (this.rect.w / 2) - 20, this.rect.y - 20, 40, 40);
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
        return TempMark;
    }(Mark));
    OhsCanvasGraphics.TempMark = TempMark;
    var SwitchMark = (function (_super) {
        __extends(SwitchMark, _super);
        function SwitchMark(ctx, rect) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.colorButton = "#666699";
            this.border = false; //debug border        
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = '/infores/servlets/kitchen/BulbSymbol.png';
        }
        SwitchMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.setSize(rect);
        };
        SwitchMark.prototype.setData = function (switchIn) {
            this.thing = switchIn;
        };
        SwitchMark.prototype.getData = function () {
            return this.thing;
        };
        SwitchMark.prototype.paint = function () {
            var switchVar = this.thing;
            // Update this
            this.rect.x = switchVar.x;
            this.rect.y = switchVar.y;
            this.txt.setSize(this.rect);
            var text = "---";
            //logic of switch
            if (switchVar.getState() == 0) {
                this.colorButton = "#808080";
                text = "---";
            }
            else if (switchVar.getState() == 1) {
                this.colorButton = "#3333ff";
                text = "off";
            }
            else if (switchVar.getState() == 2) {
                this.colorButton = "#33cc33";
                text = "->on";
            }
            else if (switchVar.getState() == 3) {
                this.colorButton = "#ffaa00";
                text = "on";
            }
            else if (switchVar.getState() == 4) {
                this.colorButton = "#9999ff";
                text = "->off";
            }
            else {
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
        return SwitchMark;
    }(Mark));
    OhsCanvasGraphics.SwitchMark = SwitchMark;
    //export class DoorMark2 extends Rectangle 
    var DoorMark = (function (_super) {
        __extends(DoorMark, _super);
        function DoorMark(ctx, rect) {
            _super.call(this, ctx, rect);
            this.imgOpen = null;
            this.imgClose = null;
            this.imgLock = null;
            this.colorButton = "white";
            this.colorBorder = "black";
            this.border = true; //debug border
            this.imgOpen = new Image();
            this.imgOpen.src = "/infores/servlets/kitchen/door_open.png";
            this.imgClose = new Image();
            this.imgClose.src = "/infores/servlets/kitchen/door_close.png";
            this.imgLock = new Image();
            this.imgLock.src = "/infores/servlets/kitchen/padlock.png";
        }
        DoorMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
        };
        DoorMark.prototype.setData = function (door) {
            this.thing = door;
        };
        DoorMark.prototype.getData = function () {
            return this.thing;
        };
        DoorMark.prototype.paintByThing = function (w, h) {
            if (this.thing != null) {
                var doorVar = this.thing;
                // Update this
                this.rect.x = doorVar.x;
                this.rect.y = doorVar.y;
                var state = 0;
                //Set state by door....
                if (doorVar.open) {
                    state = 1;
                }
                else {
                    if (!doorVar.locked)
                        state = 2;
                    else
                        state = 3;
                }
            }
            this.paint(state);
        };
        DoorMark.prototype.paint = function (state) {
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
            }
            else if (state == 1) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                this.ctx.save();
                this.ctx.drawImage(this.imgOpen, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();
            }
            else if (state == 2) {
                this.colorButton = "#ccffe6";
                this.colorBorder = "#00cc69";
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();
            }
            else if (state == 3) {
                this.colorButton = "#ff8080";
                this.colorBorder = "red";
                this.ctx.save();
                this.ctx.drawImage(this.imgClose, this.rect.x + 20, this.rect.y + 20, 40, 40);
                this.ctx.restore();
                this.ctx.save();
                this.ctx.drawImage(this.imgLock, this.rect.x + 20 + 10, this.rect.y + 30, 20, 20);
                this.ctx.restore();
            }
            else {
                this.colorButton = "#808080";
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
        };
        return DoorMark;
    }(Mark));
    OhsCanvasGraphics.DoorMark = DoorMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
