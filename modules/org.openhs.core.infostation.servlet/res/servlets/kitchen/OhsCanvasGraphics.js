/// <reference path="jquery.d.ts" />
var OhsCanvasGraphics;
(function (OhsCanvasGraphics) {
    class Rect {
        constructor(x, y, w, h) {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        isClicked(clx, cly) {
            return (clx > this.x && clx < this.x + this.w && cly < this.y + this.h && cly > this.y);
        }
        equals(rectI) {
            this.x = rectI.x;
            this.y = rectI.y;
            this.w = rectI.w;
            this.h = rectI.h;
        }
    }
    OhsCanvasGraphics.Rect = Rect;
    class Text {
        constructor(ctx, rect) {
            this.fontSize = 10;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.ctx = ctx;
            this.rect = new Rect(rect.x, rect.y, rect.w, rect.h);
        }
        paint(text) {
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(text, this.rect.x, this.rect.y);
            this.ctx.restore();
        }
        equals(tx) {
            this.rect.equals(tx.rect);
            this.ctx = tx.ctx;
            this.fontSize = tx.fontSize;
            this.fontColor = tx.fontColor;
            this.fontFamily = tx.fontFamily;
            this.textAlign = tx.textAlign;
            this.textBaseline = tx.textBaseline;
        }
        getRect() {
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
        }
    }
    OhsCanvasGraphics.Text = Text;
    class Mark {
        constructor(ctx, rect) {
            this.ctx = ctx;
            this.rect = new Rect(rect.x, rect.y, rect.w, rect.h);
        }
        setSize(rect) {
            this.rect.equals(rect);
        }
        isClicked(clx, cly) {
            return (clx > this.rect.x && clx < this.rect.x + this.rect.w && cly < this.rect.y + this.rect.h && cly > this.rect.y);
        }
    }
    OhsCanvasGraphics.Mark = Mark;
    class TempMark extends Mark {
        constructor(ctx, rect, src) {
            super(ctx, rect);
            this.img = null;
            this.txt = new Text(ctx, rect);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = src; //"/infores/servlets/kitchen/tempSymbol.png";              
        }
        setSize(rect) {
            super.setSize(rect);
            this.txt.rect.equals(rect);
        }
        paint(text) {
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
        }
        getRect() {
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
        }
    }
    OhsCanvasGraphics.TempMark = TempMark;
})(OhsCanvasGraphics || (OhsCanvasGraphics = {}));
