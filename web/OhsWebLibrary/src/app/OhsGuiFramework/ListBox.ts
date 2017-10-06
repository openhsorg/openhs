import {Item} from './Item';
import {TextSimple} from './TextSimple';

export class ListBox extends Item {

    public m_items:                 Array<TextSimple>;
    protected colorBkg              = '#ffffff';
    public colorBorder              = '#a6a6a6';
    public colorText                = '#ffffff';
    public fontSize                 = 20;
    public bold                     = false;
    public num                      = 0;
    protected row_height            = 40;
    protected selRow                = 0;
    public selectedRow              = 0;
    protected editable              = true;
    protected selectable            = true;

    constructor (ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.m_items = new Array<TextSimple>();
    }

    public MouseMoveHandler(x: number, y: number) {

        if (super.MouseMoveHandler(x, y) !== this) {
            return null;
        }

        let i = 1;

        this.selRow = 0;

        for (let item of this.m_items) {
            if (item.rect.isClicked(x, y)) {

                if (this.selectable) {
                    this.selRow = i;
                }

                return <Item>item;
            }
            i ++;
        }
        return <Item> this;
    }

    public MouseDownHandler(x: number, y: number) {
        if (super.MouseDownHandler(x, y) !== this) {
            return null;
        }

        let i = 1;
       // this.selectedRow = 0;

        for (let item of this.m_items) {
            if (item.MouseDownHandler(x, y) === item) {

                if (this.selectable) {
                    this.selectedRow = i;
                }

                return <Item> item;
            }
            i ++;
        }
        return <Item> this;
    }

    public MouseUpHandler(x: number, y: number) {
        if (super.MouseUpHandler(x, y) !== this) { return null; }

        var i = 1;

       // this.selectedRow = 0;


        for (let item of this.m_items) {
            if (item.MouseUpHandler(x, y) === item){

                return <Item>item;
            }
            i ++;
        }

        return <Item> this;
    }

    public add(item: TextSimple) {

     //   item.canvas = this.canvas;

        item.fontSize = this.fontSize;
        item.fontFamily = 'px Tahoma, sans-serif';
        item.fontColor = '#009ccc';
        item.textAlign = 'left';
        item.textBaseline = 'middle';
        item.bold = this.bold;
        item.editable = this.editable;
        this.m_items.push(item);
    }

    public addEntry (txt: String) {
        this.add(new TextSimple (this.ctx, txt, 0, 0, 10, 10));
    }

    public setText (txt: String, n: number) {
        if (this.m_items.length < n + 1) {
            this.addEntry(txt);
        } else {
            this.m_items[n].setText(txt);
        }
    }

    public setEditable(editable: boolean) {
        this.editable = editable;

        for (let item of this.m_items) {
            item.editable = editable;
        }
    }

    public setSelectable(selectable: boolean) {
        this.selectable = selectable;
    }

    public order () {
        var high = this.row_height;
        var space_vertical = 2;
        var space_left = 2;
        var i = 0;

        for (let item of this.m_items) {

            item.Size(this.rect.x + space_left, this.rect.y, this.rect.w - (2 * space_left), high);
            item.Move(this.rect.x + space_left, this.rect.y + space_vertical + (i * (high + space_vertical)));

            i ++;
        }
    }

    public paint () {

        const ctx = this.ctx;

        ctx.save();
        ctx.beginPath();
        this.rect.paint(ctx);
        ctx.fillStyle = this.colorBkg;
        ctx.fill();
        ctx.lineWidth = 2;

        if (this.colorBorder === '') {
            ctx.strokeStyle = this.colorBkg;
        } else {
            ctx.strokeStyle = this.colorBorder;
        }

        ctx.stroke();
        ctx.closePath();

        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.stroke();
        ctx.clip();

        // Draw Items
        this.order();

        var i = 1;
        var cc = 0;

        for (let item of this.m_items) {

            ctx.beginPath();

            if (cc === 0) {
                ctx.fillStyle = '#e6f9ff';
            } else {
                ctx.fillStyle = '#ccf3ff';
            }

            if (this.selectedRow === i) {
                ctx.fillStyle = '#c180ff';
            }

            if (this.selRow === i) {
                ctx.fillStyle = '#dab3ff';
            }

            ctx.rect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
            ctx.fill();

            ctx.closePath();

            item.paint();

            if (cc === 0) {
                cc ++;
            } else {
                cc = 0;
            }

            i++;
        }

        ctx.restore();

        super.paint();
    }

}
