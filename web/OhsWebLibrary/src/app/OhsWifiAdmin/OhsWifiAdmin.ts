import { OhsWifiAdminSettings } from './OhsWifiAdminSettings';
import {postAjax} from './OhsWifiAdminSettings';

export class OhsWifiAdmin {
    public timer;

    //public m_nodeArray:            Array <WifiNode> = null;

    constructor () {

      //  this.m_nodeArray = new Array <WifiNode> ();

        this.timerEvent(1000);

    }

    private timerEvent(step: number) {
       // this.updateData();
        
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.timerEvent(step), step);                
    }

    private updateData () {

        var js = JSON.stringify({
            idPost : OhsWifiAdminSettings.ID_WIFI_ARR
        });
    
        var ret = postAjax(OhsWifiAdminSettings.URL, js);

        if (ret != null) {
            if (JSON.parse(ret['return'])) {
            }
        }        
    }

    public setNumber<T>(num:  number, arg: Array<T>, types: { new(): T ;}) {
        if (num > arg.length) {
            for (var i = arg.length; i < num; i++) {
                let ss = new types();
                arg.push(ss);
            }
        } else if (num < arg.length) {
            arg.length = num;
        }
    }  
      
}
