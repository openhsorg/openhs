

export class OhsWifiAdminSettings {

    public static URL                   = 'services/ohs_wifiadmin_ws';
    public static ID_SET_NAME           = 'idSetName';    
    public static ID_WIFI_ARR           = 'idWifiArr';    
    public static ID_CONECT_NODE        = 'idConnectNode';   

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