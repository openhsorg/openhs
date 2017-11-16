
import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { InfoStationSettings } from './InfoStationSettings';
import { InfoStation } from './InfoStation';

import swal from 'sweetalert2';

export class ScreenMain extends OhsScreen {

    public m_siteData:          SiteData = null;
    public m_infoStation:       InfoStation = null;

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

    constructor (siteData: SiteData, iStation: InfoStation, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_infoStation = iStation;
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

    }

    protected updateTempData() {

        var thingIn = <TemperatureSensor> this.m_siteData.getThing(this.m_infoStation.data.tmpInPath);
        var thingOut = <TemperatureSensor> this.m_siteData.getThing(this.m_infoStation.data.tmpOutPath);

        this.m_textTempIn.setText(thingIn.temp.toString());
        this.m_textTempOut.setText(thingOut.temp.toString());

    }



} // class end
