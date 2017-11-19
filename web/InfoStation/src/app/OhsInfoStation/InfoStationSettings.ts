// import $ from 'jquery';
import * as $ from 'jquery';

export class InfoStationSettings {

    public static ID_GET_DATA          = 'idInfoStationData';
    public static ID_GET_DATE_TIME     = 'idDateTime';
    public static URL                  = 'services/ohsinfo';
    public static IMG                  = 'ohsinfo_assets/images/add.png';
    public static IMG_BKG              = 'ohsinfo_assets/images/weather.jpg';
    public static IMG_CLOUDRAIN        = 'ohsinfo_assets/images/cloudRain.png';
    public static IMG_CLOUDSNOW        = 'ohsinfo_assets/images/cloudSnow.png';
    public static IMG_CLOUDSTORM       = 'ohsinfo_assets/images/cloudStorm.png';
    public static IMG_CLOUDY           = 'ohsinfo_assets/images/cloudy.png';
    public static IMG_PARTCLOUDY       = 'ohsinfo_assets/images/partcloudy.png';
    public static IMG_SUNNY            = 'ohsinfo_assets/images/sunny.png';

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
