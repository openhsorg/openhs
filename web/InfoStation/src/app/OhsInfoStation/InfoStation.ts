import {InfoStationData} from './InfoStationData';
import {InfoStationSettings} from './InfoStationSettings';
import {postAjax} from './InfoStationSettings';
//import { SiteData } from '../OhsSiteData/SiteData';

export class InfoStation {

    private timer;
    private timerFast;

    public dateString: String = '---';
    public timeString: String = '---';

//    public m_siteData:               SiteData = null;

    public data:    InfoStationData = new InfoStationData();

    constructor () {
   //     this.m_siteData = siteData;

        // Timers
       // this.timerFastEvent(800);
        this.timerEvent(1000);
    }
/*
    private timerFastEvent(step: number) {

        this.updateDateTime();

        window.clearTimeout(this.timerFast);
        this.timerFast = window.setTimeout(() => this.timerFastEvent(step), step);
    }
*/
    private timerEvent(step: number) {

        this.updateData();

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);
    }
/*
    public updateDateTime () {

        var js = JSON.stringify({
        idPost : InfoStationSettings.ID_GET_DATE_TIME
        });

        var ret = postAjax(InfoStationSettings.URL, js);

        if (ret != null) {

            if (JSON.parse(ret['return'])) {

                this.dateString = ret['date'];
                this.timeString = ret['time'];
            }
        }
    }
*/
    protected updateData () {

        var js = JSON.stringify({
            idPost : InfoStationSettings.ID_GET_DATA
        });

        var ret = postAjax(InfoStationSettings.URL, js);

        //window.alert('----S');

        if (ret != null) {

            if (JSON.parse(ret['return'])) {
                this.data.fillFromJSON(ret);

            } else {

            }
        }

    }

}