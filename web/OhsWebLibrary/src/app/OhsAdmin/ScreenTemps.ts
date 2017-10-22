import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { ScreenThings } from './ScreenThings';
import { TextSimple } from '../OhsGuiFramework/TextSimple';

import swal from 'sweetalert2';

export class ScreenTemps extends ScreenThings {

    protected updateData() {
        super.updateData();

        this.m_textTitle.setText('Temperature sensors');

        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);

        var i = 0;

        for (var item of this.m_siteData.m_tempSensorArray) {
            var txt = item.getName();

            this.m_list.setText((i + 1).toString() + '. ' + txt, i);

            i ++;
        }

        //Text details:
        if (this.m_list.selectedRow !== 0) {

            let item = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];

            this.m_propData.setText(this.strName + ':', item.getName(), 0);
            this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
            this.m_propData.setText(this.strDevicePath, item.getDevicePath(), 2); 
        }
    }

    public MouseUpHandler(x: number, y: number) {
        var ret = super.MouseUpHandler(x, y);
        if (ret == null) { return ret; }

        var thing: Thing = null;

        if (this.m_list.selectedRow >= 1){
            thing = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
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

public SetData(thing: Thing, dataName: String, data: String) {

    if (thing != null) {

        if (thing instanceof TemperatureSensor) {

            var ret = false;
            var sent = false;

            if (dataName === this.strName) {
                sent = true;
                ret = thing.setName(data);

                if (ret) { thing.update(); }

            } else if (dataName === this.strSitePath) {
                sent = true;
                ret = thing.setSitePath(data);

                if (ret) { this.m_siteData.updateObjectArray('idTempSensArr'); }

            } else if (dataName === this.strDevicePath) {
                sent = true;
                ret = thing.setDevicePath(data);

                if (ret) { thing.update(); }
            }

            if (sent) {

                let tp = 'success';

                if (ret) {
                   // thing.update();
                } else {
                    tp = 'error';
                }
/*
                swal({ type: tp,
                    title: 'Changed...' + data
                })
                */
            }
        }
    }
}

} // class end
