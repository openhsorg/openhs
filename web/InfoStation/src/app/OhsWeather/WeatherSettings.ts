import * as $ from 'jquery';

export class WeatherSettings {
    
    public static URL                       = 'services/ohs_weather_data';

    public static ID_GET_CUR_WEATHER_DATA   = 'idGetCurrentWeatherData';
    public static ID_GET_FOR_WEATHER_DATA   = 'idGetForecastWeatherData';
  
}

export function postAjax(urlAdr: string, jsonDat: string) {
    
         var result = null;
    
         $.ajaxSetup ({
                     // Disable caching of AJAX responses
                     cache: false
                 });
    
             $.ajax({
                 async: false,
                 type: 'POST',
                 contentType: 'application/json',
                 url: urlAdr,
                 data: jsonDat,
                 dataType: 'json',
                 success: function(response) {
    
                 result = response;
    
              }});
    
         return result;
     }