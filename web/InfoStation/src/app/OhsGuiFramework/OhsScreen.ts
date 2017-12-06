import {Item} from './Item';
import {TextSimple} from './TextSimple';

export class OhsScreen {

    public m_item:              Array <Item> =              null;
    public canvas:              HTMLCanvasElement =         null;
    protected  ctx:             CanvasRenderingContext2D =  null;

    private message             = false;
    //   private msg:                MessageBox = new MessageBox ();

    public cmd: Item = null;

    constructor (canvas: HTMLCanvasElement) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.m_item = new Array <Item>();
    }

    protected buildLayout () {
        this.removeAll();

    }

    public add (item: Item) {
        this.m_item.push(item);
    }

    public removeAll () {
        this.m_item.length = 0;
    }

    public GetSize() {
        return {
                width: this.canvas.width,
                height: this.canvas.height
                };
    }

    public MouseDownHandler(x: number, y: number) {
        for (let item of this.m_item) {
            let ret = item.MouseDownHandler(x, y);

            if (ret != null) { return ret; }
        }

        return null;
    }

    public MouseUpHandler(x: number, y: number) {
        for (let item of this.m_item) {
            let ret = item.MouseUpHandler(x, y);

            if (ret != null) { return ret; }
        }

        return null;
    }

    public MouseMoveHandler(x: number, y: number) {
        for (let item of this.m_item) {
            let ret = item.MouseMoveHandler(x, y);

            if (ret != null)  { return ret; }
        }

        return null;
    }

    public MessagBox(text: String, type: number) {

        this.message = true;

    }

    protected updateData() {
        // Any routines updating data...
    }

    public paint () {

        // Update data first
        this.updateData();

        // Paint
        const ctx = this.canvas.getContext('2d');
        var width: number = this.canvas.width;
        var height: number = this.canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.save();

        for (let item of this.m_item) {
            if (item.visible) {
                item.paint();
            }
        }

        ctx.restore();
    }
}
