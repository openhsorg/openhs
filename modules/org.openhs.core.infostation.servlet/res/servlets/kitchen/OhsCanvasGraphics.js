/// <reference path="jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OhsCanvasGraphics;
(function (OhsCanvasGraphics) {
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
        return Rect;
    }());
    OhsCanvasGraphics.Rect = Rect;
    var Text = (function () {
        function Text(ctx, rect) {
            this.fontSize = 10;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.ctx = ctx;
            this.rect = new Rect(rect.x, rect.y, rect.w, rect.h);
        }
        Text.prototype.paint = function (text) {
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(text, this.rect.x, this.rect.y);
            this.ctx.restore();
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
        Text.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;
            if (this.textAlign == "center") {
                rect.x = this.rect.x - (this.rect.w / 2);
            }
            else if (this.textAlign == "right" || this.textAlign == "end") {
                rect.x = this.rect.x - this.rect.h;
            }
            if (this.textBaseline == "bottom") {
                rect.y = this.rect.y - this.rect.h;
            }
            else if (this.textBaseline == "middle") {
                rect.y = this.rect.y - (this.rect.h / 2);
            }
            return rect;
        };
        return Text;
    }());
    OhsCanvasGraphics.Text = Text;
    var Mark = (function () {
        function Mark(ctx, rect) {
            this.ctx = ctx;
            this.rect = new Rect(rect.x, rect.y, rect.w, rect.h);
        }
        Mark.prototype.setSize = function (rect) {
            this.rect.equals(rect);
        };
        Mark.prototype.isClicked = function (clx, cly) {
            return (clx > this.rect.x && clx < this.rect.x + this.rect.w && cly < this.rect.y + this.rect.h && cly > this.rect.y);
        };
        return Mark;
    }());
    OhsCanvasGraphics.Mark = Mark;
    var TempMark = (function (_super) {
        __extends(TempMark, _super);
        function TempMark(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }
        TempMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.rect.equals(rect);
        };
        TempMark.prototype.paint = function (text) {
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
        };
        TempMark.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;
            return rect;
        };
        return TempMark;
    }(Mark));
    OhsCanvasGraphics.TempMark = TempMark;
    var SwitchMark = (function (_super) {
        __extends(SwitchMark, _super);
        function SwitchMark(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.colorButton = "#666699";
            this.state = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src;
        }
        SwitchMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.rect.equals(rect);
        };
        SwitchMark.prototype.paint = function () {
            var text = "---";
            // state=   0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
            //logic of switch
            if (this.state == 0) {
                this.colorButton = "#808080";
                text = "---";
            }
            else if (this.state == 1) {
                this.colorButton = "#3333ff";
                text = "off";
            }
            else if (this.state == 2) {
                this.colorButton = "#33cc33";
                text = "->on";
            }
            else if (this.state == 3) {
                this.colorButton = "#ffaa00";
                text = "on";
            }
            else if (this.state == 4) {
                this.colorButton = "#9999ff";
                text = "->off";
            }
            else {
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
        };
        SwitchMark.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.rect.x;
            rect.y = this.rect.y;
            rect.width = this.rect.w;
            rect.heigth = this.rect.h;
            return rect;
        };
        return SwitchMark;
    }(Mark));
    OhsCanvasGraphics.SwitchMark = SwitchMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
