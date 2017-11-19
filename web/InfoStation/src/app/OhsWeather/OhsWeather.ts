import { WeatherData } from './WeatherData';
import { WeatherSettings } from './WeatherSettings';
import {postAjax} from './WeatherSettings';

export class OhsWeather {

    // ---Timers---
    private timerGetData;    

    // Data
    public m_currentWeather:    WeatherData = new WeatherData();
    public m_forecastWeather:   Array <WeatherData> = new Array <WeatherData>();

    constructor () {

        // Timers
        this.timerGetDataEvent(1000);
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

    private timerGetDataEvent(step: number) {
        
        this.updateWeatherData();

        window.clearTimeout(this.timerGetData);
        this.timerGetData = window.setTimeout(() => this.timerGetDataEvent(step), step);
    }

    private updateWeatherData () {
        this.updateCurrentWeatherData();
        this.updateForecastWeatherData();
    }

    private updateCurrentWeatherData() {

        var js = JSON.stringify({
            idPost : WeatherSettings.ID_GET_CUR_WEATHER_DATA
        });
    
        var ret = postAjax(WeatherSettings.URL, js);
    
        if (ret != null) {

            if (JSON.parse(ret['return'])) {
                this.m_currentWeather.fillFromJSON(ret);
            }            
        }                
    }

    private updateForecastWeatherData() {

        var js = JSON.stringify({
            idPost : WeatherSettings.ID_GET_FOR_WEATHER_DATA
        });
    
        var ret = postAjax(WeatherSettings.URL, js);

        if (ret != null) {
            if (JSON.parse(ret['return'])) {

                var str = JSON.stringify(ret[WeatherSettings.ID_GET_FOR_WEATHER_DATA]);

                var parsedJSON = JSON.parse(str);

                //window.alert('Lenght:' + parsedJSON.length);

                this.setNumber(parsedJSON.length, this.m_forecastWeather, WeatherData);

                for (var i = 0; i < parsedJSON.length; i++) {
                    var object = parsedJSON[i];

                    this.m_forecastWeather[i].fillFromJSON(object);
                }                                        
            }
        }
    }
     
    
    
            
    

}