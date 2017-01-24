/// <reference path="jquery.d.ts" />
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
        /*
        public width() {
            return this.w;
        }
        
        public height() {
            return this.h;
        }
        */
        Rect.prototype.setWidth = function (w) {
            this.w = w;
        };
        Rect.prototype.setHeight = function (h) {
            this.h = h;
        };
        Rect.prototype.isClicked = function (clx, cly) {
            return (clx > this.x && clx < this.x + this.w && cly < this.y + this.h && cly > this.y);
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
            this.rect = rect;
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
        /*
            setSize (x: number, y: number, width: number, height: number) {
                this.rect.x = x;
                this.rect.y = y;
                this.rect.setWidth(width);
                this.rect.setHeight(height);
            }
        */
        Text.prototype.copyFrom = function (tx) {
            //this.rect = tx.rect;
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
            this.rect = rect;
        }
        return Mark;
    }());
    OhsCanvasGraphics.Mark = Mark;
    var TempMark = (function () {
        function TempMark(ctx, rect, src) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.img = null;
            this.ctx = ctx;
            this.x = rect.x;
            this.y = rect.y;
            this.width = rect.w;
            this.height = rect.h;
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }
        TempMark.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt.rect.x = x;
            this.txt.rect.y = y;
            this.txt.rect.setWidth(width);
            this.txt.rect.setHeight(height);
        };
        TempMark.prototype.paint = function (text) {
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
        };
        TempMark.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.x;
            rect.y = this.y;
            rect.width = this.width;
            rect.heigth = this.height;
            return rect;
        };
        TempMark.prototype.isClicked = function (clx, cly) {
            return (clx > this.x && clx < this.x + this.width && cly < this.y + this.height && cly > this.y);
        };
        return TempMark;
    }());
    OhsCanvasGraphics.TempMark = TempMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
