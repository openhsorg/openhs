
import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ImageStatic } from '../OhsGuiFramework/ImageStatic';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { MeteoStationSettings } from './MeteoStationSettings';
import { MeteoStation } from './MeteoStation';


export class ScreenMain extends OhsScreen {

    private m_meteoStation:     MeteoStation = null;

    // Images
    protected m_imageBkg:       ImageStatic = null;

    // Texts
    protected m_textTime:       TextSimple = null;
    protected m_textDate:       TextSimple = null;
    protected m_textTmpIn:      TextSimple = null;
    protected m_textTmpOut:     TextSimple = null;
    protected m_textTmpInVal:   TextSimple = null;
    protected m_textTmpOutVal:  TextSimple = null;

    constructor (canvas: HTMLCanvasElement, meteo: MeteoStation) {
        super(canvas);

        this.m_meteoStation = meteo;
        this.buildLayout();
   }

    public buildLayout () {

        this.m_imageBkg = new ImageStatic(this.ctx);
        this.add(this.m_imageBkg);

        this.m_imageBkg.setImage(MeteoStationSettings.IMG_BKG);
        this.m_imageBkg.Size(0, 0, this.canvas.width, this.canvas.height);


        // Time
        this.m_textTime = new TextSimple(this.ctx, 'Time', 20, 20, 250, 100);
        this.add(this.m_textTime);

        this.m_textTime.fontSize = 50;
        this.m_textTime.fontFamily = 'px Arial, sans-serif';
        this.m_textTime.fontColor = 'red';
        this.m_textTime.textAlign = 'left';
        this.m_textTime.textBaseline = 'top';
        this.m_textTime.bold = false;

        this.m_textDate = new TextSimple(this.ctx, 'Time', 580, 20, 250, 100);
        this.add(this.m_textDate);

        this.m_textDate.fontSize = 50;
        this.m_textDate.fontFamily = 'px Arial, sans-serif';
        this.m_textDate.fontColor = 'red';
        this.m_textDate.textAlign = 'right';
        this.m_textDate.textBaseline = 'top';
        this.m_textDate.bold = false;

        this.m_textTmpIn = new TextSimple(this.ctx, 'In:', 20, 100, 250, 100);
        this.add(this.m_textTmpIn);

        this.m_textTmpIn.fontSize = 160;
        this.m_textTmpIn.fontFamily = 'px Arial, sans-serif';
        this.m_textTmpIn.fontColor = '#e6b800';
        this.m_textTmpIn.textAlign = 'left';
        this.m_textTmpIn.textBaseline = 'top';
        this.m_textTmpIn.bold = false;

        this.m_textTmpOut = new TextSimple(this.ctx, 'Out:', 20, 300, 250, 100);
        this.add(this.m_textTmpOut);

        this.m_textTmpOut.fontSize = 160;
        this.m_textTmpOut.fontFamily = 'px Arial, sans-serif';
        this.m_textTmpOut.fontColor = '#e6b800';
        this.m_textTmpOut.textAlign = 'left';
        this.m_textTmpOut.textBaseline = 'top';
        this.m_textTmpOut.bold = false;

        this.m_textTmpInVal = new TextSimple(this.ctx, 'Time', 580, 100, 250, 100);
        this.add(this.m_textTmpInVal);

        this.m_textTmpInVal.fontSize = 160;
        this.m_textTmpInVal.fontFamily = 'px Arial, sans-serif';
        this.m_textTmpInVal.fontColor = '#e6b800';
        this.m_textTmpInVal.textAlign = 'right';
        this.m_textTmpInVal.textBaseline = 'top';
        this.m_textTmpInVal.bold = true;

        this.m_textTmpOutVal = new TextSimple(this.ctx, 'Time', 580, 300, 250, 100);
        this.add(this.m_textTmpOutVal);

        this.m_textTmpOutVal.fontSize = 160;
        this.m_textTmpOutVal.fontFamily = 'px Arial, sans-serif';
        this.m_textTmpOutVal.fontColor = '#e6b800';
        this.m_textTmpOutVal.textAlign = 'right';
        this.m_textTmpOutVal.textBaseline = 'top';
        this.m_textTmpOutVal.bold = true;

    }

    protected updateData () {
        super.updateData();

        this.m_textTime.setText(this.m_meteoStation.timeString);
        this.m_textDate.setText(this.m_meteoStation.dateString);

        this.m_textTmpInVal.setText(this.m_meteoStation.data.tmpIn + '\xBA C');
        this.m_textTmpOutVal.setText(this.m_meteoStation.data.tmpOut + '\xBA C');
    }
} // class end
