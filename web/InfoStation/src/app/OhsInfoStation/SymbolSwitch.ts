
import {Item} from '../OhsGuiFramework/Item';
import {ImageStatic} from '../OhsGuiFramework/ImageStatic';

import { InfoStationSettings } from './InfoStationSettings';

import { Thing } from '../OhsSiteData/Thing';
import { Switch } from '../OhsSiteData/Switch';

export class SymbolSwitch extends Item {

    public m_switch:        Switch = null;
    public m_imgState:      Array <ImageStatic>;

    protected scaleX:   number;
    protected scaleY:   number;

    constructor (ctx: CanvasRenderingContext2D, swt: Switch, scaleX: number, scaleY: number) {
        super(ctx);

        this.m_switch = swt;
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.m_imgState = new Array <ImageStatic> ();

        this.buildLayout ();
    }

    protected buildLayout () {
        let img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_BULB_OFF);
        this.m_imgState.push(img);

        img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_BULB_OFFON);
        this.m_imgState.push(img);

        img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_BULB_ON);
        this.m_imgState.push(img);

        img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_BULB_ONOFF);
        this.m_imgState.push(img);
    }

    paint() {
        super.paint();

        this.updateData();

        for (let img of this.m_imgState) {
            if (img.visible) {
                img.paint();
            }
        }
    }

    protected updateData() {

        this.Size(this.m_switch.posX * this.scaleX, this.m_switch.posY * this.scaleY, 50, 50);

        for (let img of this.m_imgState) {
            img.Size(this.m_switch.posX * this.scaleX, this.m_switch.posY * this.scaleY, 50, 50);
            img.visible = false;
        }

        // Switch logic...
        if (this.m_switch.getState() === 0) { //off-line
            this.m_imgState[0].visible =  true;
        } else if (this.m_switch.getState() === 1) { //OFF
            this.m_imgState[0].visible =  true;
        } else if (this.m_switch.getState() === 2) {//-> ON
            this.m_imgState[1].visible =  true;
        } else if (this.m_switch.getState() === 3) { //ON
            this.m_imgState[2].visible =  true;
        } else if (this.m_switch.getState() === 4) { //->OFF";
            this.m_imgState[3].visible =  true;
        } else {
            this.m_imgState[3].visible =  true;
        }
    }

    public MouseDownHandler(x: number, y: number) {
        const ret = super.MouseDownHandler(x, y);

        if (ret === this) {            
            this.m_switch.click();
            //window.setTimeout(() => this.click(), 150);

        }

        return ret;
    }


}