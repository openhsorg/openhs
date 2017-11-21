
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
    protected m_bulb:           ImageButton = null;
    protected m_door:           ImageButton = null;

    // Graphics
    protected m_circle:         GeometryCircle = null;

    // Images
    protected m_weatherIcons:   Array<ImageStatic>    = new Array<ImageStatic>(); 
    protected m_wind:           ImageStatic;

    constructor (siteData: SiteData, iStation: InfoStation, weather: OhsWeather, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_infoStation = iStation;
        this.m_weather = weather;
        this.buildLayout();

       // window.alert('test');

   }

    public buildLayout () {

        // Weather icons
        // 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow
        let img = new ImageStatic(this.ctx);
        img.setImage(InfoStationSettings.IMG_SUNNY);
        img.Size(0, 0, 200, 200);
        img.visible = false;
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

        for (let icon of this.m_weatherIcons) {
            this.add(icon);
        }

        // Wind
        this.m_wind =  new ImageStatic(this.ctx);
        this.m_wind.setImage(InfoStationSettings.IMG_WIND);
        this.m_wind.Size(0, 0, 80, 80);
        this.m_wind.Move(360, 55);
        this.m_wind.visible = true;
        this.add(this.m_wind);

        // Time
        this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);

        this.m_textTime.fontSize = 140;
        this.m_textTime.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTime.fontColor = '#000000';
        this.m_textTime.textAlign = 'right';
        this.m_textTime.textBaseline = 'middle';
        this.m_textTime.bold = false;
        this.m_textTime.Size((this.canvas.width / 2) + 30, (this.canvas.height / 2) + 10, 170, 70);

        // Date
        this.m_textDate = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textDate);

        this.m_textDate.fontSize = 50;
        this.m_textDate.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textDate.fontColor = '#000000';
        this.m_textDate.textAlign = 'right';
        this.m_textDate.textBaseline = 'middle';
        this.m_textDate.bold = false;
        this.m_textDate.Size((this.canvas.width / 2) - 20, (this.canvas.height / 2) + 120, 170, 70);

        // Temp In
        this.m_textTempIn = new TextSimple(this.ctx, 'TmpIn', 730, 0, 250, 100);
        this.add(this.m_textTempIn);

        this.m_textTempIn.fontSize = 120;
        this.m_textTempIn.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTempIn.fontColor = '#000000';
        this.m_textTempIn.textAlign = 'right';
        this.m_textTempIn.textBaseline = 'middle';
        this.m_textTempIn.bold = false;
        this.m_textTempIn.Size(this.canvas.width - 230, 60, 230, 65);

        // Temp Out
        this.m_textTempOut = new TextSimple(this.ctx, 'TmpOut', 0, 0, 0, 0);
        this.add(this.m_textTempOut);

        this.m_textTempOut.fontSize = 120;
        this.m_textTempOut.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textTempOut.fontColor = '#000000';
        this.m_textTempOut.textAlign = 'right';
        this.m_textTempOut.textBaseline = 'middle';
        this.m_textTempOut.bold = false;
        this.m_textTempOut.Size(220, 60, 120, 65);

        // Wind
        this.m_textWind = new TextSimple(this.ctx, 'Wind', 260, 60, 120, 100);
        this.add(this.m_textWind);

        this.m_textWind.fontSize = 40;
        this.m_textWind.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        this.m_textWind.fontColor = '#000000';
        this.m_textWind.textAlign = 'left';
        this.m_textWind.textBaseline = 'top';
        this.m_textWind.bold = false;
        this.m_textWind.Size(370, 15, 120, 60);

        // Buttons
        this.m_phone = new ImageButton (this.ctx,
            InfoStationSettings.IMG_VOICEMESSAGE, InfoStationSettings.IMG_VOICEMESSAGE, 30, this.canvas.height / 2, 60, 60);
        this.add(this.m_phone);

        this.m_watch = new ImageButton (this.ctx,
            InfoStationSettings.IMG_STOPWATCH, InfoStationSettings.IMG_STOPWATCH, 130, this.canvas.height / 2, 60, 60);
        this.add(this.m_watch);

        this.m_bulb = new ImageButton (this.ctx,
            InfoStationSettings.IMG_BULB, InfoStationSettings.IMG_BULB, 670, this.canvas.height / 2, 60, 60);
        this.add(this.m_bulb);

        this.m_door = new ImageButton (this.ctx,
            InfoStationSettings.IMG_DOOR, InfoStationSettings.IMG_DOOR, 770, this.canvas.height / 2, 60, 60);
        this.add(this.m_door);


       // Geometry
       this.m_circle = new GeometryCircle(this.ctx, this.canvas);
       this.add(this.m_circle);
       this.m_circle.visible = true;


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
            let num = thingIn.temp;
            num = +num.toFixed(1);

          //  var n2 = parseFloat(num.toString()).toFixed(1);

            this.m_textTempIn.setText(num.toString() + '\u00B0');
        }
      //  this.m_textTempOut.setText(thingOut.temp.toString());

      let numo = this.m_weather.m_currentWeather.temp;
      numo = +numo.toFixed(1);

      this.m_textTempOut.setText(numo.toString() + '\u00B0');



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

        // wind
        let num = this.m_weather.m_currentWeather.windSpeed;
        num = +num.toFixed(1);

        if (num === 0) {
            this.m_textWind.visible = false;
            this.m_wind.visible = false;
        } else {
            this.m_textWind.visible = true;
            this.m_wind.visible = true;
            this.m_textWind.setText(num.toString() + ' m/s');
        }



    }



} // class end
