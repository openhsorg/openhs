import {TextSimple} from './TextSimple';

export class NumberRounded extends TextSimple {

    protected colorBkg                                  = '#003399';
    protected colorZeroBkg                              = '#a6a6a6';
    protected colorInside                               = this.colorBkg;
    protected colorText                                 = '#ffffff';
    public num                                          = 0;

    constructor (ctx: CanvasRenderingContext2D) {
        super(ctx, '', 0, 0, 0, 0);

        this.fontSize = 26;
        this.fontFamily = 'px Tahoma, sans-serif';
        this.fontColor = this.colorText;
        this.textAlign = 'center';
        this.textBaseline = 'middle';
        this.bold = true;
    }

    public center (cx: number, cy: number, w: number, h: number) {
        this.rect.size(cx - (w / 2 ), cy - (h / 2), w, h);
    }

    public SetNumber (num: number) {
        this.num = num;
        this.setText(this.num.toString());
    }

    public SetColorBkg (color: String) {
        this.colorBkg = color.toString();
    }

    public paint () {

        const ctx = this.ctx;

        if (this.num <= 0) {
            this.colorInside = this.colorZeroBkg;
        } else {
            this.colorInside = this.colorBkg;
        }

        // Basic shape
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
