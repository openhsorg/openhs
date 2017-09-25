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
        constructor(ctx) {
            //Basic Rectangle...
            this.rect = new Rect();
            this.ctx = ctx;
        }
        paint() {
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
            if (this.rect.isClicked(x, y)) {
                return this;
            }
            else {
                return null;
            }
        }
        MouseMoveHandler(x, y) {
            if (this.rect.isClicked(x, y)) {
                return this;
            }
            else {
                return null;
            }
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
        constructor(ctx, imgSrc, imgPush, x, y, w, h) {
            super(ctx);
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
        paint() {
            const ctx = this.ctx;
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
    class TextSimple extends Item {
        //   protected ipt: any = null;
        constructor(ctx, txt, x, y, w, h) {
            super(ctx);
            this.fontSize = 20;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "left";
            this.textBaseline = "middle";
            this.bold = false;
            this.border = false;
            this.editable = true;
            this.inp = null;
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
        /*
        public MouseUpHandler(x: number, y: number) {
            if (super.MouseUpHandler(x, y) == null) return null;
            
            return <Item> this;
        }
                   
        */
        paint() {
            const ctx = this.ctx;
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
    class NumberRounded extends TextSimple {
        constructor(ctx) {
            super(ctx, '', 0, 0, 0, 0);
            this.colorInside = '#a6a6a6';
            this.colorText = '#ffffff';
            this.num = 0;
            this.fontSize = 26;
            this.fontFamily = "px Tahoma, sans-serif";
            this.fontColor = this.colorText;
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.bold = true;
        }
        center(cx, cy, w, h) {
            this.rect.size(cx - (w / 2), cy - (h / 2), w, h);
        }
        SetNumber(num) {
            this.num = num;
            this.setText(this.num.toString());
        }
        paint() {
            const ctx = this.ctx;
            if (this.num <= 0) {
                this.colorInside = '#a6a6a6';
            }
            else {
                this.colorInside = '#003399';
            }
            //Basic shape
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.colorInside;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.colorInside;
            ctx.stroke();
            ctx.restore();
            super.paint();
        }
    }
    CanvasGraphicsUI.NumberRounded = NumberRounded;
    class Button extends Item {
        constructor(ctx, txt) {
            super(ctx);
            this.text = new TextSimple(ctx, txt, 30, 30, 250, 100);
        }
        paint() {
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
        constructor(ctx, imgSrc, imgPush) {
            super(ctx, '');
            this.img = new Image();
            this.imgPush = new Image();
            this.img.src = imgSrc;
            this.imgPush.src = imgPush;
        }
        paint() {
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
        constructor(ctx) {
            super(ctx);
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
        paint() {
            const ctx = this.ctx;
            ctx.save();
            super.paint();
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
    class ListBox extends Item {
        constructor(ctx) {
            super(ctx);
            this.colorBkg = '#ffffff';
            this.colorBorder = '#a6a6a6';
            this.colorText = '#ffffff';
            this.fontSize = 20;
            this.bold = false;
            this.num = 0;
            this.row_height = 40;
            this.selRow = 0;
            this.selectedRow = 0;
            this.editable = true;
            this.selectable = true;
            this.m_items = new Array();
        }
        MouseMoveHandler(x, y) {
            if (super.MouseMoveHandler(x, y) != this)
                return null;
            var i = 1;
            this.selRow = 0;
            for (let item of this.m_items) {
                if (item.rect.isClicked(x, y)) {
                    if (this.selectable) {
                        this.selRow = i;
                    }
                    return item;
                }
                i++;
            }
            return this;
        }
        MouseDownHandler(x, y) {
            if (super.MouseDownHandler(x, y) != this)
                return null;
            var i = 1;
            // this.selectedRow = 0;
            for (let item of this.m_items) {
                if (item.MouseDownHandler(x, y) == item) {
                    if (this.selectable) {
                        this.selectedRow = i;
                    }
                    return item;
                }
                i++;
            }
            return this;
        }
        MouseUpHandler(x, y) {
            if (super.MouseUpHandler(x, y) != this)
                return null;
            var i = 1;
            // this.selectedRow = 0;
            for (let item of this.m_items) {
                if (item.MouseUpHandler(x, y) == item) {
                    return item;
                }
                i++;
            }
            return this;
        }
        add(item) {
            //   item.canvas = this.canvas;
            item.fontSize = this.fontSize;
            item.fontFamily = "px Tahoma, sans-serif";
            item.fontColor = '#009ccc';
            item.textAlign = "left";
            item.textBaseline = "middle";
            item.bold = this.bold;
            item.editable = this.editable;
            this.m_items.push(item);
        }
        addEntry(txt) {
            this.add(new TextSimple(this.ctx, txt, 0, 0, 10, 10));
        }
        setText(txt, n) {
            if (this.m_items.length < n + 1) {
                this.addEntry(txt);
            }
            else {
                this.m_items[n].setText(txt);
            }
        }
        setEditable(editable) {
            this.editable = editable;
            for (let item of this.m_items) {
                item.editable = editable;
            }
        }
        setSelectable(selectable) {
            this.selectable = selectable;
        }
        order() {
            var high = this.row_height;
            var space_vertical = 2;
            var space_left = 2;
            var i = 0;
            for (let item of this.m_items) {
                item.Size(this.rect.x + space_left, this.rect.y, this.rect.w - (2 * space_left), high);
                item.Move(this.rect.x + space_left, this.rect.y + space_vertical + (i * (high + space_vertical)));
                i++;
            }
        }
        paint() {
            const ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            this.rect.paint(ctx);
            ctx.fillStyle = this.colorBkg;
            ctx.fill();
            ctx.lineWidth = 2;
            if (this.colorBorder === '') {
                ctx.strokeStyle = this.colorBkg;
            }
            else {
                ctx.strokeStyle = this.colorBorder;
            }
            ctx.stroke();
            ctx.closePath();
            ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            ctx.stroke();
            ctx.clip();
            //Draw Items
            this.order();
            var i = 1;
            var cc = 0;
            for (let item of this.m_items) {
                ctx.beginPath();
                if (cc == 0) {
                    ctx.fillStyle = '#e6f9ff';
                }
                else {
                    ctx.fillStyle = '#ccf3ff';
                }
                if (this.selectedRow == i) {
                    ctx.fillStyle = '#c180ff';
                }
                if (this.selRow == i) {
                    ctx.fillStyle = '#dab3ff';
                }
                ctx.rect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
                ctx.fill();
                ctx.closePath();
                item.paint();
                if (cc == 0)
                    cc++;
                else
                    cc = 0;
                i++;
            }
            ctx.restore();
            super.paint();
        }
    }
    CanvasGraphicsUI.ListBox = ListBox;
    class PropertyBox extends Item {
        constructor(ctx) {
            super(ctx);
            this.colorBkg = '#ffffff';
            this.colorBorder = '#a6a6a6';
            this.m_props = new ListBox(this.ctx);
            this.m_data = new ListBox(this.ctx);
            //Set style...
            this.m_props.fontSize = 20;
            this.m_props.colorBorder = '';
            this.m_props.bold = false;
            this.m_props.setEditable(false);
            this.m_props.setSelectable(false);
            this.m_data.fontSize = 16;
            this.m_data.colorBorder = '';
            this.m_data.bold = false;
            this.m_data.setEditable(true);
            this.m_data.setSelectable(false);
        }
        MouseMoveHandler(x, y) {
            if (super.MouseMoveHandler(x, y) != this)
                return null;
            return this;
        }
        MouseDownHandler(x, y) {
            if (super.MouseDownHandler(x, y) != this)
                return null;
            /*
            if (this.canvas == null) {
                window.alert('canvas null...');
            }
            */
            var ret = this.m_props.MouseDownHandler(x, y);
            if (ret != null)
                return ret;
            ret = this.m_data.MouseDownHandler(x, y);
            if (ret != null)
                return ret;
            return this;
        }
        MouseUpHandler(x, y) {
            if (super.MouseUpHandler(x, y) != this)
                return null;
            var ret = this.m_props.MouseUpHandler(x, y);
            if (ret != null)
                return ret;
            var ret = this.m_data.MouseUpHandler(x, y);
            if (ret != null)
                return ret;
            return this;
        }
        addEntry(txtProp, txtData) {
            //      this.m_props.canvas = this.canvas;
            //    this.m_data.canvas = this.canvas;            
            this.m_props.addEntry(txtProp);
            this.m_data.addEntry(txtData);
        }
        setText(txtProp, txtData, n) {
            this.m_props.setText(txtProp, n);
            this.m_data.setText(txtData, n);
        }
        order() {
            var widthPropPerc = 0.25; //percentage of property field
            var gapX = 4; //left/right gap
            var gapY = 4; //top/bottom gap
            var widthProp = (this.rect.w - (3 * gapX)) * widthPropPerc;
            var widthData = (this.rect.w - (3 * gapX)) - widthProp;
            this.m_props.Size(this.rect.x + gapX, this.rect.y + gapY, widthProp, this.rect.h - (2 * gapY));
            this.m_data.Size(this.rect.x + gapX + widthProp + gapX, this.rect.y + gapY, widthData, this.rect.h - (2 * gapY));
            this.m_props.order();
            this.m_data.order();
        }
        paint() {
            const ctx = this.ctx;
            this.order();
            ctx.save();
            ctx.beginPath();
            this.rect.paint(ctx);
            ctx.fillStyle = this.colorBkg;
            ctx.fill();
            ctx.lineWidth = 2;
            if (this.colorBorder === '') {
                ctx.strokeStyle = this.colorBkg;
            }
            else {
                ctx.strokeStyle = this.colorBorder;
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            //ctx.save();
            this.m_props.paint();
            this.m_data.paint();
            //  ctx.restore();
            super.paint();
        }
    }
    CanvasGraphicsUI.PropertyBox = PropertyBox;
    class Screen {
        //   private msg:                MessageBox = new MessageBox ();
        constructor(canvas) {
            this.m_item = null;
            this.canvas = null;
            this.ctx = null;
            this.message = false;
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
            this.m_item = new Array();
        }
        add(item) {
            // item.canvas = this.canvas;
            this.m_item.push(item);
        }
        /*
        public SetCanvas (canvas: HTMLCanvasElement) {
            this.canvas = canvas;
        
        }
        */
        GetSize() {
            return {
                width: this.canvas.width,
                height: this.canvas.height
            };
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
        MessagBox(text, type) {
            this.message = true;
        }
        updateData() {
            //Any routines updating data...            
        }
        paint() {
            //Update data first
            this.updateData();
            //Paint
            const ctx = this.canvas.getContext('2d');
            var width = this.canvas.width;
            var height = this.canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            for (let item of this.m_item) {
                item.paint();
            }
            ctx.restore();
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
            // window.addEventListener('keydown', function(event){self.KeyDownHandler(event);}, false);
            //    document.addEventListener("keydown", () => this.KeyDownHandler);
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
                this.m_curScreen.paint();
            }
            requestAnimationFrame(() => this.paint());
        }
        MouseMoveHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                return this.m_curScreen.MouseMoveHandler(mousePos.x, mousePos.y);
            }
        }
        MouseDownHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                return this.m_curScreen.MouseDownHandler(mousePos.x, mousePos.y);
            }
        }
        MouseUpHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            if (this.m_curScreen != null) {
                return this.m_curScreen.MouseUpHandler(mousePos.x, mousePos.y);
            }
        }
        /*
        public KeyDownHandler (event) {
            
                  
            var keyCode = event.keyCode;
            
            if (keyCode == 13) {
             //   window.alert('*kd');
            }
                
              //  window.alert('*');
        }
                 */
        addItem(screen) {
            // screen.SetCanvas(this.canvas);
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
