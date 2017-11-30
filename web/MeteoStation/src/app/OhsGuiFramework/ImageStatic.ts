import {Item} from './Item';
import {Rect} from './Rect';

export class ImageStatic extends Item {

    private img:            HTMLImageElement    = null;
    private imgSrc                              = '---';
    public loaded                               = false;
    protected border                            = false;
    protected rectClicked:  Rect                = null;
    private radius                              = 0;

    constructor (ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.img = new Image();
    }

    private onImageLoad(event): void {
       this.loaded = true;
    }

    public setImage (path: string) {
        if (path !== this.imgSrc) {

            this.img.src = path;
            this.imgSrc = path;
        }
    }

    public paint () {

        const ctx = this.ctx;
        ctx.save();

        super.paint();
        if (this.radius !== 0) {
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

    protected paintPush (ctx: CanvasRenderingContext2D) {

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

    public getImage() {
        return this.img;
    }

    public getImageSrc() {
        return this.imgSrc;
    }
}
