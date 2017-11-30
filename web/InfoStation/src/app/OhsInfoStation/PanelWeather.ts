import {Item} from '../OhsGuiFramework/Item';
import { WeatherData } from '../OhsWeather/WeatherData';
import { ImageStatic } from '../OhsGuiFramework/ImageStatic';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { InfoStationSettings } from './InfoStationSettings';

export class PanelWeather extends Item {

    public m_weatherData:           WeatherData = null;

    // Texts
    public m_textTime:          TextSimple = null;
    public m_textDate:          TextSimple = null;
    public m_textTempOut:       TextSimple = null;
    public m_textWind:          TextSimple = null;

    // Images
    public m_weatherIcons:          Array<ImageStatic>    = new Array<ImageStatic>();
    protected m_wind:               ImageStatic;

    constructor(ctx: CanvasRenderingContext2D, weatherData: WeatherData) {
        super(ctx);

        this.m_weatherData = weatherData;

        this.buildLayout();
    }

    public paint() {
        this.rect.paint(this.ctx);

        // Update data for painting...
        this.updateData();

        // Icons...
        for (const icon of this.m_weatherIcons) {
            if (icon.visible) {
                icon.paint();
            }
        }

        this.m_wind.paint();
        //this.m_textTempOut.paint();
        //this.m_textWind.paint();
        this.m_textTempOut.paint();
        //this.m_textWind.paint();
    }

    public updateData () {

        var imgNum = this.m_weatherData.weatherSymbol;

        if (imgNum > 0 && imgNum < this.m_weatherIcons.length) {
            if (!this.m_weatherIcons[imgNum - 1].visible) {
                // Set visibility
                for (var icon of this.m_weatherIcons) {
                    icon.visible = false;
                }
                //window.alert('aaaa: ' + imgNum);
                this.m_weatherIcons[imgNum - 1].visible = true;
            }
        }

        let num = this.m_weatherData.temp;
        num = +num.toFixed(1);

        this.m_textTempOut.setText(num.toString());

    }

    public buildLayout () {

        // Weather icons
        // 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow
        let img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_SUNNY);
        img.Size(0, 0, 200, 200);
        img.visible = true;
        this.m_weatherIcons.push(img);

        img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_PARTCLOUDY);
        img.Size(0, 0, 200, 200);
        img.visible = false;
        this.m_weatherIcons.push(img);

        img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDY);
        img.Size(0, 0, 200, 200);
        img.visible = false;
        this.m_weatherIcons.push(img);

        img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDRAIN);
        img.Size(0, 0, 200, 200);
        img.visible = false;
        this.m_weatherIcons.push(img);

        img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDSTORM);
        img.Size(0, 0, 200, 200);
        img.visible = false;
        this.m_weatherIcons.push(img);

        img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDSNOW);
        img.Size(0, 0, 200, 200);
        img.visible = false;
        this.m_weatherIcons.push(img);

        // Wind
        this.m_wind =  new ImageStatic(this.ctx);
        this.m_wind.setImage(InfoStationSettings.IMG_WIND);
        this.m_wind.Size(0, 0, 80, 80);
        this.m_wind.Move(360, 55);
        this.m_wind.visible = true;

        // Temp Out
        this.m_textTempOut = new TextSimple(this.ctx, 'TmpOut', 0, 0, 0, 0);
        this.m_textTempOut.fontSize = 40;
        this.m_textTempOut.fontFamily = 'px Roboto Condensed, sans-serif';
        this.m_textTempOut.fontColor = '#000000';
        this.m_textTempOut.textAlign = 'left';
        this.m_textTempOut.textBaseline = 'top';
        this.m_textTempOut.bold = true;
        this.m_textTempOut.Size(170, 5, 120, 65);
/*
        // Wind
        this.m_textWind = new TextSimple(this.ctx, 'Wind', 260, 0, 120, 100);

        this.m_textWind.fontSize = 40;
        this.m_textWind.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textWind.fontColor = '#000000';
        this.m_textWind.textAlign = 'left';
        this.m_textWind.textBaseline = 'top';
        this.m_textWind.bold = false;
        this.m_textWind.Size(370, 15, 120, 60);
*/
    }

    public Size (x: number, y: number, w: number, h: number) {
        super.Size(x, y, w, h);

       // window.alert(' Size... x: ' + x + ' y:' + y + ' w: ' + w + ' h: ' + h);

        // Icons...
        for (const icon of this.m_weatherIcons) {
            icon.Size(x, y, w, w); //rectangle
        }

        this.m_wind.Size(x + 20, y + w + 10, w - 20, w - 20);

        this.m_textTempOut.Size(x + 10, y + (2 * w) + 10, w - 10, w - 10);

    }
}