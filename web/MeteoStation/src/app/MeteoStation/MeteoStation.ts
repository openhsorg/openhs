import {MeteoStationData} from './MeteoStationData';
import {MeteoStationSettings} from './MeteoStationSettings';
import {postAjax} from './MeteoStationSettings';

export class MeteoStation {

    private timer;
    private timerFast;

    public dateString: String = '---';
    public timeString: String = '---';

    public data:    MeteoStationData = new MeteoStationData();

    constructor () {

        // Timers
        this.timerFastEvent(800);
        this.timerEvent(2000);
    }

    private timerFastEvent(step: number) {

        this.updateDateTime();

        window.clearTimeout(this.timerFast);
        this.timerFast = window.setTimeout(() => this.timerFastEvent(step), step);
    }

    private timerEvent(step: number) {

        this.updateData();

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);
    }

    public updateDateTime () {

        var js = JSON.stringify({
        idPost : MeteoStationSettings.ID_GET_DATE_TIME
        });

        var ret = postAjax(MeteoStationSettings.URL, js);

        if (ret != null) {

            if (JSON.parse(ret['return'])) {

                this.dateString = ret['date'];
                this.timeString = ret['time'];
            }
        }
    }

    protected updateData () {

        var js = JSON.stringify({
            idPost : MeteoStationSettings.ID_GET_DATA
        });

        var ret = postAjax(MeteoStationSettings.URL, js);

        if (ret != null) {

            if (JSON.parse(ret['return'])) {
                this.data.fillFromJSON(ret);

            } else {

            }
        }

    }

}