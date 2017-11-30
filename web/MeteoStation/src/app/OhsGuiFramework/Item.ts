import {Rect} from './Rect';

export class Item {

    // Basic Rectangle...
    public rect:     Rect = new Rect ();

    // public canvas:              HTMLCanvasElement =         null;
    protected ctx:                CanvasRenderingContext2D;

    constructor (ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public paint () {
    }

    public MouseDownHandler(x: number, y: number) {
        if (this.rect.isClicked(x, y)) {
            return this;
        } else {
            return null;
        }
    }

    public MouseUpHandler(x: number, y: number) {
        if (this.rect.isClicked(x, y)) {
            return this;
        } else {
            return null;
        }
    }

    public MouseMoveHandler(x: number, y: number) {
        if (this.rect.isClicked(x, y)) {
            return this;
        } else {
            return null;
        }
    }

    public Move (x: number, y: number) {
        this.rect.x = x;
        this.rect.y = y;
    }

    public Size (x: number, y: number, w: number, h: number) {
        this.rect.x = x;
        this.rect.y = y;
        this.rect.w = w;
        this.rect.h = h;
    }
}
