
import {Item} from '../OhsGuiFramework/Item';
import {ImageStatic} from '../OhsGuiFramework/ImageStatic';
import { TextSimple } from '../OhsGuiFramework/TextSimple';

import { InfoStationSettings } from './InfoStationSettings';

import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';


export class SymbolTempSensor extends Item {

    public m_tempSensor:        TemperatureSensor = null;
    public m_imgTemp:           ImageStatic;
    public m_txtTemp:           TextSimple;

    protected scaleX:   number;
    protected scaleY:   number;

    constructor (ctx: CanvasRenderingContext2D, tempSensor: TemperatureSensor, scaleX: number, scaleY: number) {
        super(ctx);

        this.m_tempSensor = tempSensor;
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.m_imgTemp = new ImageStatic (this.ctx);
        this.m_imgTemp.setImage(InfoStationSettings.IMG_TEMP_SYMBOL);

        this.m_txtTemp = new TextSimple (this.ctx, ' ', 0, 0, 50, 50);
        this.m_txtTemp.fontSize = 24;
        this.m_txtTemp.fontFamily = 'px Roboto Condensed, sans-serif';
        this.m_txtTemp.fontColor = '#000000';
        this.m_txtTemp.textAlign = 'left';
        this.m_txtTemp.textBaseline = 'top';
        this.m_txtTemp.bold = true;

        this.buildLayout ();
    }

    protected buildLayout () {

    }

    paint() {
        super.paint();

        this.updateData();

        this.m_imgTemp.paint();
        this.m_txtTemp.paint();

    }

    protected updateData() {

        this.Size(this.m_tempSensor.posX * this.scaleX, this.m_tempSensor.posY * this.scaleY, 50, 50);
        this.m_imgTemp.Size(this.m_tempSensor.posX * this.scaleX, this.m_tempSensor.posY * this.scaleY, 30, 30);
        this.m_txtTemp.Size((this.m_tempSensor.posX * this.scaleX) + 20, this.m_tempSensor.posY * this.scaleY, 30, 120);

        let temp = this.m_tempSensor.temp;
        temp = +temp.toFixed(1);

        this.m_txtTemp.setText(temp.toString());
    }

}