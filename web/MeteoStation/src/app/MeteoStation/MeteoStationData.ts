
export class MeteoStationData {

    public validity                 = false; // content of the forecast is valid
    public id                       = '*'; // OpenHS path
    public tmpIn                    = 0.0;
    public tmpOut                   = 0.0;
    public frost                    = false;

    
    constructor() {
        
    }

    fillFromJSON(json: any) {
        
        for (var propName in json) {
            this[propName] = json[propName];
        }
    }
    
}