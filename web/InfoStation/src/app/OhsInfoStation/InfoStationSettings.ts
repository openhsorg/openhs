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
    public static IMG_WIND             = 'ohsinfo_assets/images/wind.png';
    public static IMG_DROP             = 'ohsinfo_assets/images/drop.png';
    public static IMG_STOPWATCH        = 'ohsinfo_assets/images/stopwatch.png';
    public static IMG_VOICEMESSAGE     = 'ohsinfo_assets/images/voicemessage.png';
    public static IMG_BULB             = 'ohsinfo_assets/images/bulb.png';
    public static IMG_DOOR             = 'ohsinfo_assets/images/door.png';
    public static IMG_HUMIDITY         = 'ohsinfo_assets/images/humidity.png';
    public static IMG_FLOOR            = 'ohsinfo_assets/images/floorIcon.png';
    public static IMG_FLOOR1           = 'ohsinfo_assets/images/floor1.jpg';
    public static IMG_BULB_ON          = 'ohsinfo_assets/images/bulbOn.png';
    public static IMG_BULB_OFF         = 'ohsinfo_assets/images/bulbOff.png';
    public static IMG_BULB_ONOFF       = 'ohsinfo_assets/images/bulbOn_Off.png';
    public static IMG_BULB_OFFON       = 'ohsinfo_assets/images/bulbOff_On.png';
    public static IMG_TEMP_SYMBOL      = 'ohsinfo_assets/images/tempSymbol.png';
    public static IMG_GO_SCHOOL        = 'ohsinfo_assets/images/alligator-going-to-school.png';
    public static IMG_BATH_TIME        = 'ohsinfo_assets/images/bath_time.png';
    public static IMG_SLEEP_TIME       = 'ohsinfo_assets/images/go_sleep.gif';
    public static IMG_LUNCH_TIME       = 'ohsinfo_assets/images/lunch_time.png';
    public static IMG_JOHNY            = 'ohsinfo_assets/images/johny.png';
    public static IMG_ELF              = 'ohsinfo_assets/images/elf.png';
    public static IMG_SANTA            = 'ohsinfo_assets/images/santa.png';

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

