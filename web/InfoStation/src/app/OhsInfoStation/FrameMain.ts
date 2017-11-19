import { SiteData } from '../OhsSiteData/SiteData';
import { InfoStation } from './InfoStation';
import { Thing } from '../OhsSiteData/Thing';
import { OhsWeather } from '../OhsWeather/OhsWeather';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { Frame } from '../OhsGuiFramework/Frame';
import { OhsScreen } from '../OhsGuiFramework/OhsScreen';

import { ScreenMain } from './ScreenMain';

import swal from 'sweetalert2';

export class FrameMain extends Frame {

    // Site data
    public m_siteData:               SiteData = null;

    // Screen pointers...
    private m_screenMain:            ScreenMain = null;

    private m_infoStation:           InfoStation = null;

    private m_ohsWeather:            OhsWeather = null;


    constructor (canvas: HTMLCanvasElement) {
        super(canvas);

        // Data
        this.m_siteData = new SiteData ();
        this.m_infoStation = new InfoStation();
        this.m_ohsWeather = new OhsWeather();
        
        // Create screens...
        this.m_screenMain = new ScreenMain(this.m_siteData, this.m_infoStation, this.m_ohsWeather, canvas);
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

        if (ret != null) {

        }

        return null;
    }

    public SwitchScreen(newScreen: OhsScreen) {
        if (newScreen != null) {
            this.m_curScreen = newScreen;
        }
    }
}

