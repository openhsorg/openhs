

export class WeatherData {
    public validity                 = false; // content of the forecast is valid
    public location                 = '';
    public temp                     = 0.0;
    public tempMin                  = 0.0;
    public tempMax                  = 0.0;
    public hum                      = 0.0;
    public cloudsPercent            = 0.0;
    public windSpeed                = 0.0;
    public windDegree               = 0.0;
    public rain                     = 0.0;
    public snow                     = 0.0;
    public weatherSymbol            = 0.0; // 0: not set, 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow 

    constructor() {

    }

    fillFromJSON(json: any) {

        for (var propName in json) {
            this[propName] = json[propName];
        }
    }
}