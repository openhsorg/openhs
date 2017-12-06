import {Thing} from './Thing';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';
import {postAjax2} from './OhsInterface';
import {postAjax3} from './Thing';

import * as $ from 'jquery';

export class Switch extends Thing {

        public   stateInt:  number; //1-off 2- off_on 3- on, 4- on_off

        constructor () {
            super ();

            this.stateInt = 0;
        }

        public getState () {
            return this.stateInt;
        }

        public click () {
            if (this.getState() === 1 || this.getState() === 2) {
                this.on();
            } else {
                this.off();
            }
        }

        public updater (jsonString: String) {
            window.alert('aaa: x');
            if (JSON.parse(jsonString['return'])) {
                this.stateInt = parseInt (jsonString['state_int'], 10);

               // var str = JSON.stringify(response);
                
                //var parsedJSON = JSON.parse(str);

             
               // this.updateDelayed(250);

              
            }
                }
        /*
        public on () {
            this.stateInt = 2;

            //window.setTimeout(() => this.on_update(), 50);
        }

        public off () {
            this.stateInt = 4;

            //window.setTimeout(() => this.off_update(), 50);

           // window.alert("aaaa");
        }      
        */
        /*
        public click_update () {
            if (this.stateInt == 2) {
                this.on_update();

            } else if (this.stateInt == 4) {
                this.off_update();

            }

        }
*/
        

        public on () {

           // window.alert('aaa');
  
            this.stateInt = 2;

            var js = JSON.stringify({
                idPost : OhsInterface.ID_THING_COMMAND,
                path:   this.sitePath,
                command: 'on'
            });
/*
            $.ajaxSetup ({
                // Disable caching of AJAX responses
                cache: false
            });

        $.ajax({
            async: true,
            type: 'POST',
            contentType: 'application/json',
            url: OhsInterface.URL,
            data: js,
            dataType: 'json',
            success: function(response) {                

                if (JSON.parse(response['return'])) {
                    this.stateInt = parseInt (response['state_int'], 10);

                   // var str = JSON.stringify(response);
                    
                    //var parsedJSON = JSON.parse(str);
    
                 //   window.alert('aaa: ' + this.stateInt);
                   // this.updateDelayed(250);
    
                  
                }

          
         }});
         ////'services/ohs_site_data'
            
*/
    //       var ret = postAjax3(OhsInterface.URL, js, this);
           var ret = postAjax4(OhsInterface.URL, js, this);

           window.setTimeout(() => this.updateX(), 100);


         //   window.setTimeout(() => this.update(), 250);
        }

        public off () {

            this.stateInt = 4;

            var js = JSON.stringify({
                idPost : OhsInterface.ID_THING_COMMAND,
                path:   this.sitePath,
                command: 'off'
            });
            
/*

            $.ajaxSetup ({
                // Disable caching of AJAX responses
                cache: false
            });

            $.ajax({
                async: true,
                type: 'POST',
                contentType: 'application/json',
                url: OhsInterface.URL,
                data: js,
                dataType: 'json',
                success: function(response) {

                    if (JSON.parse(response['return'])) {
                        this.stateInt = parseInt (response['state_int'], 10);
        
                       // this.updateDelayed(250);                              
                    }

            
            }});              
            
*/
            var ret = postAjax4(OhsInterface.URL, js, this);

            window.setTimeout(() => this.updateX(), 100);

            /*
            var ret = postAjax2(OhsInterface.URL, js);

            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt(ret['state_int'], 10);

                this.updateDelayed (250);
            }

            window.setTimeout(() => this.update(), 250);
            */
        }

        public updateX () {

            var js = JSON.stringify({
                idPost : OhsInterface.ID_THING_UPDATE,
                sitePath:   this.sitePath
            });

            //window.alert('aaa+++');
            postAjax5(OhsInterface.URL, js, this);
        }
    }

    export function postAjax4(urlAdr: string, jsonDat: string, obj: Switch) {
        
             var result = null;
        
          
             $.ajaxSetup ({
                         // Disable caching of AJAX responses
                         cache: false
                     });
        
                 $.ajax({
                     async: true,
                     type: 'POST',
                     contentType: 'application/json',
                     url: urlAdr,
                     data: jsonDat,
                     dataType: 'json',
                     success: function(response) {



          
                        if (JSON.parse(response['return'])) {
                            obj.stateInt = parseInt (response['state_int'], 10);
        
                           // var str = JSON.stringify(response);
                            
                            //var parsedJSON = JSON.parse(str);
            
                         //   window.alert('aaa: ' + this.stateInt);
                           // this.updateDelayed(250);
            
                          
                        }
    
                   
                  }});
        
             return result;
         }

         export function postAjax5(urlAdr: string, jsonDat: string, obj: Switch) {
            
                 var result = null;
            
              
                 $.ajaxSetup ({
                             // Disable caching of AJAX responses
                             cache: false
                         });
            
                     $.ajax({
                         async: true,
                         type: 'POST',
                         contentType: 'application/json',
                         url: urlAdr,
                         data: jsonDat,
                         dataType: 'json',
                         success: function(response) {

                         //   var str = JSON.stringify(response);
                            //window.alert('aaa+++: ' + str);
              
                            if (JSON.parse(response['return'])) {
                             //   this.fillFromJSON(response);

                                for (var propName in response) {
                                    obj[propName] = response[propName];
                                }            
                                
                              
                    
                            } else {
                    
                            }
        
                       
                      }});
            
                 return result;
             }         