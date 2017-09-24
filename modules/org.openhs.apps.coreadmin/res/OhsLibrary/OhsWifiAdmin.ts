/**
 * Module with data structure...
 * Author: Michal Valny
 * Date: September-24-2017
 * This module communicates with: 
 */

module OhsWifiAdmin {
    
    const idNodesArr = 'idNodesArr';
    const url = 'services/ohs_site_data';
    
    
    export class WifiManager {
        
        public m_wifiNodeArray :        Array <WifiNode> = null;
        
        private timerUpdateNodesEvent;
        
        constructor () {
            
            this.m_wifiNodeArray = new Array <WifiNode> ();
            
            //Timers
            this.updateNodesEvent(1000);              
            
        }
        
        private updateNodesEvent (step : number) {
            
           this.updateNodes();
                                               
           window.clearTimeout(this.timerUpdateNodesEvent);
           this.timerUpdateNodesEvent = window.setTimeout(() => this.updateNodesEvent(step), step); 
        }         
        
        private updateNodes() {
                        
            var js = JSON.stringify({
            idPost : idNodesArr
            });               
            
            var ret = postAjax(url, js);                           
            
            if (ret != null) {
                /*
                if (JSON.parse(ret['return'])) {
                    
                    var str = JSON.stringify(ret[idNodesArr]);
                    
                    var parsedJSON = JSON.parse(str);         
                    
                }
                */
                
             }            
        }                
        
    }
    
    export class WifiNode {
        
        
    }
    
    
    function postAjax(urlAdr: string, jsonDat: string) {
       
        var result = null;
        
        $.ajaxSetup ({
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
                success: function(response) {
        
                result = response;
                                      
             }});  
    
        return result;    
    }       
              
}