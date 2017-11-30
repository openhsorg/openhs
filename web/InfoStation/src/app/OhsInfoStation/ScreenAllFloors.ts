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

import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { Floor } from '../OhsSiteData/Floor';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

export class ScreenAllFloors extends OhsScreen {

    public m_siteData:              SiteData = null;
    public m_floorIcons:            Array <ImageButton>;
    public m_floorName:             Array <TextSimple>;
    public m_floorPath:             Array <TextSimple>;

    constructor ( siteData: SiteData, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.m_floorIcons = new Array <ImageButton>();
        this.m_floorName = new Array <TextSimple>();
        this.m_floorPath = new Array <TextSimple>();

        this.buildLayout();
    }

    protected buildLayout () {
        super.buildLayout();

        this.m_floorIcons.length = 0;
        this.m_floorName.length = 0;
        this.m_floorPath.length = 0;

        const floorPaths: Array <String> = this.m_siteData.getSitePaths(this.m_siteData.m_floorArray);

        for (const fl of floorPaths) {
            this.m_floorIcons.push(new ImageButton(this.ctx,
                InfoStationSettings.IMG_FLOOR, InfoStationSettings.IMG_FLOOR, 0, 0, 100, 100));

            this.m_floorPath.push(new TextSimple(this.ctx, fl.toString(), 0, 0, 100, 100));

            const thing = this.m_siteData.getThing(fl.toString());

            const txt = new TextSimple(this.ctx, thing.getName(), 0, 0, 100, 100);
            txt.fontSize = 24;
            txt.fontFamily = 'px Roboto Condensed, sans-serif';
            txt.fontColor = '#000000';
            txt.textAlign = 'left';
            txt.textBaseline = 'top';
            txt.bold = true;

            this.m_floorName.push(txt);
        }

        const gx = 10;

        const dx = 150;
        const dy = 150;

        const dgx = dx + 120;
        const y = 20;

        let i = 0;

        // Reorder
        for (const item of this.m_floorIcons) {
            this.add(item);

            item.Size(gx + (i * dgx), y, dx, dy);

            i ++;
        }

        i = 0;

        for (const name of this.m_floorName) {
            this.add(name);

            name.Size(gx + (i * dgx), y + dy + gx, 2 * dx, dy);

            i ++;
        }


    }

    protected updateData () {
        // super.updateData();

        if (this.m_floorIcons.length !== this.m_siteData.getNumberFloors()) {
            this.buildLayout();

        }
    }
}