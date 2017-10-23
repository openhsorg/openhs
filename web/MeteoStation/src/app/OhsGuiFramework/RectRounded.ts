import {Rect} from './Rect';

export class RectRounded extends Rect {

    public radius = 0;

    public rad (rad: number) {
        this.radius = rad;

    }

    public paint(ctx: CanvasRenderingContext2D) {

        if (this.radius === 0) {
            super.paint(ctx);
        } else {
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
