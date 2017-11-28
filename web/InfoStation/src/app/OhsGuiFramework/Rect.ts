

export class Rect {

    public x = 0;
    public y = 0;
    public w = 0;
    public h = 0;

    public isClicked (clx: number, cly: number) {
        if (!(clx > this.x && clx < this.x + this.w)) {
            return false;
        }
        if (!(cly < this.y + this.h && cly > this.y)) {
            return false;
        }
        return true;
    }

    public equals (rectI: Rect) {
        this.x = rectI.x;
        this.y = rectI.y;
        this.w = rectI.w;
        this.h = rectI.h;
    }

    public size (x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public position (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sizeRect (rect: Rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.w = rect.w;
        this.h = rect.h;
    }

    public getSize () {
        const rect: Rect = new Rect ();

        rect.x = this.x;
        rect.y = this.y;
        rect.w = this.w;
        rect.h = this.h;

        return rect;
    }

    public move (dx: number, dy: number) {
        this.x = this.x + dx;
        this.y = this.y + dy;
    }

    public scaleSize (perc: number) {

        const old_w: number = this.w;
        const old_h: number = this.h;

        this.w = this.w * perc;
        this.h = this.h * perc;

        this.x = this.x + ((old_w - this.w) / 2);
        this.y = this.y + ((old_h - this.h) / 2);
    }

    public paint(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.closePath();
    }

    public getRight () {
        return this.x + this.w;
    }

    public getBottom () {
        return this.y + this.h;
    }
}
