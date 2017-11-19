import {InfoStationData} from './InfoStationData';
import {InfoStationSettings} from './InfoStationSettings';
import {postAjax} from './InfoStationSettings';
//import { SiteData } from '../OhsSiteData/SiteData';

export class InfoStation {

    private timer;
    private timerFast;

    public dateString: String = '---';
    public timeString: String = '---';

    public data:    InfoStationData = new InfoStationData();

    constructor () {
        this.timerEvent(2000);
    }

    private timerEvent(step: number) {

        this.updateData();

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);
    }

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