import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { ImageStatic } from '../OhsGuiFramework/ImageStatic';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { OhsWeather } from '../OhsWeather/OhsWeather';

import { InfoStationSettings } from './InfoStationSettings';
import { PanelWeather } from './PanelWeather';
import { SymbolSwitch } from './SymbolSwitch';
import { SymbolTempSensor } from './SymbolTempSensor';

import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { Floor } from '../OhsSiteData/Floor';
import { Switch } from '../OhsSiteData/Switch';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

export class ScreenFloor extends OhsScreen {

    public m_siteData:              SiteData = null;
    public sitePath:                String = '';

    public m_imgMap:                ImageStatic = null;
    public m_symbSwitches:          Array <SymbolSwitch>;
    public m_symbTempSensors:       Array <SymbolTempSensor>;

    protected fx = 0.0;
    protected fy = 0.0;

    constructor (siteData: SiteData, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_imgMap = new ImageStatic (this.ctx);
        this.m_symbSwitches = new Array <SymbolSwitch>();
        this.m_symbTempSensors = new Array <SymbolTempSensor>();

        this.buildLayout();
    }

    protected buildLayout () {
        super.buildLayout();

        this.m_imgMap.Size(0, 0, this.canvas.width, this.canvas.height);
        this.m_imgMap.clickable = false;
        this.add(this.m_imgMap);

        // Add switches
        for (let swt of this.m_siteData.m_switchArray) {
            const new_symb = new SymbolSwitch(this.ctx, swt, this.fx, this.fy);
            this.m_symbSwitches.push(new_symb);
            this.add(new_symb);
        }

        // Add temp sesnors
        for (let ts of this.m_siteData.m_tempSensorArray) {
            const new_symb = new SymbolTempSensor(this.ctx, ts, this.fx, this.fy);
            this.m_symbTempSensors.push(new_symb);
            this.add(new_symb);
        }
    }

    public setSitePath (path: String) {

        if (this.sitePath === path) { return; }

        this.sitePath = path;

        const floor = <Floor>this.m_siteData.getThing(this.sitePath.toString());

        if (floor != null) {
           // this.fx = floor.dimX;
           // this.fy = floor.dimY;

            if (floor.dimX !== 0.0) {
                this.fx = this.canvas.width / (floor.dimX);
            }

            if (floor.dimY !== 0.0) {
                this.fy = this.canvas.height / (floor.dimY);
            }
        }

        this.m_imgMap.setImage(InfoStationSettings.IMG_FLOOR1);

        this.buildLayout();
    }

    protected updateData() {

        if (this.m_symbSwitches.length !== this.m_siteData.m_switchArray.length) {
            this.buildLayout();
        }

    }

}