import { Frame } from '../OhsGuiFramework/Frame';
import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { ScreenMain } from './ScreenMain';

import { MeteoStation } from './MeteoStation';


export class FrameMain extends Frame {

    // Site data

    // Screen pointers...
    private m_screenMain:            ScreenMain = null;
    private m_meteoStation:          MeteoStation = null;

    constructor (canvas: HTMLCanvasElement) {
        super(canvas);

        // Data
        this.m_meteoStation = new MeteoStation ();

        // Create screens...
        this.m_screenMain = new ScreenMain(canvas, this.m_meteoStation);
        this.addItem(this.m_screenMain);

        // Set current screen...
        this.m_curScreen = this.m_screenMain;

   }

    public MouseDownHandler (event) {
        var ret = super.MouseDownHandler(event);

        return null;
    }

    public MouseUpHandler(event) {
         var ret = super.MouseUpHandler(event);
/*
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
*/
        return null;
    }

    public SwitchScreen(newScreen: OhsScreen) {
        if (newScreen != null) {
            this.m_curScreen = newScreen;
        }
    }
}

