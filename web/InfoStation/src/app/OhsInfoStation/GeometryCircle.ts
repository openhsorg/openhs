
import {Item} from '../OhsGuiFramework/Item';

export class GeometryCircle extends Item {

    protected canvas: HTMLCanvasElement;

    constructor (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
        super(ctx);

        this.canvas = canvas;
    } 

    paint() {
        super.paint()

        var width: number = this.canvas.width;
        var height: number = this.canvas.height;
                                
        var arcCenterX = width / 2;
        var arcCenterY = height / 2 + (height * 0.1);
        var arcRadius = height * 0.38;             

        var r = Math.min(this.canvas.width, this.canvas.height) * 7 / 16;       
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(arcCenterX, arcCenterY, arcRadius, 0, 2 * Math.PI, true); 
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#999999';
        this.ctx.stroke();
        this.ctx.restore();         

    }

}