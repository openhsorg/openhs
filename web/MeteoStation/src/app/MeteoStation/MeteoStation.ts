import {MeteoStationData} from './MeteoStationData';
import {MeteoStationSettings} from './MeteoStationSettings';
import {postAjax} from './MeteoStationSettings';

export class MeteoStation {

    private timer;

    public data:    MeteoStationData = new MeteoStationData();

    constructor () {

        // Timers
        this.timerEvent(2000);
    }

    private timerEvent(step: number) {
        
        this.updateData();

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);
    }    

    protected updateData () {

        var js = JSON.stringify({
            idPost : MeteoStationSettings.ID_GET_DATA
            });
    
            var ret = postAjax(MeteoStationSettings.URL, js);
    
            if (ret != null) {
/*
                if (JSON.parse(ret['return'])) {
                    //this.data.fillFromJSON(ret);
        
                } else {
        
                }                
    */
                
            }   
            
          //  window.alert('update time:');

    }

}