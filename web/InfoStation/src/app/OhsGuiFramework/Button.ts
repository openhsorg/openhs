import {Item} from './Item';
import {TextSimple} from './TextSimple';

export class Button extends Item {

    public text:    TextSimple;

    constructor (ctx: CanvasRenderingContext2D, txt: String) {
        super (ctx);

         this.text = new TextSimple (ctx, txt, 30, 30, 250, 100);
    }

    public paint () {
    }

    public MouseDownHandler(x: number, y: number) {
        return null;
    }

    public MouseUpHandler(x: number, y: number) {
        return null;
    }

    public MouseMoveHandler(x: number, y: number) {
        return null;
    }

}
