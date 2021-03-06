import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { ScreenThings } from './ScreenThings';
import { TextSimple } from '../OhsGuiFramework/TextSimple';

import swal from 'sweetalert2';

export class ScreenRooms extends ScreenThings {

    protected updateData() {
        super.updateData();

        this.m_textTitle.setText('Rooms');

        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);

        var i = 0;

        for (var item of this.m_siteData.m_roomArray) {
            var txt = item.getName();

            this.m_list.setText((i + 1).toString() + '. ' + txt, i);

            i ++;
        }

        // Text details:
        if (this.m_list.selectedRow !== 0) {

            let item = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];

            this.m_propData.setText(this.strName + ':', item.getName(), 0);
            this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);


        }
    }

    public MouseUpHandler(x: number, y: number) {
        var ret = super.MouseUpHandler(x, y);
        if (ret == null) { return ret; }

        var thing: Thing = null;

        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
        }

        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, (<TextSimple> ret).getText());

        } else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, (<TextSimple> ret).getText());

        } else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, (<TextSimple> ret).getText());

        }

        return ret;
    }

} // class end
