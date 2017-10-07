import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { Frame } from '../OhsGuiFramework/Frame';
import { OhsScreen } from '../OhsGuiFramework/OhsScreen';

 import { OhsWifiAdmin } from '../OhsWifiAdmin/OhsWifiAdmin';

import { ScreenMain } from './ScreenMain';
import { ScreenTemps } from './ScreenTemps';
import { ScreenSwitches } from './ScreenSwitches';
import { ScreenDoors } from './ScreenDoors';
import { ScreenRooms } from './ScreenRooms';
import { ScreenFloors } from './ScreenFloors';
import { ScreenWifi } from './ScreenWifi';

import swal from 'sweetalert2';

export class FrameMain extends Frame {

    // Site data
    public m_siteData:               SiteData = null;
    public m_wifiAdmin:              OhsWifiAdmin = null;
  
    // Screen pointers...
    private m_screenMain:            ScreenMain = null;
    private m_screenTemps:           ScreenTemps = null;
    private m_screenSwitches:        ScreenSwitches = null;
    private m_screenDoors:           ScreenDoors = null;
    private m_screenRooms:           ScreenRooms = null;
    private m_screenFloors:          ScreenFloors = null;
    private m_screenWifi:            ScreenWifi = null;

    constructor (canvas: HTMLCanvasElement) {
        super(canvas);

        // Data
        this.m_siteData = new SiteData ();
        this.m_wifiAdmin = new OhsWifiAdmin();    

        // Create screens...
        this.m_screenMain = new ScreenMain(this.m_siteData, canvas, this.m_wifiAdmin); 
        this.addItem(this.m_screenMain);

        this.m_screenTemps = new ScreenTemps(this.m_siteData, canvas);
        this.addItem(this.m_screenTemps);

        this.m_screenSwitches = new ScreenSwitches(this.m_siteData, canvas);
        this.addItem(this.m_screenSwitches);

        this.m_screenDoors = new ScreenDoors(this.m_siteData, canvas);
        this.addItem(this.m_screenDoors);

        this.m_screenRooms = new ScreenRooms(this.m_siteData, canvas);
        this.addItem(this.m_screenRooms);

        this.m_screenFloors = new ScreenFloors(this.m_siteData, canvas);
        this.addItem(this.m_screenFloors);

        this.m_screenWifi = new ScreenWifi(this.m_siteData, canvas);
        this.addItem(this.m_screenWifi);        

        // Set current screen...
        this.m_curScreen = this.m_screenMain;

   }

    public MouseDownHandler (event) {
        var ret = super.MouseDownHandler(event);

        return null;
    }

    public MouseUpHandler(event) {
         var ret = super.MouseUpHandler(event);

        if (ret != null) {
            if (ret === this.m_screenMain.icons[0]) {
                  this.SwitchScreen(this.m_screenTemps);

            } else if (ret === this.m_screenTemps.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            } else if (ret === this.m_screenMain.icons[1]) {
                  this.SwitchScreen(this.m_screenSwitches);

            } else if (ret === this.m_screenSwitches.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            } else if (ret === this.m_screenMain.icons[2]) {
                  this.SwitchScreen(this.m_screenDoors);

            } else if (ret === this.m_screenDoors.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            } else if (ret === this.m_screenMain.icons[3]) {
                  this.SwitchScreen(this.m_screenRooms);

            } else if (ret === this.m_screenRooms.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            } else if (ret === this.m_screenMain.icons[4]) {
                  this.SwitchScreen(this.m_screenFloors);

            } else if (ret === this.m_screenMain.icons[5]) {
                  this.SwitchScreen(this.m_screenWifi);

            } else if (ret === this.m_screenFloors.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            } else if (ret === this.m_screenWifi.btnLeave) {
                  this.SwitchScreen(this.m_screenMain);

            }
        }

        return null;
    }

    public SwitchScreen(newScreen: OhsScreen) {
        if (newScreen != null) {
            this.m_curScreen = newScreen;
        }
    }
}

