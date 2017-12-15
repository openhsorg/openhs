import {InfoStationData} from './InfoStationData';
import {InfoStationSettings} from './InfoStationSettings';
import {KidEvents} from './KidEvents';
import {postAjax} from './InfoStationSettings';

export class InfoStation {

    private timer;
    private timerFast;

    public dateString: String = '---';
    public timeString: String = '---';

    public data:    InfoStationData = new InfoStationData();

    public kidEvents:   KidEvents = new KidEvents(); 

    constructor () {
        this.timerEvent(4000);
    }

    private timerEvent(step: number) {

        this.updateData();
        this.getKidEvents();

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);
    }

    protected getKidEvents () {

        var js = JSON.stringify({
            idPost : this.kidEvents.constructor.name
        });

        var ret = postAjax(InfoStationSettings.URL, js);

        if (ret != null) {

            if (JSON.parse(ret['return'])) {
                this.kidEvents.fillFromJSON(ret);

            } else {

            }
        }
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