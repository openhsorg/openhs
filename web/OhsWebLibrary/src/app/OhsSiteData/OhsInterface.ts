// import $ from 'jquery';
import * as $ from 'jquery';

export class OhsInterface {

    public static SERVLET_URL           = 'kitchen';
    public static URL                   = 'services/ohs_site_data';
    public static ID_SET_NAME           = 'idSetName';
    public static ID_SET_SITE_PATH      = 'idSetSitePath';
    public static ID_SET_DEVICE_PATH    = 'idSetDevicePath';
    public static ID_THING_UPDATE       = 'idThingUpdate';
    public static ID_SITE_UPDATE        = 'idSiteUpdate';
    public static ID_THING_COMMAND      = 'idThingCommand';
    public static ID_FLOOR_ARR          = 'idFloorArr';
    public static ID_ROOM_ARR           = 'idRoomArr';
    public static ID_DOOR_ARR           = 'idDoorArr';
    public static ID_WINDOW_ARR         = 'idWindowArr';
    public static ID_TEMP_SENS_ARR      = 'idTempSensArr';
    public static ID_SWITCH_ARR         = 'idSwitchArr';
    public static ID_CONTACTSENS_ARR    = 'idContactSensArr';
    public static ID_WIFINODE_ARR       = 'idWifiNodeArr';
    public static ID_TIME_DATE          = 'idTimeDate';
    public static ID_SET_FLOORS         = 'idSetFloors';
    public static ID_ADD_FLOOR          = 'idAddFloor';
    public static ID_DELETE_FLOOR       = 'idDeleteFloor';
    public static ID_DELETE_THING       = 'idDeleteThing';
    public static ID_ADD_THING          = 'idAddThing';


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
