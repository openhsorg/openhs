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
    var Mark = (function () {
        function Mark(ctx, rect) {
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
        function TempMark(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.border = false; //debug border
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 18;
            this.img = new Image();
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }
        TempMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.setSize(rect);
        };
        TempMark.prototype.paint = function (text) {
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
            this.txt.paint(text);
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
        function SwitchMark(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.colorButton = "#666699";
            this.state = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
            this.border = false; //debug border
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src;
        }
        SwitchMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.setSize(rect);
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
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.colorButton;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();
            //  this.rect.x = this.rect.x + 30;
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
    var DoorsMark = (function (_super) {
        __extends(DoorsMark, _super);
        function DoorsMark(ctx, rect, src) {
            _super.call(this, ctx, rect);
            this.img = null;
            this.colorButton = "#666699";
            this.state = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
            this.border = false; //debug border
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "right";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src;
        }
        DoorsMark.prototype.setSize = function (rect) {
            _super.prototype.setSize.call(this, rect);
            this.txt.setSize(rect);
        };
        DoorsMark.prototype.paint = function () {
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
            this.ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.colorButton;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();
            //  this.rect.x = this.rect.x + 30;
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
        return DoorsMark;
    }(Mark));
    OhsCanvasGraphics.DoorsMark = DoorsMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
