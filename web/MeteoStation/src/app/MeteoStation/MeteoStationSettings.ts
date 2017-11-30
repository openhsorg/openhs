// import $ from 'jquery';
import * as $ from 'jquery';

export class MeteoStationSettings {

    public static ID_GET_DATA          = 'idMeteoData';
    public static ID_GET_DATE_TIME     = 'idDateTime';
    public static URL                  = 'services/ohs_meteo';
    public static IMG                  = 'meteo_assets/images/add.png';
    public static IMG_BKG              = 'meteo_assets/images/weather.jpg';

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
