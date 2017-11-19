
import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { ImageStatic } from '../OhsGuiFramework/ImageStatic';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { GeometryCircle } from './GeometryCircle';
import { InfoStationSettings } from './InfoStationSettings';
import { InfoStation } from './InfoStation';
import { OhsWeather } from '../OhsWeather/OhsWeather';

import swal from 'sweetalert2';

export class ScreenMain extends OhsScreen {

    public m_siteData:          SiteData = null;
    public m_infoStation:       InfoStation = null;
    public m_weather:           OhsWeather = null;    

    // Texts
    protected m_textTime:       TextSimple = null;
    protected m_textDate:       TextSimple = null;
    protected m_textTempOut:    TextSimple = null;
    protected m_textTempIn:     TextSimple = null;
    protected m_textWind:       TextSimple = null;

    // Icons
    protected m_phone:          ImageButton = null;
    protected m_watch:          ImageButton = null;
    protected m_doors:          ImageButton = null;

    // Graphics
    protected m_circle:         GeometryCircle = null;

    // Images
    protected m_weatherIcons:   Array<ImageStatic>    = new Array<ImageStatic>(); 

    constructor (siteData: SiteData, iStation: InfoStation, weather: OhsWeather, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_infoStation = iStation;
        this.m_weather = weather;
        this.buildLayout();

       // window.alert('test');

   }

    public buildLayout () {

        // Time
        this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);

        this.m_textTime.fontSize = 80;
        this.m_textTime.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTime.fontColor = '#000000';
        this.m_textTime.textAlign = 'right';
        this.m_textTime.textBaseline = 'middle';
        this.m_textTime.bold = false;
        this.m_textTime.Size(this.canvas.width - 250, 20, 250, 65);

        // Date
        this.m_textDate = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textDate);

        this.m_textDate.fontSize = 40;
        this.m_textDate.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textDate.fontColor = '#000000';
        this.m_textDate.textAlign = 'right';
        this.m_textDate.textBaseline = 'middle';
        this.m_textDate.bold = false;
        this.m_textDate.Size(this.canvas.width - 350, 90, 350, 65);

        // Temp Out
        this.m_textTempOut = new TextSimple(this.ctx, 'TmpOut', 730, 0, 250, 100);
        this.add(this.m_textTempOut);

        this.m_textTempOut.fontSize = 80;
        this.m_textTempOut.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTempOut.fontColor = '#000000';
        this.m_textTempOut.textAlign = 'right';
        this.m_textTempOut.textBaseline = 'middle';
        this.m_textTempOut.bold = false;
        this.m_textTempOut.Size(60, 20, 250, 65);

        // Temp In
        this.m_textTempIn = new TextSimple(this.ctx, 'TmpIn', 730, 0, 250, 100);
        this.add(this.m_textTempIn);

        this.m_textTempIn.fontSize = 160;
        this.m_textTempIn.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTempIn.fontColor = '#000000';
        this.m_textTempIn.textAlign = 'right';
        this.m_textTempIn.textBaseline = 'middle';
        this.m_textTempIn.bold = false;
        this.m_textTempIn.Size((this.canvas.width / 2) - 60, (this.canvas.height / 2) - 10, 200, 120);

        // Wind
        this.m_textWind = new TextSimple(this.ctx, 'Wind', 730, 0, 250, 100);
        this.add(this.m_textWind);

        this.m_textWind.fontSize = 40;
        this.m_textWind.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textWind.fontColor = '#000000';
        this.m_textWind.textAlign = 'right';
        this.m_textWind.textBaseline = 'middle';
        this.m_textWind.bold = false;
        this.m_textWind.Size((this.canvas.width / 2) - 60, (this.canvas.height / 2) - 10, 200, 120);

        // Geometry
        this.m_circle = new GeometryCircle(this.ctx, this.canvas);
        this.add(this.m_circle);
        this.m_circle.visible = true;

        // Weather icons
        // 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow
        var img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_SUNNY);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);

        var img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_PARTCLOUDY);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);        

        var img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDY);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);             
        
        var img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDRAIN);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);               

        var img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDSTORM);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);               

        var img =  new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_CLOUDSNOW);
        img.Size(0, 0, 150, 150);
        img.visible = false;
        this.m_weatherIcons.push(img);               

        for (let icon of this.m_weatherIcons) {
            this.add(icon);
        }

        
/*
        // Icons
        this.icons = new Array <ImageButton> ();
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_TEMP, OhsInfoStationSettings.ICON_TEMP, 30, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_SWITCH, OhsInfoStationSettings.ICON_SWITCH, 200, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_DOOR, OhsInfoStationSettings.ICON_DOOR, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_ROOM, OhsInfoStationSettings.ICON_ROOM, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_FLOOR, OhsInfoStationSettings.ICON_FLOOR, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_WIFI, OhsInfoStationSettings.ICON_WIFI, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsInfoStationSettings.ICON_IQRF, OhsInfoStationSettings.ICON_IQRF, 400, 30, 150, 150));

        for (let icon of this.icons) {
            this.add(icon);
        }
*/
/*
        // Nums Rounded
        this.nums = new Array <NumberRounded> ();
        this.nums.push(new NumberRounded(this.ctx));
        this.nums.push(new NumberRounded(this.ctx));
        this.nums.push(new NumberRounded(this.ctx));
        this.nums.push(new NumberRounded(this.ctx));
        this.nums.push(new NumberRounded(this.ctx));
        this.nums.push(new NumberRounded(this.ctx));
        this.nums[5].SetColorBkg('#ff6600');

        for (let num of this.nums) {
            this.add(num);
        }
*/

    }



    protected updateData () {
        super.updateData();

        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        this.m_textDate.setText(this.m_siteData.dateString);

       // this.m_textTempIn.setText(this.m_infoStation.data.tmpInPath);
        //this.m_textTempOut.setText(this.m_infoStation.data.tmpOutPath);
        
        this.updateTempData();
        this.updatedWeatherData();
   
    }

    protected updateTempData() {

        var thingIn = <TemperatureSensor> this.m_siteData.getThing(this.m_infoStation.data.tmpInPath);
        //var thingOut = <TemperatureSensor> this.m_siteData.getThing(this.m_infoStation.data.tmpOutPath);

        if (thingIn != null) {
            this.m_textTempIn.setText(thingIn.temp.toString());
        }
      //  this.m_textTempOut.setText(thingOut.temp.toString());

      this.m_textTempOut.setText(this.m_weather.m_currentWeather.temp.toPrecision(3).toString());

    }

    protected updatedWeatherData() {

        var imgNum = this.m_weather.m_currentWeather.weatherSymbol;

        if (imgNum > 0 && imgNum < this.m_weatherIcons.length) {
            if (!this.m_weatherIcons[imgNum - 1].visible) {
                // Set visibility
                for (var icon of this.m_weatherIcons) {
                    icon.visible = false;
                }

                this.m_weatherIcons[imgNum - 1].visible = true;
            }
        }

    }



} // class end
