import {Button} from './Button';

export class ButtonImage extends Button {
    private img:                HTMLImageElement    = new Image();
    private imgPush:            HTMLImageElement    = new Image();

    constructor (ctx: CanvasRenderingContext2D, imgSrc: string, imgPush: string) {
        super (ctx, '');

        this.img.src = imgSrc;
        this.imgPush.src = imgPush;
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
