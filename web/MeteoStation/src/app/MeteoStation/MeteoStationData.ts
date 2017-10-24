
export class MeteoStationData {

    public validity                 = false; // content of the forecast is valid
    public id                       = '*'; // OpenHS path
    public tmpIn:                   number;
    public tmpOut:                  number;
    public frost                    = false;

    
    constructor() {
        
    }

    fillFromJSON(json: any) {
        
        for (var propName in json) {
            this[propName] = json[propName];
        }
    }
    
}