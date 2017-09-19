var CanvasGraphicsUI;
(function (CanvasGraphicsUI) {
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
        position(x, y) {
            this.x = x;
            this.y = y;
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
    CanvasGraphicsUI.Rect = Rect;
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
    CanvasGraphicsUI.RectRounded = RectRounded;
    class Item {
        constructor() {
            //Basic Rectangle...
            this.rect = new Rect();
        }
        paint(ctx) {
        }
        MouseDownHandler(x, y) {
            if (this.rect.isClicked(x, y)) {
                return this;
            }
            else {
                return null;
            }
        }
        MouseUpHandler(x, y) {
            return null;
        }
        MouseMoveHandler(x, y) {
            return null;
        }
        Move(x, y) {
            this.rect.x = x;
            this.rect.y = y;
        }
        Size(x, y, w, h) {
            this.rect.x = x;
            this.rect.y = y;
            this.rect.w = w;
            this.rect.h = h;
        }
    }
    CanvasGraphicsUI.Item = Item;
    class ImageButton extends Item {
        constructor(imgSrc, imgPush, x, y, w, h) {
            super();
            this.img = new Image();
            this.imgPush = new Image();
            this.border = false;
            this.push = false;
            this.int = null;
            this.img.src = imgSrc;
            this.imgPush.src = imgPush;
            //    this.border = false;
            this.rect.size(x, y, w, h);
        }
        paint(ctx) {
            ctx.save();
            if (this.push) {
                ctx.drawImage(this.imgPush, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            }
            else {
                ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            }
            ctx.restore();
            if (this.border) {
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
    CanvasGraphicsUI.ImageButton = ImageButton;
    class MessageBox extends Item {
        constructor() {
            super();
        }
        paint(ctx) {
            super.paint(ctx);
        }
    }
    CanvasGraphicsUI.MessageBox = MessageBox;
    class TextSimple extends Item {
        constructor(txt, x, y, w, h) {
            super();
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "left";
            this.textBaseline = "middle";
            this.bold = false;
            this.border = false;
            this.text = txt;
            this.rect.x = x;
            this.rect.y = y;
            this.rect.w = w;
            this.rect.h = h;
        }
        setText(txt) {
            this.text = txt.toString();
        }
        getText() {
            return this.text;
        }
        paint(ctx) {
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
    CanvasGraphicsUI.TextSimple = TextSimple;
    class Button extends Item {
        constructor(txt) {
            super();
            this.text = new TextSimple(txt, 30, 30, 250, 100);
        }
        paint(ctx) {
        }
        MouseDownHandler(x, y) {
            return null;
        }
        MouseUpHandler(x, y) {
            return null;
        }
        MouseMoveHandler(x, y) {
            return null;
        }
    }
    CanvasGraphicsUI.Button = Button;
    class ButtonImage extends Button {
        constructor(imgSrc, imgPush) {
            super('');
            this.img = new Image();
            this.imgPush = new Image();
            this.img.src = imgSrc;
            this.imgPush.src = imgPush;
        }
        paint(ctx) {
        }
        MouseDownHandler(x, y) {
            return null;
        }
        MouseUpHandler(x, y) {
            return null;
        }
        MouseMoveHandler(x, y) {
            return null;
        }
    }
    CanvasGraphicsUI.ButtonImage = ButtonImage;
    class ImageStatic extends Item {
        constructor() {
            super();
            this.img = null;
            this.imgSrc = '---';
            this.loaded = false;
            this.border = false;
            this.rectClicked = null;
            this.radius = 0;
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
            ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            ctx.restore();
            if (this.border) {
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
        paintPush(ctx) {
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
        getImage() {
            return this.img;
        }
        getImageSrc() {
            return this.imgSrc;
        }
    }
    CanvasGraphicsUI.ImageStatic = ImageStatic;
    class Screen {
        constructor() {
            this.m_item = null;
            this.m_item = new Array();
        }
        add(item) {
            this.m_item.push(item);
        }
        MouseDownHandler(x, y) {
            for (let item of this.m_item) {
                let ret = item.MouseDownHandler(x, y);
                if (ret != null)
                    return ret;
            }
            return null;
        }
        MouseUpHandler(x, y) {
            for (let item of this.m_item) {
                let ret = item.MouseUpHandler(x, y);
                if (ret != null)
                    return ret;
            }
            return null;
        }
        MouseMoveHandler(x, y) {
            for (let item of this.m_item) {
                let ret = item.MouseMoveHandler(x, y);
                if (ret != null)
                    return ret;
            }
            return null;
        }
        paint(canvas) {
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            //
            for (let item of this.m_item) {
                item.paint(ctx);
            }
        }
    }
    CanvasGraphicsUI.Screen = Screen;
    class Frame {
        constructor(canvas) {
            //   window.alert('--ttt---');
            //Pointer to current screen...
            this.m_curScreen = null;
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.m_screens = new Array();
            var self = this;
            this.canvas.addEventListener('mousedown', function (event) { self.MouseDownHandler(event); }, false);
            this.canvas.addEventListener('mouseup', function (event) { self.MouseUpHandler(event); }, false);
            this.canvas.addEventListener('mousemove', function (event) { self.MouseMoveHandler(event); }, false);
            requestAnimationFrame(() => this.paint());
        }
        paint() {
            var benchmark = false;
            if (benchmark) {
                /////**** Benchmark*****  
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // Move registration point to the center of the canvas
                this.ctx.translate(this.canvas.width / 2, this.canvas.width / 2);
                // Rotate 1 degree
                this.ctx.rotate(Math.PI / 180);
                // Move registration point back to the top left corner of canvas
                this.ctx.translate(-this.canvas.width / 2, -this.canvas.width / 2);
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 4, this.canvas.width / 2, this.canvas.height / 4);
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 2, this.canvas.width / 2, this.canvas.height / 4);
            }
            else {
                this.m_curScreen.paint(this.canvas);
            }
            requestAnimationFrame(() => this.paint());
        }
        MouseMoveHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                this.m_curScreen.MouseMoveHandler(mousePos.x, mousePos.y);
            }
        }
        MouseDownHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                this.m_curScreen.MouseDownHandler(mousePos.x, mousePos.y);
            }
        }
        MouseUpHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                this.m_curScreen.MouseUpHandler(mousePos.x, mousePos.y);
            }
        }
        addItem(screen) {
            this.m_screens.push(screen);
        }
    }
    CanvasGraphicsUI.Frame = Frame;
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
        while (new Date().getTime() < unixtime_ms + ms) { }
    }
})(CanvasGraphicsUI || (CanvasGraphicsUI = {}));
