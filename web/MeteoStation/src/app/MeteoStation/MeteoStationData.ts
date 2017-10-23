
export class MeteoStationData {

    protected validity              = false; // content of the forecast is valid        
    protected id                    = '*'; // OpenHS path    
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