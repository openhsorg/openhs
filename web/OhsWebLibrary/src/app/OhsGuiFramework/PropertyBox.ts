import {Item} from './Item';
import {ListBox} from './ListBox';

export class PropertyBox extends Item {

    public m_props:                 ListBox;
    public m_data:                  ListBox;
    protected colorBkg              = '#ffffff';
    public colorBorder              = '#a6a6a6';

    constructor (ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.m_props = new ListBox(this.ctx);
        this.m_data = new ListBox(this.ctx);

        // Set style...
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
    public MouseMoveHandler(x: number, y: number) {
        if (super.MouseMoveHandler(x, y) !== this) { return null; }


        return <Item> this;
    }

    public MouseDownHandler(x: number, y: number) {
        if (super.MouseDownHandler(x, y) !== this) { return null; }

        /*
        if (this.canvas == null) {
            window.alert('canvas null...');
        }
        */
        var ret = this.m_props.MouseDownHandler(x, y);
        if (ret != null) { return ret; }

        ret = this.m_data.MouseDownHandler(x, y);
        if (ret != null) { return ret; }

        return <Item> this;
    }

    public MouseUpHandler(x: number, y: number) {
        if (super.MouseUpHandler(x, y) !== this) { return null; }

        var ret = this.m_props.MouseUpHandler(x, y);
        if (ret != null) { return ret; }

        var ret = this.m_data.MouseUpHandler(x, y);
        if (ret != null) { return ret; }

        return <Item> this;
    }

    public addEntry (txtProp: String, txtData:  String) {

  //      this.m_props.canvas = this.canvas;
    //    this.m_data.canvas = this.canvas;

        this.m_props.addEntry(txtProp);
        this.m_data.addEntry(txtData);

    }

    public setText (txtProp: String, txtData: String, n: number) {
        this.m_props.setText(txtProp, n);
        this.m_data.setText(txtData, n);
    }

    protected order () {

        var widthPropPerc = 0.25; // percentage of property field
        var gapX = 4; // left/right gap
        var gapY = 4; // top/bottom gap
        var widthProp = (this.rect.w - (3 * gapX)) * widthPropPerc;
        var widthData = (this.rect.w - (3 * gapX)) - widthProp;
        this.m_props.Size(this.rect.x + gapX, this.rect.y + gapY, widthProp, this.rect.h - (2 * gapY));
        this.m_data.Size(this.rect.x + gapX + widthProp + gapX, this.rect.y + gapY, widthData, this.rect.h - (2 * gapY));
        this.m_props.order();
        this.m_data.order();

    }

    public paint () {
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
        } else {
            ctx.strokeStyle = this.colorBorder;
        }

        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // ctx.save();
        this.m_props.paint();
        this.m_data.paint();
      //  ctx.restore();
        super.paint();
    }
}
