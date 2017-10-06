// import $ from 'jquery';
import * as $ from 'jquery';

export class OhsAdminSettings {

    public static ICON_TEMP             = 'adminres/images/tempIcon.png';
    public static ICON_SWITCH           = 'adminres/images/switchIcon.png';
    public static ICON_FLOOR            = 'adminres/images/floorIcon.png';
    public static ICON_DOOR             = 'adminres/images/doorIcon.png';
    public static ICON_ROOM             = 'adminres/images/roomIcon.png';
    public static ICON_LEAVE            = 'adminres/images/leave.png';

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
