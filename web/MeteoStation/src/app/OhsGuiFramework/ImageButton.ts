import {Item} from './Item';

export class ImageButton extends Item {

    private img:                HTMLImageElement    = new Image();
    private imgPush:            HTMLImageElement    = new Image();

    protected border                                = false;
    protected push                                  = false;

    protected int = null;

    protected visible = true;

    constructor (ctx: CanvasRenderingContext2D, imgSrc: string, imgPush: string, x: number, y: number, w: number, h: number) {
        super(ctx);

        this.img.src = imgSrc;
        this.imgPush.src = imgPush;
    //    this.border = false;

        this.rect.size(x, y, w, h);

    }

    public setVisibility (enable: boolean) {
        this.visible = enable;
    }

    public MouseDownHandler(x: number, y: number) {
        if (this.visible) {
            return super.MouseDownHandler(x, y);
        } else {
            return null;
        }
    }

    public MouseUpHandler(x: number, y: number) {
        if (this.visible) {
            return super.MouseUpHandler(x, y);
        } else {
            return null;
        }
    }

    public MouseMoveHandler(x: number, y: number) {
        if (this.visible) {
            return super.MouseMoveHandler(x, y);
        } else {
            return null;
        }
    }    

    public paint () {

        const ctx = this.ctx;

        if (this.visible) {

            ctx.save();

            if (this.push) {
                ctx.drawImage(this.imgPush, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            } else {
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
}
