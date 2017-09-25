/**
 * Module with data structure...
 * Author: Michal Valny
 * Date: September-24-2017
 * This module communicates with:
 */
var OhsWifiAdmin;
(function (OhsWifiAdmin) {
    const idNodesArr = 'idNodesArr';
    const url = 'services/ohs_site_data';
    class WifiManager {
        constructor() {
            this.m_wifiNodeArray = null;
            this.m_wifiNodeArray = new Array();
            //Timers
            this.updateNodesEvent(1000);
        }
        updateNodesEvent(step) {
            this.updateNodes();
            window.clearTimeout(this.timerUpdateNodesEvent);
            this.timerUpdateNodesEvent = window.setTimeout(() => this.updateNodesEvent(step), step);
        }
        updateNodes() {
            var js = JSON.stringify({
                idPost: idNodesArr
            });
            var ret = postAjax(url, js);
            if (ret != null) {
            }
        }
    }
    OhsWifiAdmin.WifiManager = WifiManager;
    class WifiNode {
    }
    OhsWifiAdmin.WifiNode = WifiNode;
    function postAjax(urlAdr, jsonDat) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({
            async: false,
            type: "POST",
            contentType: 'application/json',
            url: urlAdr,
            data: jsonDat,
            dataType: "json",
            success: function (response) {
                result = response;
            } });
        return result;
    }
})(OhsWifiAdmin || (OhsWifiAdmin = {}));
