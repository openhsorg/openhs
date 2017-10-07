
import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';

import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { OhsWifiAdmin } from '../OhsWifiAdmin/OhsWifiAdmin';

import { OhsAdminSettings } from './OhsAdminSettings';

import swal from 'sweetalert2';

export class ScreenMain extends OhsScreen {

    public m_siteData:          SiteData = null;
    public m_wifiAdmin:         OhsWifiAdmin = null;

    // Texts
    protected m_textTime:       TextSimple = null;

    // Icons
    protected btnTemp:          ImageButton;
    protected btnSwitch:        ImageButton;
    public icons:               Array <ImageButton>;
    protected nums:             Array <NumberRounded>;

    constructor (siteData: SiteData, canvas: HTMLCanvasElement, wifiAdmin: OhsWifiAdmin) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_wifiAdmin = wifiAdmin;
        this.buildLayout();

   }

    public buildLayout () {

        // Time
        this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);

        this.m_textTime.fontSize = 26;
        this.m_textTime.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTime.fontColor = '#8c8c8c';
        this.m_textTime.textAlign = 'left';
        this.m_textTime.textBaseline = 'top';
        this.m_textTime.bold = false;

        // Icons
        this.icons = new Array <ImageButton> ();
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_TEMP, OhsAdminSettings.ICON_TEMP, 30, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_SWITCH, OhsAdminSettings.ICON_SWITCH, 200, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_DOOR, OhsAdminSettings.ICON_DOOR, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_ROOM, OhsAdminSettings.ICON_ROOM, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_FLOOR, OhsAdminSettings.ICON_FLOOR, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_WIFI, OhsAdminSettings.ICON_WIFI, 400, 30, 150, 150));
        this.icons.push(new ImageButton(this.ctx, OhsAdminSettings.ICON_IQRF, OhsAdminSettings.ICON_IQRF, 400, 30, 150, 150));

        for (let icon of this.icons) {
            this.add(icon);
        }

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

        this.IconMatrix (this.GetSize().width - 150, this.GetSize().height, 4, 3, 150, 150);

    }

    // Arange icons to rectangle...
    public IconMatrix (w: number, h: number, numX: number, numY: number, iconSizeX: number, iconSizeY: number) {

        var dx = (w - (numX * iconSizeX)) / (numX + 1);
        var dy = (h - (numY * iconSizeY)) / (numY + 1);

        var id = 0;

        for (var i = 1; i <= numY; i++) {
            for (var j = 1; j <= numX; j++) {

                var dxa = (j * dx) + ((j - 1) * iconSizeX);
                var dya = (i * dy) + ((i - 1) * iconSizeY);

                if (this.icons.length > id) {
                    this.icons[id].Size(dxa, dya, 150, 150);
                }

                if (this.nums.length > id) {
                    this.nums[id].center(dxa + 150 - 5, dya + 150 - 5, 50, 50);
                }

                id ++;
            }
        }
    }


    protected updateData () {
        super.updateData();

        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);

        // Numbers
        this.nums[0].SetNumber(this.m_siteData.m_tempSensorArray.length);
        this.nums[1].SetNumber(this.m_siteData.m_switchArray.length);
        this.nums[2].SetNumber(this.m_siteData.m_doorArray.length);
        this.nums[3].SetNumber(this.m_siteData.m_roomArray.length);
        this.nums[4].SetNumber(this.m_siteData.m_floorArray.length);
        this.nums[5].SetNumber(this.m_siteData.m_wifiNodeArray.length);
    }
} // class end
