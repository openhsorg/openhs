
import {Item} from './Item';

export class TextSimple extends Item {

        public fontSize                 = 20;
        public fontColor                = '#000000';
        public fontFamily               = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        public textAlign                = 'left';
        public textBaseline             = 'middle';
        public bold                     = false;

        public text:         String;
        protected border = false;
        public editable = true;
        public inp: HTMLInputElement = null;

     //   protected ipt: any = null;

        constructor (ctx: CanvasRenderingContext2D, txt: String, x: number, y: number, w: number, h: number){
            super (ctx);

            this.text = txt;
            this.rect.x = x;
            this.rect.y = y;
            this.rect.w = w;
            this.rect.h = h;
        }

        public setText (txt: String) {
            this.text = txt.toString();
        }

        public getText () {
            return this.text;
        }
        /*
        public MouseUpHandler(x: number, y: number) {
            if (super.MouseUpHandler(x, y) == null) return null;

            return <Item> this;
        }

        */
        public paint () {

            const ctx = this.ctx;
            let x: number = this.rect.x;
            let y: number = this.rect.y;
            const align: String = this.textAlign.toString();
            const baseline: String = this.textBaseline.toString();

            if (align === 'right' || align === 'end') {
                x = this.rect.x + this.rect.w;
            } else if (align === 'center') {
                x = this.rect.x + (this.rect.w / 2);
            }

            if (baseline === 'bottom' || baseline === 'alphabetic') {
                y = this.rect.y + this.rect.h;
            } else if (baseline === 'middle') {
                y = this.rect.y + (this.rect.h / 2);
            }

            let boldString = '';

            if (this.bold) {
                boldString = 'bold ';
            }

            ctx.save();
            ctx.font = boldString + this.fontSize + this.fontFamily;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.text.toString(), x, y);
            ctx.restore();
        }

        public copyStyle (origin: TextSimple) {

            this.fontSize = origin.fontSize;
            this.fontColor = origin.fontColor;
            this.fontFamily = origin.fontFamily;
            this.textAlign = origin.textAlign;
            this.textBaseline = origin.textBaseline;
            this.bold = origin.bold;
        }

}
