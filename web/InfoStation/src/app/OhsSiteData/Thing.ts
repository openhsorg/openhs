import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';
import {postAjax2} from './OhsInterface';

export class Thing {

    protected valid                 = false; // content of the forecast is valid
    public sitePath              = '*'; // OpenHS path
    protected devicePath            = '*'; // OpenHS path
    protected name                  = 'no name';
    public posX:                    number;
    public posY:                    number;
    public posZ:                    number;

    constructor () {
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
    }

    public getSitePath() {
        return this.sitePath;
    }

    public getDevicePath() {
        return this.devicePath;
    }

    public getName() {
        return this.name;
    }

    public setName(name: String) {
        var js = JSON.stringify({
            idPost : OhsInterface.ID_SET_NAME,
            sitePath  : this.sitePath,
            idString   : name
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {
            return true;

        } else {
            return false;
        }
    }

    public setSitePath(sitePathNew: String) {
        var js = JSON.stringify({
            idPost : OhsInterface.ID_SET_SITE_PATH,
            sitePath  : this.sitePath,
            idString   : sitePathNew
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {
            return true;

        } else {
            return false;
        }
    }

    public setDevicePath(siteDevicePathNew: String) {
        var js = JSON.stringify({
            idPost : OhsInterface.ID_SET_DEVICE_PATH,
            sitePath  : this.sitePath,
            idString   : siteDevicePathNew
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {
            return true;

        } else {
            return false;
        }
    }

    public isValid() {
        return this.valid;
    }

    public updateX () {

    }    

    public update () {

        var js = JSON.stringify({
            idPost : OhsInterface.ID_THING_UPDATE,
            sitePath  : this.sitePath
        });

        var ret = postAjax2 (OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {
            this.fillFromJSON(ret);

        } else {

        }
    }

    public updateDelayed (wait: number) {
        window.setTimeout(() => this.update(), wait);
    }

    fillFromJSON(json: any) {

        for (var propName in json) {
            this[propName] = json[propName];
        }
    }

    public updaterx (jsonString: String) {
        window.alert('---');
    }
}


export function postAjax3(urlAdr: string, jsonDat: string, obj: Thing) {
    
         var result = null;
    
      
         $.ajaxSetup ({
                     // Disable caching of AJAX responses
                     cache: false
                 });
    
             $.ajax({
                 async: true,
                 type: 'POST',
                 contentType: 'application/json',
                 url: urlAdr,
                 data: jsonDat,
                 dataType: 'json',
                 success: function(response) {

                    obj.updaterx(response);
    /*
                    if (JSON.parse(response['return'])) {
                        obj.stateInt = parseInt (response['state_int'], 10);
    
                       // var str = JSON.stringify(response);
                        
                        //var parsedJSON = JSON.parse(str);
        
                     //   window.alert('aaa: ' + this.stateInt);
                       // this.updateDelayed(250);
        
                      
                    }
*/
               
              }});
    
         return result;
     }